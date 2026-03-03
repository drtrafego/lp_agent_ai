import Link from 'next/link'

export default function Termos() {
    return (
        <>
            {/* NAV mínimo */}
            <nav>
                <Link href="/" className="nav-logo" style={{ textDecoration: 'none' }}>
                    Agente<span>24horas</span>
                </Link>
            </nav>

            {/* Conteúdo */}
            <div
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '120px 40px 80px',
                    background: 'var(--bg)',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div style={{ maxWidth: '800px', width: '100%', zIndex: 1 }}>
                    <h1
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(2rem, 4vw, 3rem)',
                            fontWeight: 800,
                            lineHeight: 1.15,
                            color: 'var(--text)',
                            marginBottom: '40px',
                            textAlign: 'center'
                        }}
                    >
                        Termos de Uso
                    </h1>

                    <div
                        style={{
                            fontSize: '1.05rem',
                            color: 'var(--muted)',
                            lineHeight: 1.7,
                            marginBottom: '40px',
                        }}
                    >
                        <p style={{ marginBottom: '16px' }}>Última atualização: Março de 2026</p>
                        <p style={{ marginBottom: '16px' }}>
                            Bem-vindo ao Agente24horas. Ao acessar e utilizar nossos serviços, você concorda com os seguintes termos e condições:
                        </p>

                        <h2 style={{ color: 'var(--text)', marginTop: '32px', marginBottom: '16px', fontSize: '1.4rem' }}>
                            1. Aceitação dos Termos
                        </h2>
                        <p style={{ marginBottom: '16px' }}>
                            Ao contratar ou utilizar os serviços do Agente24horas, você declara estar ciente e de acordo com as regras estabelecidas neste documento. Caso não concorde com algum dos termos descritos, solicitamos que não utilize nossos serviços.
                        </p>

                        <h2 style={{ color: 'var(--text)', marginTop: '32px', marginBottom: '16px', fontSize: '1.4rem' }}>
                            2. Nossos Serviços
                        </h2>
                        <p style={{ marginBottom: '16px' }}>
                            O Agente24horas fornece agentes de Inteligência Artificial para atendimento automatizado via WhatsApp. Os serviços incluem o diagnóstico, treinamento, validação e ativação do agente, utilizando a base de conhecimento providenciada pelo cliente.
                        </p>

                        <h2 style={{ color: 'var(--text)', marginTop: '32px', marginBottom: '16px', fontSize: '1.4rem' }}>
                            3. Responsabilidades do Cliente
                        </h2>
                        <p style={{ marginBottom: '16px' }}>
                            O cliente é responsável por fornecer informações precisas, claras e legais para o treinamento do agente. O Agente24horas não se responsabiliza pelas interações decorrentes de informações falsas ou dúbias repassadas para a inteligência artificial. O uso da plataforma do WhatsApp Business deve cumprir as diretrizes da Meta, sendo o cliente o único responsável em caso de bloqueios decorrentes de uso indevido (ex: envio de spam).
                        </p>

                        <h2 style={{ color: 'var(--text)', marginTop: '32px', marginBottom: '16px', fontSize: '1.4rem' }}>
                            4. Pagamentos e Garantias
                        </h2>
                        <p style={{ marginBottom: '16px' }}>
                            Os pagamentos seguem os planos acordados comercialmente através de nossos especialistas. Oferecemos garantia no primeiro mês, pela qual nos comprometemos a ajustar o agente quantas vezes forem necessárias ou estornar o valor cobrado em caso de falha irreparável na entrega técnica descrita.
                        </p>

                        <h2 style={{ color: 'var(--text)', marginTop: '32px', marginBottom: '16px', fontSize: '1.4rem' }}>
                            5. Propriedade Intelectual
                        </h2>
                        <p style={{ marginBottom: '16px' }}>
                            O modelo base, tecnologias e estruturas utilizadas para operar os agentes são de propriedade exclusiva do Agente24horas. O conteúdo inserido para treinamento, incluindo textos, pdfs e fluxos do seu negócio, pertencem exclusivamente a você.
                        </p>

                        <h2 style={{ color: 'var(--text)', marginTop: '32px', marginBottom: '16px', fontSize: '1.4rem' }}>
                            6. Modificações dos Termos
                        </h2>
                        <p style={{ marginBottom: '16px' }}>
                            Podemos atualizar estes Termos de Uso de tempos em tempos. Ao continuar acessando a plataforma após qualquer alteração, você concorda em se vincular aos termos revisados.
                        </p>

                    </div>

                    <div style={{ textAlign: 'center', marginTop: '60px' }}>
                        <Link href="/" className="btn-secondary">
                            ← Voltar para o início
                        </Link>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer>
                <Link href="#" className="footer-logo" style={{ textDecoration: 'none' }}>
                    Agente<span>24horas</span>
                </Link>
                <div style={{ display: 'flex', gap: '24px', fontSize: '0.8rem' }}>
                    <Link href="/termos" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Termos de Uso</Link>
                    <Link href="/privacidade" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Política de Privacidade</Link>
                </div>
                <div className="footer-copy">© 2026 Agente24horas · Todos os direitos reservados</div>
            </footer>
        </>
    )
}
