import type { Metadata } from 'next';
import { HOME_SEO_DEFAULTS, HOME_SEO_KEYWORD_LIST } from '@/lib/home-seo-defaults';
import { SITE_URL, SITE_LOGO_PATH, resolveOgImageUrl } from '@/lib/site-url';

/** Sync homepage metadata — no DB fetch, always in initial HTML for crawlers and SEO tools. */
export const HOME_PAGE_METADATA: Metadata = {
  title: { absolute: HOME_SEO_DEFAULTS.meta_title },
  description: HOME_SEO_DEFAULTS.meta_description,
  keywords: [...HOME_SEO_KEYWORD_LIST],
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: HOME_SEO_DEFAULTS.meta_title,
    description: HOME_SEO_DEFAULTS.meta_description,
    url: SITE_URL,
    type: 'website',
    siteName: 'International Coaching Institute',
    locale: 'en_GB',
    images: [
      {
        url: resolveOgImageUrl(SITE_LOGO_PATH),
        width: 1200,
        height: 630,
        alt: 'International Coaching Institute logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_SEO_DEFAULTS.meta_title,
    description: HOME_SEO_DEFAULTS.meta_description,
    images: [resolveOgImageUrl(SITE_LOGO_PATH)],
  },
};
