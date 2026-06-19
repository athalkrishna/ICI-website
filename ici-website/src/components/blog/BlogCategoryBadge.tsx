import Link from 'next/link';
import clsx from 'clsx';
import { blogCategoryHref, blogCategoryLabel } from '@/lib/blog-utils';

type BlogCategoryBadgeProps = {
  category: string;
  variant?: 'overlay' | 'hero' | 'light';
  className?: string;
  linked?: boolean;
};

export default function BlogCategoryBadge({
  category,
  variant = 'light',
  className,
  linked = true,
}: BlogCategoryBadgeProps) {
  const label = blogCategoryLabel(category);

  const styles = clsx(
    'inline-flex items-center rounded-full font-sans font-bold uppercase tracking-wider transition-colors',
    variant === 'overlay' &&
      'bg-white/95 backdrop-blur-sm px-3 py-1 text-xs text-brand-navy-700 shadow-sm hover:bg-white hover:text-brand-gold-600',
    variant === 'hero' &&
      'bg-brand-gold-500/15 border border-brand-gold-500/40 px-3.5 py-1.5 text-xs text-brand-gold-300 hover:bg-brand-gold-500/25 hover:text-brand-gold-200',
    variant === 'light' &&
      'bg-brand-navy-50 border border-brand-navy-100 px-3 py-1 text-xs text-brand-navy-700 hover:border-brand-gold-500/50 hover:text-brand-gold-700',
    className,
  );

  if (!linked) {
    return <span className={styles}>{label}</span>;
  }

  return (
    <Link href={blogCategoryHref(category)} className={styles}>
      {label}
    </Link>
  );
}
