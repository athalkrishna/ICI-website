import type { Metadata } from 'next'
import { Playfair_Display, Montserrat, Source_Serif_4, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { cookies } from 'next/headers'

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
      <body className="font-sans bg-white text-navy-700 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
