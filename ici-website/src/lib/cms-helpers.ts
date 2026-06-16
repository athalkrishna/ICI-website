import type { ContentMap } from './content';

export function cmsField(
  content: ContentMap | null | undefined,
  key: string,
  fallback: string,
): string {
  const value = content?.[key];
  return value?.trim() ? value : fallback;
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

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function cmsAnnouncements(content: ContentMap | null | undefined) {
  const items: { _id: string; text: string; link?: string }[] = [];

  for (let i = 1; i <= 3; i++) {
    const text = content?.[`announcement_${i}_text`]?.trim();
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
    const value = content?.[`${prefix}${i}`]?.trim();
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

export function cmsHtml(
  content: ContentMap | null | undefined,
  key: string,
  fallback: string,
): string {
  return cmsField(content, key, fallback);
}

/** Plain text from CMS — strips HTML when a rich-text value is stored. */
export function cmsPlainBody(
  content: ContentMap | null | undefined,
  key: string,
  fallback: string,
): string {
  const value = content?.[key];
  if (!value?.trim()) return fallback;
  return stripHtml(value);
}
