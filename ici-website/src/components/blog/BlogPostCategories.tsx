import Link from 'next/link';
import BlogCategoryBadge from '@/components/blog/BlogCategoryBadge';
import { blogCategoryHref, blogCategoryLabel, parseBlogTags } from '@/lib/blog-utils';

type BlogPostCategoriesProps = {
  category: string;
  tags?: unknown;
};

export default function BlogPostCategories({ category, tags }: BlogPostCategoriesProps) {
  const tagList = parseBlogTags(tags);

  return (
    <div className="mt-12 pt-8 border-t border-navy-100">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="text-sm font-semibold text-brand-navy-800">Category</span>
        <BlogCategoryBadge category={category} variant="light" />
      </div>

      {tagList.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-brand-navy-800 mr-1">Tags</span>
          {tagList.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-cream-100 border border-navy-100 px-3 py-1 text-xs font-medium text-navy-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <p className="text-sm text-muted mt-4">
        Browse more in{' '}
        <Link
          href={blogCategoryHref(category)}
          className="text-brand-gold-600 font-semibold underline underline-offset-4 hover:text-brand-gold-700"
        >
          {blogCategoryLabel(category)}
        </Link>
      </p>
    </div>
  );
}
