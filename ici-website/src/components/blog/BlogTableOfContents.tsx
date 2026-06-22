'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import type { TocHeading } from '@/lib/blog-utils';

type BlogTableOfContentsProps = {
  headings: TocHeading[];
  variant?: 'sidebar' | 'embedded';
};

function tocIndent(level: 1 | 2 | 3) {
  if (level === 2) return 'pl-3';
  if (level === 3) return 'pl-6';
  return '';
}

function tocLinkClass(level: 1 | 2 | 3, active: boolean) {
  return clsx(
    'block text-sm leading-snug transition-colors py-1 underline underline-offset-4 decoration-brand-gold-500/50 hover:decoration-brand-gold-600',
    tocIndent(level),
    level === 1 && 'font-semibold',
    active
      ? 'text-brand-gold-600 decoration-brand-gold-600 font-semibold'
      : 'text-brand-navy-700 hover:text-brand-gold-600',
  );
}

export default function BlogTableOfContents({
  headings,
  variant = 'sidebar',
}: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (headings.length === 0) return;

    let active = true;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!active) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      active = false;
      observer.disconnect();
    };
  }, [headings]);

  if (headings.length === 0) return null;

  const list = (
    <ul className={clsx('space-y-1', variant === 'sidebar' && 'border-l-2 border-navy-100 pl-4')}>
      {headings.map(({ id, text, level }) => (
        <li key={id}>
          <a href={`#${id}`} className={tocLinkClass(level, activeId === id)}>
            {text}
          </a>
        </li>
      ))}
    </ul>
  );

  if (variant === 'embedded') {
    return (
      <nav aria-label="Table of Contents" className="mt-4">
        {list}
      </nav>
    );
  }

  return (
    <nav aria-label="Table of Contents" className="lg:sticky lg:top-28 pt-1">
      <p className="text-eyebrow text-brand-gold-600 mb-4">Table of Contents</p>
      {list}
    </nav>
  );
}
