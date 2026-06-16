import { Metadata } from 'next';
import CredentialDetailView from '@/components/credentials/CredentialDetailView';
import { getPublishedPageContent } from '@/lib/content';
import { SAGE_CREDENTIAL } from '@/lib/credential-defaults';

export const metadata: Metadata = {
  title: 'ICI Sage Coach (Level 3) | Senior Coach Certification',
  description:
    'Coach with depth, range and presence. The ICI Sage Coach certification is 90 hours, one-to-one and online: 30 hours with a master coach plus 60 hours self-work.',
};

export default async function SagePage() {
  const content = await getPublishedPageContent('/credentials/sage');
  return <CredentialDetailView content={content} defaults={SAGE_CREDENTIAL} />;
}
