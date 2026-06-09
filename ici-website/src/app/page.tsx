import HeroSection          from '@/components/home/HeroSection'
import AnnouncementBanner   from '@/components/home/AnnouncementBanner'
import AudienceCards        from '@/components/home/AudienceCards'
import CredentialPathway    from '@/components/home/CredentialPathway'
import ICIDifference        from '@/components/home/ICIDifference'
import FeaturedProgrammes     from '@/components/home/FeaturedProgrammes'
import Testimonials         from '@/components/home/Testimonials'
import NewsEvents           from '@/components/home/NewsEvents'
import GlobalReachMap       from '@/components/home/GlobalReachMap'
import ApplyCTA             from '@/components/home/ApplyCTA'
import AccreditationLogos   from '@/components/home/AccreditationLogos'
import { getPageContent }   from '@/lib/content'

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
      <Testimonials />
      <GlobalReachMap content={content} />
      <NewsEvents />
      <ApplyCTA content={content} />
    </div>
  )
}
