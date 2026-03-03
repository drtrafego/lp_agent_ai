import Link from 'next/link'

export default function Termos() {
    return (
        <>
            <div className="legal-page">
                <div className="legal-content">
                    <h1>Termos de Uso</h1>

                    <div className="legal-body">
                        <p>Última atualização: Março de 2026</p>
                        <p>
                            Bem-vindo ao Agente24h. Ao acessar e utilizar nossos serviços, você concorda com os seguintes termos e condições:
                        </p>

                        <h2>1. Aceitação dos Termos</h2>
                        <p>
                            Ao contratar ou utilizar os serviços do Agente24h, você declara estar ciente e de acordo com as regras estabelecidas neste documento. Caso não concorde com algum dos termos descritos, solicitamos que não utilize nossos serviços.
                        </p>

                        <h2>2. Nossos Serviços</h2>
                        <p>
                            O Agente24h fornece agentes de Inteligência Artificial para atendimento automatizado via WhatsApp. Os serviços incluem o diagnóstico, treinamento, validação e ativação do agente, utilizando a base de conhecimento providenciada pelo cliente.
                        </p>

                        <h2>3. Responsabilidades do Cliente</h2>
                        <p>
                            O cliente é responsável por fornecer informações precisas, claras e legais para o treinamento do agente. O Agente24h não se responsabiliza pelas interações decorrentes de informações falsas ou dúbias repassadas para a inteligência artificial. O uso da plataforma do WhatsApp Business deve cumprir as diretrizes da Meta, sendo o cliente o único responsável em caso de bloqueios decorrentes de uso indevido (ex: envio de spam).
                        </p>

                        <h2>4. Pagamentos e Garantias</h2>
                        <p>
                            Os pagamentos seguem os planos acordados comercialmente através de nossos especialistas. Oferecemos garantia no primeiro mês, pela qual nos comprometemos a ajustar o agente quantas vezes forem necessárias ou estornar o valor cobrado em caso de falha irreparável na entrega técnica descrita.
                        </p>

                        <h2>5. Propriedade Intelectual</h2>
                        <p>
                            O modelo base, tecnologias e estruturas utilizadas para operar os agentes são de propriedade exclusiva do Agente24h. O conteúdo inserido para treinamento, incluindo textos, pdfs e fluxos do seu negócio, pertencem exclusivamente a você.
                        </p>

                        <h2>6. Modificações dos Termos</h2>
                        <p>
                            Podemos atualizar estes Termos de Uso de tempos em tempos. Ao continuar acessando a plataforma após qualquer alteração, você concorda em se vincular aos termos revisados.
                        </p>
                    </div>

                    <div className="header-center" style={{ marginTop: '60px' }}>
                        <Link href="/" className="btn-secondary">
                            ← Voltar para o início
                        </Link>
                    </div>
                </div>
            </div>

            <footer>
                <div className="footer-inner">
                    <div className="footer-copy">© 2025 Agente24h · Todos os direitos reservados</div>
                    <div className="footer-links">
                        <Link href="/privacidade">Privacidade</Link>
                        <Link href="/termos">Termos</Link>
                        <Link href="/#lead-form">Contato</Link>
                    </div>
                </div>
            </footer>
        </>
    )
}
