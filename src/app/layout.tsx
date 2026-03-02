import type { Metadata } from 'next'
import { Syne, JetBrains_Mono, Instrument_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '600', '700', '800'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '700'],
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'BilderAI — Seu Atendimento no WhatsApp, 24h por Dia',
  description:
    'Agentes de IA que atendem, qualificam e vendem pelo WhatsApp. Configurado em 7 dias úteis, rodando 24/7.',
  openGraph: {
    title: 'BilderAI — Agentes de IA para WhatsApp',
    description: 'Nunca mais perca um lead por demora no atendimento.',
    type: 'website',
  },
}

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* ── Google Tag Manager (head) — o mais alto possível ── */}
        <Script id="gtm-head" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PRWVDWL5');`}
        </Script>
      </head>

      <body
        className={`${syne.variable} ${jetbrainsMono.variable} ${instrumentSans.variable}`}
      >
        {/* ── Google Tag Manager (noscript) — imediatamente após <body> ── */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PRWVDWL5"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {children}

        {/* ── Meta Pixel ─────────────────────────────────────────────── */}
        {FB_PIXEL_ID && (
          <Script id="fb-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){
              n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
              s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
              (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init','${FB_PIXEL_ID}');
              fbq('track','PageView');
            `}
          </Script>
        )}
      </body>
    </html>
  )
}
