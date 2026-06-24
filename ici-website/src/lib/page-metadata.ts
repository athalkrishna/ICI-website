import type { Metadata } from 'next';
import { getPublishedPageContent, getGlobalContent } from '@/lib/content';
import { cmsField, stripHtml } from '@/lib/cms-helpers';
import { PAGE_SEO_DEFAULTS, approvedKeywordsForPage, buildPageKeywordList } from '@/lib/page-seo-defaults';
import { HOME_SEO_DEFAULTS, HOME_SEO_KEYWORD_LIST, homeCanonicalUrl } from '@/lib/home-seo-defaults';
import { isHomePageSlug } from '@/lib/home-hero-defaults';
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

/** Build Next.js metadata from CMS SEO fields for a page slug. */
export async function pageMetadata(cmsSlug: string): Promise<Metadata> {
  const defaults = PAGE_SEO_DEFAULTS[cmsSlug];
  const [content, global, siteSettings] = await Promise.all([
    getPublishedPageContent(cmsSlug),
    getGlobalContent(),
    getSiteSettings(),
  ]);

  const metaTitle = isHomePageSlug(cmsSlug)
    ? HOME_SEO_DEFAULTS.meta_title
    : cmsField(content, 'meta_title', '') ||
      defaults?.title ||
      cmsField(global, 'default_meta_title', '') ||
      '';

  const metaDescription = isHomePageSlug(cmsSlug)
    ? HOME_SEO_DEFAULTS.meta_description
    : stripHtml(cmsField(content, 'meta_description', '')) ||
      defaults?.description ||
      cmsField(global, 'default_meta_description', SITE_DEFAULT_DESCRIPTION) ||
      SITE_DEFAULT_DESCRIPTION;

  const path = publicPath(cmsSlug);
  const canonicalUrl = isHomePageSlug(cmsSlug) ? homeCanonicalUrl(SITE_URL) : `${SITE_URL}${path}`;
  const ogImage = resolveOgImageUrl(
    cmsField(global, 'default_og_image', '') ||
      siteSettings?.defaultOgImageUrl ||
      SITE_LOGO_PATH,
  );

  const resolvedTitle = resolveMetadataTitle(metaTitle, {
    forceAbsolute: defaults?.absolute === true || isHomePageSlug(cmsSlug),
  });

  const ogTitle =
    typeof resolvedTitle === 'object' && resolvedTitle && 'absolute' in resolvedTitle
      ? resolvedTitle.absolute
      : metaTitle
        ? `${metaTitle.replace(BRAND_SUFFIX_RE, '').trim() || metaTitle} | ICI`
        : undefined;

  const keywords = isHomePageSlug(cmsSlug)
    ? [...HOME_SEO_KEYWORD_LIST]
    : approvedKeywordsForPage(cmsSlug) ??
      buildPageKeywordList(
        {
          focus_keyword: cmsField(content, 'focus_keyword', ''),
          seo_keywords: cmsField(content, 'seo_keywords', ''),
        },
        defaults,
      );

  const shared: Metadata = {
    description: metaDescription,
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    ...(keywords.length > 0 ? { keywords } : {}),
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
