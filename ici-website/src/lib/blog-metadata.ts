import type { Metadata } from 'next';
import type { BlogPost } from '@prisma/client';
import { resolveMetadataTitle } from '@/lib/metadata-title';
import { SITE_URL, SITE_LOGO_PATH, resolveOgImageUrl } from '@/lib/site-url';
import { buildBlogKeywordList } from '@/lib/blog-seo';

export function buildBlogPostMetadata(post: BlogPost, slug: string): Metadata {
  const url = `${SITE_URL}/blog/${slug}`;
  const displayTitle = post.metaTitle?.trim() || post.title;
  const description = post.metaDescription?.trim() || post.excerpt;
  const keywords = buildBlogKeywordList(post);
  const useAbsoluteTitle = Boolean(post.metaTitle?.trim());
  const title = resolveMetadataTitle(displayTitle, { forceAbsolute: useAbsoluteTitle });
  const ogTitle =
    typeof title === 'object' && title && 'absolute' in title
      ? title.absolute
      : `${displayTitle} | ICI`;

  const ogImageUrl = resolveOgImageUrl(post.coverImageUrl || SITE_LOGO_PATH);
  const ogImageAlt = post.coverImageAlt?.trim() || (post.coverImageUrl ? post.title : 'International Coaching Institute logo');

  return {
    title,
    description,
    ...(keywords.length > 0 ? { keywords } : {}),
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      title: ogTitle,
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
      title: ogTitle,
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
