import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata'
import CredentialDetailView from '@/components/credentials/CredentialDetailView';
import { getPublishedPageContent } from '@/lib/content';
import { ARCHITECT_CREDENTIAL } from '@/lib/credential-defaults';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/credentials/architect');
}

export default async function ArchitectPage() {
  const content = await getPublishedPageContent('/credentials/architect');
  return <CredentialDetailView content={content} defaults={ARCHITECT_CREDENTIAL} />;
}
