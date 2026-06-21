'use client';

import clsx from 'clsx';
import { ImageIcon, X } from 'lucide-react';
import { formatEnumLabel } from '@/lib/admin-utils';

export type BlogFormState = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  coverImageAlt: string;
  authorName: string;
  category: string;
  featured: boolean;
  tags: string;
};

export const BLOG_CATEGORIES = [
  'INSTITUTE_NEWS',
  'COACHING_INSIGHTS',
  'RESEARCH',
  'EVENTS_RECAP',
  'ANNOUNCEMENTS',
] as const;

export const emptyBlogForm = (): BlogFormState => ({
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  coverImageUrl: '',
  coverImageAlt: '',
  authorName: '',
  category: 'INSTITUTE_NEWS',
  featured: false,
  tags: '',
});

const inputClass = 'w-full p-3 text-sm border border-navy-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold-400/40';
const labelClass = 'block text-xs font-semibold text-brand-navy-900 mb-1.5';

function CharCount({ value, max, recommended }: { value: string; max: number; recommended?: number }) {
  const len = value.length;
  const overRecommended = recommended !== undefined && len > recommended;
  return (
    <span className={clsx('text-xs', overRecommended ? 'text-amber-600' : 'text-muted')}>
      {len}/{max}
      {recommended !== undefined && ` · aim for ${recommended} or fewer`}
    </span>
  );
}

type BlogPostEditorProps = {
  form: BlogFormState;
  onChange: (form: BlogFormState) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  onPickCoverImage: () => void;
  saving: boolean;
  mode: 'create' | 'edit';
};

