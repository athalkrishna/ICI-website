import ForAiLayout from '@/components/layout/ForAiLayout';
import ForAiPageContent from '@/components/for-ai/ForAiPageContent';
import type { Metadata } from 'next';
import {
  FOR_AI_CANONICAL_SUMMARY,
  FOR_AI_FAQS,
  FOR_AI_H1,
  FOR_AI_LAST_UPDATED,
  FOR_AI_META,
} from '@/lib/for-ai-content';
import { SITE_URL, SITE_LOGO_PATH, SITE_LOGO_URL } from '@/lib/site-url';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: { absolute: FOR_AI_META.title },
  description: FOR_AI_META.description,
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE_URL}/for-ai` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/for-ai`,
    title: FOR_AI_META.title,
    description: FOR_AI_META.description,
    siteName: 'International Coaching Institute',
    images: [{ url: SITE_LOGO_PATH, alt: 'International Coaching Institute logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: FOR_AI_META.title,
    description: FOR_AI_META.description,
    images: [SITE_LOGO_PATH],
  },
};

export default function ForAiPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'International Coaching Institute Overview',
            item: `${SITE_URL}/for-ai`,
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/for-ai#webpage`,
        url: `${SITE_URL}/for-ai`,
        name: FOR_AI_H1,
        description: FOR_AI_META.description,
        dateModified: FOR_AI_LAST_UPDATED,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en',
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'International Coaching Institute',
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'EducationalOrganization',
        '@id': `${SITE_URL}/#organization`,
        name: 'International Coaching Institute',
        alternateName: ['ICI', 'International Coaching Institute (ICI)'],
        url: SITE_URL,
        logo: SITE_LOGO_URL,
        description: FOR_AI_CANONICAL_SUMMARY,
        sameAs: ['https://www.linkedin.com/school/internationalcoachinginstitute'],
        areaServed: 'Worldwide',
        knowsAbout: [
          'Online coaching certification',
          'Professional coaching certification',
          'Life coaching',
          'Executive coaching',
          'Business coaching',
          'Health and wellness coaching',
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/for-ai#faq`,
        mainEntity: FOR_AI_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ForAiLayout
        title={FOR_AI_H1}
        subtitle="Global coach education institute"
        lastUpdated={FOR_AI_LAST_UPDATED}
      >
        <ForAiPageContent />
      </ForAiLayout>
    </>
  );
}
