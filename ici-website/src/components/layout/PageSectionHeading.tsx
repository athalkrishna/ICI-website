type PageSectionHeadingProps = {
  title: string;
  as?: 'h2' | 'h3';
  className?: string;
};

/** Standard in-page section heading with gold rule — matches About / inner pages. */
export default function PageSectionHeading({
  title,
  as: Tag = 'h2',
  className = '',
}: PageSectionHeadingProps) {
  return (
    <div className={`page-section-heading ${className}`.trim()}>
      <div className="page-section-heading__line" aria-hidden />
      <Tag className={Tag === 'h3' ? 'text-h3 text-brand-navy-900' : 'text-h2 text-brand-navy-900'}>
        {title}
      </Tag>
    </div>
  );
}
