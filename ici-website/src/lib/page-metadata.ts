import type { Metadata } from 'next';
import { getPublishedPageContent, getGlobalContent } from '@/lib/content';
import { cmsField, stripHtml } from '@/lib/cms-helpers';
import {
  PAGE_SEO_DEFAULTS,
  SITE_DEFAULT_KEYWORDS,
  buildPageKeywordList,
} from '@/lib/page-seo-defaults';
import { resolveMetadataTitle } from '@/lib/metadata-title';
import { SITE_URL, SITE_LOGO_PATH, resolveOgImageUrl } from '@/lib/site-url';
import { getSiteSettings } from '@/lib/data';

const BRAND_SUFFIX_RE = /\s*\|\s*(International Coaching Institute|ICI)\s*$/i;

const SITE_DEFAULT_DESCRIPTION =
  'Train and certify as a coach with the International Coaching Institute. One-to-one, online programmes blending coaching craft with psychology and neuroscience.';

function publicPath(cmsSlug: string): string {
  if (cmsSlug === '/') return '/';
  return cmsSlug.startsWith('/') ? cmsSlug : `/${cmsSlug}`;
}

function contentSeoMap(content: Record<string, string>) {
  return {
    focus_keyword: cmsField(content, 'focus_keyword', ''),
    seo_keywords: cmsField(content, 'seo_keywords', ''),
    meta_keywords: cmsField(content, 'meta_keywords', ''),
  };
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

  const keywordList = buildPageKeywordList(contentSeoMap(content), defaults);
  const keywords =
    keywordList.length > 0 ? keywordList : cmsSlug === '/' ? SITE_DEFAULT_KEYWORDS : undefined;

  const path = publicPath(cmsSlug);
  const canonicalUrl = path === '/' ? SITE_URL : `${SITE_URL}${path}`;
  const ogImage = resolveOgImageUrl(
    cmsField(global, 'default_og_image', '') ||
      siteSettings?.defaultOgImageUrl ||
      SITE_LOGO_PATH,
  );

  const resolvedTitle = resolveMetadataTitle(metaTitle, {
    forceAbsolute: defaults?.absolute === true || cmsSlug === '/',
  });

  const ogTitle =
    typeof resolvedTitle === 'object' && resolvedTitle && 'absolute' in resolvedTitle
      ? resolvedTitle.absolute
      : metaTitle
        ? `${metaTitle.replace(BRAND_SUFFIX_RE, '').trim() || metaTitle} | ICI`
        : undefined;

  const shared: Metadata = {
    description: metaDescription,
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    ...(keywords ? { keywords } : {}),
    openGraph: {
      title: ogTitle,
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
      title: ogTitle,
      description: metaDescription,
      images: [ogImage],
    },
  };

  return {
    ...shared,
    ...(resolvedTitle ? { title: resolvedTitle } : {}),
  };
}
