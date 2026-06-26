import type { Metadata } from 'next';
import { HOME_SEO_DEFAULTS, homeCanonicalUrl } from '@/lib/home-seo-defaults';
import { SITE_URL, SITE_OG_IMAGE_PATH, resolveOgImageUrl } from '@/lib/site-url';

/** Sync homepage metadata — no DB fetch, always in initial HTML for crawlers and SEO tools. */
export const HOME_PAGE_METADATA: Metadata = {
  title: { absolute: HOME_SEO_DEFAULTS.meta_title },
  description: HOME_SEO_DEFAULTS.meta_description,
  alternates: { canonical: homeCanonicalUrl(SITE_URL) },
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
    url: homeCanonicalUrl(SITE_URL),
    type: 'website',
    siteName: 'International Coaching Institute',
    locale: 'en_GB',
    images: [
      {
        url: resolveOgImageUrl(SITE_OG_IMAGE_PATH),
        secureUrl: resolveOgImageUrl(SITE_OG_IMAGE_PATH),
        width: 1024,
        height: 1024,
        alt: 'International Coaching Institute — Developing Leaders. Empowering Futures.',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_SEO_DEFAULTS.meta_title,
    description: HOME_SEO_DEFAULTS.meta_description,
    images: [resolveOgImageUrl(SITE_OG_IMAGE_PATH)],
  },
};
