import type { Metadata } from 'next';

const BRAND_SUFFIX_RE = /\s*\|\s*(International Coaching Institute|ICI)(?:\s|$)/i;

/** Avoid double brand suffix from layout template + page title. */
export function resolveMetadataTitle(
  metaTitle: string,
  options?: { forceAbsolute?: boolean },
): Metadata['title'] | undefined {
  const trimmed = metaTitle.trim();
  if (!trimmed) return undefined;

  const topic = trimmed.replace(BRAND_SUFFIX_RE, '').trim() || trimmed;

  if (options?.forceAbsolute || trimmed.includes('|')) {
    return { absolute: `${topic} | ICI` };
  }

  return topic;
}
