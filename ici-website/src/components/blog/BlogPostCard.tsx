'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import BlogCategoryBadge from '@/components/blog/BlogCategoryBadge';
import AnimatedSection from '@/components/shared/AnimatedSection';
import {
  blogCategoryLabel,
  estimateReadTime,
  formatBlogDate,
  authorInitials,
  type BlogPostPreview,
} from '@/lib/blog-utils';

type BlogPostCardProps = {
  post: BlogPostPreview;
  index?: number;
  excerptOverride?: string;
};

export default function BlogPostCard({ post, index = 0, excerptOverride }: BlogPostCardProps) {
  const readTime = estimateReadTime(post.excerpt);
  const excerpt = excerptOverride ?? post.excerpt;

  return (
    <AnimatedSection delay={index * 0.08}>
      <article className="ici-card relative flex flex-col h-full bg-white group border border-navy-100 overflow-hidden">
        <BlogCategoryBadge
          category={post.category}
          variant="overlay"
          className="absolute top-4 left-4 z-10"
        />
        <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
          <div className="h-52 sm:h-56 relative overflow-hidden bg-brand-navy-100">
            {post.coverImageUrl ? (
              <Image
                src={post.coverImageUrl}
                alt={post.coverImageAlt || post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div
                className="absolute inset-0 bg-gradient-to-br from-brand-navy-700 to-brand-navy-900"
                aria-hidden
              />
            )}
            <div className="absolute inset-0 bg-brand-navy-900/0 group-hover:bg-brand-navy-900/10 transition-colors duration-500" />
          </div>

          <div className="p-6 sm:p-8 flex-1 flex flex-col">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-sans text-navy-400 mb-4">
              <span className="inline-flex items-center rounded-full bg-brand-navy-50 border border-brand-navy-100 px-3 py-1 text-xs font-semibold text-brand-navy-700">
                {blogCategoryLabel(post.category)}
              </span>
              {post.publishedAt && (
                <time dateTime={new Date(post.publishedAt).toISOString()}>
                  {formatBlogDate(post.publishedAt)}
                </time>
              )}
              <span className="inline-flex items-center gap-1">
                <Clock size={12} aria-hidden />
                {readTime} min read
              </span>
            </div>

            <h3 className="font-display text-xl sm:text-2xl text-brand-navy-800 mb-3 group-hover:text-brand-gold-600 transition-colors line-clamp-2 leading-snug">
              {post.title}
            </h3>

            <p className="text-muted text-base sm:text-lg leading-relaxed mb-6 flex-1 line-clamp-3">
              {excerpt}
            </p>

            <div className="flex items-center justify-between gap-4 pt-4 border-t border-navy-50 mt-auto">
              <div className="flex items-center gap-2.5 min-w-0">
                {post.authorAvatarUrl ? (
                  <Image
                    src={post.authorAvatarUrl}
                    alt=""
                    width={32}
                    height={32}
                    className="rounded-full object-cover shrink-0"
                  />
                ) : (
                  <span className="w-8 h-8 rounded-full bg-brand-navy-800 text-brand-gold-400 text-xs font-semibold flex items-center justify-center shrink-0">
                    {authorInitials(post.authorName)}
                  </span>
                )}
                <span className="text-sm font-medium text-brand-navy-700 truncate">{post.authorName}</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-brand-gold-600 font-sans font-semibold text-sm group-hover:gap-2.5 transition-all shrink-0">
                Read
                <ArrowRight size={15} aria-hidden />
              </span>
            </div>
          </div>
        </Link>
      </article>
    </AnimatedSection>
  );
}
