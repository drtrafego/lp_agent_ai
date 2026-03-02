// ─────────────────────────────────────────────────────────
//  tracking-server.ts
//  Utilitários server-side para Meta Conversions API (CAPI)
//  e Google Analytics 4 Measurement Protocol.
//  Nunca importe este arquivo em Client Components.
// ─────────────────────────────────────────────────────────

// ─── Tipos ───────────────────────────────────────────────

export interface CAPIPayload {
  leadId: number | string
  name: string
  email: string
  whatsapp: string
  // Identificadores coletados do request HTTP
  ip?: string
  userAgent?: string
  fbc?: string   // cookie _fbc  → click ID do anúncio
  fbp?: string   // cookie _fbp  → browser ID do Facebook
  eventSourceUrl?: string
}

export interface GA4Payload {
  leadId: number | string
  gaCookie?: string    // cookie _ga  → client_id do GA4
  ip?: string
  userAgent?: string
  eventSourceUrl?: string
}

// ─── 1. Hash SHA-256 (exigido pela Meta para PII) ────────

/**
 * Aplica SHA-256 em lowercase+trim, conforme especificação da Meta CAPI.
 * Usa o módulo nativo `crypto` do Node — sem dependências externas.
 */
async function hashData(raw: string): Promise<string> {
  const { createHash } = await import('crypto')
  return createHash('sha256').update(raw.trim().toLowerCase()).digest('hex')
}

// ─── 2. Extrai apenas o primeiro nome ────────────────────

function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? fullName
}

// ─── 3. Limpa o telefone (apenas dígitos) ────────────────

function cleanPhone(phone: string): string {
  return phone.replace(/\D/g, '')
}

// ─── 4. Extrai client_id do cookie _ga ───────────────────
//  Formato do cookie: GA1.X.XXXXXXXXXX.XXXXXXXXXX
//  client_id = últimas duas partes separadas por ponto

function extractGaClientId(gaCookie: string): string {
  const parts = gaCookie.split('.')
  if (parts.length >= 4) {
    return `${parts[2]}.${parts[3]}`
  }
  return gaCookie
}

// ─── 5. sendMetaCAPI ─────────────────────────────────────

/**
 * Dispara um evento "Lead" para a Meta Conversions API.
 * Falha silenciosamente se as env vars não estiverem configuradas.
 *
 * @param payload  Dados do lead + identificadores de request
 */
export async function sendMetaCAPI(payload: CAPIPayload): Promise<void> {
  const pixelId    = process.env.FB_PIXEL_ID
  const accessToken = process.env.FB_ACCESS_TOKEN

  // Aborta silenciosamente se as credenciais não existirem
  if (!pixelId || !accessToken) {
    console.warn('[CAPI] FB_PIXEL_ID ou FB_ACCESS_TOKEN ausente — evento ignorado.')
    return
  }

  try {
    const {
      leadId,
      name,
      email,
      whatsapp,
      ip,
      userAgent,
      fbc,
      fbp,
      eventSourceUrl,
    } = payload

    // ── Hashing paralelo de PII ──────────────────────────
    const [hashedEmail, hashedPhone, hashedFirstName, hashedExternalId] =
      await Promise.all([
        hashData(email),
        hashData(cleanPhone(whatsapp)),
        hashData(firstName(name)),
        hashData(String(leadId)),   // external_id: ID do banco com hash (+16% match quality)
      ])

    // ── Montagem do payload CAPI ─────────────────────────
    const body = {
      data: [
        {
          event_name: 'Lead',
          event_time: Math.floor(Date.now() / 1000),  // Unix timestamp em segundos
          event_id: String(leadId),                   // Deduplicação com o Pixel front-end
          action_source: 'website',
          event_source_url: eventSourceUrl ?? undefined,

          user_data: {
            // ── PII com hash SHA-256 (arrays de string) ──
            em: [hashedEmail],
            ph: [hashedPhone],
            fn: [hashedFirstName],
            // ln não enviado (frontend usa campo único de nome)

            // ── Metadados do dispositivo (texto claro) ───
            ...(ip        && { client_ip_address: ip }),
            ...(userAgent && { client_user_agent: userAgent }),

            // ── Cookies Meta (identificação do anúncio) ──
            ...(fbc && { fbc }),
            ...(fbp && { fbp }),

            // ── Identificador externo avançado ───────────
            external_id: [hashedExternalId],
          },

          custom_data: {
            content_name: 'Lead BilderAI',
            value: 0,
            currency: 'BRL',
          },
        },
      ],
    }

    const url = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('[CAPI] Erro na resposta da Meta:', response.status, error)
      return
    }

    const result = await response.json()
    console.log('[CAPI] Evento enviado com sucesso:', {
      leadId,
      eventsReceived: result.events_received,
      fbtrace: result.fbtrace_id,
    })
  } catch (err) {
    // Isola qualquer erro para não derrubar outras integrações
    console.error('[CAPI] Falha inesperada (isolada):', err)
  }
}

// ─── 6. sendGA4Lead ──────────────────────────────────────

/**
 * Dispara um evento "generate_lead" via GA4 Measurement Protocol (server-side).
 * Permite rastrear a conversão mesmo sem JS no browser.
 * Falha silenciosamente se as env vars não estiverem configuradas.
 *
 * Credenciais necessárias:
 *   GA_MEASUREMENT_ID  → GA4 Measurement ID (G-XXXXXXXXXX)
 *   GA_API_SECRET      → gerado em: Admin → Data Streams → Measurement Protocol API secrets
 *
 * @param payload  Dados do request HTTP para enriquecer o evento
 */
export async function sendGA4Lead(payload: GA4Payload): Promise<void> {
  const measurementId = process.env.GA_MEASUREMENT_ID
  const apiSecret     = process.env.GA_API_SECRET

  if (!measurementId || !apiSecret) {
    console.warn('[GA4] GA_MEASUREMENT_ID ou GA_API_SECRET ausente — evento ignorado.')
    return
  }

  try {
    const { leadId, gaCookie } = payload

    // client_id: extraído do cookie _ga; fallback para ID do lead
    const clientId = gaCookie
      ? extractGaClientId(gaCookie)
      : `lead_${String(leadId)}`

    const body = {
      client_id: clientId,
      events: [
        {
          name: 'generate_lead',
          params: {
            currency:             'BRL',
            value:                0,
            lead_source:          'landing_page',
            form_name:            'Lead BilderAI',
            engagement_time_msec: 1,
          },
        },
      ],
    }

    const url = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    // GA4 Measurement Protocol retorna 204 em sucesso
    if (response.status !== 204 && !response.ok) {
      console.error('[GA4] Erro na resposta:', response.status)
      return
    }

    console.log('[GA4] Evento generate_lead enviado — leadId:', leadId, '— client_id:', clientId)
  } catch (err) {
    // Isola qualquer erro para não derrubar outras integrações
    console.error('[GA4] Falha inesperada (isolada):', err)
  }
}
