'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'



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
  const [openFaq, setOpenFaq] = useState<number | null>(null)
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
      <section className="hero">
        <div className="hero-glow"></div>
        <div className="hero-glow2"></div>
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              Não é chatbot · É inteligência real
            </div>
            <h1 className="hero-title">
              Seu WhatsApp<br />
              nunca mais<br />
              <span className="accent">perde um cliente</span><br />
              <span className="dim">por demora.</span>
            </h1>
            <p className="hero-sub">
              Um agente de IA treinado com os dados do seu negócio. Ele lê o contexto, conduz a conversa e filtra quem tem interesse real — sem fluxo fixo, sem botões, sem "não entendi". Ativo em até 7 dias úteis.
            </p>
            <div className="hero-actions">
              <a href="#lead-form" className="btn-primary">
                <span>💬</span> Quero meu agente agora
              </a>
              <a href="#como-funciona" className="btn-secondary">
                Ver como funciona ↓
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-num">24/7</div>
                <div className="stat-label">Sem interrupção</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">7 dias</div>
                <div className="stat-label">Para ir ao ar</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">IA real</div>
                <div className="stat-label">Não é chatbot</div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="phone-badge">🤖 respondendo agora</div>
            <div className="phone-frame">
              <div className="phone-header">
                <div className="phone-avatar">🤖</div>
                <div>
                  <div className="phone-name">Sofia · Clínica Bella</div>
                  <div className="phone-status">online agora</div>
                </div>
              </div>
              <div className="phone-body">
                <div className="msg msg-out msg-1">
                  Oi, vi o anúncio! Quanto custa uma consulta?
                  <div className="msg-time">23:14</div>
                </div>
                <div className="typing typing-1">
                  <span></span><span></span><span></span>
                </div>
                <div className="msg msg-in msg-2">
                  Olá! 😊 Nossas consultas começam a partir de R$180. Temos horários disponíveis amanhã! Qual especialidade você precisa?
                  <div className="msg-time">23:14</div>
                </div>
                <div className="msg msg-out msg-3">
                  Ortopedia. Tem horário às 14h?
                  <div className="msg-time">23:15</div>
                </div>
                <div className="typing typing-2">
                  <span></span><span></span><span></span>
                </div>
                <div className="msg msg-in msg-4">
                  Perfeito! Temos 14h disponível com o Dr. Carlos. Para confirmar, me passa seu nome completo? ✅
                  <div className="msg-time">23:15</div>
                </div>
              </div>
            </div>
            <div className="phone-badge2">
              <strong>+R$1.200</strong>
              consulta agendada às 23h
            </div>
          </div>
        </div>
      </section>

      <div className="logos-bar">
        <div className="logos-inner">
          <span className="logos-label">Implantado em</span>
          <div className="logos-list">
            <span className="logo-tag">🏥 Clínicas</span>
            <span className="logo-tag">💪 Academias</span>
            <span className="logo-tag">🏠 Imobiliárias</span>
            <span className="logo-tag">🎓 Infoprodutores</span>
            <span className="logo-tag">🍕 Restaurantes</span>
            <span className="logo-tag">⚖️ Escritórios</span>
            <span className="logo-tag">+ qualquer negócio</span>
          </div>
        </div>
      </div>

      <section className="problem" id="problema">
        <div className="container">
          <div className="problem-grid">
            <div>
              <div className="section-label">// o problema real</div>
              <h2 className="section-title">O anúncio funciona.<br />O atendimento é o gargalo.</h2>
              <p className="section-sub">Você investe em tráfego, o lead chega e some porque ninguém respondeu rápido o suficiente. Não é falha de estratégia. É falha de velocidade.</p>
              <ul className="problem-list">
                <li className="problem-item">
                  <span className="problem-icon">⏱</span>
                  <div className="problem-text">
                    <strong>Velocidade decide quem fecha</strong>
                    <span>Quem manda mensagem às 23h não espera até amanhã. Ele abre o próximo resultado e compra lá.</span>
                  </div>
                </li>
                <li className="problem-item">
                  <span className="problem-icon">🔁</span>
                  <div className="problem-text">
                    <strong>Sua equipe responde as mesmas perguntas todo dia</strong>
                    <span>Preço, horário, disponibilidade. São horas perdidas por semana em perguntas que uma IA resolve em segundos.</span>
                  </div>
                </li>
                <li className="problem-item">
                  <span className="problem-icon">📉</span>
                  <div className="problem-text">
                    <strong>CPL sobe, conversão fica igual</strong>
                    <span>Mais verba no tráfego não resolve atendimento lento. O problema não está no anúncio.</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="comparison-box">
              <div className="comp-row">
                <div className="comp-header comp-before">Sem agente</div>
                <div className="comp-header comp-after">Com agente</div>
              </div>
              <div className="comp-row">
                <div className="comp-item comp-item-before">❌ Responde em horas</div>
                <div className="comp-item comp-item-after">✅ Responde em segundos</div>
              </div>
              <div className="comp-row">
                <div className="comp-item comp-item-before">❌ Para de noite e fim de semana</div>
                <div className="comp-item comp-item-after">✅ 24h por dia, 7 dias por semana</div>
              </div>
              <div className="comp-row">
                <div className="comp-item comp-item-before">❌ Cliente some esperando resposta</div>
                <div className="comp-item comp-item-after">✅ Cliente atendido na hora</div>
              </div>
              <div className="comp-row">
                <div className="comp-item comp-item-before">❌ Equipe sobrecarregada</div>
                <div className="comp-item comp-item-after">✅ Time foca em fechar</div>
              </div>
              <div className="comp-row">
                <div className="comp-item comp-item-before">❌ Perda de receita noturna</div>
                <div className="comp-item comp-item-after">✅ Agenda preenchida 24h</div>
              </div>
              <div className="comp-row">
                <div className="comp-item comp-item-before">❌ Custo alto com atendentes</div>
                <div className="comp-item comp-item-after">✅ Custo fixo e previsível</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <div className="container">
          <div className="header-center">
            <div className="section-label">// não é chatbot</div>
            <h2 className="section-title">A diferença que define<br />se você vende ou só responde.</h2>
            <p className="section-sub sub-center">Chatbot executa regras fixas. Agente de IA pensa, adapta e converte.</p>
          </div>

          <div className="vs-grid">
            <div className="vs-col-bad">
              <div className="vs-header-bad">
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🤖</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color: '#ff6b6b' }}>Chatbot Tradicional</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#ff6b6b', opacity: 0.6, marginTop: '4px' }}>fluxo fixo · sem inteligência</div>
              </div>
              <div className="vs-row"><span style={{ color: '#ff4444', flexShrink: 0, fontSize: '1rem' }}>✕</span><div><div style={{ fontSize: '0.88rem', color: 'var(--text)', fontWeight: 500 }}>Responde só o que foi programado</div><div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '3px' }}>Pergunta fora do script significa cliente perdido</div></div></div>
              <div className="vs-row"><span style={{ color: '#ff4444', flexShrink: 0, fontSize: '1rem' }}>✕</span><div><div style={{ fontSize: '0.88rem', color: 'var(--text)', fontWeight: 500 }}>Menu de botões e opções fixas</div><div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '3px' }}>Experiência robótica e impessoal</div></div></div>
              <div className="vs-row"><span style={{ color: '#ff4444', flexShrink: 0, fontSize: '1rem' }}>✕</span><div><div style={{ fontSize: '0.88rem', color: 'var(--text)', fontWeight: 500 }}>Não filtra nem converte</div><div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '3px' }}>Só informa, não vende</div></div></div>
              <div className="vs-row"><span style={{ color: '#ff4444', flexShrink: 0, fontSize: '1rem' }}>✕</span><div><div style={{ fontSize: '0.88rem', color: 'var(--text)', fontWeight: 500 }}>Esquece tudo entre mensagens</div><div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '3px' }}>Cada resposta começa do zero</div></div></div>
              <div className="vs-row"><span style={{ color: '#ff4444', flexShrink: 0, fontSize: '1rem' }}>✕</span><div><div style={{ fontSize: '0.88rem', color: 'var(--text)', fontWeight: 500 }}>Trava em perguntas abertas</div><div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '3px' }}>"Não entendi. Digite 1 para..."</div></div></div>
              <div className="vs-row"><span style={{ color: '#ff4444', flexShrink: 0, fontSize: '1rem' }}>✕</span><div><div style={{ fontSize: '0.88rem', color: 'var(--text)', fontWeight: 500 }}>Exige programação para mudar</div><div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '3px' }}>Qualquer ajuste custa horas de desenvolvimento</div></div></div>
            </div>

            <div className="vs-separator">
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 800, color: 'var(--muted)', writingMode: 'vertical-rl', letterSpacing: '0.15em', background: 'var(--surface)', padding: '12px 8px', borderRadius: '8px', border: '1px solid var(--border)' }}>VS</div>
            </div>

            <div className="vs-col-good">
              <div className="vs-header-good">
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🧠</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--green)' }}>Agente de IA</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--green)', opacity: 0.7, marginTop: '4px' }}>inteligência real · conversação natural</div>
              </div>
              <div className="vs-row"><span style={{ color: 'var(--green)', flexShrink: 0, fontSize: '1rem' }}>✓</span><div><div style={{ fontSize: '0.88rem', color: 'var(--text)', fontWeight: 500 }}>Responde qualquer pergunta naturalmente</div><div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '3px' }}>Treinado com todo o conteúdo do seu negócio</div></div></div>
              <div className="vs-row"><span style={{ color: 'var(--green)', flexShrink: 0, fontSize: '1rem' }}>✓</span><div><div style={{ fontSize: '0.88rem', color: 'var(--text)', fontWeight: 500 }}>Conversa fluida como humano</div><div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '3px' }}>Clientes não percebem que é IA</div></div></div>
              <div className="vs-row"><span style={{ color: 'var(--green)', flexShrink: 0, fontSize: '1rem' }}>✓</span><div><div style={{ fontSize: '0.88rem', color: 'var(--text)', fontWeight: 500 }}>Entende, filtra e agenda clientes</div><div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '3px' }}>Leva o atendimento até a conversão</div></div></div>
              <div className="vs-row"><span style={{ color: 'var(--green)', flexShrink: 0, fontSize: '1rem' }}>✓</span><div><div style={{ fontSize: '0.88rem', color: 'var(--text)', fontWeight: 500 }}>Mantém o contexto durante toda a conversa</div><div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '3px' }}>Lembra do que foi dito anteriormente</div></div></div>
              <div className="vs-row"><span style={{ color: 'var(--green)', flexShrink: 0, fontSize: '1rem' }}>✓</span><div><div style={{ fontSize: '0.88rem', color: 'var(--text)', fontWeight: 500 }}>Adapta o tom para cada pessoa</div><div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '3px' }}>Mais formal ou descontraído conforme o caso</div></div></div>
              <div className="vs-row"><span style={{ color: 'var(--green)', flexShrink: 0, fontSize: '1rem' }}>✓</span><div><div style={{ fontSize: '0.88rem', color: 'var(--text)', fontWeight: 500 }}>Atualiza em texto, sem programação</div><div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '3px' }}>Mudou o preço? Atualiza em minutos</div></div></div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '52px' }}>
            <a href="#lead-form" className="btn-primary"><span>🧠</span> Quero um agente, não um chatbot</a>
          </div>
        </div>
      </section>

      <section className="how" id="como-funciona">
        <div className="container">
          <div className="how-header">
            <div className="section-label">// implantação</div>
            <h2 className="section-title">Processo estruturado.<br />Resultado previsível.</h2>
            <p className="section-sub">Cada etapa tem entregável e aprovação sua. Nada vai ao ar sem você validar. Prazo: até 7 dias úteis.</p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-num">01</div>
              <div className="step-title">Diagnóstico</div>
              <p className="step-desc">Mapeamos seus serviços, objeções comuns, tom de voz e o fluxo ideal para converter no seu nicho.</p>
            </div>
            <div className="step">
              <div className="step-num">02</div>
              <div className="step-title">Treinamento</div>
              <p className="step-desc">O agente é treinado com os dados do seu negócio: preços, FAQ, políticas, scripts de venda.</p>
            </div>
            <div className="step">
              <div className="step-num">03</div>
              <div className="step-title">Validação</div>
              <p className="step-desc">Você conversa com o agente, testa cenários reels e aprova. Ajustamos quantas vezes for necessário.</p>
            </div>
            <div className="step">
              <div className="step-num">04</div>
              <div className="step-title">Ativação</div>
              <p className="step-desc">Conectado ao seu WhatsApp e ao tráfego. Dashboard ativo. Agente operando e você no controle.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="features" id="recursos">
        <div className="container">
          <div className="section-label">// o que o agente faz</div>
          <h2 className="section-title">Mais que atendimento.<br />É um vendedor que nunca sai.</h2>

          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">⚡</span>
              <div className="feature-title">Resposta em segundos</div>
              <p className="feature-desc">Resposta em menos de 5 segundos, a qualquer hora. Enquanto seus concorrentes dormem, seu agente está fechando o próximo cliente.</p>
              <span className="feature-tag">tempo médio: 2s</span>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🎯</span>
              <div className="feature-title">Filtra quem tem interesse real</div>
              <p className="feature-desc">O agente conduz a conversa para entender intenção, urgência e capacidade de compra. Sua equipe recebe só quem está pronto para fechar.</p>
              <span className="feature-tag">contatos filtrados</span>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📅</span>
              <div className="feature-title">Agendamento automático</div>
              <p className="feature-desc">Coleta os dados, confirma o horário e registra o agendamento. Tudo na conversa, sem formulário, sem link externo, sem atrito.</p>
              <span className="feature-tag">agenda 24/7</span>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🧠</span>
              <div className="feature-title">Treinado com seus dados</div>
              <p className="feature-desc">Treinado com PDFs, links, textos e scripts do seu negócio. Não chuta, não inventa. Responde com base no que você ensinou.</p>
              <span className="feature-tag">IA personalizada</span>
            </div>
            <div className="feature-card big">
              <div>
                <span className="feature-icon">👤</span>
                <div className="feature-title">Você controla tudo pelo dashboard</div>
                <p className="feature-desc">Acompanhe conversas em tempo real, assuma o atendimento quando quiser, veja quem tem interesse real e métricas de uso. Quando necessário, o agente transfere para humano com o resumo completo da conversa. Nenhuma informação se perde.</p>
                <span className="feature-tag">transferência inteligente</span>
              </div>
              <div style={{ background: 'var(--surface2)', borderRadius: '12px', padding: '24px', border: '1px solid var(--border)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--green)', marginBottom: '16px' }}>→ transferindo para humano</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted2)', lineHeight: '1.6' }}>
                  <strong style={{ color: 'var(--text)', display: 'block', marginBottom: '8px' }}>Resumo da conversa:</strong>
                  Nome: João Silva<br />
                  Interesse: Plano Premium<br />
                  Objeção: Quer parcelamento<br />
                  Temperatura: 🔥 Alta<br />
                  <span style={{ color: 'var(--green)', marginTop: '8px', display: 'block' }}>✓ Pronto para fechar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="niches" id="nichos">
        <div className="container">
          <div className="niches-header">
            <div>
              <div className="section-label">// onde já funciona</div>
              <h2 className="section-title">Treinado para<br />o seu mercado.</h2>
            </div>
            <p className="section-sub" style={{ maxWidth: '320px' }}>Cada nicho tem objeções, linguagem e fluxo diferentes. O agente é configurado para isso, não é template genérico.</p>
          </div>
          <div className="niches-grid">
            <div className="niche-card">
              <span className="niche-emoji">🏥</span>
              <div className="niche-name">Clínicas e Consultórios</div>
              <p className="niche-desc">Agenda consultas, informa convênios, responde dúvidas de procedimentos e capta dados do paciente.</p>
              <span className="niche-result">agenda lotada 24/7</span>
            </div>
            <div className="niche-card">
              <span className="niche-emoji">💪</span>
              <div className="niche-name">Academias e Estúdios</div>
              <p className="niche-desc">Apresenta planos, agenda avaliações, responde sobre modalidades e faz follow-up de matrículas.</p>
              <span className="niche-result">mais matrículas</span>
            </div>
            <div className="niche-card">
              <span className="niche-emoji">🏠</span>
              <div className="niche-name">Imobiliárias</div>
              <p className="niche-desc">Qualifica comprador vs. locatário, envia imóveis, agenda visitas e coleta dados para o corretor.</p>
              <span className="niche-result">clientes qualificados</span>
            </div>
            <div className="niche-card">
              <span className="niche-emoji">🎓</span>
              <div className="niche-name">Infoprodutores</div>
              <p className="niche-desc">Tira dúvidas sobre o produto, quebra objeções, envia link de compra e faz follow-up automático.</p>
              <span className="niche-result">mais vendas</span>
            </div>
            <div className="niche-card">
              <span className="niche-emoji">⚖️</span>
              <div className="niche-name">Escritórios e Advogados</div>
              <p className="niche-desc">Faz triagem do caso, coleta documentos necessários e agenda consulta com o advogado.</p>
              <span className="niche-result">triagem automática</span>
            </div>
            <div className="niche-card">
              <span className="niche-emoji">🍕</span>
              <div className="niche-name">Restaurantes e Food</div>
              <p className="niche-desc">Recebe pedidos, informa cardápio e preços, confirma reservas e responde dúvidas de entrega.</p>
              <span className="niche-result">sem fila no WA</span>
            </div>
          </div>
        </div>
      </section>

      <section className="proof" id="depoimentos">
        <div className="container">
          <div className="proof-header">
            <div className="section-label">// resultados reais</div>
            <h2 className="section-title">Não é promessa.<br />É o que já aconteceu.</h2>
          </div>
          <div className="testimonials">
            <div className="testimonial">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"Na primeira semana o agente já agendou 11 consultas fora do horário comercial. Pacientes que teriam ido para a concorrência."</p>
              <div className="testimonial-author">
                <div className="author-avatar">👩‍⚕️</div>
                <div>
                  <div className="author-name">Dra. Camila Sousa</div>
                  <div className="author-role">Dermatologista · SP</div>
                </div>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"Minha equipe de vendas parou de perder tempo com perguntas básicas. O agente filtra e entrega só quem quer comprar de verdade."</p>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍💼</div>
                <div>
                  <div className="author-name">Rodrigo Alves</div>
                  <div className="author-role">Infoprodutor · RJ</div>
                </div>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"Achei que ia parecer robótico. Meus clientes elogiam o atendimento pensando que é humano. O resultado falou por si."</p>
              <div className="testimonial-author">
                <div className="author-avatar">👩‍💼</div>
                <div>
                  <div className="author-name">Fernanda Lima</div>
                  <div className="author-role">Academia FitLife · BH</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq" id="faq">
        <div className="container">
          <div className="header-center">
            <div className="section-label">// dúvidas</div>
            <h2 className="section-title">Perguntas frequentes</h2>
          </div>
          <div className="faq-grid">
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="faq-q">{faq.q}</div>
                {openFaq === i && <p className="faq-a">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-final" id="lead-form">
        <div className="cta-terminal">agente.deploy --status=pronto --prazo=7dias</div>
        <h2 className="cta-title">
          Pronto para parar de perder clientes <span style={{ color: 'var(--green)' }}>por demora?</span>
        </h2>
        <p className="cta-sub">
          Em até 7 dias úteis seu agente está treinado, validado e operando. Fale agora e entenda como funciona para o seu negócio.
        </p>

        <div className="cta-actions">
          <form onSubmit={handleSubmit} className="lead-form-card">
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
        </div>

        <p className="cta-guarantee">✓ Processo com etapas claras &nbsp;·&nbsp; ✓ Você aprova antes de ativar &nbsp;·&nbsp; ✓ Ativo em até 7 dias úteis</p>
      </section>

      <footer>
        <div className="footer-inner">
          <div className="footer-copy">© 2025 Agente24Horas · Todos os direitos reservados</div>
          <div className="footer-links">
            <Link href="/privacidade">Privacidade</Link>
            <Link href="/termos">Termos</Link>
            <a href="#lead-form">Contato</a>
          </div>
        </div>
      </footer>
    </>
  )
}
