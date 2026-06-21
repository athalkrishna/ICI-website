/** Map friendly admin URL segments to database page slugs. */
const ADMIN_SLUG_TO_DB: Record<string, string> = {
  home: '/',
  global: 'global',
};

/** Map database slugs to admin URL path (without /admin/pages prefix). */
const DB_SLUG_TO_ADMIN: Record<string, string> = {
  '/': 'home',
  global: 'global',
};

export function decodePageSlug(raw: string): string {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

function slugPartsFromRaw(raw: string | string[]): string[] {
  const parts = (Array.isArray(raw) ? raw : [raw]).map(decodePageSlug).filter(Boolean);
  if (parts.length === 1 && parts[0].startsWith('/')) {
    // Legacy links used encodeURIComponent('/about') → "%2Fabout"
    return parts[0].replace(/^\/+/, '').split('/').filter(Boolean);
  }
  return parts;
}

/** Resolve an admin route/API slug param to the database slug. */
export function resolvePageSlug(raw: string | string[]): string {
  const parts = slugPartsFromRaw(raw);
  const path = parts.join('/');

  if (!path || path === 'home') return '/';
  if (ADMIN_SLUG_TO_DB[path]) return ADMIN_SLUG_TO_DB[path];

  return path.startsWith('/') ? path : `/${path}`;
}

/** Convert a database slug to admin URL segments (no leading slash). */
export function adminRouteSlug(slug: string): string {
  if (DB_SLUG_TO_ADMIN[slug]) return DB_SLUG_TO_ADMIN[slug];
  return slug.startsWith('/') ? slug.slice(1) : slug;
}

export function slugToPreviewPath(slug: string): string {
  if (slug === '/') return '/';
  if (slug === 'global') return '/';
  return slug.startsWith('/') ? slug : `/${slug}`;
}

export function pageEditorHref(slug: string): string {
  return `/admin/pages/${adminRouteSlug(slug)}`;
}

export function pageApiPath(slug: string): string {
  return `/api/admin/pages/${adminRouteSlug(slug)}`;
}

export function pagePublishApiPath(slug: string): string {
  return `/api/admin/pages/publish/${adminRouteSlug(slug)}`;
}

export function pageVersionsApiPath(slug: string): string {
  return `/api/admin/pages/versions/${adminRouteSlug(slug)}`;
}

export function pageRestoreApiPath(slug: string, versionId: string): string {
  return `/api/admin/pages/restore/${versionId}/${adminRouteSlug(slug)}`;
}

export function formatPageSlugLabel(slug: string): string {
  if (slug === '/') return 'Home (/)';
  return slug;
}

export function formatEnumLabel(value: string): string {
  return value
    .split('_')
    .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
    .join(' ');
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions) {
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...options,
  });
}

export function formatDateTime(date: string | Date) {
  return new Date(date).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

type SectionField = { section: string; order: number };

/** Group CMS fields into sections in top-to-bottom page order (by field `order`). */
export function groupFieldsBySection<T extends SectionField>(fields: T[]): [string, T[]][] {
  const sorted = [...fields].sort((a, b) => a.order - b.order);
  const map = new Map<string, T[]>();

  for (const field of sorted) {
    const section = field.section?.trim() || 'General';
    if (!map.has(section)) map.set(section, []);
    map.get(section)!.push(field);
  }

  return Array.from(map.entries());
}
