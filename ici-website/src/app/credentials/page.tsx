import type { Metadata } from 'next';
import CredentialsOverviewView from '@/components/credentials/CredentialsOverviewView';
import { getPublishedPageContent } from '@/lib/content';
import { pageMetadata } from '@/lib/page-metadata';
import { CREDENTIALS_OVERVIEW } from '@/lib/credentials-overview-defaults';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/credentials');
}

export default async function CredentialsPage() {
  const content = await getPublishedPageContent('/credentials');

  return <CredentialsOverviewView content={content} defaults={CREDENTIALS_OVERVIEW} />;
}
