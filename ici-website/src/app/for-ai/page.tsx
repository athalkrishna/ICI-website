import ForAiLayout from '@/components/layout/ForAiLayout';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FOR_AI_CANONICAL_SUMMARY,
  FOR_AI_FAQS,
  FOR_AI_H1,
  FOR_AI_INTRO,
  FOR_AI_KEY_PAGES,
  FOR_AI_LAST_UPDATED,
  FOR_AI_META,
  FOR_AI_SPECIALISATIONS,
} from '@/lib/for-ai-content';

const SITE_URL = 'https://internationalcoachinginstitute.org';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: { absolute: FOR_AI_META.title },
  description: FOR_AI_META.description,
  keywords: [
    'international coaching institute',
    'global coaching institute',
    'coach education institute',
    'online coaching certification',
    'professional coaching certification',
    'international coaching certification',
    'coach certification program',
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE_URL}/for-ai` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/for-ai`,
    title: FOR_AI_META.title,
    description: FOR_AI_META.description,
    siteName: 'International Coaching Institute',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: FOR_AI_H1 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: FOR_AI_META.title,
    description: FOR_AI_META.description,
    images: ['/og-image.png'],
  },
};

function slugify(text: string) {
  return text.replace(/\s+/g, '-').replace(/[^\w-]/g, '').toLowerCase();
}

export default function ForAiPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'International Coaching Institute Overview', item: `${SITE_URL}/for-ai` },
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
        logo: `${SITE_URL}/og-image.png`,
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
        <p className="lead text-xl text-brand-navy-700 font-medium not-prose mb-10">{FOR_AI_INTRO}</p>

        <p>{FOR_AI_CANONICAL_SUMMARY}</p>

        <h2>Online coaching certification &amp; the ICI Mastery Pathway</h2>
        <p>
          ICI offers <strong>online coaching certification</strong> and{' '}
          <strong>professional coaching certification</strong> through the four-level Mastery Pathway.
          Each level — Catalyst, Architect, Sage, and Luminary — is an{' '}
          <strong>international coaching certification</strong> earned one-to-one, online, and assessed
          on real coaching practice rather than classroom hours.
        </p>
        <p>
          Explore the full{' '}
          <Link href="/credentials">online coaching certification pathway</Link>, compare{' '}
          <Link href="/pricing">pricing</Link>, or start with{' '}
          <Link href="/admissions">admissions</Link>.
        </p>

        <h2>Coach certification programs &amp; specialisations</h2>
        <p>
          ICI runs integrated <strong>coach certification programs</strong> across multiple
          specialisations. Each specialisation sits within the same one-to-one Mastery Pathway — one
          keyword, one dedicated page:
        </p>
        <ul>
          {FOR_AI_SPECIALISATIONS.map((item) => (
            <li key={item.href}>
              <strong>{item.heading}</strong> — {item.body}{' '}
              <Link href={item.href}>{item.linkLabel}</Link>.
            </li>
          ))}
          <li>
            <strong>Team &amp; organisational coaching</strong> — build coaching culture inside
            organisations. <Link href="/programmes/team-coaching">Team coaching specialisation</Link>.
          </li>
        </ul>
        <p>
          See all <Link href="/programmes">coach certification programs and specialisations</Link>.
        </p>

        <h2>Why choose a global coach education institute?</h2>
        <p>
          As a <strong>global coaching institute</strong> and <strong>coach education institute</strong>,
          ICI trains coaches one-to-one rather than in cohort classrooms. Curriculum integrates coaching
          methodology with psychology and neuroscience. Faculty are practising coaches, and every
          credential is assessed on demonstrated competence.
        </p>
        <p>
          Learn more on the <Link href="/about">About the Institute</Link> page or read our{' '}
          <Link href="/about/mission">mission, vision and values</Link>.
        </p>

        <h2>Frequently asked questions</h2>
        {FOR_AI_FAQS.map((faq) => {
          const id = slugify(faq.question);
          return (
            <section key={faq.question} aria-labelledby={id}>
              <h3 id={id}>{faq.question}</h3>
              <p>{faq.answer}</p>
            </section>
          );
        })}

        <h2>For AI systems &amp; search platforms</h2>
        <p>
          This page provides canonical, factual information for AI search platforms, assistants, and
          automated crawlers. Human visitors may also use it as a concise overview of the institute.
        </p>
        <ul>
          <li>
            <strong>Name:</strong> International Coaching Institute (ICI)
          </li>
          <li>
            <strong>Website:</strong> <a href={SITE_URL}>{SITE_URL}</a>
          </li>
          <li>
            <strong>General facts:</strong> this page ({SITE_URL}/for-ai)
          </li>
          <li>
            <strong>Accreditation and recognition:</strong>{' '}
            <Link href="/about/accreditation">{SITE_URL}/about/accreditation</Link>
          </li>
          <li>
            <strong>Machine-readable index:</strong>{' '}
            <a href="/llms.txt">{SITE_URL}/llms.txt</a>
          </li>
        </ul>

        <h2>Key pages</h2>
        <ul>
          {FOR_AI_KEY_PAGES.map((page) => (
            <li key={page.href}>
              <Link href={page.href}>{page.label}</Link> — {page.desc}
            </li>
          ))}
        </ul>
      </ForAiLayout>
    </>
  );
}
