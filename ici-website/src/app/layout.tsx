import type { Metadata } from 'next'
import { Playfair_Display, Montserrat, Source_Serif_4, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { cookies } from 'next/headers'
import { GoogleAnalytics } from '@next/third-parties/google'
import MetaPixel from '@/components/MetaPixel'
import CookieNotice from '@/components/shared/CookieNotice'
import { getGlobalContent } from '@/lib/content'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'International Coaching Institute | World-Class Coaching Education',
    template: '%s | International Coaching Institute',
  },
  description:
    'Train and certify as a coach with the International Coaching Institute. One-to-one, online programmes blending coaching craft with psychology and neuroscience.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://internationalcoachinginstitute.org',
    siteName: 'International Coaching Institute',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'International Coaching Institute',
      },
    ],
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const isLoggedIn = cookieStore.get('ici_mock_auth')?.value === 'true'
  let globalContent = {}
  try {
    globalContent = await getGlobalContent()
  } catch (error) {
    console.warn('[layout] getGlobalContent failed:', error)
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'International Coaching Institute',
    url: 'https://internationalcoachinginstitute.org',
    logo: 'https://internationalcoachinginstitute.org/og-image.png',
    description: 'World-Class Coaching Education. One-to-one, online programmes blending coaching craft with psychology and neuroscience.',
    sameAs: [
      'https://www.linkedin.com/school/internationalcoachinginstitute'
    ]
  }

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable} ${sourceSerif.variable} ${jetbrains.variable}`}
    >
      <body className="font-sans bg-white text-brand-navy-700 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        <MetaPixel />
        <Navbar isLoggedIn={isLoggedIn} globalContent={globalContent} />
        <main id="main-content">{children}</main>
        <Footer globalContent={globalContent} />
        <CookieNotice />
      </body>
    </html>
  )
}
