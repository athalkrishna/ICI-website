import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata'
import { Scale, Shield, TrendingUp, BarChart } from 'lucide-react';
import ProgrammeSpecialisationView from '@/components/programmes/ProgrammeSpecialisationView';
import { getPublishedPageContent } from '@/lib/content';
import { EXECUTIVE_COACHING } from '@/lib/programme-defaults';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/programmes/executive-coaching');
}

export default async function ExecutiveCoachingPage() {
  const content = await getPublishedPageContent('/programmes/executive-coaching');

  return (
    <ProgrammeSpecialisationView
      content={content}
      defaults={EXECUTIVE_COACHING}
      learnIcons={[
        <Scale key="0" size={24} />,
        <Shield key="1" size={24} />,
        <TrendingUp key="2" size={24} />,
        <BarChart key="3" size={24} />,
      ]}
    />
  );
}
