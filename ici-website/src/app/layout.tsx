import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import './globals.css'
import SiteChromeShell from '@/components/layout/SiteChromeShell'
import { SITE_URL, SITE_OG_IMAGE_PATH, resolveOgImageUrl } from '@/lib/site-url'
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
        url: resolveOgImageUrl(SITE_OG_IMAGE_PATH),
        secureUrl: resolveOgImageUrl(SITE_OG_IMAGE_PATH),
        width: 1200,
        height: 630,
        alt: 'International Coaching Institute — Developing Leaders. Empowering Futures.',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'International Coaching Institute | Become a Certified Coach',
    description:
      'Train and certify as a coach with the International Coaching Institute. One-to-one, online programmes blending coaching craft with psychology and neuroscience.',
    images: [resolveOgImageUrl(SITE_OG_IMAGE_PATH)],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable}`}
    >
      <body className="font-sans bg-white text-brand-navy-700 antialiased">
        <JsonLdScript data={buildOrganizationSchema()} />
        <SiteChromeShell>{children}</SiteChromeShell>
      </body>
    </html>
  )
}
