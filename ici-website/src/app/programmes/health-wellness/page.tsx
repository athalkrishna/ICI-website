import { Metadata } from 'next';
import { FlaskConical, Moon, HeartPulse, Stethoscope } from 'lucide-react';
import ProgrammeSpecialisationView from '@/components/programmes/ProgrammeSpecialisationView';
import { getPublishedPageContent } from '@/lib/content';
import { HEALTH_WELLNESS } from '@/lib/programme-defaults';

export const metadata: Metadata = {
  title: 'Health & Wellness Coaching | ICI',
  description:
    'Become a health and wellness coach with ICI. Guide sustainable change in body and mind, one-to-one and online, within the Mastery Pathway.',
};

export default async function HealthWellnessPage() {
  const content = await getPublishedPageContent('/programmes/health-wellness');

  return (
    <ProgrammeSpecialisationView
      content={content}
      defaults={HEALTH_WELLNESS}
      learnIcons={[
        <FlaskConical key="0" size={24} />,
        <Moon key="1" size={24} />,
        <HeartPulse key="2" size={24} />,
        <Stethoscope key="3" size={24} />,
      ]}
    />
  );
}
