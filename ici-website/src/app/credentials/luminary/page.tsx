import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata'
import CredentialDetailView from '@/components/credentials/CredentialDetailView';
import { getPublishedPageContent } from '@/lib/content';
import { LUMINARY_CREDENTIAL } from '@/lib/credential-defaults';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/credentials/luminary');
}

export default async function LuminaryPage() {
  const content = await getPublishedPageContent('/credentials/luminary');
  return <CredentialDetailView content={content} defaults={LUMINARY_CREDENTIAL} />;
}
