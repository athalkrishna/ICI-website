import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import './globals.css'
import SiteChromeShell from '@/components/layout/SiteChromeShell'
import { SITE_URL, SITE_LOGO_PATH, resolveOgImageUrl } from '@/lib/site-url'
import { buildOrganizationSchema } from '@/lib/structured-data'
import JsonLdScript from '@/components/seo/JsonLdScript'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['700'],
  adjustFontFallback: true,
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '600'],
  adjustFontFallback: true,
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A1F44',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'International Coaching Institute | Become a Certified Coach',
  },
  description:
    'Train and certify as a coach with the International Coaching Institute. One-to-one, online programmes blending coaching craft with psychology and neuroscience.',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'International Coaching Institute',
    images: [
      {
        url: resolveOgImageUrl(SITE_LOGO_PATH),
        alt: 'International Coaching Institute logo',
      },
    ],
  },
}

import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable}`}
    >
      <body className="font-sans bg-white text-brand-navy-700 antialiased">
        <GoogleAnalytics gaId="G-R2SJ4387X5" />
        <JsonLdScript data={buildOrganizationSchema()} />
        <SiteChromeShell>{children}</SiteChromeShell>
      </body>
    </html>
  )
}
