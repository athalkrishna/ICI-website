import { Metadata } from 'next';
import { Scale, Shield, TrendingUp, BarChart } from 'lucide-react';
import ProgrammeSpecialisationView from '@/components/programmes/ProgrammeSpecialisationView';
import { getPublishedPageContent } from '@/lib/content';
import { EXECUTIVE_COACHING } from '@/lib/programme-defaults';

export const metadata: Metadata = {
  title: 'Executive & Leadership Coaching | ICI',
  description:
    'Train to coach senior leaders with ICI. An executive and leadership focus within the four-level Mastery Pathway, taught one-to-one and online.',
};

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
