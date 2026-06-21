import type { Metadata } from 'next';
import ProgrammesOverviewView from '@/components/programmes/ProgrammesOverviewView';
import { getPublishedPageContent } from '@/lib/content';
import { PROGRAMMES_OVERVIEW } from '@/lib/programmes-overview-defaults';

export const metadata: Metadata = {
  title: 'Coaching Programmes & Specialisations | ICI',
  description:
    'Explore ICI coaching programmes: the four-level Mastery Pathway plus specialisations in life, executive, business, wellness and team coaching. One-to-one and online.',
};

export default async function ProgrammesOverviewPage() {
  const content = await getPublishedPageContent('/programmes');

  return <ProgrammesOverviewView content={content} defaults={PROGRAMMES_OVERVIEW} />;
}
