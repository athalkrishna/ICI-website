import HeroSection          from '@/components/home/HeroSection'
import AnnouncementBanner   from '@/components/home/AnnouncementBanner'
import AudienceCards        from '@/components/home/AudienceCards'
import CredentialPathway    from '@/components/home/CredentialPathway'
import ICIDifference        from '@/components/home/ICIDifference'
import FeaturedPrograms     from '@/components/home/FeaturedPrograms'
import Testimonials         from '@/components/home/Testimonials'
import NewsEvents           from '@/components/home/NewsEvents'
import GlobalReachMap       from '@/components/home/GlobalReachMap'
import ApplyCTA             from '@/components/home/ApplyCTA'
import AccreditationLogos   from '@/components/home/AccreditationLogos'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBanner />
      <HeroSection />
      <AccreditationLogos />
      <AudienceCards />
      <CredentialPathway />
      <ICIDifference />
      <FeaturedPrograms />
      <Testimonials />
      <GlobalReachMap />
      <NewsEvents />
      <ApplyCTA />
    </div>
  )
}
