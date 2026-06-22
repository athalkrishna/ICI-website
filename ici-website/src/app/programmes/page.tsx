import type { Metadata } from 'next';
import ProgrammesOverviewView from '@/components/programmes/ProgrammesOverviewView';
import { getPublishedPageContent } from '@/lib/content';
import { pageMetadata } from '@/lib/page-metadata';
import { PROGRAMMES_OVERVIEW } from '@/lib/programmes-overview-defaults';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/programmes');
}

export default async function ProgrammesOverviewPage() {
  const content = await getPublishedPageContent('/programmes');

  return <ProgrammesOverviewView content={content} defaults={PROGRAMMES_OVERVIEW} />;
}
