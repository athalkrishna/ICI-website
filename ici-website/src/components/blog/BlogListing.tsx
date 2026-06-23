import BlogPostCard from '@/components/blog/BlogPostCard';
import BlogSectionTitle from '@/components/blog/BlogSectionTitle';
import BlogCategoryNav from '@/components/blog/BlogCategoryNav';
import { blogCategoryLabel, isBlogCategory, type BlogPostPreview } from '@/lib/blog-utils';

type BlogListingProps = {
  posts: BlogPostPreview[];
  initialCategory?: string;
};

export default function BlogListing({ posts, initialCategory }: BlogListingProps) {
  const activeCategory = isBlogCategory(initialCategory) ? initialCategory : 'ALL';
  const filtered =
    activeCategory === 'ALL' ? posts : posts.filter((p) => p.category === activeCategory);

  return (
    <div>
      <BlogCategoryNav
        posts={posts}
        activeCategory={activeCategory}
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

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted py-16 text-body">
          No articles in this category yet.
        </p>
      )}
    </div>
  );
}
