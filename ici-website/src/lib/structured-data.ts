import { SITE_URL, SITE_LOGO_URL } from '@/lib/site-url';
import { cmsField, stripHtml } from '@/lib/cms-helpers';
import type { ContentMap } from '@/lib/content';
import type { CredentialDetailDefaults } from '@/lib/credential-defaults';
import { PRICING_OVERVIEW } from '@/lib/pricing-overview-defaults';

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

const CREDENTIAL_PRICE_INR: Record<string, number> = Object.fromEntries(
  PRICING_OVERVIEW.pricingRows.map((row) => [`/credentials/${row.slug}`, row.basePriceINR]),
);

const CREDENTIAL_DURATION_ISO: Record<string, string> = {
  '/credentials/catalyst': 'P3M',
  '/credentials/architect': 'P4M',
  '/credentials/sage': 'P6M',
  '/credentials/luminary': 'P12M',
};

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'International Coaching Institute',
    alternateName: 'ICI',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: SITE_LOGO_URL,
    },
    description:
      'World-class coaching education. One-to-one, online programmes blending coaching craft with psychology and neuroscience.',
    email: 'info@internationalcoachinginstitute.org',
    sameAs: ['https://www.linkedin.com/school/internationalcoachinginstitute'],
  };
}

export function buildCourseSchema(
  cmsSlug: string,
  content: ContentMap,
  defaults: CredentialDetailDefaults,
) {
  const name = cmsField(content, 'hero_heading', defaults.heroHeading);
  const description = stripHtml(cmsField(content, 'hero_body', defaults.heroBody));
  const price = CREDENTIAL_PRICE_INR[cmsSlug];

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${SITE_URL}${cmsSlug}#course`,
    name: `ICI ${name} Coach Certification`,
    description,
    url: `${SITE_URL}${cmsSlug}`,
    provider: { '@id': ORGANIZATION_ID },
    courseMode: 'online',
    educationalLevel: 'Professional certification',
    ...(CREDENTIAL_DURATION_ISO[cmsSlug]
      ? { timeRequired: CREDENTIAL_DURATION_ISO[cmsSlug] }
      : {}),
    ...(price
      ? {
          offers: {
            '@type': 'Offer',
            price: String(price),
            priceCurrency: 'INR',
            url: `${SITE_URL}${defaults.ctaPrimaryLink}`,
            availability: 'https://schema.org/InStock',
            validFrom: new Date().toISOString().slice(0, 10),
          },
        }
      : {}),
  };
}

export type FaqItem = { question: string; answer: string };

export function resolveFaqsFromCms(
  content: ContentMap,
  defaults: { q: string; a: string }[],
): FaqItem[] {
  return defaults.map((faq, i) => {
    const n = i + 1;
    const rawAnswer = cmsField(content, `faq_${n}_answer`, '');
    return {
      question: cmsField(content, `faq_${n}_question`, faq.q),
      answer: rawAnswer.trim() ? stripHtml(rawAnswer) : faq.a,
    };
  });
}

export function buildFaqPageSchema(faqs: FaqItem[], pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
