/** Prisma CMS with legacy slug/key compatibility for unchanged client frontend. */
import { unstable_cache } from 'next/cache';
import {
  getPageContent as getPageContentFromCms,
  getPublishedPageContent as getPublishedPageContentFromCms,
  getGlobalContent as getGlobalContentFromCms,
  slugToPath,
  type ContentMap,
} from './cms';
import { normalizeHomeHeroContent } from './home-hero-defaults';

export type { ContentMap };
export { slugToPath };

export const CMS_REVALIDATE_SECONDS = 300;

const LEGACY_SLUGS: Record<string, string> = {
  home: '/',
  prospectus: '/prospectus',
  'cred-catalyst': '/credentials/catalyst',
  'cred-architect': '/credentials/architect',
  'cred-sage': '/credentials/sage',
  'cred-luminary': '/credentials/luminary',
};

function normalizeSlug(slug: string): string {
  return LEGACY_SLUGS[slug] ?? slug;
}

/** Map Prisma credential fields to legacy mysql-style keys used by client frontend. */
function mapLegacyCredentialFields(slug: string, content: ContentMap): ContentMap {
  if (!slug.startsWith('cred-')) return content;
  return {
    ...content,
    label: content.hero_label ?? content.label ?? '',
    heading: content.hero_heading ?? content.heading ?? '',
    credential: content.programme_level ?? content.credential ?? '',
    body: content.hero_body ?? content.body ?? '',
  };
}

function applyPageContentGuards(slug: string, content: ContentMap): ContentMap {
  const mapped = mapLegacyCredentialFields(slug, content);
  if (slug === 'home' || slug === '/') {
    return normalizeHomeHeroContent(mapped);
  }
  return mapped;
}

export async function getPageContent(
  slug: string,
  options?: { draft?: boolean }
): Promise<ContentMap> {
  if (options?.draft) {
    const normalized = normalizeSlug(slug);
    const content = await getPageContentFromCms(normalized, options);
    if (!content) return applyPageContentGuards(slug, {});
    return applyPageContentGuards(slug, content);
  }

  const normalized = normalizeSlug(slug);
  return unstable_cache(
    async () => {
      const content = await getPageContentFromCms(normalized);
      if (!content) return applyPageContentGuards(slug, {});
      return applyPageContentGuards(slug, content);
    },
    ['page-content', normalized],
    {
      revalidate: CMS_REVALIDATE_SECONDS,
      tags: [`cms:page:${normalized}`],
    },
  )();
}

export async function getPublishedPageContent(slug: string): Promise<ContentMap> {
  const normalized = normalizeSlug(slug);
  return unstable_cache(
    async () => {
      const content = await getPublishedPageContentFromCms(normalized);
      return applyPageContentGuards(slug, content);
    },
    ['published-page-content', normalized],
    {
      revalidate: CMS_REVALIDATE_SECONDS,
      tags: [`cms:page:${normalized}`],
    },
  )();
}

export async function getGlobalContent(): Promise<ContentMap> {
  return unstable_cache(
    async () => getGlobalContentFromCms(),
    ['global-content'],
    {
      revalidate: CMS_REVALIDATE_SECONDS,
      tags: ['cms:global'],
    },
  )();
}
