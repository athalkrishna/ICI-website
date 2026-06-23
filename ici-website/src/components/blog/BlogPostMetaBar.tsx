'use client';

import Image from 'next/image';
import { Calendar, Clock, Link2 } from 'lucide-react';
import { authorInitials, formatBlogDate } from '@/lib/blog-utils';

type BlogPostMetaBarProps = {
  authorName: string;
  authorAvatarUrl?: string | null;
  publishedAt: Date | string | null;
  readTime: number;
  title: string;
  slug: string;
};

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452z" />
    </svg>
  );
}

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function BlogPostMetaBar({
  authorName,
  authorAvatarUrl,
  publishedAt,
  readTime,
  title,
  slug,
}: BlogPostMetaBarProps) {
  async function shareLinkedIn() {
    const url = `${window.location.origin}/blog/${slug}`;
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      '_blank',
      'noopener,noreferrer',
    );
  }

  function shareX() {
    const url = `${window.location.origin}/blog/${slug}`;
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      '_blank',
      'noopener,noreferrer',
    );
  }

  async function copyLink() {
    const url = `${window.location.origin}/blog/${slug}`;
    await navigator.clipboard.writeText(url);
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 py-6 border-y border-white/10">
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-3">
          {authorAvatarUrl ? (
            <Image
              src={authorAvatarUrl}
              alt=""
              width={44}
              height={44}
              className="rounded-full object-cover ring-2 ring-brand-gold-500/30"
            />
          ) : (
            <span className="w-11 h-11 rounded-full bg-brand-navy-700 text-brand-gold-400 text-sm font-semibold flex items-center justify-center ring-2 ring-brand-gold-500/30">
              {authorInitials(authorName)}
            </span>
          )}
          <div>
            <p className="text-white font-semibold text-sm">{authorName}</p>
            <p className="text-navy-300 text-xs">Author</p>
          </div>
        </div>

        <div className="hidden sm:block w-px h-10 bg-white/10" aria-hidden />

        {publishedAt && (
          <div className="flex items-center gap-2 text-navy-200 text-sm">
            <Calendar size={15} className="text-brand-gold-400 shrink-0" aria-hidden />
            <time dateTime={new Date(publishedAt).toISOString()}>{formatBlogDate(publishedAt)}</time>
          </div>
        )}

        <div className="flex items-center gap-2 text-navy-200 text-sm">
          <Clock size={15} className="text-brand-gold-400 shrink-0" aria-hidden />
          <span>{readTime} min read</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-navy-300 text-xs font-semibold uppercase tracking-wider mr-1 hidden sm:inline">
          Share
        </span>
        <button
          type="button"
          onClick={shareLinkedIn}
          className="w-9 h-9 rounded-full bg-white/5 hover:bg-brand-gold-500/20 text-navy-100 hover:text-brand-gold-400 flex items-center justify-center transition-colors"
          aria-label="Share on LinkedIn"
        >
          <LinkedInIcon size={16} />
        </button>
        <button
          type="button"
          onClick={shareX}
          className="w-9 h-9 rounded-full bg-white/5 hover:bg-brand-gold-500/20 text-navy-100 hover:text-brand-gold-400 flex items-center justify-center transition-colors"
          aria-label="Share on X"
        >
          <XIcon size={15} />
        </button>
        <button
          type="button"
          onClick={copyLink}
          className="w-9 h-9 rounded-full bg-white/5 hover:bg-brand-gold-500/20 text-navy-100 hover:text-brand-gold-400 flex items-center justify-center transition-colors"
          aria-label="Copy link"
        >
          <Link2 size={16} />
        </button>
      </div>
    </div>
  );
}
