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
import { getAnnouncements } from '@/lib/queries'

export const metadata: Metadata = {
  title: {
    absolute: 'International Coaching Institute | Become a Certified Coach',
  },
  description: 'Train and certify as a coach with the International Coaching Institute. One-to-one, online programmes blending coaching craft with psychology and neuroscience.',
}

export const dynamic = 'force-dynamic';

export default async function Home() {
  const content = await getPageContent('home');

  const fallbackAnnouncements = [
    { 
      _id: '1', 
      text: 'Enrolment is open now. Begin any month, one-to-one.', 
      link: '/apply' 
    },
    { 
      _id: '2', 
      text: 'Now enrolling worldwide: one-to-one, online coaching certification.', 
      link: '/credentials' 
    },
    { 
      _id: '3', 
      text: 'The ICI Mastery Pathway, from Catalyst to Luminary. Explore the credentials.', 
      link: '/credentials' 
    },
  ];

  let announcements = fallbackAnnouncements;
  try {
    const fetched = await getAnnouncements();
    if (fetched && fetched.length > 0) {
      announcements = fetched;
    }
  } catch (e) {
    // Sanity not yet configured — using fallback
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBanner announcements={announcements} />
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
