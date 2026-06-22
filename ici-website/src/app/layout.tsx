import type { Metadata } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import './globals.css'
import SiteChromeShell from '@/components/layout/SiteChromeShell'
import { SITE_URL } from '@/lib/site-url'
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'International Coaching Institute | World-Class Coaching Education',
    template: '%s | International Coaching Institute',
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
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'International Coaching Institute',
      },
    ],
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
