'use client'

// ─────────────────────────────────────────────────────────
//  /obrigado — Página de confirmação de lead
//
//  Dispara conversões client-side ao carregar:
//   • Meta Pixel   → fbq('track', 'Lead')  com eventID = leadId
//                    (deduplicação com o CAPI server-side)
//   • GA4 gtag     → gtag('event', 'generate_lead')
//                    (complementa o Measurement Protocol server-side)
// ─────────────────────────────────────────────────────────

import { Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

// Tipagem global para fbq, gtag e dataLayer (injetados pelo layout / GTM)
declare global {
  interface Window {
    fbq?:       (...args: unknown[]) => void
    gtag?:      (...args: unknown[]) => void
    dataLayer?: Record<string, unknown>[]
  }
}

// ─── Componente que lê searchParams e dispara os eventos ─
// Isolado em Suspense para compatibilidade com static rendering do Next.js

function ConversionEvents() {
  const params = useSearchParams()
  const leadId = params.get('id') ?? undefined

  useEffect(() => {
    // ── Meta Pixel: Lead ──────────────────────────────
    // eventID deve coincidir com o event_id enviado no CAPI
    // para que a Meta faça a deduplicação corretamente.
    if (typeof window.fbq === 'function') {
      window.fbq(
        'track',
        'Lead',
        { content_name: 'Lead BilderAI', value: 0, currency: 'BRL' },
        { eventID: leadId },
      )
    }

    // ── GA4: generate_lead ────────────────────────────
    // Método primário: dataLayer.push() — compatível com GTM.
    // O GTM precisa ter um trigger de Custom Event "generate_lead"
    // apontando para uma tag GA4 Event.
    window.dataLayer = window.dataLayer ?? []
    window.dataLayer.push({
      event:       'generate_lead',
      currency:    'BRL',
      value:       0,
      lead_source: 'landing_page',
      form_name:   'Lead BilderAI',
    })

    // Fallback: gtag() direto (caso GA4 esteja carregado fora do GTM)
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', {
        currency:    'BRL',
        value:       0,
        lead_source: 'landing_page',
        form_name:   'Lead BilderAI',
      })
    }
  }, [leadId])

  return null
}

// ─── Página principal ────────────────────────────────────

export default function Obrigado() {
  return (
    <>
      {/* Disparo de conversões (requer Suspense por usar useSearchParams) */}
      <Suspense fallback={null}>
        <ConversionEvents />
      </Suspense>

      {/* NAV mínimo */}
      <nav>
        <Link href="/" className="nav-logo">
          Bilder<span>AI</span>
        </Link>
      </nav>

      {/* Conteúdo */}
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '120px 40px 80px',
          background: 'var(--bg)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow de fundo */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(0,230,118,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            maxWidth: '560px',
            width: '100%',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div style={{ fontSize: '3.5rem', marginBottom: '24px' }}>🎉</div>

          <div
            className="hero-badge"
            style={{ margin: '0 auto 24px', display: 'inline-flex' }}
          >
            // lead recebido com sucesso
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: 'var(--text)',
              marginBottom: '20px',
            }}
          >
            Obrigado! Nossa equipe<br />vai entrar em contato.
          </h1>

          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--muted)',
              lineHeight: 1.7,
              marginBottom: '40px',
              maxWidth: '440px',
              margin: '0 auto 40px',
            }}
          >
            Em breve você receberá uma mensagem no WhatsApp com os próximos passos para
            configurar o seu agente de IA.
          </p>

          <Link href="/" className="btn-secondary">
            ← Voltar para o início
          </Link>

          <div
            style={{
              marginTop: '40px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--muted)',
              letterSpacing: '0.03em',
            }}
          >
            ✓ Garantia no primeiro mês &nbsp;·&nbsp; ✓ Sem contrato &nbsp;·&nbsp; ✓ Ativa em 7 dias úteis
          </div>
        </div>
      </div>
    </>
  )
}
