import Link from 'next/link'

export default function Privacidade() {
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
                        Política de Privacidade
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
                            A sua privacidade é importante para nós. Esta Política de Privacidade explica como o Agente24horas coleta, utiliza e protege as informações fornecidas por nossos clientes na criação de nossos agentes de inteligência artificial.
                        </p>

                        <h2 style={{ color: 'var(--text)', marginTop: '32px', marginBottom: '16px', fontSize: '1.4rem' }}>
                            1. Coleta de Informações
                        </h2>
                        <p style={{ marginBottom: '16px' }}>
                            Coletamos as informações diretamente de você durante o processo de briefing (ex: manuais, PDFs, planilhas) com o objetivo exclusivo de treinar um agente de Inteligência Artificial privado com os dados fornecidos. Em nossos formulários, reuniremos nome e meios de contato.
                        </p>

                        <h2 style={{ color: 'var(--text)', marginTop: '32px', marginBottom: '16px', fontSize: '1.4rem' }}>
                            2. Uso das Informações (Lei Geral de Proteção de Dados - LGPD)
                        </h2>
                        <p style={{ marginBottom: '16px' }}>
                            No Brasil, seguimos estritamente os preceitos da LGPD. Os dados confidenciais de sua empresa, quando não expressamente autorizados a constarem na base de respostas do Agente, serão mantidos em absoluto sigilo, servindo unicamente para moldar a diretriz estratégica da inteligência do sistema. Não usamos, nem venderemos seus dados corporativos do treinamento ou base de leads a terceiros.
                        </p>

                        <h2 style={{ color: 'var(--text)', marginTop: '32px', marginBottom: '16px', fontSize: '1.4rem' }}>
                            3. Dados dos Clientes Finais
                        </h2>
                        <p style={{ marginBottom: '16px' }}>
                            Quando seu agente estiver ao vivo e em conversa ativa no WhatsApp de seus próprios clientes, as conversas serão de visibilidade conjunta dele, a empresa dona da base e da Meta (WhatsApp), respeitando os termos de E2EE (criptografia). Todo fluxo operado no painel ficará sob responsabilidade de sua gestão sobre os contatos que buscarem sua marca ou serviço.
                        </p>

                        <h2 style={{ color: 'var(--text)', marginTop: '32px', marginBottom: '16px', fontSize: '1.4rem' }}>
                            4. Cookies do Site
                        </h2>
                        <p style={{ marginBottom: '16px' }}>
                            Utilizamos cookies para métricas e publicidade com os pixels aprovados por esta landing page, ajudando a entender o uso de nossos visitantes. Você pode configurar em seu navegador para que os cookies sejam desabilitados.
                        </p>

                        <h2 style={{ color: 'var(--text)', marginTop: '32px', marginBottom: '16px', fontSize: '1.4rem' }}>
                            5. Solicitação de Exclusão
                        </h2>
                        <p style={{ marginBottom: '16px' }}>
                            Quaisquer solicitações de correção, retificação, alteração ou exclusão total de registros, basta realizar a comunicação no canal de atendimento direto fornecido.
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
