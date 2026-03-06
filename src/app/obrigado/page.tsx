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

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

// Tipagem global para fbq, gtag e dataLayer (injetados pelo layout / GTM)
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
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
    if (typeof window.fbq === 'function') {
      window.fbq(
        'track',
        'Lead',
        { content_name: 'Lead BilderAI', value: 0, currency: 'BRL' },
        { eventID: leadId },
      )
    }

    // ── GA4: generate_lead (Browser Layout/GTM) ───────
    window.dataLayer = window.dataLayer ?? []
    window.dataLayer.push({
      event: 'generate_lead',
      currency: 'BRL',
      value: 0,
      lead_source: 'landing_page',
      form_name: 'Lead BilderAI',
    })

    // ── GA4: Custom Conversion via API (Server-Side) ──
    const trackServerSide = async () => {
      try {
        // Tenta extrair o ClientID do cookie _ga
        const gaCookie = document.cookie
          .split('; ')
          .find((row) => row.startsWith('_ga='))
          ?.split('=')[1]

        if (gaCookie) {
          // Extrai o ClientId puro (GA1.X.XXXXXXXXXX.XXXXXXXXXX -> XXXXXXXXXX.XXXXXXXXXX)
          const parts = gaCookie.split('.')
          const clientId = parts.length >= 4 ? `${parts[2]}.${parts[3]}` : gaCookie

          await fetch('/api/tracking/ga4', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              clientId,
              eventName: 'obrigado_page_view',
              params: {
                lead_id: leadId,
                page_path: window.location.pathname,
              }
            }),
          })
        }
      } catch (err) {
        console.error('[GA4 API] Erro ao disparar conversão:', err)
      }
    }

    trackServerSide()
  }, [leadId])

  return null
}

// ─── Página principal ────────────────────────────────────

