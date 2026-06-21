import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata'
import { Briefcase, ArrowUpRight, LineChart, ShieldCheck } from 'lucide-react';
import ProgrammeSpecialisationView from '@/components/programmes/ProgrammeSpecialisationView';
import { getPublishedPageContent } from '@/lib/content';
import { BUSINESS_COACH } from '@/lib/programme-defaults';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/programmes/business-coach');
}

export default async function BusinessCoachingPage() {
  const content = await getPublishedPageContent('/programmes/business-coach');

  return (
    <ProgrammeSpecialisationView
      content={content}
      defaults={BUSINESS_COACH}
      learnIcons={[
        <Briefcase key="0" size={24} />,
        <ArrowUpRight key="1" size={24} />,
        <LineChart key="2" size={24} />,
        <ShieldCheck key="3" size={24} />,
      ]}
    />
  );
}
