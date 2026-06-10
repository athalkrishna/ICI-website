import HeroSection          from '@/components/home/HeroSection'
import AnnouncementBanner   from '@/components/home/AnnouncementBanner'
import AudienceCards        from '@/components/home/AudienceCards'
import CredentialPathway    from '@/components/home/CredentialPathway'
import ICIDifference        from '@/components/home/ICIDifference'
import FeaturedProgrammes     from '@/components/home/FeaturedProgrammes'
import NewsEvents           from '@/components/home/NewsEvents'
import GlobalReachMap       from '@/components/home/GlobalReachMap'
import ApplyCTA             from '@/components/home/ApplyCTA'
import AccreditationLogos   from '@/components/home/AccreditationLogos'
import type { Metadata } from 'next'
import { getPageContent }   from '@/lib/content'

export const metadata: Metadata = {
  title: {
    absolute: 'International Coaching Institute | Become a Certified Coach',
  },
  description: 'Train and certify as a coach with the International Coaching Institute. One-to-one, online programmes blending coaching craft with psychology and neuroscience.',
}

export const revalidate = 60; // Cloudways ISR Strategy: 60-second window

export default async function Home() {
  const content = await getPageContent('home');

  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBanner />
      <HeroSection content={content} />
      <AccreditationLogos />
      <AudienceCards content={content} />
      <CredentialPathway content={content} />
      <ICIDifference content={content} />
      <FeaturedProgrammes />
      <GlobalReachMap content={content} />
      <NewsEvents />
      <ApplyCTA content={content} />
    </div>
  )
}