export default function BlogPostEditor({
  form,
  onChange,
  onSubmit,
  onCancel,
  onPickCoverImage,
  saving,
  mode,
}: BlogPostEditorProps) {
  const set = (patch: Partial<BlogFormState>) => onChange({ ...form, ...patch });

  return (
    <form onSubmit={onSubmit} className="relative bg-white rounded-2xl shadow-xl border border-navy-100 w-full max-w-3xl p-6 space-y-6 max-h-[90vh] overflow-y-auto">
      <div>
        <h2 className="text-h3 text-brand-navy-900">{mode === 'create' ? 'New Blog Post' : 'Edit Blog Post'}</h2>
        <p className="text-sm text-muted mt-1">Featured image, article content, and SEO settings.</p>
      </div>

      {/* Featured image — primary focus */}
      <section className="space-y-4 rounded-2xl border-2 border-brand-gold-400/30 bg-gradient-to-b from-cream-50 to-white p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-brand-navy-900">Featured image</h3>
            <p className="text-xs text-muted mt-0.5">Shown on blog cards and as the article hero image.</p>
          </div>
          {form.coverImageUrl && (
            <button
              type="button"
              onClick={() => set({ coverImageUrl: '', coverImageAlt: '' })}
              className="inline-flex items-center gap-1 text-xs text-red-600 hover:underline"
            >
              <X size={14} />
              Remove
            </button>
          )}
        </div>

        {form.coverImageUrl ? (
          <div className="relative rounded-xl overflow-hidden border border-navy-100 bg-navy-900/5 aspect-[16/9] max-h-64">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={form.coverImageUrl}
              alt={form.coverImageAlt || form.title || 'Featured image preview'}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={onPickCoverImage}
            className="w-full aspect-[16/9] max-h-52 rounded-xl border-2 border-dashed border-brand-gold-400/50 bg-white flex flex-col items-center justify-center gap-2 text-brand-navy-900 hover:bg-cream-50 transition"
          >
            <ImageIcon size={32} className="text-brand-gold-600" />
            <span className="text-sm font-medium">Select featured image</span>
            <span className="text-xs text-muted">From media library or paste URL below</span>
          </button>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onPickCoverImage}
            className="px-4 py-2 text-sm font-medium border border-navy-100 rounded-xl hover:bg-white"
          >
            {form.coverImageUrl ? 'Change image' : 'Open media library'}
          </button>
        </div>

        <div>
          <label className={labelClass}>Image URL</label>
          <input
            required
            type="url"
            value={form.coverImageUrl}
            onChange={(e) => set({ coverImageUrl: e.target.value })}
            className={inputClass}
            placeholder="https://..."
          />
        </div>
        <div>
          <label className={labelClass}>Alt text</label>
          <input
            value={form.coverImageAlt}
            onChange={(e) => set({ coverImageAlt: e.target.value })}
            className={inputClass}
            placeholder="Describe the image for accessibility and SEO"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-bold text-brand-navy-900 border-b border-navy-100 pb-2">Article</h3>
        <div>
          <label className={labelClass}>Title</label>
          <input required value={form.title} onChange={(e) => set({ title: e.target.value })} className={inputClass} placeholder="Article title" />
        </div>
        <div>
          <label className={labelClass}>URL slug</label>
          <input
            value={form.slug}
            onChange={(e) => set({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
            className={inputClass}
            placeholder="auto-generated-from-title if left blank"
            pattern="^[a-z0-9-]*$"
          />
          <p className="text-xs text-muted mt-1">Used in the URL: /blog/your-slug-here</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Author</label>
            <input required value={form.authorName} onChange={(e) => set({ authorName: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <select value={form.category} onChange={(e) => set({ category: e.target.value })} className={inputClass}>
              {BLOG_CATEGORIES.map((c) => (
                <option key={c} value={c}>{formatEnumLabel(c)}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className={labelClass}>Excerpt</label>
            <CharCount value={form.excerpt} max={300} recommended={160} />
          </div>
          <textarea required maxLength={300} value={form.excerpt} onChange={(e) => set({ excerpt: e.target.value })} className={inputClass} rows={2} placeholder="Short summary shown on cards and used as fallback meta description" />
        </div>
        <div>
          <label className={labelClass}>Content (HTML)</label>
          <textarea required value={form.content} onChange={(e) => set({ content: e.target.value })} className={inputClass} rows={8} />
        </div>
        <div>
          <label className={labelClass}>Tags</label>
          <input value={form.tags} onChange={(e) => set({ tags: e.target.value })} className={inputClass} placeholder="coaching, leadership, certification (comma-separated)" />
        </div>
        <label className="flex items-center gap-2 text-sm text-brand-navy-900 cursor-pointer">
          <input type="checkbox" checked={form.featured} onChange={(e) => set({ featured: e.target.checked })} className="rounded border-navy-200" />
          Featured post
        </label>
      </section>

      <section className="space-y-3 rounded-xl bg-cream-50 border border-navy-100 p-4">
        <div>
          <h3 className="text-sm font-bold text-brand-navy-900">Search preview</h3>
          <p className="text-xs text-muted mt-1">Generated from title and excerpt.</p>
        </div>
        <div className="rounded-lg border border-navy-100 bg-white p-4 space-y-1.5">
          <p className="text-[#1a0dab] text-lg font-normal leading-snug line-clamp-1">
            {form.title || 'Article title'}
          </p>
          <p className="text-[#006621] text-sm line-clamp-1">
            internationalcoachinginstitute.org › blog › {form.slug || 'your-slug'}
          </p>
          <p className="text-sm text-[#545454] leading-relaxed line-clamp-2">
            {form.excerpt || 'Your excerpt will appear here as the search result description.'}
          </p>
        </div>
      </section>

      <div className="flex justify-end gap-3 pt-2 border-t border-navy-100">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm border border-navy-100 rounded-xl">
          Cancel
        </button>
        <button type="submit" disabled={saving} className="px-4 py-2 text-sm text-white bg-brand-navy-900 rounded-xl disabled:opacity-50">
          {saving ? 'Saving…' : mode === 'create' ? 'Create draft' : 'Save changes'}
        </button>
      </div>
    </form>
  );
}
