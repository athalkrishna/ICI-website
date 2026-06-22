import type { ContentMap } from '@/lib/content';
import AudienceCards from '@/components/home/AudienceCards';
import CredentialPathway from '@/components/home/CredentialPathway';
import ICIDifference from '@/components/home/ICIDifference';
import FeaturedProgrammes from '@/components/home/FeaturedProgrammes';
import Testimonials from '@/components/home/Testimonials';
import GlobalReachMap from '@/components/home/GlobalReachMap';
import ApplyCTA from '@/components/home/ApplyCTA';

/** Below-the-fold home sections — loaded as one deferred chunk on mobile to cut initial JS. */
export default function HomeBelowFoldSections({ content }: { content: ContentMap }) {
  return (
    <>
      <AudienceCards content={content} />
      <CredentialPathway content={content} />
      <ICIDifference content={content} />
      <FeaturedProgrammes content={content} />
      <Testimonials />
      <GlobalReachMap content={content} />
      <ApplyCTA content={content} />
    </>
  );
}