export default function Obrigado() {
  const [seconds, setSeconds] = useState(20)

  useEffect(() => {
    const waUrl = 'https://wa.me/541164067625?text=Ol%C3%A1%20cheguei%20do%20site'
    if (seconds <= 0) {
      window.location.href = waUrl
      return
    }

    const timer = setInterval(() => {
      setSeconds(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [seconds])

  return (
    <>
      {/* ── Conversões de Marketing (Suspense isola uso de searchParams) ── */}
      <Suspense fallback={null}>
        <ConversionEvents />
      </Suspense>

      {/* ── CSS do Layout (Escopado ou Injetado Globalmente para esta página) ── */}
      <style dangerouslySetInnerHTML={{
        __html: `
        :root {
          --bg-obrigado: #080b0f;
          --green-obrigado: #00e676;
          --green-dim-obrigado: rgba(0,230,118,0.08);
          --text-obrigado: #e8edf2;
          --muted-obrigado: #6b7a8d;
          --muted2-obrigado: #9aa5b4;
        }

        .obrigado-page {
          background: var(--bg-obrigado);
          color: var(--text-obrigado);
          font-family: var(--font-body);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        /* Grid background */
        .obrigado-page::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,230,118,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,230,118,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }

        /* Glow radial */
        .obrigado-page::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -60%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(0,230,118,0.07) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .ob-container {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 40px 24px;
          max-width: 600px;
          width: 100%;
          animation: fadeInUp 0.7s ease both;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ob-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--green-obrigado);
          background: var(--green-dim-obrigado);
          border: 1px solid rgba(0,230,118,0.2);
          padding: 7px 18px;
          border-radius: 100px;
          margin-bottom: 36px;
          letter-spacing: 0.03em;
        }

        .ob-badge-dot {
          width: 7px; height: 7px;
          background: var(--green-obrigado);
          border-radius: 50%;
          animation: ob-pulse 2s infinite;
        }

        @keyframes ob-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.8); }
        }

        .ob-emoji {
          font-size: 3.5rem;
          display: block;
          margin-bottom: 28px;
          animation: ob-bounce 1s ease 0.5s both;
        }

        @keyframes ob-bounce {
          0%   { transform: scale(0.5); opacity: 0; }
          70%  { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }

        .ob-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 7vw, 3.2rem);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 20px;
          color: var(--text-obrigado);
        }

        .ob-title span { color: var(--green-obrigado); }

        .ob-subtitle {
          font-size: 1.05rem;
          color: var(--muted2-obrigado);
          line-height: 1.7;
          margin-bottom: 48px;
          max-width: 480px;
          margin-left: auto;
          margin-right: auto;
        }

        .ob-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: var(--green-obrigado);
          color: #000;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1rem;
          padding: 16px 36px;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s;
          box-shadow: 0 0 40px rgba(0,230,118,0.25);
          margin-bottom: 20px;
        }

        .ob-btn-primary:hover {
          background: #fff;
          box-shadow: 0 0 60px rgba(0,230,118,0.35);
          transform: translateY(-2px);
        }

        .ob-countdown-wrap {
          margin-top: 8px;
          margin-bottom: 40px;
        }

        .ob-countdown-text {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--muted-obrigado);
          letter-spacing: 0.02em;
        }

        .ob-countdown-text strong {
          color: var(--green-obrigado);
          font-weight: 700;
        }

        .ob-progress-bar {
          width: 260px;
          height: 3px;
          background: rgba(255,255,255,0.06);
          border-radius: 100px;
          margin: 10px auto 0;
          overflow: hidden;
        }

        .ob-progress-fill {
          height: 100%;
          background: var(--green-obrigado);
          border-radius: 100px;
          width: 100%;
          transform-origin: left;
          animation: ob-shrink 20s linear forwards;
        }

        @keyframes ob-shrink {
          from { transform: scaleX(1); }
          to   { transform: scaleX(0); }
        }

        .ob-back-link {
          display: inline-block;
          color: var(--muted-obrigado);
          font-size: 0.875rem;
          text-decoration: none;
          transition: color 0.2s;
          margin-bottom: 48px;
        }

        .ob-back-link:hover { color: var(--text-obrigado); }

        .ob-guarantees {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--muted-obrigado);
          letter-spacing: 0.05em;
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .ob-guarantees span { color: var(--green-obrigado); }

        @media (max-width: 480px) {
          .ob-btn-primary { width: 100%; }
          .ob-guarantees { gap: 12px; font-size: 0.68rem; }
        }
      `}} />

      {/* ── Conteúdo da Página ── */}
      <div className="obrigado-page">
        <div className="ob-container">
          <div className="ob-badge">
            <div className="ob-badge-dot"></div>
            // contato recebido com sucesso
          </div>

          <span className="ob-emoji">🚀</span>

          <h1 className="ob-title">
            Seu agente está<br />
            <span>quase pronto.</span>
          </h1>

          <p className="ob-subtitle">
            Nossa equipe já recebeu seus dados e vai entrar em contato em instantes.
            Enquanto isso, experimente agora como é conversar com um agente de IA de verdade.
          </p>

          <a href="https://wa.me/541164067625?text=Ol%C3%A1%20cheguei%20do%20site" target="_blank" rel="noopener noreferrer" className="ob-btn-primary">
            <span>🤖</span> Testar agente agora
          </a>

          <div className="ob-countdown-wrap">
            <p className="ob-countdown-text">
              Redirecionando em <strong>{seconds}</strong> segundos...
            </p>
            <div className="ob-progress-bar">
              <div className="ob-progress-fill"></div>
            </div>
          </div>

          <Link href="/" className="ob-back-link">
            ← Voltar para o início
          </Link>

          <div className="ob-guarantees">
            <div><span>✓</span> Garantia no primeiro mês</div>
            <div><span>✓</span> Sem contrato</div>
            <div><span>✓</span> Ativo em 7 dias úteis</div>
          </div>
        </div>
      </div>
    </>
  )
}
