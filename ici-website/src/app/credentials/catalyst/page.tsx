import { Metadata } from 'next';
import CredentialDetailView from '@/components/credentials/CredentialDetailView';
import { getPublishedPageContent } from '@/lib/content';
import { CATALYST_CREDENTIAL } from '@/lib/credential-defaults';

export const metadata: Metadata = {
  title: 'ICI Catalyst Coach (Level 1) | One-to-One Coach Training',
  description:
    'Become an ICI Catalyst Coach. A one-to-one, online foundation certification: 12 hours of coaching with a professional coach plus 24 hours of guided self-work.',
};

export default async function CatalystPage() {
  const content = await getPublishedPageContent('/credentials/catalyst');
  return <CredentialDetailView content={content} defaults={CATALYST_CREDENTIAL} />;
}
