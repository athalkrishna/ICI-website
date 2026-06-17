import type { ContentMap } from './content';

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function looksLikeHtml(value: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

/** Plain text CMS value — strips accidental HTML tags from rich-text fields. */
export function cmsField(
  content: ContentMap | null | undefined,
  key: string,
  fallback: string,
): string {
  const value = content?.[key];
  if (!value?.trim()) return fallback;
  const trimmed = value.trim().replace(/\s+/g, ' ');
  return looksLikeHtml(trimmed) ? stripHtml(trimmed) : trimmed;
}

export function cmsNumber(
  content: ContentMap | null | undefined,
  key: string,
  fallback: number,
): number {
  const raw = content?.[key];
  if (!raw?.trim()) return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function cmsAnnouncements(content: ContentMap | null | undefined) {
  const items: { _id: string; text: string; link?: string }[] = [];

  for (let i = 1; i <= 3; i++) {
    const text = cmsField(content, `announcement_${i}_text`, '');
    if (!text) continue;
    items.push({
      _id: String(i),
      text,
      link: content?.[`announcement_${i}_link`]?.trim() || undefined,
    });
  }

  return items;
}

export const PROGRAMME_INTEREST_MAP: Record<string, string> = {
  'life-coaching': 'LIFE_COACHING',
  'executive-leadership': 'EXECUTIVE_LEADERSHIP',
  'business-coaching': 'BUSINESS_COACHING',
  'health-wellness': 'HEALTH_WELLNESS',
  'team-organisational': 'TEAM_ORGANISATIONAL',
};

export function mapProgrammeInterest(value: string): string {
  return PROGRAMME_INTEREST_MAP[value] ?? 'NOT_SURE';
}

export const CREDENTIAL_LABELS: Record<string, string> = {
  CATALYST: 'ICI-C',
  ARCHITECT: 'ICI-A',
  SAGE: 'ICI-S',
  LUMINARY: 'ICI-L',
};

export function cmsIndexedStrings(
  content: ContentMap | null | undefined,
  prefix: string,
  count: number,
): string[] {
  const items: string[] = [];
  for (let i = 1; i <= count; i++) {
    const value = cmsField(content, `${prefix}${i}`, '');
    if (value) items.push(value);
  }
  return items;
}

/** Resolve indexed CMS fields, falling back to the current hardcoded copy when empty. */
export function cmsIndexedWithFallbacks(
  content: ContentMap | null | undefined,
  prefix: string,
  fallbacks: string[],
): string[] {
  return fallbacks.map((fallback, i) => cmsField(content, `${prefix}${i + 1}`, fallback));
}

/** Raw HTML CMS value — for dangerouslySetInnerHTML blocks only. */
export function cmsHtml(
  content: ContentMap | null | undefined,
  key: string,
  fallback: string,
): string {
  const value = content?.[key];
  return value?.trim() ? value.trim() : fallback;
}

/**
 * Legal pages (terms, privacy) — uses full fallback when CMS still has a short
 * placeholder stub instead of the complete document.
 */
export function cmsLegalHtml(
  content: ContentMap | null | undefined,
  key: string,
  fallback: string,
  legacyStubs: string[] = [],
): string {
  const value = content?.[key]?.trim();
  if (!value) return fallback;

  const normalized = value.replace(/\s+/g, ' ').trim();
  for (const stub of legacyStubs) {
    if (normalized === stub.replace(/\s+/g, ' ').trim()) return fallback;
  }

  if (fallback.includes('<h2>') && !value.includes('<h2>')) {
    return fallback;
  }

  return value;
}

/** @deprecated Use cmsField — kept for call-site clarity. */
export function cmsPlainBody(
  content: ContentMap | null | undefined,
  key: string,
  fallback: string,
): string {
  return cmsField(content, key, fallback);
}

/** Two-line hero heading — avoids duplicating accent text stored in the main heading field. */
export function cmsHeroHeadingLines(
  content: ContentMap | null | undefined,
  headingKey: string,
  accentKey: string,
  headingFallback: string,
  accentFallback: string,
): { line1: string; line2: string | null } {
  const line1 = cmsField(content, headingKey, headingFallback);
  const accent = cmsField(content, accentKey, accentFallback);

  if (!accent || line1.toLowerCase().includes(accent.toLowerCase())) {
    return { line1, line2: null };
  }

  return { line1, line2: accent };
}
