import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata';
import PricingPageClient from './PricingPageClient';
import { getPublishedPageContent } from '@/lib/content';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/pricing');
}

export default async function PricingPage() {
  const content = await getPublishedPageContent('/pricing');

  return <PricingPageClient content={content} />;
}
