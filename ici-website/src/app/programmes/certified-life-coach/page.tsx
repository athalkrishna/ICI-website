import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata'
import { Heart, Ear, BrainCircuit, Target } from 'lucide-react';
import ProgrammeSpecialisationView from '@/components/programmes/ProgrammeSpecialisationView';
import { getPublishedPageContent } from '@/lib/content';
import { CERTIFIED_LIFE_COACH } from '@/lib/programme-defaults';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/programmes/certified-life-coach');
}

export default async function LifeCoachingPage() {
  const content = await getPublishedPageContent('/programmes/certified-life-coach');

  return (
    <ProgrammeSpecialisationView
      content={content}
      defaults={CERTIFIED_LIFE_COACH}
      learnIcons={[
        <Heart key="0" size={24} />,
        <Ear key="1" size={24} />,
        <BrainCircuit key="2" size={24} />,
        <Target key="3" size={24} />,
      ]}
    />
  );
}
