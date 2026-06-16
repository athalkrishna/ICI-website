import { Metadata } from 'next';
import CredentialDetailView from '@/components/credentials/CredentialDetailView';
import { getPublishedPageContent } from '@/lib/content';
import { ARCHITECT_CREDENTIAL } from '@/lib/credential-defaults';

export const metadata: Metadata = {
  title: 'ICI Architect Coach (Level 2) | Professional Certification',
  description:
    'Build a thriving, ethical coaching practice. The ICI Architect Coach certification is 60 hours, one-to-one and online: 20 hours coaching plus 40 hours self-work.',
};

export default async function ArchitectPage() {
  const content = await getPublishedPageContent('/credentials/architect');
  return <CredentialDetailView content={content} defaults={ARCHITECT_CREDENTIAL} />;
}
