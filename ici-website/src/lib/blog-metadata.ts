import type { Metadata } from 'next';
import type { BlogPost } from '@prisma/client';
import { SITE_URL } from '@/lib/site-url';

function parseTags(tags: BlogPost['tags']): string[] {
  if (Array.isArray(tags)) {
    return tags.filter((tag): tag is string => typeof tag === 'string' && tag.trim().length > 0);
  }
  return [];
}

export function buildBlogPostMetadata(post: BlogPost, slug: string): Metadata {
  const url = `${SITE_URL}/blog/${slug}`;
  const displayTitle = post.metaTitle?.trim() || post.title;
  const description = post.metaDescription?.trim() || post.excerpt;
  const keywords = parseTags(post.tags);
  const imageAlt = post.coverImageAlt?.trim() || post.title;
  const useAbsoluteTitle = Boolean(post.metaTitle?.trim());

  const title = useAbsoluteTitle ? { absolute: displayTitle } : displayTitle;

  return {
    title,
    description,
    ...(keywords.length > 0 ? { keywords } : {}),
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      title: displayTitle,
      description,
      url,
      type: 'article',
      siteName: 'International Coaching Institute',
      locale: 'en_GB',
      ...(post.publishedAt ? { publishedTime: post.publishedAt.toISOString() } : {}),
      authors: [post.authorName],
      ...(post.coverImageUrl
        ? {
            images: [
              {
                url: post.coverImageUrl,
                alt: imageAlt,
                width: 1200,
                height: 630,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: post.coverImageUrl ? 'summary_large_image' : 'summary',
      title: displayTitle,
      description,
      ...(post.coverImageUrl ? { images: [post.coverImageUrl] } : {}),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}
