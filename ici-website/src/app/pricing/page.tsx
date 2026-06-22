import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata';
import PricingPageClient from './PricingPageClient';
import FaqPageJsonLd from '@/components/seo/FaqPageJsonLd';
import { getPublishedPageContent } from '@/lib/content';
import { PRICING_OVERVIEW } from '@/lib/pricing-overview-defaults';

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/pricing');
}

export default async function PricingPage() {
  const content = await getPublishedPageContent('/pricing');

  return (
    <>
      <FaqPageJsonLd cmsSlug="/pricing" faqDefaults={PRICING_OVERVIEW.faqs} />
      <PricingPageClient content={content} />
    </>
  );
}
