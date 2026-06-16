/** Prisma CMS with legacy slug/key compatibility for unchanged client frontend. */
import {
  getPageContent as getPageContentFromCms,
  getPublishedPageContent as getPublishedPageContentFromCms,
  getGlobalContent as getGlobalContentFromCms,
  slugToPath,
  type ContentMap,
} from './cms';

export type { ContentMap };
export { slugToPath, getGlobalContentFromCms as getGlobalContent };

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

export async function getPageContent(
  slug: string,
  options?: { draft?: boolean }
): Promise<ContentMap> {
  const normalized = normalizeSlug(slug);
  const content = await getPageContentFromCms(normalized, options);
  if (!content) return {};
  return mapLegacyCredentialFields(slug, content);
}

export async function getPublishedPageContent(slug: string): Promise<ContentMap> {
  const normalized = normalizeSlug(slug);
  const content = await getPublishedPageContentFromCms(normalized);
  return mapLegacyCredentialFields(slug, content);
}
