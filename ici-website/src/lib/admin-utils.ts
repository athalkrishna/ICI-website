/** Map friendly admin URL segments to database page slugs. */
const ADMIN_SLUG_TO_DB: Record<string, string> = {
  home: '/',
};

/** Map database slugs to admin URL segments (avoids `%2F` routing issues). */
const DB_SLUG_TO_ADMIN: Record<string, string> = {
  '/': 'home',
};

export function decodePageSlug(raw: string): string {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

/** Resolve an admin route/API slug param to the database slug. */
export function resolvePageSlug(raw: string): string {
  const decoded = decodePageSlug(raw);
  return ADMIN_SLUG_TO_DB[decoded] ?? decoded;
}

export function encodePageSlug(slug: string): string {
  return encodeURIComponent(slug);
}

export function adminRouteSlug(slug: string): string {
  return DB_SLUG_TO_ADMIN[slug] ?? encodePageSlug(slug);
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
