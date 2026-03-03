'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const WHATSAPP = 'https://wa.me/SEU_NUMERO'

const COUNTRIES = [
  { ddi: '+55', flag: '🇧🇷', iso: 'BR' },
  { ddi: '+1', flag: '🇺🇸', iso: 'US' },
  { ddi: '+351', flag: '🇵🇹', iso: 'PT' },
  { ddi: '+34', flag: '🇪🇸', iso: 'ES' },
  { ddi: '+54', flag: '🇦🇷', iso: 'AR' },
  { ddi: '+52', flag: '🇲🇽', iso: 'MX' },
  { ddi: '+57', flag: '🇨🇴', iso: 'CO' },
  { ddi: '+56', flag: '🇨🇱', iso: 'CL' },
  { ddi: '+51', flag: '🇵🇪', iso: 'PE' },
  { ddi: '+598', flag: '🇺🇾', iso: 'UY' },
  { ddi: '+595', flag: '🇵🇾', iso: 'PY' },
  { ddi: '+591', flag: '🇧🇴', iso: 'BO' },
  { ddi: '+593', flag: '🇪🇨', iso: 'EC' },
  { ddi: '+58', flag: '🇻🇪', iso: 'VE' },
  { ddi: '+44', flag: '🇬🇧', iso: 'GB' },
  { ddi: '+49', flag: '🇩🇪', iso: 'DE' },
  { ddi: '+33', flag: '🇫🇷', iso: 'FR' },
  { ddi: '+39', flag: '🇮🇹', iso: 'IT' },
  { ddi: '+61', flag: '🇦🇺', iso: 'AU' },
  { ddi: '+1', flag: '🇨🇦', iso: 'CA' },
]

const faqs = [
  {
    q: 'É realmente uma IA ou tem pessoas respondendo?',
    a: 'É 100% IA. Nenhuma pessoa responde as mensagens — o agente usa modelos de linguagem avançados treinados com o conteúdo do seu negócio. O resultado é uma conversa natural, personalizada e disponível a qualquer hora.',
  },
  {
    q: 'Em quanto tempo o agente fica pronto?',
    a: 'Em até 7 dias úteis seu agente está no ar. Fazemos o briefing, configuramos, testamos com você, ajustamos o que for necessário e ativamos. Você aprova cada etapa antes de ir ao ar.',
  },
  {
    q: 'Preciso saber programar para gerenciar o agente?',
    a: 'Não. Para atualizar o agente, basta enviar um texto com as novas informações. Mudou o preço? Adicionou um serviço? Só nos avise e fazemos a atualização. Em breve você mesmo poderá fazer isso pelo painel.',
  },
  {
    q: 'O agente funciona no meu número atual de WhatsApp?',
    a: 'Sim. Conectamos ao seu número comercial existente via WhatsApp Business API. Seus clientes continuam mandando mensagem no mesmo número que já conhecem.',
  },
  {
    q: 'O que acontece se o agente não souber responder?',
    a: 'O agente reconhece quando não tem informação suficiente e transfere educadamente para um atendente humano ou solicita que o cliente aguarde. Você configura como prefere que isso aconteça.',
  },
  {
    q: 'Quanto custa?',
    a: 'Depende do porte do negócio e das funcionalidades necessárias. Fale com a gente pelo WhatsApp e apresentamos os valores após entender o seu caso — sem enrolação.',
  },
  {
    q: 'Precisa de aprovação da Meta?',
    a: 'Depende do uso. Para conectar via QR Code não precisa de aprovação. Para API Oficial com envio ativo de mensagens, orientamos todo o processo de aprovação.',
  },
]

