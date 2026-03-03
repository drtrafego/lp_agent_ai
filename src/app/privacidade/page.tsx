import Link from 'next/link'

export default function Privacidade() {
    const WHATSAPP = 'https://wa.me/SEU_NUMERO'

    return (
        <>
            <nav>
                <Link href="/" className="nav-logo">Agente<span>24h</span></Link>
                <div className="nav-links">
                    <Link href="/">Voltar</Link>
                </div>
                <a href={WHATSAPP} className="nav-cta">Falar Agora →</a>
            </nav>

            <div className="legal-page">
                <div className="legal-content">
                    <h1>Política de Privacidade</h1>

                    <div className="legal-body">
                        <p>Última atualização: Março de 2026</p>
                        <p>
                            A sua privacidade é importante para nós. É política do Agente24h respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Agente24h, e outros sites que possuímos e operamos.
                        </p>

                        <h2>1. Coleta de Informações</h2>
                        <p>
                            Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
                        </p>

                        <h2>2. Uso das Informações</h2>
                        <p>
                            As informações coletadas (como nome, e-mail e WhatsApp) são utilizadas exclusivamente para o contato comercial e o treinamento personalizado do seu agente de IA. Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
                        </p>

                        <h2>3. Retenção de Dados</h2>
                        <p>
                            Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, os protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
                        </p>

                        <h2>4. Cookies</h2>
                        <p>
                            Utilizamos cookies e tecnologias similares (como Pixels de rastreamento) para entender como você interage com nosso site e melhorar sua experiência. Você é livre para recusar a nossa solicitação de cookies, entendendo que talvez não possamos fornecer alguns dos serviços desejados.
                        </p>

                        <h2>5. Seus Direitos</h2>
                        <p>
                            Você tem o direito de solicitar o acesso, retificação ou exclusão de seus dados pessoais a qualquer momento. Para isso, basta entrar em contato conosco através dos nossos canais oficiais.
                        </p>

                        <h2>6. Compromisso do Usuário</h2>
                        <p>
                            O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Agente24h oferece no site e com caráter enunciativo, mas não limitativo.
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
                        <a href={WHATSAPP}>Contato</a>
                    </div>
                </div>
            </footer>
        </>
    )
}
