import Link from 'next/link';
import clsx from 'clsx';
import {
  BLOG_CATEGORIES,
  blogCategoryCounts,
  blogCategoryLabel,
  isBlogCategory,
  type BlogPostPreview,
} from '@/lib/blog-utils';

type BlogCategoryNavProps = {
  posts: BlogPostPreview[];
  activeCategory: string;
  showCounts?: boolean;
  className?: string;
};

function categoryHref(category: string) {
  if (category === 'ALL') return '/blog';
  return `/blog?category=${encodeURIComponent(category)}`;
}

export default function BlogCategoryNav({
  posts,
  activeCategory,
  showCounts = true,
  className,
}: BlogCategoryNavProps) {
  const counts = blogCategoryCounts(posts);
  const active = isBlogCategory(activeCategory) ? activeCategory : 'ALL';

  return (
    <nav className={className} aria-label="Browse articles by category">
      <p className="text-eyebrow text-brand-gold-600 mb-4">Categories</p>
      <div className="flex flex-wrap gap-2">
        <Link
          href={categoryHref('ALL')}
          aria-current={active === 'ALL' ? 'page' : undefined}
          className={clsx(
            'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all',
            active === 'ALL'
              ? 'bg-brand-navy-800 text-white shadow-sm'
              : 'bg-white text-brand-navy-700 border border-navy-100 hover:border-brand-gold-500/50',
          )}
        >
          All Articles
          {showCounts && (
            <span
              className={clsx(
                'text-xs px-1.5 py-0.5 rounded-full',
                active === 'ALL' ? 'bg-white/15' : 'bg-brand-navy-50 text-navy-500',
              )}
            >
              {posts.length}
            </span>
          )}
        </Link>

        {BLOG_CATEGORIES.map((category) => {
          const count = counts.get(category) ?? 0;
          if (count === 0) return null;

          return (
            <Link
              key={category}
              href={categoryHref(category)}
              aria-current={active === category ? 'page' : undefined}
              className={clsx(
                'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all',
                active === category
                  ? 'bg-brand-navy-800 text-white shadow-sm'
                  : 'bg-white text-brand-navy-700 border border-navy-100 hover:border-brand-gold-500/50',
              )}
            >
              {blogCategoryLabel(category)}
              {showCounts && (
                <span
                  className={clsx(
                    'text-xs px-1.5 py-0.5 rounded-full',
                    active === category ? 'bg-white/15' : 'bg-brand-navy-50 text-navy-500',
                  )}
                >
                  {count}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
