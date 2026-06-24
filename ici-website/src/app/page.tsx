import HeroSection from '@/components/home/HeroSection'
import AnnouncementBanner from '@/components/home/AnnouncementBanner'
import AccreditationLogos from '@/components/home/AccreditationLogos'
import type { Metadata } from 'next'
import AudienceCards from '@/components/home/AudienceCards'
import CredentialPathway from '@/components/home/CredentialPathway'
import ICIDifference from '@/components/home/ICIDifference'
import FeaturedProgrammes from '@/components/home/FeaturedProgrammes'
import Testimonials from '@/components/home/Testimonials'
import GlobalReachMap from '@/components/home/GlobalReachMap'
import LatestBlogPosts from '@/components/home/LatestBlogPosts'
import ApplyCTA from '@/components/home/ApplyCTA'
import { HOME_PAGE_METADATA } from '@/lib/home-metadata'
import { getPageContent } from '@/lib/content'
import { cmsAnnouncements } from '@/lib/cms-helpers'
import { getLatestBlogPosts } from '@/lib/data'

export const metadata: Metadata = HOME_PAGE_METADATA;

export const dynamic = 'force-static';

export default async function Home() {
  const [content, latestPosts] = await Promise.all([
    getPageContent('home'),
    getLatestBlogPosts(3),
  ]);

  const fallbackAnnouncements = [
    { _id: '1', text: 'Enrolment is open now. Begin any month, one-to-one.', link: '/apply' },
    { _id: '2', text: 'Now enrolling worldwide: one-to-one, online coaching certification.', link: '/credentials' },
    { _id: '3', text: 'The ICI Mastery Pathway, from Catalyst to Luminary. Explore the credentials.', link: '/credentials' },
  ];

  const cmsItems = cmsAnnouncements(content);
  const announcements = cmsItems.length > 0 ? cmsItems : fallbackAnnouncements;

  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBanner announcements={announcements} />
      <HeroSection />
      <AccreditationLogos />
      <AudienceCards content={content} />
      <CredentialPathway content={content} />
      <ICIDifference content={content} />
      <FeaturedProgrammes content={content} />
      <Testimonials />
      <GlobalReachMap content={content} />
      <LatestBlogPosts posts={latestPosts} content={content} />
      <ApplyCTA content={content} />
    </div>
  )
}
