'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, FileText } from 'lucide-react';
import clsx from 'clsx';
import { formatDate, pageEditorHref } from '@/lib/admin-utils';
import PortalPageHeader from '@/components/portal/PortalPageHeader';
import { portalInputClass } from '@/components/portal/portal-styles';

type PageItem = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  status: 'DRAFT' | 'PUBLISHED';
  isSystem: boolean;
  publishedAt: string | null;
  updatedAt: string;
  _count: { fields: number };
};

const PAGE_GROUPS: { label: string; match: (slug: string) => boolean }[] = [
  { label: 'Core', match: (s) => s === '/' || s === 'global' },
  { label: 'Programmes', match: (s) => s.startsWith('/programmes') },
  { label: 'Credentials', match: (s) => s.startsWith('/credentials') },
  { label: 'Admissions & Apply', match: (s) => s.startsWith('/admissions') || s === '/apply' || s === '/prospectus' },
  { label: 'About', match: (s) => s.startsWith('/about') },
  { label: 'Students & Community', match: (s) => ['/future-students', '/current-students', '/community', '/alumni', '/faculty-staff'].includes(s) },
  { label: 'Resources & Blog', match: (s) => s.startsWith('/resources') || s === '/blog' || s === '/events' },
  { label: 'Other Pages', match: () => true },
];

function groupPages(pages: PageItem[]) {
  const assigned = new Set<string>();
  const groups: { label: string; pages: PageItem[] }[] = [];

  for (const group of PAGE_GROUPS) {
    const items = pages.filter((p) => !assigned.has(p.id) && group.match(p.slug));
    if (items.length === 0) continue;
    items.forEach((p) => assigned.add(p.id));
    groups.push({ label: group.label, pages: items.sort((a, b) => a.title.localeCompare(b.title)) });
  }

  return groups;
}

export default function AdminPagesPage() {
  const [pages, setPages] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/admin/pages')
      .then((res) => res.json())
      .then((data) => setPages(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = pages.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
  );

  const grouped = useMemo(() => groupPages(filtered), [filtered]);
  const totalCount = pages.length;

  return (
    <div>
      <PortalPageHeader
        title="Pages Content"
        description={`Manage CMS content for all site pages. ${totalCount} pages total.`}
        actions={
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search pages…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`${portalInputClass} pl-9 w-64`}
            />
          </div>
        }
      />

      {loading ? (
        <p className="text-muted">Loading pages…</p>
      ) : filtered.length === 0 ? (
        <p className="text-muted">No pages found.</p>
      ) : (
        <div className="space-y-10">
          {grouped.map((group) => (
            <section key={group.label}>
              <h2 className="text-h3 text-brand-navy-900 mb-4 pb-2 border-b border-navy-100">
                {group.label}
                <span className="ml-2 text-sm font-normal text-muted">({group.pages.length})</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {group.pages.map((page) => (
                  <Link
                    key={page.id}
                    href={pageEditorHref(page.slug)}
                    className="bg-white rounded-2xl shadow-md border border-navy-100 p-6 hover:border-brand-gold-500/40 hover:shadow-lg transition group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 bg-cream-50 rounded-xl group-hover:bg-brand-gold-500/10 transition">
                        <FileText size={20} className="text-brand-navy-900" />
                      </div>
                      <span
                        className={clsx(
                          'inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border',
                          page.status === 'PUBLISHED'
                            ? 'bg-green-50 text-green-700 border-green-100'
                            : 'bg-amber-50 text-amber-700 border-amber-100'
                        )}
                      >
                        {page.status === 'PUBLISHED' ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-brand-navy-900 mb-1">{page.title}</h3>
                    <p className="text-xs text-muted font-mono mb-2">{page.slug}</p>
                    {page.description && (
                      <p className="text-sm text-muted line-clamp-2 mb-3">{page.description}</p>
                    )}
                    <div className="flex items-center justify-between text-xs text-muted pt-3 border-t border-navy-50">
                      <span>{page._count.fields} fields</span>
                      <span>Updated {formatDate(page.updatedAt)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
