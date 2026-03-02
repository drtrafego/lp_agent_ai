// ─────────────────────────────────────────────────────────
//  POST /api/contact
//
//  Fluxo:
//  1. Valida o payload com Zod
//  2. Captura identificadores do request (IP, UA, cookies, origin)
//  3. Persiste no Neon/PostgreSQL via Drizzle (timeout: 5 s)
//  4. Responde 200 imediatamente ao cliente
//  5. Dispara Meta CAPI + GA4 Measurement Protocol em background
// ─────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { leads } from '@/lib/schema'
import { sendMetaCAPI, sendGA4Lead } from '@/lib/tracking-server'

// ─── Schema de validação ─────────────────────────────────

const ContactSchema = z.object({
  name:     z.string().min(2, 'Nome muito curto').max(120),
  email:    z.string().email('E-mail inválido'),
  whatsapp: z.string().min(10, 'Telefone inválido').max(20),
  // UTMs opcionais — chegam como query params na URL da landing page
  utm_source:   z.string().optional(),
  utm_medium:   z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term:     z.string().optional(),
})

type ContactInput = z.infer<typeof ContactSchema>

// ─── Utilitário de timeout ───────────────────────────────

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), ms),
    ),
  ])
}

// ─── Handler principal ───────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {

  // ── 1. Parse e validação ──────────────────────────────
  let input: ContactInput
  try {
    const raw = await req.json()
    input = ContactSchema.parse(raw)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: err.flatten().fieldErrors },
        { status: 422 },
      )
    }
    return NextResponse.json(
      { success: false, message: 'Payload inválido' },
      { status: 400 },
    )
  }

  // ── 2. Captura de identificadores do request ──────────

  const xForwardedFor = req.headers.get('x-forwarded-for')
  const ip = xForwardedFor
    ? xForwardedFor.split(',')[0].trim()
    : (req.headers.get('x-real-ip') ?? undefined)

  const userAgent = req.headers.get('user-agent') ?? undefined

  const cookieHeader = req.headers.get('cookie') ?? ''
  const parseCookie  = (name: string): string | undefined => {
    const match = cookieHeader.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
    return match ? decodeURIComponent(match[1]) : undefined
  }

  // Cookies Meta
  const fbc = parseCookie('_fbc')
  const fbp = parseCookie('_fbp')

  // Cookie GA4 — client_id para o Measurement Protocol
  const gaCookie = parseCookie('_ga')

  const eventSourceUrl = req.headers.get('origin') ?? undefined

  // ── 3. Persistência no banco (timeout: 5 s) ───────────

  let leadId: number | string

  try {
    const [row] = await withTimeout(
      db.insert(leads).values({
        name:         input.name,
        email:        input.email,
        whatsapp:     input.whatsapp,
        utm_source:   input.utm_source,
        utm_medium:   input.utm_medium,
        utm_campaign: input.utm_campaign,
        utm_term:     input.utm_term,
      }).returning({ id: leads.id }),
      5_000,
    )
    leadId = row.id
    console.log('[contact] Lead salvo no banco:', leadId)
  } catch (dbErr) {
    leadId = `backup_timeout_${Date.now()}`
    console.error('[contact] Banco indisponível — usando ID de fallback:', leadId, dbErr)
  }

  // ── 4. Resposta imediata ao cliente ───────────────────

  const response = NextResponse.json({ success: true, leadId }, { status: 200 })

  // ── 5. Integrações em background (fire-and-forget) ────
  //  Executadas em paralelo após a resposta ao cliente.
  //  Falha em qualquer uma não afeta as demais.

  void Promise.all([
    sendMetaCAPI({
      leadId,
      name:     input.name,
      email:    input.email,
      whatsapp: input.whatsapp,
      ip,
      userAgent,
      fbc,
      fbp,
      eventSourceUrl,
    }).catch((err) => console.error('[contact] Erro CAPI background:', err)),

    sendGA4Lead({
      leadId,
      gaCookie,
      ip,
      userAgent,
      eventSourceUrl,
    }).catch((err) => console.error('[contact] Erro GA4 background:', err)),
  ])

  return response
}
