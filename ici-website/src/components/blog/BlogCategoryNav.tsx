'use client';

import clsx from 'clsx';
import {
  BLOG_CATEGORIES,
  blogCategoryCounts,
  blogCategoryLabel,
  type BlogPostPreview,
} from '@/lib/blog-utils';

type BlogCategoryNavProps = {
  posts: BlogPostPreview[];
  activeCategory: string;
  onSelect: (category: string) => void;
  showCounts?: boolean;
  className?: string;
};

export default function BlogCategoryNav({
  posts,
  activeCategory,
  onSelect,
  showCounts = true,
  className,
}: BlogCategoryNavProps) {
  const counts = blogCategoryCounts(posts);

  return (
    <nav className={className} aria-label="Browse articles by category">
      <p className="text-eyebrow text-brand-gold-600 mb-4">Categories</p>
      <div className="flex flex-wrap gap-2" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === 'ALL'}
          onClick={() => onSelect('ALL')}
          className={clsx(
            'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all',
            activeCategory === 'ALL'
              ? 'bg-brand-navy-800 text-white shadow-sm'
              : 'bg-white text-brand-navy-700 border border-navy-100 hover:border-brand-gold-500/50',
          )}
        >
          All Articles
          {showCounts && (
            <span
              className={clsx(
                'text-xs px-1.5 py-0.5 rounded-full',
                activeCategory === 'ALL' ? 'bg-white/15' : 'bg-brand-navy-50 text-navy-500',
              )}
            >
              {posts.length}
            </span>
          )}
        </button>

        {BLOG_CATEGORIES.map((category) => {
          const count = counts.get(category) ?? 0;
          if (count === 0) return null;

          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={activeCategory === category}
              onClick={() => onSelect(category)}
              className={clsx(
                'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all',
                activeCategory === category
                  ? 'bg-brand-navy-800 text-white shadow-sm'
                  : 'bg-white text-brand-navy-700 border border-navy-100 hover:border-brand-gold-500/50',
              )}
            >
              {blogCategoryLabel(category)}
              {showCounts && (
                <span
                  className={clsx(
                    'text-xs px-1.5 py-0.5 rounded-full',
                    activeCategory === category ? 'bg-white/15' : 'bg-brand-navy-50 text-navy-500',
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
