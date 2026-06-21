import type { Metadata } from 'next';
import { getPublishedPageContent, getGlobalContent } from '@/lib/content';
import { cmsField, stripHtml } from '@/lib/cms-helpers';
import { PAGE_SEO_DEFAULTS } from '@/lib/page-seo-defaults';

const SITE_DEFAULT_DESCRIPTION =
  'Train and certify as a coach with the International Coaching Institute. One-to-one, online programmes blending coaching craft with psychology and neuroscience.';

/** Build Next.js metadata from CMS SEO fields for a page slug. */
export async function pageMetadata(cmsSlug: string): Promise<Metadata> {
  const defaults = PAGE_SEO_DEFAULTS[cmsSlug];
  const [content, global] = await Promise.all([
    getPublishedPageContent(cmsSlug),
    getGlobalContent(),
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

  const useAbsolute = defaults?.absolute === true || cmsSlug === '/';

  if (useAbsolute && metaTitle) {
    return {
      title: { absolute: metaTitle },
      description: metaDescription,
    };
  }

  return {
    title: metaTitle || undefined,
    description: metaDescription,
  };
}
