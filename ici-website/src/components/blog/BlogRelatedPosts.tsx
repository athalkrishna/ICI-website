import BlogPostCard from '@/components/blog/BlogPostCard';
import BlogSectionTitle from '@/components/blog/BlogSectionTitle';
import type { BlogPostPreview } from '@/lib/blog-utils';
import clsx from 'clsx';

type BlogRelatedPostsProps = {
  posts: BlogPostPreview[];
};

export default function BlogRelatedPosts({ posts }: BlogRelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-20 pt-16 border-t border-navy-100">
      <BlogSectionTitle as="h2" className="mb-10" titleClassName="text-brand-navy-900">
        Related Articles
      </BlogSectionTitle>
      <div
        className={clsx(
          'grid gap-8',
          posts.length === 1 && 'grid-cols-1 max-w-md',
          posts.length === 2 && 'grid-cols-1 sm:grid-cols-2 max-w-3xl',
          posts.length >= 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        )}
      >
        {posts.map((post, i) => (
          <BlogPostCard key={post.id} post={post} index={i} />
        ))}
      </div>
    </section>
  );
}
