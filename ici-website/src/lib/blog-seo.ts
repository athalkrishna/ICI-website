/** SEO guidance — recommended lengths for UI hints only; no hard editor/API caps. */
export const BLOG_SEO = {
  metaTitle: { recommended: 60 },
  metaDescription: { recommended: 160 },
  excerpt: { recommended: 160 },
  focusKeyword: {},
  /** Soft hint for editors — additional keywords are not capped. */
  seoKeywords: { recommended: 10 },
} as const;

export function parseSeoKeywords(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw
      .filter((k): k is string => typeof k === 'string')
      .map((k) => k.trim())
      .filter(Boolean);
  }
  if (typeof raw === 'string') {
    return raw
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);
  }
  return [];
}

export function seoKeywordsToInput(keywords: unknown): string {
  return parseSeoKeywords(keywords).join(', ');
}

export function buildBlogKeywordList(post: {
  focusKeyword?: string | null;
  seoKeywords?: unknown;
  tags?: unknown;
}): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  const add = (value: string) => {
    const key = value.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      result.push(value);
    }
  };

  if (post.focusKeyword?.trim()) add(post.focusKeyword.trim());
  for (const kw of parseSeoKeywords(post.seoKeywords)) add(kw);
  if (Array.isArray(post.tags)) {
    for (const tag of post.tags) {
      if (typeof tag === 'string' && tag.trim()) add(tag.trim());
    }
  }

  return result;
}

export function isBlogSeoComplete(post: {
  title: string;
  excerpt: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  focusKeyword?: string | null;
}): boolean {
  const title = post.metaTitle?.trim() || post.title.trim();
  const description = post.metaDescription?.trim() || post.excerpt.trim();
  return Boolean(title && description && post.focusKeyword?.trim());
}
