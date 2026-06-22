import type { Metadata } from 'next';
import type { BlogPost } from '@prisma/client';
import { SITE_URL, SITE_LOGO_URL } from '@/lib/site-url';

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
  const useAbsoluteTitle = Boolean(post.metaTitle?.trim());

  const title = useAbsoluteTitle ? { absolute: displayTitle } : displayTitle;

  const ogImageUrl = post.coverImageUrl || SITE_LOGO_URL;
  const ogImageAlt = post.coverImageAlt?.trim() || (post.coverImageUrl ? post.title : 'International Coaching Institute logo');

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
      images: [
        {
          url: ogImageUrl,
          alt: ogImageAlt,
          ...(post.coverImageUrl ? { width: 1200, height: 630 } : {}),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: displayTitle,
      description,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}
