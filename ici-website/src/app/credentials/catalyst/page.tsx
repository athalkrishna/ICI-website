import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata'
import CredentialDetailView from '@/components/credentials/CredentialDetailView';
import { getPublishedPageContent } from '@/lib/content';
import { CATALYST_CREDENTIAL } from '@/lib/credential-defaults';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/credentials/catalyst');
}

export default async function CatalystPage() {
  const content = await getPublishedPageContent('/credentials/catalyst');
  return <CredentialDetailView content={content} defaults={CATALYST_CREDENTIAL} />;
}
