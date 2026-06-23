'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BlogPostCard from '@/components/blog/BlogPostCard';
import BlogSectionTitle from '@/components/blog/BlogSectionTitle';
import BlogCategoryNav from '@/components/blog/BlogCategoryNav';
import { blogCategoryLabel, isBlogCategory, type BlogPostPreview } from '@/lib/blog-utils';

const PAGE_SIZE = 9;

type BlogListingProps = {
  posts: BlogPostPreview[];
  initialCategory?: string;
};

export default function BlogListing({ posts, initialCategory }: BlogListingProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlCategory = searchParams.get('category') ?? initialCategory;
  const startingCategory = isBlogCategory(urlCategory) ? urlCategory : 'ALL';

  const [activeCategory, setActiveCategory] = useState<string>(startingCategory);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    const next = searchParams.get('category');
    setActiveCategory(isBlogCategory(next) ? next : 'ALL');
    setVisibleCount(PAGE_SIZE);
  }, [searchParams]);

  const filtered = useMemo(() => {
    if (activeCategory === 'ALL') return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [posts, activeCategory]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function selectCategory(category: string) {
    setActiveCategory(category);
    setVisibleCount(PAGE_SIZE);

    const params = new URLSearchParams(searchParams.toString());
    if (category === 'ALL') {
      params.delete('category');
    } else {
      params.set('category', category);
    }

    const query = params.toString();
    router.replace(query ? `/blog?${query}` : '/blog', { scroll: false });
  }

  return (
    <div>
      <BlogCategoryNav
        posts={posts}
        activeCategory={activeCategory}
        onSelect={selectCategory}
        className="mb-12 pb-10 border-b border-navy-100"
      />

      <div className="mb-10">
        <BlogSectionTitle as="h2" titleClassName="text-brand-navy-900">
          {activeCategory === 'ALL' ? 'Articles' : blogCategoryLabel(activeCategory)}
        </BlogSectionTitle>
        {activeCategory === 'ALL' && posts.some((p) => p.featured) && (
          <p className="text-muted mt-4 max-w-2xl">
            Featured articles appear first, followed by the latest posts.
          </p>
        )}
        {activeCategory !== 'ALL' && (
          <p className="text-muted mt-4 max-w-2xl">
            {filtered.length} {filtered.length === 1 ? 'article' : 'articles'} in this category.
          </p>
        )}
      </div>

      {visible.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visible.map((post, i) => (
              <BlogPostCard key={post.id} post={post} index={i} />
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-14">
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="btn-secondary-light px-8 py-3.5"
              >
                Load more articles
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-muted py-16 text-body">
          No articles in this category yet.
        </p>
      )}
    </div>
  );
}
