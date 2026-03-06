'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function ComparativoCusto() {
  const whatsappUrl = 'https://wa.me/541164067625?text=Ol%C3%A1%20vim%20pelo%20comparativo%20de%20custos'

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #080b0f; --bg2: #0d1117; --surface: #111820; --surface2: #161e28;
          --border: rgba(255,255,255,0.07); --border2: rgba(255,255,255,0.12);
          --green: #00e676; --green2: #00c853; --green-dim: rgba(0,230,118,0.08);
          --green-glow: rgba(0,230,118,0.15); --red: #ff4444; --red-dim: rgba(255,68,68,0.1);
          --cyan: #18ffff; --text: #e8edf2; --muted: #6b7a8d; --muted2: #9aa5b4;
          --font-display: 'Syne', sans-serif; --font-mono: 'JetBrains Mono', monospace;
          --font-body: 'Instrument Sans', sans-serif;
        }
        html { scroll-behavior: smooth; }
        .lp-custo { background: var(--bg); color: var(--text); font-family: var(--font-body); overflow-x: hidden; -webkit-font-smoothing: antialiased; min-height: 100vh; position: relative; }
        .lp-custo::before {
          content: ''; position: fixed; inset: 0;
          background-image: linear-gradient(rgba(0,230,118,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,230,118,0.025) 1px, transparent 1px);
          background-size: 60px 60px; pointer-events: none; z-index: 0;
        }
        .lp-custo nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 18px 40px; display: flex; align-items: center; justify-content: space-between;
          background: rgba(8,11,15,0.85); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border);
        }
        .nav-logo { font-family: var(--font-display); font-weight: 800; font-size: 1.25rem; color: var(--text); letter-spacing: -0.02em; }
        .nav-logo span { color: var(--green); }
        .nav-links { display: flex; gap: 32px; list-style: none; }
        .nav-links a { color: var(--muted2); text-decoration: none; font-size: 0.88rem; font-weight: 500; transition: color 0.2s; }
        .nav-links a:hover { color: var(--text); }
        .nav-cta { background: var(--green); color: #000; padding: 10px 22px; border-radius: 6px; font-weight: 700; font-size: 0.875rem; text-decoration: none; transition: all 0.2s; }
        .nav-cta:hover { background: #fff; }
        .hero { min-height: 100vh; padding: 120px 40px 80px; display: flex; align-items: center; position: relative; }
        .hero-glow { position: absolute; width: 600px; height: 600px; background: radial-gradient(circle, rgba(0,230,118,0.1) 0%, transparent 70%); top: 10%; left: -8%; pointer-events: none; }
        .hero-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; position: relative; z-index: 1; width: 100%; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: var(--green-dim); border: 1px solid rgba(0,230,118,0.2); padding: 6px 14px; border-radius: 100px; font-family: var(--font-mono); font-size: 0.72rem; color: var(--green); margin-bottom: 28px; }
        .badge-dot { width: 6px; height: 6px; background: var(--green); border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
        .hero-title { font-family: var(--font-display); font-size: clamp(2.4rem, 4vw, 3.8rem); font-weight: 800; line-height: 1.08; letter-spacing: -0.03em; margin-bottom: 24px; }
        .hero-title .accent { color: var(--green); }
        .hero-title .strike { color: var(--red); text-decoration: line-through; text-decoration-color: rgba(255,68,68,0.5); }
        .hero-sub { font-size: 1rem; color: var(--muted2); line-height: 1.7; margin-bottom: 36px; max-width: 480px; }
        .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 40px; }
        .btn-primary { background: var(--green); color: #000; padding: 14px 28px; border-radius: 8px; font-weight: 700; font-size: 0.95rem; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s; font-family: var(--font-display); box-shadow: 0 0 30px rgba(0,230,118,0.25); }
        .btn-primary:hover { background: #fff; transform: translateY(-1px); }
        .btn-secondary { color: var(--muted2); padding: 14px 20px; font-size: 0.9rem; text-decoration: none; transition: color 0.2s; }
        .btn-secondary:hover { color: var(--text); }
        .cost-calc { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 28px; position: relative; overflow: hidden; }
        .cost-calc::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--red), transparent 50%, var(--green)); }
        .calc-label { font-family: var(--font-mono); font-size: 0.68rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 20px; }
        .calc-rows { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
        .calc-row { display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; }
        .calc-row .label { color: var(--muted2); }
        .calc-row .value { font-family: var(--font-mono); color: var(--red); font-size: 0.82rem; }
        .calc-divider { height: 1px; background: var(--border); margin: 16px 0; }
        .calc-total { display: flex; justify-content: space-between; align-items: center; }
        .calc-total .label { font-weight: 700; font-family: var(--font-display); font-size: 0.95rem; }
        .calc-total .value { font-family: var(--font-mono); font-size: 1.4rem; font-weight: 700; color: var(--red); }
        .calc-footnote { font-size: 0.73rem; color: var(--muted); margin-top: 10px; line-height: 1.5; }
        .calc-vs { display: flex; align-items: center; gap: 12px; margin-top: 18px; padding: 14px 16px; background: var(--green-dim); border: 1px solid rgba(0,230,118,0.2); border-radius: 10px; }
        .calc-vs .icon { font-size: 1.4rem; }
        .calc-vs .text { font-size: 0.82rem; color: var(--muted2); line-height: 1.4; }
        .calc-vs .text strong { color: var(--green); display: block; font-size: 0.9rem; margin-bottom: 2px; }
        .logos-bar { padding: 18px 40px; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); background: rgba(255,255,255,0.015); position: relative; z-index: 1; }
        .logos-inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
        .logos-label { font-family: var(--font-mono); font-size: 0.68rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; white-space: nowrap; }
        .logos-list { display: flex; gap: 10px; flex-wrap: wrap; }
        .logo-tag { font-size: 0.8rem; color: var(--muted2); background: var(--surface); border: 1px solid var(--border); padding: 5px 12px; border-radius: 100px; }
        .container { max-width: 1200px; margin: 0 auto; }
        .section-label { font-family: var(--font-mono); font-size: 0.72rem; color: var(--green); text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 16px; }
        .section-title { font-family: var(--font-display); font-size: clamp(1.9rem, 3.2vw, 2.7rem); font-weight: 800; line-height: 1.15; letter-spacing: -0.02em; margin-bottom: 20px; }
        .section-sub { font-size: 1rem; color: var(--muted2); line-height: 1.65; max-width: 560px; }
        .problem { padding: 100px 40px; position: relative; z-index: 1; }
        .problem-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .problem-list { list-style: none; margin-top: 32px; display: flex; flex-direction: column; gap: 20px; }
        .problem-item { display: flex; gap: 16px; align-items: flex-start; }
        .problem-icon { font-size: 1.4rem; flex-shrink: 0; }
        .problem-text strong { display: block; font-weight: 600; font-size: 0.93rem; margin-bottom: 4px; }
        .problem-text span { font-size: 0.84rem; color: var(--muted2); line-height: 1.5; }
        .speed-proof { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; }
        .speed-header { padding: 18px 22px; background: var(--surface2); border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
        .speed-header h4 { font-family: var(--font-display); font-size: 0.88rem; font-weight: 700; }
        .speed-tag { font-family: var(--font-mono); font-size: 0.66rem; background: var(--green-dim); color: var(--green); padding: 3px 8px; border-radius: 4px; }
        .speed-row { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid var(--border); }
        .speed-row:last-child { border-bottom: none; }
        .speed-cell { padding: 13px 18px; font-size: 0.82rem; display: flex; align-items: center; gap: 8px; }
        .speed-cell:first-child { border-right: 1px solid var(--border); color: var(--muted2); }
        .speed-cell.bad { color: var(--red); }
        .speed-cell.good { color: var(--green); }
        .speed-highlight { padding: 16px 20px; background: var(--green-dim); border-top: 1px solid rgba(0,230,118,0.12); }
        .chatbot-vs { padding: 100px 40px; background: var(--bg2); position: relative; z-index: 1; }
        .vs-header { text-align: center; margin-bottom: 60px; }
        .vs-header .section-sub { margin: 0 auto; text-align: center; }
        .vs-grid { display: grid; grid-template-columns: 1fr auto 1fr; gap: 0; max-width: 900px; margin: 0 auto; }
        .vs-col-bad { background: #0d0909; border: 1px solid rgba(255,68,68,0.18); border-radius: 16px 0 0 16px; overflow: hidden; }
        .vs-col-good { background: #07100a; border: 1px solid rgba(0,230,118,0.22); border-radius: 0 16px 16px 0; overflow: hidden; box-shadow: 0 0 40px rgba(0,230,118,0.05); }
        .vs-hd-bad { background: rgba(255,68,68,0.07); border-bottom: 1px solid rgba(255,68,68,0.1); padding: 22px 24px; text-align: center; }
        .vs-hd-good { background: rgba(0,230,118,0.05); border-bottom: 1px solid rgba(0,230,118,0.1); padding: 22px 24px; text-align: center; }
        .vs-col-title { font-family: var(--font-display); font-weight: 800; font-size: 1rem; margin: 6px 0 3px; }
        .vs-col-sub { font-family: var(--font-mono); font-size: 0.66rem; opacity: 0.55; }
        .vs-row { padding: 13px 18px; border-bottom: 1px solid rgba(255,255,255,0.035); display: flex; gap: 10px; align-items: flex-start; }
        .vs-row:last-child { border-bottom: none; }
        .vs-x { color: var(--red); flex-shrink: 0; font-size: 0.78rem; margin-top: 3px; }
        .vs-check { color: var(--green); flex-shrink: 0; font-size: 0.78rem; margin-top: 3px; }
        .vs-text strong { display: block; font-size: 0.82rem; margin-bottom: 2px; }
        .vs-text span { font-size: 0.73rem; color: var(--muted); }
        .vs-sep { display: flex; align-items: center; justify-content: center; padding: 0 14px; }
        .vs-sep-label { font-family: var(--font-display); font-size: 0.95rem; font-weight: 800; color: var(--muted); writing-mode: vertical-rl; letter-spacing: 0.1em; }
        .vs-cta { text-align: center; margin-top: 48px; }
        .how { padding: 100px 40px; position: relative; z-index: 1; }
        .how-header { text-align: center; margin-bottom: 60px; }
        .how-header .section-sub { margin: 0 auto; text-align: center; }
        .steps { display: grid; grid-template-columns: repeat(4,1fr); gap: 40px; position: relative; }
        .steps::before { content: ''; position: absolute; top: 24px; left: calc(12.5% + 18px); right: calc(12.5% + 18px); height: 1px; background: linear-gradient(90deg, var(--green), rgba(0,230,118,0.15)); }
        .step-num { font-family: var(--font-mono); font-size: 0.72rem; color: var(--green); background: var(--green-dim); border: 1px solid rgba(0,230,118,0.25); width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 18px; position: relative; z-index: 1; }
        .step-title { font-family: var(--font-display); font-weight: 700; font-size: 0.97rem; margin-bottom: 10px; }
        .step-desc { font-size: 0.84rem; color: var(--muted2); line-height: 1.6; }
        .features { padding: 100px 40px; background: var(--bg2); position: relative; z-index: 1; }
        .features-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 18px; margin-top: 44px; }
        .feature-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 26px; position: relative; overflow: hidden; transition: all 0.3s; }
        .feature-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, var(--green), transparent); opacity: 0; transition: opacity 0.3s; }
        .feature-card:hover { border-color: rgba(0,230,118,0.2); transform: translateY(-3px); }
        .feature-card:hover::before { opacity: 1; }
        .feature-icon { font-size: 1.8rem; margin-bottom: 14px; display: block; }
        .feature-title { font-family: var(--font-display); font-size: 1rem; font-weight: 700; margin-bottom: 9px; }
        .feature-desc { font-size: 0.85rem; color: var(--muted2); line-height: 1.65; }
        .feature-tag { display: inline-block; margin-top: 12px; font-family: var(--font-mono); font-size: 0.68rem; color: var(--green); background: var(--green-dim); padding: 4px 10px; border-radius: 4px; }
        .feature-card.wide { grid-column: span 2; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
        .niches { padding: 100px 40px; position: relative; z-index: 1; }
        .niches-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 44px; }
        .niches-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 18px; }
        .niche-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 26px; transition: all 0.3s; position: relative; overflow: hidden; }
        .niche-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--green), var(--cyan)); transform: scaleX(0); transform-origin: left; transition: transform 0.3s; }
        .niche-card:hover { border-color: rgba(0,230,118,0.2); transform: translateY(-3px); }
        .niche-card:hover::after { transform: scaleX(1); }
        .niche-emoji { font-size: 1.7rem; margin-bottom: 12px; display: block; }
        .niche-name { font-family: var(--font-display); font-weight: 700; font-size: 0.97rem; margin-bottom: 7px; }
        .niche-desc { font-size: 0.82rem; color: var(--muted2); line-height: 1.5; }
        .niche-result { margin-top: 12px; font-family: var(--font-mono); font-size: 0.7rem; color: var(--green); background: var(--green-dim); padding: 4px 10px; border-radius: 4px; display: inline-block; }
        .proof { padding: 100px 40px; background: var(--bg2); position: relative; z-index: 1; }
        .proof-header { text-align: center; margin-bottom: 56px; }
        .testimonials { display: grid; grid-template-columns: repeat(3,1fr); gap: 22px; }
        .testimonial { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 26px; transition: all 0.3s; }
        .testimonial:hover { border-color: rgba(0,230,118,0.15); transform: translateY(-2px); }
        .testimonial-stars { color: var(--green); font-size: 0.88rem; letter-spacing: 2px; margin-bottom: 14px; }
        .testimonial-text { font-size: 0.88rem; color: var(--muted2); line-height: 1.7; font-style: italic; margin-bottom: 22px; }
        .testimonial-author { display: flex; align-items: center; gap: 12px; }
        .author-avatar { width: 38px; height: 38px; background: linear-gradient(135deg, var(--green-dim), var(--surface2)); border: 1px solid var(--border2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1rem; }
        .author-name { font-weight: 600; font-size: 0.86rem; }
        .author-role { font-size: 0.74rem; color: var(--muted); }
        .faq { padding: 100px 40px; position: relative; z-index: 1; }
        .faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 56px; }
        .faq-item { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 26px; transition: all 0.3s; }
        .faq-item:hover { border-color: rgba(0,230,118,0.2); }
        .faq-q { font-family: var(--font-display); font-weight: 700; font-size: 0.92rem; margin-bottom: 10px; }
        .faq-a { font-size: 0.85rem; color: var(--muted2); line-height: 1.65; }
        .cta-final { padding: 120px 40px; text-align: center; position: relative; overflow: hidden; z-index: 1; }
        .cta-glow { position: absolute; width: 800px; height: 400px; background: radial-gradient(ellipse, rgba(0,230,118,0.09) 0%, transparent 70%); top: 50%; left: 50%; transform: translate(-50%,-50%); pointer-events: none; }
        .cta-terminal { font-family: var(--font-mono); font-size: 0.72rem; color: var(--green); background: var(--green-dim); border: 1px solid rgba(0,230,118,0.2); display: inline-block; padding: 7px 16px; border-radius: 6px; margin-bottom: 30px; }
        .cta-title { font-family: var(--font-display); font-size: clamp(2rem, 3.8vw, 3.2rem); font-weight: 800; line-height: 1.12; letter-spacing: -0.03em; margin-bottom: 18px; position: relative; }
        .cta-sub { font-size: 1rem; color: var(--muted2); margin-bottom: 36px; max-width: 500px; margin-left: auto; margin-right: auto; line-height: 1.65; }
        .cta-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-bottom: 18px; }
        .cta-guarantee { font-size: 0.8rem; color: var(--muted); }
        .cta-guarantee span { color: var(--green); margin-right: 4px; }
        .lp-custo footer { padding: 30px 40px; border-top: 1px solid var(--border); position: relative; z-index: 1; }
        .footer-inner { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
        .footer-copy { font-size: 0.78rem; color: var(--muted); }
        .footer-links { display: flex; gap: 22px; }
        .footer-links a { font-size: 0.78rem; color: var(--muted); text-decoration: none; transition: color 0.2s; }
        .footer-links a:hover { color: var(--text); }
        @media (max-width: 900px) {
          .lp-custo nav { padding: 16px 20px; }
          .nav-links { display: none; }
          .hero { padding: 100px 20px 60px; }
          .hero-inner { grid-template-columns: 1fr; gap: 44px; }
          .problem { padding: 60px 20px; }
          .problem-grid { grid-template-columns: 1fr; gap: 40px; }
          .chatbot-vs { padding: 60px 20px; }
          .vs-grid { grid-template-columns: 1fr; gap: 14px; }
          .vs-col-bad,.vs-col-good { border-radius: 16px; }
          .vs-sep { padding: 4px 0; }
          .vs-sep-label { writing-mode: horizontal-tb; }
          .how { padding: 60px 20px; }
          .steps { grid-template-columns: 1fr 1fr; }
          .steps::before { display: none; }
          .features { padding: 60px 20px; }
          .features-grid { grid-template-columns: 1fr; }
          .feature-card.wide { grid-column: span 1; grid-template-columns: 1fr; }
          .niches { padding: 60px 20px; }
          .niches-header { flex-direction: column; gap: 10px; }
          .niches-grid { grid-template-columns: 1fr 1fr; }
          .proof { padding: 60px 20px; }
          .testimonials { grid-template-columns: 1fr; }
          .faq { padding: 60px 20px; }
          .faq-grid { grid-template-columns: 1fr; }
          .cta-final { padding: 80px 20px; }
          .lp-custo footer { padding: 22px 20px; }
          .footer-inner { flex-direction: column; gap: 14px; text-align: center; }
          .logos-bar { padding: 14px 20px; }
        }
        @media (max-width: 480px) {
          .niches-grid,.steps { grid-template-columns: 1fr; }
          .hero-actions { flex-direction: column; }
          .btn-primary { width: 100%; justify-content: center; }
        }
      ` }} />

      <div className="lp-custo">
        <nav>
          <div className="nav-logo">Agente<span>24h</span></div>
          <ul className="nav-links">
            <li><a href="#custo">O custo real</a></li>
            <li><a href="#como-funciona">Como funciona</a></li>
            <li><a href="#nichos">Nichos</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="nav-cta">Falar Agora →</a>
        </nav>

        <section className="hero">
          <div className="hero-glow"></div>
          <div className="hero-inner">
            <div>
              <div className="hero-badge"><span className="badge-dot"></span>Agente ativo 24h · Respondendo agora</div>
              <h1 className="hero-title">
                Você paga <span className="strike">R$4.000</span><br />
                por mês<br />
                <span className="accent">para perder clientes</span><br />
                toda noite.
              </h1>
              <p className="hero-sub">Seu atendente trabalha 8h por dia, tira férias, pede demissão. O lead que chega às 23h fica sem resposta — e compra do concorrente. Existe uma alternativa que custa menos e nunca dorme.</p>
              <div className="hero-actions">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary"><span>💬</span> Quero substituir esse custo</a>
                <a href="#custo" className="btn-secondary">Ver o cálculo completo ↓</a>
              </div>
            </div>
            <div className="cost-calc" id="custo">
              <div className="calc-label">// custo real de um atendente CLT</div>
              <div className="calc-rows">
                <div className="calc-row"><span className="label">Salário base</span><span className="value">R$ 2.200</span></div>
                <div className="calc-row"><span className="label">FGTS (8%)</span><span className="value">+ R$ 176</span></div>
                <div className="calc-row"><span className="label">INSS patronal (20%)</span><span className="value">+ R$ 440</span></div>
                <div className="calc-row"><span className="label">Férias + 1/3</span><span className="value">+ R$ 244</span></div>
                <div className="calc-row"><span className="label">13º salário</span><span className="value">+ R$ 183</span></div>
                <div className="calc-row"><span className="label">VT + VA</span><span className="value">+ R$ 450</span></div>
              </div>
              <div className="calc-divider"></div>
              <div className="calc-total">
                <span className="label">Custo real por mês</span>
                <span className="value">R$ 3.693</span>
              </div>
              <p className="calc-footnote">Trabalha 8h/dia · falta · tira férias · pode pedir demissão amanhã</p>
              <div className="calc-vs">
                <span className="icon">🤖</span>
                <div className="text"><strong>Agente de IA: custo menor</strong>24h por dia · 365 dias · zero encargo · zero rescisão</div>
              </div>
            </div>
          </div>
        </section>

        <div className="logos-bar">
          <div className="logos-inner">
            <span className="logos-label">Funciona para</span>
            <div className="logos-list">
              <span className="logo-tag">🏥 Clínicas</span><span className="logo-tag">💪 Academias</span>
              <span className="logo-tag">🏠 Imobiliárias</span><span className="logo-tag">🎓 Infoprodutores</span>
              <span className="logo-tag">🍕 Restaurantes</span><span className="logo-tag">⚖️ Escritórios</span>
            </div>
          </div>
        </div>

        <section className="problem">
          <div className="container">
            <div className="problem-grid">
              <div>
                <div className="section-label">// o problema de velocidade</div>
                <h2 className="section-title">O primeiro que responde<br />é quem vende.</h2>
                <p className="section-sub">78% dos leads compram da primeira empresa que responde. Não a mais barata. Não a mais qualificada. A primeira. Cada hora de atraso reduz em 7x a chance de fechar.</p>
                <ul className="problem-list">
                  <li className="problem-item">
                    <span className="problem-icon">😴</span>
                    <div className="problem-text">
                      <strong>Lead às 23h, resposta de manhã</strong>
                      <span>Ele não esperou. Mandou mensagem para mais 3 concorrentes e fechou com quem respondeu primeiro.</span>
                    </div>
                  </li>
                  <li className="problem-item">
                    <span className="problem-icon">📱</span>
                    <div className="problem-text">
                      <strong>Domingo, feriado, férias do atendente</strong>
                      <span>Seu anúncio roda 24/7. Seu atendimento não. Você paga para trazer o lead num momento que não consegue atender.</span>
                    </div>
                  </li>
                  <li className="problem-item">
                    <span className="problem-icon">💸</span>
                    <div className="problem-text">
                      <strong>CPL subindo, conversão estagnada</strong>
                      <span>Você aumentou a verba, trouxe mais contatos e a taxa de conversão continua igual. O gargalo não está no anúncio.</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="speed-proof">
                <div className="speed-header">
                  <h4>Tempo de resposta vs conversão</h4>
                  <span className="speed-tag">dado real</span>
                </div>
                <div className="speed-row"><div className="speed-cell bad">● Responde em 1h</div><div className="speed-cell bad">7x menos conversão</div></div>
                <div className="speed-row"><div className="speed-cell bad">● Responde em 30min</div><div className="speed-cell bad">5x menos conversão</div></div>
                <div className="speed-row"><div className="speed-cell" style={{ color: 'var(--muted2)' }}>● Responde em 5min</div><div className="speed-cell" style={{ color: 'var(--muted2)' }}>Chance razoável</div></div>
                <div className="speed-row"><div className="speed-cell good">● Responde em &lt;30s</div><div className="speed-cell good">Máxima conversão</div></div>
                <div className="speed-highlight">
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--green)', marginBottom: '4px' }}>agente24h · tempo médio</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--green)' }}>2 segundos</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--muted2)', marginTop: '3px' }}>qualquer horário · qualquer dia</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="chatbot-vs">
          <div className="container">
            <div className="vs-header">
              <div className="section-label">// não é chatbot</div>
              <h2 className="section-title">Já tentou chatbot e não funcionou?<br />É porque são coisas completamente diferentes.</h2>
              <p className="section-sub">Chatbot executa regras fixas. Agente de IA entende contexto, adapta a linguagem e conduz a conversa até a conversão.</p>
            </div>
            <div className="vs-grid">
              <div className="vs-col-bad">
                <div className="vs-hd-bad">
                  <div style={{ fontSize: '1.8rem' }}>🤖</div>
                  <div className="vs-col-title" style={{ color: '#ff6b6b' }}>Chatbot Tradicional</div>
                  <div className="vs-col-sub" style={{ color: '#ff6b6b' }}>fluxo fixo · sem inteligência</div>
                </div>
                <div className="vs-row"><span className="vs-x">✕</span><div className="vs-text"><strong>Responde só o que foi programado</strong><span>Pergunta fora do script = cliente perdido</span></div></div>
                <div className="vs-row"><span className="vs-x">✕</span><div className="vs-text"><strong>Menu de botões e opções fixas</strong><span>Experiência robótica e impessoal</span></div></div>
                <div className="vs-row"><span className="vs-x">✕</span><div className="vs-text"><strong>Não qualifica nem converte</strong><span>Só informa, não vende</span></div></div>
                <div className="vs-row"><span className="vs-x">✕</span><div className="vs-text"><strong>Esquece tudo entre mensagens</strong><span>Cada resposta começa do zero</span></div></div>
                <div className="vs-row"><span className="vs-x">✕</span><div className="vs-text"><strong>Trava em perguntas abertas</strong><span>"Não entendi. Digite 1 para..."</span></div></div>
                <div className="vs-row"><span className="vs-x">✕</span><div className="vs-text"><strong>Exige programação para mudar</strong><span>Qualquer ajuste custa horas de desenvolvimento</span></div></div>
              </div>
              <div className="vs-sep"><span className="vs-sep-label">VS</span></div>
              <div className="vs-col-good">
                <div className="vs-hd-good">
                  <div style={{ fontSize: '1.8rem' }}>🧠</div>
                  <div className="vs-col-title" style={{ color: 'var(--green)' }}>Agente de IA</div>
                  <div className="vs-col-sub" style={{ color: 'var(--green)' }}>inteligência real · conversação natural</div>
                </div>
                <div className="vs-row"><span className="vs-check">✓</span><div className="vs-text"><strong>Responde qualquer pergunta naturalmente</strong><span>Treinado com todo o conteúdo do seu negócio</span></div></div>
                <div className="vs-row"><span className="vs-check">✓</span><div className="vs-text"><strong>Conversa fluida como humano</strong><span>Clientes não percebem que é IA</span></div></div>
                <div className="vs-row"><span className="vs-check">✓</span><div className="vs-text"><strong>Qualifica, vende e agenda</strong><span>Leva o atendimento até a conversão</span></div></div>
                <div className="vs-row"><span className="vs-check">✓</span><div className="vs-text"><strong>Mantém contexto durante toda a conversa</strong><span>Lembra do que foi dito anteriormente</span></div></div>
                <div className="vs-row"><span className="vs-check">✓</span><div className="vs-text"><strong>Adapta o tom para cada pessoa</strong><span>Mais formal ou descontraído conforme o caso</span></div></div>
                <div className="vs-row"><span className="vs-check">✓</span><div className="vs-text"><strong>Atualiza em texto, sem programação</strong><span>Mudou o preço? Atualiza em minutos</span></div></div>
              </div>
            </div>
            <div className="vs-cta"><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">🧠 Quero um agente, não um chatbot</a></div>
          </div>
        </section>

        <section className="how" id="como-funciona">
          <div className="container">
            <div className="how-header">
              <div className="section-label">// implantação</div>
              <h2 className="section-title">Do zero ao agente ativo<br />em até 7 dias úteis.</h2>
              <p className="section-sub">Cada etapa tem entregável e aprovação sua. Nada vai ao ar sem você validar.</p>
            </div>
            <div className="steps">
              <div><div className="step-num">01</div><div className="step-title">Diagnóstico</div><p className="step-desc">Mapeamos seus serviços, objeções comuns, tom de voz e o fluxo ideal para converter no seu nicho.</p></div>
              <div><div className="step-num">02</div><div className="step-title">Treinamento</div><p className="step-desc">O agente é treinado com os dados do seu negócio: preços, FAQ, políticas, scripts de venda.</p></div>
              <div><div className="step-num">03</div><div className="step-title">Validação</div><p className="step-desc">Você conversa com o agente, testa cenários reais e aprova. Ajustamos quantas vezes for necessário.</p></div>
              <div><div className="step-num">04</div><div className="step-title">Ativação</div><p className="step-desc">Conectado ao seu WhatsApp e ao tráfego. Dashboard ativo. Agente operando e você no controle.</p></div>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="container">
            <div className="section-label">// o que o agente faz</div>
            <h2 className="section-title">Mais que atendimento.<br />É um vendedor que nunca sai.</h2>
            <div className="features-grid">
              <div className="feature-card"><span className="feature-icon">⚡</span><div className="feature-title">Resposta em 2 segundos</div><p className="feature-desc">A qualquer hora, em qualquer dia. Enquanto seus concorrentes dormem, seu agente está fechando o próximo cliente.</p><span className="feature-tag">tempo médio: 2s</span></div>
              <div className="feature-card"><span className="feature-icon">🎯</span><div className="feature-title">Filtra quem tem interesse real</div><p className="feature-desc">Conduz a conversa para entender intenção, urgência e capacidade de compra. Sua equipe recebe só quem está pronto para fechar.</p><span className="feature-tag">contatos qualificados</span></div>
              <div className="feature-card"><span className="feature-icon">📅</span><div className="feature-title">Agendamento automático</div><p className="feature-desc">Coleta dados, confirma horário e registra o agendamento. Tudo na conversa, sem formulário, sem link externo, sem atrito.</p><span className="feature-tag">agenda 24/7</span></div>
              <div className="feature-card"><span className="feature-icon">🧠</span><div className="feature-title">Treinado com seus dados</div><p className="feature-desc">Treinado com PDFs, links, textos e scripts do seu negócio. Não chuta, não inventa. Responde com base no que você ensinou.</p><span className="feature-tag">IA personalizada</span></div>
              <div className="feature-card wide">
                <div><span className="feature-icon">👤</span><div className="feature-title">Você controla tudo pelo dashboard</div><p className="feature-desc">Acompanhe conversas em tempo real, assuma o atendimento quando quiser. Quando necessário, o agente transfere para humano com o resumo completo. Nenhuma informação se perde.</p><span className="feature-tag">transferência inteligente</span></div>
                <div style={{ background: 'var(--surface2)', borderRadius: '12px', padding: '22px', border: '1px solid var(--border)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--green)', marginBottom: '12px' }}>→ transferindo para humano</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--muted2)', lineHeight: 1.6 }}>
                    <strong style={{ color: 'var(--text)', display: 'block', marginBottom: '7px' }}>Resumo da conversa:</strong>
                    Lead: João Silva<br />Interesse: Plano Premium<br />Objeção: Quer parcelamento<br />Temperatura: 🔥 Alta<br />
                    <span style={{ color: 'var(--green)', marginTop: '7px', display: 'block' }}>✓ Pronto para fechar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="niches" id="nichos">
          <div className="container">
            <div className="niches-header">
              <div><div className="section-label">// onde já funciona</div><h2 className="section-title">Treinado para o seu mercado.</h2></div>
              <p className="section-sub" style={{ maxWidth: '280px' }}>Cada nicho tem objeções e linguagem próprias. Não é template genérico.</p>
            </div>
            <div className="niches-grid">
              <div className="niche-card"><span className="niche-emoji">🏥</span><div className="niche-name">Clínicas e Consultórios</div><p className="niche-desc">Agenda consultas, informa convênios, responde dúvidas de procedimentos e capta dados do paciente.</p><span className="niche-result">agenda lotada 24/7</span></div>
              <div className="niche-card"><span className="niche-emoji">💪</span><div className="niche-name">Academias e Estúdios</div><p className="niche-desc">Apresenta planos, agenda avaliações, responde sobre modalidades e faz follow-up de matrículas.</p><span className="niche-result">mais matrículas</span></div>
              <div className="niche-card"><span className="niche-emoji">🏠</span><div className="niche-name">Imobiliárias</div><p className="niche-desc">Qualifica comprador vs. locatário, envia imóveis, agenda visitas e coleta dados para o corretor.</p><span className="niche-result">clientes qualificados</span></div>
              <div className="niche-card"><span className="niche-emoji">🎓</span><div className="niche-name">Infoprodutores</div><p className="niche-desc">Tira dúvidas sobre o produto, quebra objeções, envia link de compra e faz follow-up automático.</p><span className="niche-result">mais vendas</span></div>
              <div className="niche-card"><span className="niche-emoji">⚖️</span><div className="niche-name">Escritórios e Advogados</div><p className="niche-desc">Faz triagem do caso, coleta documentos necessários e agenda consulta com o advogado.</p><span className="niche-result">triagem automática</span></div>
              <div className="niche-card"><span className="niche-emoji">🍕</span><div className="niche-name">Restaurantes e Food</div><p className="niche-desc">Recebe pedidos, informa cardápio e preços, confirma reservas e responde dúvidas de entrega.</p><span className="niche-result">sem fila no WA</span></div>
            </div>
          </div>
        </section>

        <section className="proof">
          <div className="container">
            <div className="proof-header"><div className="section-label">// resultados reais</div><h2 className="section-title">Não é promessa. É o que já aconteceu.</h2></div>
            <div className="testimonials">
              <div className="testimonial"><div className="testimonial-stars">★★★★★</div><p className="testimonial-text">"Na primeira semana o agente já agendou 11 consultas fora do horário comercial. Pacientes que teriam ido para a concorrência."</p><div className="testimonial-author"><div className="author-avatar">👩⚕️</div><div><div className="author-name">Dra. Camila Sousa</div><div className="author-role">Dermatologista · SP</div></div></div></div>
              <div className="testimonial"><div className="testimonial-stars">★★★★★</div><p className="testimonial-text">"Minha equipe de vendas parou de perder tempo com perguntas básicas. O agente filtra e entrega só quem quer comprar de verdade."</p><div className="testimonial-author"><div className="author-avatar">👨💼</div><div><div className="author-name">Rodrigo Alves</div><div className="author-role">Infoprodutor · RJ</div></div></div></div>
              <div className="testimonial"><div className="testimonial-stars">★★★★★</div><p className="testimonial-text">"Achei que ia parecer robótico. Meus clientes elogiam o atendimento pensando que é humano. O resultado falou por si."</p><div className="testimonial-author"><div className="author-avatar">👩💼</div><div><div className="author-name">Fernanda Lima</div><div className="author-role">Academia FitLife · BH</div></div></div></div>
            </div>
          </div>
        </section>

        <section className="faq" id="faq">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '56px' }}><div className="section-label">// dúvidas</div><h2 className="section-title">Perguntas frequentes</h2></div>
            <div className="faq-grid">
              <div className="faq-item"><div className="faq-q">O agente substitui meu funcionário completamente?</div><p className="faq-a">Para o volume de perguntas repetitivas (preço, horário, disponibilidade), sim. Para casos complexos, o agente filtra e passa para sua equipe com o resumo completo da conversa.</p></div>
              <div className="faq-item"><div className="faq-q">Quanto tempo para ativar?</div><p className="faq-a">Em até 7 dias úteis seu agente está treinado, validado e no ar. Você aprova cada etapa antes de ativar.</p></div>
              <div className="faq-item"><div className="faq-q">Precisa saber programar?</div><p className="faq-a">Não. Você responde um briefing, nós cuidamos de tudo. Qualquer ajuste futuro também é feito por nós em até 24h úteis.</p></div>
              <div className="faq-item"><div className="faq-q">Funciona no meu número atual de WhatsApp?</div><p className="faq-a">Sim, funciona com WhatsApp Business ou pessoal. Para uso profissional, recomendamos um número dedicado para o agente.</p></div>
              <div className="faq-item"><div className="faq-q">E se o agente falar algo errado?</div><p className="faq-a">O agente só responde com base no que foi treinado. Se não souber, reconhece e transfere para humano. Não acessa internet, não inventa.</p></div>
              <div className="faq-item"><div className="faq-q">Quanto custa?</div><p className="faq-a">Depende do porte e das funcionalidades. Fale no WhatsApp e apresentamos os valores após entender seu caso. Spoiler: custa menos que um atendente CLT.</p></div>
            </div>
          </div>
        </section>

        <section className="cta-final">
          <div className="cta-glow"></div>
          <div className="cta-terminal">agente.deploy --custo=menor --disponibilidade=24h --rescisao=nunca</div>
          <h2 className="cta-title">
            Pare de pagar R$4.000/mês<br />por 8 horas de atendimento.<br />
            <span style={{ color: 'var(--green)' }}>Existe uma alternativa melhor.</span>
          </h2>
          <p className="cta-sub">Em até 7 dias seu agente está treinado, validado e operando. Fale agora e entenda como funciona para o seu negócio.</p>
          <div className="cta-actions">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '1.05rem', padding: '16px 36px' }}>💬 Falar agora no WhatsApp</a>
          </div>
          <p className="cta-guarantee"><span>✓</span> Processo com etapas claras &nbsp;·&nbsp; <span>✓</span> Você aprova antes de ativar &nbsp;·&nbsp; <span>✓</span> Ativo em até 7 dias úteis</p>
        </section>

        <footer>
          <div className="footer-inner">
            <div className="footer-copy">© 2025 Agente24h · Todos os direitos reservados</div>
            <div className="footer-links">
              <Link href="/privacidade">Privacidade</Link>
              <Link href="/termos">Termos</Link>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Contato</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
