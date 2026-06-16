import { Metadata } from 'next';
import { Heart, Ear, BrainCircuit, Target } from 'lucide-react';
import ProgrammeSpecialisationView from '@/components/programmes/ProgrammeSpecialisationView';
import { getPublishedPageContent } from '@/lib/content';
import { CERTIFIED_LIFE_COACH } from '@/lib/programme-defaults';

export const metadata: Metadata = {
  title: 'Life Coaching Specialisation | ICI',
  description:
    'Train as a life coach with ICI. Learn to guide clients through real change, one-to-one and online, within the four-level Mastery Pathway.',
};

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
