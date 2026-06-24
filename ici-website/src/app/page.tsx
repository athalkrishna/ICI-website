import HeroSection from '@/components/home/HeroSection'
import AnnouncementBanner from '@/components/home/AnnouncementBanner'
import AccreditationLogos from '@/components/home/AccreditationLogos'
import type { Metadata } from 'next'
import nextDynamic from 'next/dynamic'
import { HOME_PAGE_METADATA } from '@/lib/home-metadata'
import { getPageContent } from '@/lib/content'
import { cmsAnnouncements } from '@/lib/cms-helpers'
import { getLatestBlogPosts } from '@/lib/data'

const AudienceCards    = nextDynamic(() => import('@/components/home/AudienceCards'),    { ssr: false, loading: () => null })
const CredentialPathway = nextDynamic(() => import('@/components/home/CredentialPathway'), { ssr: false, loading: () => null })
const ICIDifference    = nextDynamic(() => import('@/components/home/ICIDifference'),    { ssr: false, loading: () => null })
const FeaturedProgrammes = nextDynamic(() => import('@/components/home/FeaturedProgrammes'), { ssr: false, loading: () => null })
const Testimonials     = nextDynamic(() => import('@/components/home/Testimonials'),     { ssr: false, loading: () => null })
const GlobalReachMap   = nextDynamic(() => import('@/components/home/GlobalReachMap'),   { ssr: false, loading: () => null })
const LatestBlogPosts  = nextDynamic(() => import('@/components/home/LatestBlogPosts'),  { ssr: false, loading: () => null })
const ApplyCTA         = nextDynamic(() => import('@/components/home/ApplyCTA'),         { ssr: false, loading: () => null })

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
