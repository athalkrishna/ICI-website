import { Metadata } from 'next';
import CredentialDetailView from '@/components/credentials/CredentialDetailView';
import { getPublishedPageContent } from '@/lib/content';
import { LUMINARY_CREDENTIAL } from '@/lib/credential-defaults';

export const metadata: Metadata = {
  title: 'ICI Luminary (Level 4) | The Highest Coaching Distinction',
  description:
    'The ICI Luminary is our highest distinction. 120 hours, one-to-one, for master coaches who shape the field, mentor others and make an original contribution to coaching.',
};

export default async function LuminaryPage() {
  const content = await getPublishedPageContent('/credentials/luminary');
  return <CredentialDetailView content={content} defaults={LUMINARY_CREDENTIAL} />;
}
