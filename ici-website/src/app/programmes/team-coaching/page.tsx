import { Metadata } from 'next';
import { Network, Settings, MessageSquare, LineChart } from 'lucide-react';
import ProgrammeSpecialisationView from '@/components/programmes/ProgrammeSpecialisationView';
import { getPublishedPageContent } from '@/lib/content';
import { TEAM_COACHING } from '@/lib/programme-defaults';

export const metadata: Metadata = {
  title: 'Team & Organisational Coaching | ICI',
  description:
    'Build a coaching culture with ICI. A team and organisational focus within the Mastery Pathway, delivered one-to-one and online.',
};

export default async function TeamCoachingPage() {
  const content = await getPublishedPageContent('/programmes/team-coaching');

  return (
    <ProgrammeSpecialisationView
      content={content}
      defaults={TEAM_COACHING}
      learnIcons={[
        <Network key="0" size={24} />,
        <Settings key="1" size={24} />,
        <MessageSquare key="2" size={24} />,
        <LineChart key="3" size={24} />,
      ]}
    />
  );
}
