import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata'
import CredentialDetailView from '@/components/credentials/CredentialDetailView';
import { getPublishedPageContent } from '@/lib/content';
import { SAGE_CREDENTIAL } from '@/lib/credential-defaults';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/credentials/sage');
}

export default async function SagePage() {
  const content = await getPublishedPageContent('/credentials/sage');
  return <CredentialDetailView content={content} defaults={SAGE_CREDENTIAL} />;
}