export default function LandingPage() {
  const router = useRouter()
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [ddi, setDdi] = useState('+55')
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'error'>('idle')

  // Detecta DDI pelo IP do visitante
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then((data: { country_code?: string }) => {
        const match = COUNTRIES.find(c => c.iso === data.country_code)
        if (match) setDdi(match.ddi)
      })
      .catch(() => { }) // mantém +55 como padrão em caso de falha
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormStatus('loading')

    const params = new URLSearchParams(window.location.search)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          whatsapp: `${ddi}${formData.phone}`,
          utm_source: params.get('utm_source') ?? undefined,
          utm_medium: params.get('utm_medium') ?? undefined,
          utm_campaign: params.get('utm_campaign') ?? undefined,
          utm_term: params.get('utm_term') ?? undefined,
          utm_content: params.get('utm_content') ?? undefined,
        }),
      })

      if (res.ok) {
        const data: { success: boolean; leadId: number | string } = await res.json()
        router.push(`/obrigado?id=${data.leadId}`)
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <>
      {/* NAV */}
      <nav>
        <Link href="#" className="nav-logo">
          Bilder<span>AI</span>
        </Link>
        <ul className="nav-links">
          <li><Link href="#como-funciona">Como funciona</Link></li>
          <li><Link href="#faq">FAQ</Link></li>
        </ul>
        <a href={WHATSAPP} className="btn-primary">
          <span>💬</span> Falar com especialista
        </a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-badge">Não é chatbot · É inteligência real</div>
            <h1>Seu WhatsApp<br />nunca mais<br /><em>perde um lead</em><br /><span style={{ color: "var(--muted)" }}>por demora.</span></h1>
              <p className="hero-sub">
                Um agente de IA treinado com os dados do seu negócio. Ele lê o contexto, conduz a conversa e qualifica o lead — sem fluxo fixo, sem botões, sem "não entendi". Ativo em até 7 dias úteis.
              </p>
              <div className="hero-ctas">
                <a href="#contato" className="btn-primary">
                  <span>🚀</span> Quero meu agente agora
                </a>
                <Link href="#como-funciona" className="btn-secondary">
                  Ver como funciona →
                </Link>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <div className="stat-num">7 dias</div>
                  <div className="stat-label">Para ir ao ar</div>
                </div>
                <div className="stat">
                  <div className="stat-num">24/7</div>
                  <div className="stat-label">Sem interrupção</div>
                </div>
                <div className="stat">
                  <div className="stat-num">IA real</div>
                  <div className="stat-label">Não é chatbot</div>
                </div>
              </div>
            </div>

              {/* WhatsApp Mockup */}
              <div>
                <div className="whatsapp-mockup">
                  <div className="wpp-header">
                    <div className="wpp-avatar">🧠</div>
                    <div>
                      <div className="wpp-name">Agente BilderAI</div>
                      <div className="wpp-status">● online agora</div>
                    </div>
                  </div>
                  <div className="wpp-body">
                    <div className="msg msg-user">
                      Oi, quanto custa o plano mensal?
                      <div className="msg-time">14:32</div>
                    </div>
                    <div className="msg msg-agent">
                      Olá! 👋 O plano mensal é R$ 297/mês com suporte completo. Você tem algum
                      segmento específico? Consigo mostrar como outros clientes do seu setor usam!
                      <div className="msg-time">14:32</div>
                    </div>
                    <div className="msg msg-user">
                      Sou do ramo de estética.
                      <div className="msg-time">14:33</div>
                    </div>
                    <div className="msg msg-agent">
                      Perfeito! Tenho clientes de estética que reduziram 80% dos no-shows com
                      agendamento automático pelo WhatsApp. Quer ver um exemplo real? 😊
                      <div className="msg-time">14:33</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </section>

            {/* AGENTE VS CHATBOT */}
            <section style={{ padding: '100px 40px', background: 'var(--bg)' }}>
              <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                  <div className="section-label">// não é chatbot</div>
                  <h2 className="section-title">
                    A diferença que define<br />se você vende ou só responde.
                  </h2>
                  <p className="section-sub" style={{ margin: '0 auto', textAlign: 'center' }}>
                    Chatbot executa regras fixas. Agente de IA pensa, adapta e converte.
                  </p>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto 1fr',
                    gap: '0',
                    maxWidth: '900px',
                    margin: '0 auto',
                    alignItems: 'start',
                  }}
                >
                  {/* CHATBOT COLUNA */}
                  <div
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '16px 0 0 16px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        background: 'rgba(255,59,48,0.08)',
                        borderBottom: '1px solid var(--border)',
                        padding: '20px 28px',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🤖</div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 800,
                          fontSize: '1.1rem',
                          color: '#ff6b6b',
                        }}
                      >
                        Chatbot Tradicional
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          color: 'var(--muted)',
                          marginTop: '4px',
                        }}
                      >
                        fluxo fixo · sem inteligência
                      </div>
                    </div>
                    <div style={{ padding: '8px 0' }}>
                      {[
                        ['Responde só o que foi programado', 'Pergunta fora do fluxo = cliente perdido'],
                        ['Menu de botões e opções fixas', 'Experiência robótica e impessoal'],
                        ['Não qualifica nem converte', 'Só informa, não vende'],
                        ['Não aprende com o contexto', 'Cada conversa começa do zero'],
                        ['Trava em perguntas abertas', '"Não entendi. Digite 1 para..."'],
                        ['Exige programação para mudar', 'Qualquer ajuste = horas de dev'],
                      ].map(([title, sub], i, arr) => (
                        <div
                          key={i}
                          style={{
                            padding: '16px 28px',
                            borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : undefined,
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'flex-start',
                          }}
                        >
                          <span style={{ color: '#ff6b6b', flexShrink: 0, marginTop: '2px' }}>✕</span>
                          <div>
                            <div style={{ fontSize: '0.88rem', color: 'var(--text)', fontWeight: 500 }}>
                              {title}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '2px' }}>
                              {sub}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* VS SEPARADOR */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0 20px',
                      minHeight: '200px',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.1rem',
                        fontWeight: 800,
                        color: 'var(--muted)',
                        writingMode: 'vertical-rl',
                        letterSpacing: '0.1em',
                      }}
                    >
                      VS
                    </div>
                  </div>

                  {/* AGENTE IA COLUNA */}
                  <div
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid rgba(0,230,118,0.25)',
                      borderRadius: '0 16px 16px 0',
                      overflow: 'hidden',
                      boxShadow: '0 0 40px rgba(0,230,118,0.06)',
                    }}
                  >
                    <div
                      style={{
                        background: 'var(--green-dim)',
                        borderBottom: '1px solid rgba(0,230,118,0.15)',
                        padding: '20px 28px',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🧠</div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 800,
                          fontSize: '1.1rem',
                          color: 'var(--green)',
                        }}
                      >
                        Agente de IA
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          color: 'var(--green)',
                          marginTop: '4px',
                          opacity: 0.7,
                        }}
                      >
                        inteligência real · conversação natural
                      </div>
                    </div>
                    <div style={{ padding: '8px 0' }}>
                      {[
                        ['Responde qualquer pergunta naturalmente', 'Treinado com todo o conteúdo do seu negócio'],
                        ['Conversa fluida como humano', 'Clientes não percebem que é IA'],
                        ['Qualifica, vende e agenda', 'Leva o lead até a conversão'],
                        ['Mantém contexto durante toda a conversa', 'Lembra do que foi dito anteriormente'],
                        ['Adapta o tom para cada cliente', 'Mais formal ou descontraído conforme necessário'],
                        ['Atualiza em texto, sem programação', 'Mudou o preço? Atualiza em minutos'],
                      ].map(([title, sub], i, arr) => (
                        <div
                          key={i}
                          style={{
                            padding: '16px 28px',
                            borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : undefined,
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'flex-start',
                          }}
                        >
                          <span style={{ color: 'var(--green)', flexShrink: 0, marginTop: '2px' }}>✓</span>
                          <div>
                            <div style={{ fontSize: '0.88rem', color: 'var(--text)', fontWeight: 500 }}>
                              {title}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '2px' }}>
                              {sub}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA abaixo da comparação */}
                <div style={{ textAlign: 'center', marginTop: '52px' }}>
                  <a href="#contato" className="btn-primary">
                    <span>🧠</span> Quero um agente, não um chatbot
                  </a>
                </div>
              </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="como-funciona" style={{ padding: '100px 40px' }}>
              <div className="container">
                <div className="section-label">// implantação</div>
                <h2 className="section-title">Processo estruturado.<br />Resultado previsível.</h2>
                <p className="section-sub">
                  Cada etapa tem entregável e aprovação sua. Nada vai ao ar sem você validar. Prazo: até 7 dias úteis.
                </p>
                <div className="steps-grid">
                  <div className="step-card">
                    <div className="step-num">DIA 01</div>
                    <div className="step-icon">📋</div>
                    <div className="step-title">Diagnóstico</div>
                    <div className="step-desc">
                      Mapeamos seus serviços, objeções comuns, tom de voz e o fluxo ideal para converter no seu nicho.
                    </div>
                  </div>
                  <div className="step-card">
                    <div className="step-num">DIA 02-03</div>
                    <div className="step-icon">⚙️</div>
                    <div className="step-title">Treinamento</div>
                    <div className="step-desc">
                      O agente é treinado com os dados do seu negócio: preços, FAQ, políticas, scripts de venda.
                    </div>
                  </div>
                  <div className="step-card">
                    <div className="step-num">DIA 04-05</div>
                    <div className="step-icon">🧪</div>
                    <div className="step-title">Validação</div>
                    <div className="step-desc">
                      Você conversa com o agente, testa cenários reais e aprova. Ajustamos quantas vezes for necessário.
                    </div>
                  </div>
                  <div className="step-card">
                    <div className="step-num">DIA 06-07</div>
                    <div className="step-icon">🚀</div>
                    <div className="step-title">Ativação</div>
                    <div className="step-desc">
                      Conectado ao seu WhatsApp e ao tráfego. Dashboard ativo. Agente operando e você no controle.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FEATURES */}
            <section style={{ padding: '100px 40px', background: 'var(--surface)' }}>
              <div className="container">
                <div className="section-label">// o que o agente faz</div>
                <h2 className="section-title">
                  Mais que atendimento.<br />É um vendedor que nunca sai.
                </h2>
                <div className="features-grid">
                  {[
                    { icon: '🕐', title: 'Atendimento 24/7', desc: 'Resposta em menos de 5 segundos, a qualquer hora. Enquanto seus concorrentes dormem, seu agente está fechando o próximo cliente.' },
                    { icon: '🎯', title: 'Qualificação automática', desc: 'O agente conduz a conversa para entender intenção, urgência e capacidade de compra. Sua equipe recebe só quem está pronto para fechar.' },
                    { icon: '📅', title: 'Agendamento direto', desc: 'Coleta os dados, confirma o horário e registra o agendamento — tudo na conversa, sem formulário, sem link externo, sem atrito.' },
                    { icon: '🔗', title: 'WhatsApp nativo', desc: 'Opera no WhatsApp que seus clientes já usam. Sem apps novos, sem fricção, sem aprendizado.' },
                    { icon: '📊', title: 'Você controla tudo pelo dashboard', desc: 'Acompanhe conversas em tempo real, assuma o atendimento quando quiser, veja leads qualificados e métricas de uso — tudo em um painel exclusivo. Quando necessário, o agente transfere para humano com o resumo completo da conversa. Nenhuma informação se perde.' },
                    { icon: '✏️', title: 'Atualização simples', desc: 'Treinado com PDFs, links, textos e scripts do seu negócio. Não chuta, não inventa. Responde com base no que você ensinou.' },
                  ].map(({ icon, title, desc }) => (
                    <div key={title} className="feature-card">
                      <span className="feature-icon">{icon}</span>
                      <div className="feature-title">{title}</div>
                      <div className="feature-desc">{desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" style={{ padding: '100px 40px' }}>
              <div className="container">
                <div className="section-label">// dúvidas</div>
                <h2 className="section-title">Perguntas frequentes.</h2>
                <div className="faq-list">
                  {faqs.map((faq, i) => {
                    const isOpen = openFaq === i
                    return (
                      <div key={i} className="faq-item" data-open={isOpen ? 'true' : 'false'}>
                        <button
                          className="faq-question"
                          onClick={() => setOpenFaq(isOpen ? null : i)}
                        >
                          {faq.q}
                          <i className="faq-chevron">+</i>
                        </button>
                        {isOpen && <div className="faq-answer">{faq.a}</div>}
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>

            {/* CTA FINAL + FORMULÁRIO */}
            <section id="contato" className="cta-final">
              <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="section-label">// comece agora</div>
                <h2>
                  Pronto para parar<br />de perder leads<br /><span style={{ color: "var(--green)" }}>para a demora?</span>
                </h2>
                <p>
                  Em até 7 dias úteis seu agente está treinado, validado e operando. Preencha abaixo e entenda como funciona para o seu negócio específico.
                </p>

                <form className="lead-form-card" onSubmit={handleSubmit} noValidate>
                  {formStatus === 'error' && (
                    <div className="form-error">
                      Algo deu errado. Tente novamente ou fale pelo WhatsApp.
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label" htmlFor="lead-name">Nome completo</label>
                    <input
                      id="lead-name"
                      type="text"
                      className="form-input"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      required
                      minLength={2}
                      maxLength={120}
                      disabled={formStatus === 'loading'}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="lead-email">E-mail</label>
                    <input
                      id="lead-email"
                      type="email"
                      className="form-input"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      required
                      disabled={formStatus === 'loading'}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="lead-phone">WhatsApp</label>
                    <div className="phone-wrapper">
                      <select
                        className="ddi-select"
                        value={ddi}
                        onChange={e => setDdi(e.target.value)}
                        disabled={formStatus === 'loading'}
                        aria-label="Código do país"
                      >
                        {COUNTRIES.map(c => (
                          <option key={`${c.iso}-${c.ddi}`} value={c.ddi}>
                            {c.flag} {c.ddi}
                          </option>
                        ))}
                      </select>
                      <input
                        id="lead-phone"
                        type="tel"
                        className="form-input"
                        placeholder="(11) 99999-9999"
                        value={formData.phone}
                        onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                        required
                        disabled={formStatus === 'loading'}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="form-btn"
                    disabled={formStatus === 'loading'}
                  >
                    {formStatus === 'loading' ? '⏳ Enviando...' : '🚀 Quero meu agente agora'}
                  </button>

                  <p className="form-privacy">✓ Sem spam · Seus dados estão seguros</p>
                </form>

                <div className="cta-guarantees" style={{ marginTop: '32px' }}>
                  ✓ Processo com etapas claras &nbsp;·&nbsp; ✓ Você aprova antes de ativar &nbsp;·&nbsp; ✓ Ativo em até 7 dias úteis
                </div>
              </div>
            </section>

            {/* FOOTER */}
            <footer>
              <Link href="#" className="footer-logo">
                Bilder<span>AI</span>
              </Link>
              <div className="footer-copy">© 2025 BilderAI · Todos os direitos reservados</div>
            </footer>
          </>
          )
}
