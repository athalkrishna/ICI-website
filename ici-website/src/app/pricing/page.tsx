import { Metadata } from 'next';
import PricingPageClient from './PricingPageClient';
import { getPublishedPageContent } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Pricing | International Coaching Institute',
  description:
    'Honest pricing for serious coaching training. One-to-one, online Mastery Pathway levels from Catalyst to Luminary. Complete prices, no hidden fees.',
};

export default async function PricingPage() {
  const content = await getPublishedPageContent('/pricing');

  return <PricingPageClient content={content} />;
}
