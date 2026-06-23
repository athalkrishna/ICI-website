'use client';

import clsx from 'clsx';
import { ImageIcon, X } from 'lucide-react';
import { formatEnumLabel } from '@/lib/admin-utils';
import { BLOG_SEO } from '@/lib/blog-seo';
import TipTapEditor from '@/components/admin/TipTapEditor';

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
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  seoKeywords: string;
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
  metaTitle: '',
  metaDescription: '',
  focusKeyword: '',
  seoKeywords: '',
});

const inputClass = 'w-full p-3 text-sm border border-navy-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold-400/40';
const labelClass = 'block text-xs font-semibold text-brand-navy-900 mb-1.5';

function CharCount({
  value,
  max,
  recommended,
}: {
  value: string;
  max: number;
  recommended?: number;
}) {
  const len = value.length;
  const overRecommended = recommended !== undefined && len > recommended;
  const atMax = len >= max;
  return (
    <span className={clsx('text-xs', atMax ? 'text-red-600' : overRecommended ? 'text-amber-600' : 'text-muted')}>
      {len}/{max}
      {recommended !== undefined && ` · aim for ~${recommended}`}
    </span>
  );
}

type BlogPostEditorProps = {
  form: BlogFormState;
  onChange: (form: BlogFormState) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  onPickCoverImage: () => void;
  onPickContentImage: () => void;
  saving: boolean;
  mode: 'create' | 'edit';
};

export default function BlogPostEditor({
  form,
  onChange,
  onSubmit,
  onCancel,
  onPickCoverImage,
  onPickContentImage,
  saving,
  mode,
}: BlogPostEditorProps) {
  const set = (patch: Partial<BlogFormState>) => onChange({ ...form, ...patch });
  const seoKeywordCount = form.seoKeywords
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean).length;

  return (
    <form onSubmit={onSubmit} className="relative bg-white rounded-2xl shadow-xl border border-navy-100 w-full max-w-4xl p-6 space-y-6 max-h-[90vh] overflow-y-auto">
      <div>
        <h2 className="text-h3 text-brand-navy-900">{mode === 'create' ? 'New Blog Post' : 'Edit Blog Post'}</h2>
        <p className="text-sm text-muted mt-1">Visual editor, featured image, and SEO settings.</p>
      </div>

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
            <CharCount value={form.excerpt} max={BLOG_SEO.excerpt.max} recommended={BLOG_SEO.excerpt.recommended} />
          </div>
          <textarea
            required
            maxLength={BLOG_SEO.excerpt.max}
            value={form.excerpt}
            onChange={(e) => set({ excerpt: e.target.value })}
            className={inputClass}
            rows={2}
            placeholder="Short summary shown on cards and used as fallback meta description"
          />
        </div>
        <div>
          <label className={labelClass}>Content</label>
          <p className="text-xs text-muted mb-2">Use the toolbar for headings, lists, links, and images. No HTML coding required.</p>
          <TipTapEditor
            value={form.content}
            onChange={(html) => set({ content: html })}
            placeholder="Write your article…"
            onImageRequest={onPickContentImage}
            minHeight="min-h-[280px]"
          />
        </div>
        <div>
          <label className={labelClass}>Tags</label>
          <input value={form.tags} onChange={(e) => set({ tags: e.target.value })} className={inputClass} placeholder="coaching, leadership (comma-separated — for categorisation, not SEO keywords)" />
        </div>
        <label className="flex items-start gap-3 text-sm text-brand-navy-900 cursor-pointer rounded-xl border border-navy-100 bg-cream-50/50 p-4">
          <input type="checkbox" checked={form.featured} onChange={(e) => set({ featured: e.target.checked })} className="rounded border-navy-200 mt-0.5" />
          <span>
            <span className="font-semibold block">Featured post</span>
            <span className="text-xs text-muted mt-1 block">
              Featured posts appear first on the homepage blog section and at the top of the blog index, with a &ldquo;Featured&rdquo; badge on the card.
            </span>
          </span>
        </label>
      </section>

      <section className="space-y-4 rounded-xl bg-cream-50 border border-navy-100 p-4">
        <div>
          <h3 className="text-sm font-bold text-brand-navy-900">SEO</h3>
          <p className="text-xs text-muted mt-1">
            Google typically shows ~60 characters for titles and ~160 for descriptions — longer text is allowed and won&apos;t be cut off while editing.
          </p>
        </div>
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className={labelClass}>Focus keyword</label>
            <CharCount value={form.focusKeyword} max={BLOG_SEO.focusKeyword.max} />
          </div>
          <input
            value={form.focusKeyword}
            onChange={(e) => set({ focusKeyword: e.target.value })}
            className={inputClass}
            placeholder="e.g. online life coach training"
            maxLength={BLOG_SEO.focusKeyword.max}
          />
          <p className="text-xs text-muted mt-1">Primary phrase this article should rank for.</p>
        </div>
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className={labelClass}>Additional SEO keywords</label>
            <span className={clsx('text-xs', seoKeywordCount > BLOG_SEO.seoKeywords.max ? 'text-red-600' : 'text-muted')}>
              {seoKeywordCount}/{BLOG_SEO.seoKeywords.max}
            </span>
          </div>
          <textarea
            value={form.seoKeywords}
            onChange={(e) => set({ seoKeywords: e.target.value })}
            className={inputClass}
            rows={2}
            placeholder="professional coaching certification, coach certification program, … (comma-separated, up to 10)"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className={labelClass}>Meta title</label>
            <CharCount value={form.metaTitle} max={BLOG_SEO.metaTitle.max} recommended={BLOG_SEO.metaTitle.recommended} />
          </div>
          <input
            value={form.metaTitle}
            onChange={(e) => set({ metaTitle: e.target.value })}
            className={inputClass}
            placeholder={form.title || 'Defaults to article title'}
            maxLength={BLOG_SEO.metaTitle.max}
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className={labelClass}>Meta description</label>
            <CharCount value={form.metaDescription} max={BLOG_SEO.metaDescription.max} recommended={BLOG_SEO.metaDescription.recommended} />
          </div>
          <textarea
            value={form.metaDescription}
            onChange={(e) => set({ metaDescription: e.target.value })}
            className={inputClass}
            rows={4}
            maxLength={BLOG_SEO.metaDescription.max}
            placeholder={form.excerpt || 'Defaults to excerpt'}
          />
        </div>
        <div>
          <p className="text-xs font-semibold text-brand-navy-900 mb-2">Search preview</p>
          <div className="rounded-lg border border-navy-100 bg-white p-4 space-y-1.5">
            <p className="text-[#1a0dab] text-lg font-normal leading-snug line-clamp-1">
              {form.metaTitle.trim() || form.title || 'Article title'}
            </p>
            <p className="text-[#006621] text-sm line-clamp-1">
              internationalcoachinginstitute.org › blog › {form.slug || 'your-slug'}
            </p>
            <p className="text-sm text-[#545454] leading-relaxed line-clamp-2">
              {form.metaDescription.trim() || form.excerpt || 'Your excerpt will appear here as the search result description.'}
            </p>
          </div>
        </div>
      </section>

      <div className="flex justify-end gap-3 pt-2 border-t border-navy-100">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm border border-navy-100 rounded-xl">
          Cancel
        </button>
        <button type="submit" disabled={saving || seoKeywordCount > BLOG_SEO.seoKeywords.max} className="px-4 py-2 text-sm text-white bg-brand-navy-900 rounded-xl disabled:opacity-50">
          {saving ? 'Saving…' : mode === 'create' ? 'Create draft' : 'Save changes'}
        </button>
      </div>
    </form>
  );
}
