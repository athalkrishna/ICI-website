import { formatEnumLabel } from '@/lib/admin-utils';

export type BlogPostPreview = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl: string;
  coverImageAlt: string | null;
  category: string;
  publishedAt: Date | string | null;
  authorName: string;
  authorAvatarUrl?: string | null;
  featured?: boolean;
};

export type TocHeading = {
  id: string;
  text: string;
  level: 1 | 2 | 3;
};

export const BLOG_CATEGORIES = [
  'COACHING_INSIGHTS',
  'INSTITUTE_NEWS',
  'RESEARCH',
  'EVENTS_RECAP',
  'ANNOUNCEMENTS',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export function blogCategoryLabel(category: string) {
  return formatEnumLabel(category);
}

export function blogCategoryHref(category: string) {
  return `/blog?category=${encodeURIComponent(category)}`;
}

export function isBlogCategory(value: string | undefined | null): value is BlogCategory {
  return !!value && (BLOG_CATEGORIES as readonly string[]).includes(value);
}

export function parseBlogTags(tags: unknown): string[] {
  if (Array.isArray(tags)) {
    return tags.filter((tag): tag is string => typeof tag === 'string' && tag.trim().length > 0);
  }
  if (typeof tags === 'string') {
    return tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return [];
}

export function blogCategoryCounts(posts: BlogPostPreview[]) {
  const counts = new Map<string, number>();
  for (const post of posts) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  }
  return counts;
}

export function formatBlogDate(date: Date | string | null) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function estimateReadTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = text ? text.split(' ').length : 0;
  return Math.max(1, Math.ceil(words / 200));
}

export function stripHtmlTags(html: string) {
  return html.replace(/<[^>]+>/g, '').trim();
}

export function addHeadingIds(html: string): { html: string; headings: TocHeading[] } {
  const headings: TocHeading[] = [];
  let index = 0;

  const processed = html.replace(
    /<h([123])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (_match, level: string, attrs: string, inner: string) => {
      const id = `blog-section-${index++}`;
      const text = stripHtmlTags(inner);
      if (text) {
        headings.push({ id, text, level: Number(level) as 1 | 2 | 3 });
      }
      const cleanAttrs = attrs.replace(/\sid="[^"]*"/i, '');
      return `<h${level}${cleanAttrs} id="${id}">${inner}</h${level}>`;
    },
  );

  return { html: processed, headings };
}

export function authorInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

/** Hide magazine lead when CMS body already opens with the same paragraph. */
export function resolveBlogLead(lead: string, html: string): { lead: string | undefined; html: string } {
  const trimmedLead = lead.trim();
  if (!trimmedLead) return { lead: undefined, html };

  const firstParagraphMatch = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  const firstParagraph = stripHtmlTags(firstParagraphMatch?.[1] ?? '');

  if (firstParagraph && firstParagraph === trimmedLead) {
    const htmlWithoutDuplicate = html.replace(firstParagraphMatch![0], '').trimStart();
    return { lead: trimmedLead, html: htmlWithoutDuplicate };
  }

  return { lead: trimmedLead, html };
}
