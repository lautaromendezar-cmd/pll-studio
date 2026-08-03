import type { Metadata, Viewport } from 'next'
import './globals.css'
import { sentient, switzer } from './fonts'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Cursor } from '@/components/layout/Cursor'
import { Preloader } from '@/components/layout/Preloader'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { WhatsappFab } from '@/components/layout/WhatsappFab'
import { site } from '@/content/site'
import { jsonLdEstudio, jsonLdScript } from '@/lib/jsonld'
import { INTRO_KEY } from '@/lib/keys'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nombre} — Abogados en Monte Grande, Buenos Aires`,
    template: `%s — ${site.nombre}`,
  },
  description: site.descripcionCorta,
  applicationName: site.nombre,
  authors: [{ name: site.nombre }],
  keywords: [
    'abogado Monte Grande',
    'estudio jurídico Monte Grande',
    'accidentes de tránsito Esteban Echeverría',
    'abogado laboral zona sur',
    'derecho deportivo Argentina',
    'daños y perjuicios',
    'abogado despidos Buenos Aires',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: site.url,
    siteName: site.nombre,
    title: `${site.nombre} — Abogados en Monte Grande`,
    description: site.descripcionCorta,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.nombre} — Abogados en Monte Grande`,
    description: site.descripcionCorta,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  formatDetection: { telephone: true, address: false, email: true },
}

export const viewport: Viewport = {
  themeColor: '#2E120C',
  colorScheme: 'dark',
}

/**
 * Corre antes del primer pintado. Resuelve tres cosas que, hechas en un efecto
 * de React, se verian como un parpadeo:
 *  - `js`        : habilita los estados iniciales de las animaciones.
 *  - `anim-off`  : el visitante pidio menos movimiento.
 *  - `intro-visto`: la secuencia de carga ya se vio en esta sesion.
 */
const BOOT = `(function(){var d=document.documentElement;d.classList.add('js');try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('anim-off');if(sessionStorage.getItem('${INTRO_KEY}'))d.classList.add('intro-visto')}catch(e){}})()`

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className={`${sentient.variable} ${switzer.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLdEstudio()) }}
        />
      </head>
      <body>
        <a
          href="#contenido"
          className="eyebrow sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[110] focus:bg-copper focus:px-5 focus:py-3 focus:text-espresso-deep"
        >
          Saltar al contenido
        </a>

        <Preloader />
        <SmoothScroll />
        <ScrollProgress />
        <Cursor />
        <Header />

        <main id="contenido">{children}</main>

        <Footer />
        <WhatsappFab />
      </body>
    </html>
  )
}
