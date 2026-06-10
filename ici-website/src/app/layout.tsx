import type { Metadata } from 'next'
import { Playfair_Display, Montserrat, Source_Serif_4, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import TopBar from '@/components/layout/TopBar'
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
    'ICI is the world\'s leading provider of professional coaching certification, trusted by 25,000+ coaches in 60+ countries. Earn your IAC, IPC, or IMC credential.',
  keywords: ['coaching certification', 'life coach training', 'executive coaching', 'ICF accredited', 'professional coaching institute'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://internationalcoachinginstitute.org',
    siteName: 'International Coaching Institute',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const isLoggedIn = cookieStore.get('ici_mock_auth')?.value === 'true'

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable} ${sourceSerif.variable} ${jetbrains.variable}`}
    >
      <body className="font-sans bg-white text-navy-700 antialiased">
        <TopBar isLoggedIn={isLoggedIn} />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
