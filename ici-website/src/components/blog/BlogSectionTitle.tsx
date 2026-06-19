import clsx from 'clsx';

type BlogSectionTitleProps = {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  titleClassName?: string;
  accentClassName?: string;
};

export default function BlogSectionTitle({
  children,
  as: Tag = 'h2',
  className,
  titleClassName,
  accentClassName,
}: BlogSectionTitleProps) {
  return (
    <div className={className}>
      <Tag
        className={clsx(
          Tag === 'h1' && 'text-h1',
          Tag === 'h2' && 'text-h2',
          Tag === 'h3' && 'text-h3',
          titleClassName,
        )}
      >
        {children}
      </Tag>
      <span
        className={clsx('block w-14 h-1 rounded-full bg-brand-gold-500 mt-4', accentClassName)}
        aria-hidden
      />
    </div>
  );
}
