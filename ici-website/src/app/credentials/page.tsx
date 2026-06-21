import type { Metadata } from 'next';
import CredentialsOverviewView from '@/components/credentials/CredentialsOverviewView';
import { getPublishedPageContent } from '@/lib/content';
import { CREDENTIALS_OVERVIEW } from '@/lib/credentials-overview-defaults';

export const metadata: Metadata = {
  title: 'The ICI Mastery Pathway: Coaching Certifications',
  description:
    'Four progressive coaching certifications, taught one-to-one and online: Catalyst, Architect, Sage and Luminary. A credential that grows with your career.',
};

export default async function CredentialsPage() {
  const content = await getPublishedPageContent('/credentials');

  return <CredentialsOverviewView content={content} defaults={CREDENTIALS_OVERVIEW} />;
}
