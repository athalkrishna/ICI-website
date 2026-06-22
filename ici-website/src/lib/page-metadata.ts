import type { Metadata } from 'next';
import { getPublishedPageContent, getGlobalContent } from '@/lib/content';
import { cmsField, stripHtml } from '@/lib/cms-helpers';
import { PAGE_SEO_DEFAULTS, SITE_DEFAULT_KEYWORDS } from '@/lib/page-seo-defaults';
import { SITE_URL, SITE_LOGO_PATH } from '@/lib/site-url';
import { getSiteSettings } from '@/lib/data';

const SITE_DEFAULT_DESCRIPTION =
  'Train and certify as a coach with the International Coaching Institute. One-to-one, online programmes blending coaching craft with psychology and neuroscience.';

function parseKeywords(raw: string | undefined): string[] | undefined {
  if (!raw?.trim()) return undefined;
  const list = raw.split(',').map((k) => k.trim()).filter(Boolean);
  return list.length > 0 ? list : undefined;
}

function publicPath(cmsSlug: string): string {
  if (cmsSlug === '/') return '/';
  return cmsSlug.startsWith('/') ? cmsSlug : `/${cmsSlug}`;
}

/** Build Next.js metadata from CMS SEO fields for a page slug. */
export async function pageMetadata(cmsSlug: string): Promise<Metadata> {
  const defaults = PAGE_SEO_DEFAULTS[cmsSlug];
  const [content, global, siteSettings] = await Promise.all([
    getPublishedPageContent(cmsSlug),
    getGlobalContent(),
    getSiteSettings(),
  ]);

  const metaTitle =
    cmsField(content, 'meta_title', '') ||
    defaults?.title ||
    cmsField(global, 'default_meta_title', '') ||
    '';

  const metaDescription =
    stripHtml(cmsField(content, 'meta_description', '')) ||
    defaults?.description ||
    cmsField(global, 'default_meta_description', SITE_DEFAULT_DESCRIPTION) ||
    SITE_DEFAULT_DESCRIPTION;

  const keywords =
    parseKeywords(cmsField(content, 'meta_keywords', '')) ||
    parseKeywords(defaults?.keywords) ||
    (cmsSlug === '/' ? SITE_DEFAULT_KEYWORDS : undefined);

  const useAbsolute = defaults?.absolute === true || cmsSlug === '/';
  const path = publicPath(cmsSlug);
  const canonicalUrl = path === '/' ? SITE_URL : `${SITE_URL}${path}`;
  const ogImage =
    cmsField(global, 'default_og_image', '') ||
    siteSettings?.defaultOgImageUrl ||
    SITE_LOGO_PATH;

  const shared: Metadata = {
    description: metaDescription,
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    ...(keywords ? { keywords } : {}),
    openGraph: {
      title: metaTitle || undefined,
      description: metaDescription,
      url: canonicalUrl,
      type: 'website',
      siteName: 'International Coaching Institute',
      locale: 'en_GB',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: metaTitle || 'International Coaching Institute logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle || undefined,
      description: metaDescription,
      images: [ogImage],
    },
  };

  if (useAbsolute && metaTitle) {
    return { ...shared, title: { absolute: metaTitle } };
  }

  return {
    ...shared,
    title: metaTitle || undefined,
  };
}
