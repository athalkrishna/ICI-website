'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { Plus, Trash2, ExternalLink, Pencil } from 'lucide-react';
import { formatDate, formatEnumLabel } from '@/lib/admin-utils';
import { isBlogSeoComplete, parseSeoKeywords, seoKeywordsToInput } from '@/lib/blog-seo';
import PortalPageHeader from '@/components/portal/PortalPageHeader';
import { portalPrimaryBtnClass } from '@/components/portal/portal-styles';
import BlogPostEditor, { emptyBlogForm, type BlogFormState } from '@/components/admin/BlogPostEditor';
import MediaPicker from '@/components/admin/MediaPicker';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  status: 'DRAFT' | 'PUBLISHED';
  featured: boolean;
  authorName: string;
  metaTitle: string | null;
  metaDescription: string | null;
  focusKeyword: string | null;
  updatedAt: string;
  publishedAt: string | null;
};

function parseTags(raw: unknown): string {
  if (!Array.isArray(raw)) return '';
  return raw.filter((tag): tag is string => typeof tag === 'string').join(', ');
}

function formToPayload(form: BlogFormState) {
  const tags = form.tags
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

  const seoKeywords = parseSeoKeywords(form.seoKeywords);

  return {
    title: form.title,
    ...(form.slug.trim() ? { slug: form.slug.trim() } : {}),
    excerpt: form.excerpt,
    content: form.content,
    coverImageUrl: form.coverImageUrl,
    coverImageAlt: form.coverImageAlt.trim() || null,
    authorName: form.authorName,
    category: form.category,
    featured: form.featured,
    tags,
    metaTitle: form.metaTitle.trim() || null,
    metaDescription: form.metaDescription.trim() || null,
    focusKeyword: form.focusKeyword.trim() || null,
    seoKeywords,
  };
}

function postToForm(post: Record<string, unknown>): BlogFormState {
  return {
    title: String(post.title ?? ''),
    slug: String(post.slug ?? ''),
    excerpt: String(post.excerpt ?? ''),
    content: String(post.content ?? ''),
    coverImageUrl: String(post.coverImageUrl ?? ''),
    coverImageAlt: String(post.coverImageAlt ?? ''),
    authorName: String(post.authorName ?? ''),
    category: String(post.category ?? 'INSTITUTE_NEWS'),
    featured: Boolean(post.featured),
    tags: parseTags(post.tags),
    metaTitle: String(post.metaTitle ?? ''),
    metaDescription: String(post.metaDescription ?? ''),
    focusKeyword: String(post.focusKeyword ?? ''),
    seoKeywords: seoKeywordsToInput(post.seoKeywords),
  };
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [modal, setModal] = useState<'create' | 'edit' | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<BlogFormState>(emptyBlogForm());
  const [saving, setSaving] = useState(false);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<'cover' | 'content'>('cover');
  const contentImageInsertRef = useRef<((url: string) => void) | null>(null);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
      if (categoryFilter) params.set('category', categoryFilter);
      const res = await fetch(`/api/admin/blog?${params}`);
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, categoryFilter]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const closeModal = () => {
    setModal(null);
    setEditingId(null);
    setForm(emptyBlogForm());
  };

  const openCreate = () => {
    setForm(emptyBlogForm());
    setEditingId(null);
    setModal('create');
  };

  const openEdit = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/blog/${id}`);
      if (!res.ok) throw new Error('Failed to load post');
      const post = await res.json();
      setForm(postToForm(post));
      setEditingId(id);
      setModal('edit');
    } catch {
      toast.error('Failed to load blog post');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = formToPayload(form);
      const res = await fetch(
        modal === 'edit' && editingId ? `/api/admin/blog/${editingId}` : '/api/admin/blog',
        {
          method: modal === 'edit' ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      );
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Save failed');
      }
      toast.success(modal === 'edit' ? 'Blog post updated' : 'Blog post created');
      closeModal();
      loadPosts();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/blog/${id}/publish`, { method: 'POST' });
      if (!res.ok) throw new Error('Publish failed');
      toast.success('Post published');
      loadPosts();
    } catch {
      toast.error('Failed to publish post');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Post deleted');
      loadPosts();
    } catch {
      toast.error('Failed to delete post');
    }
  };

  return (
    <div>
      <PortalPageHeader
        title="Blog Posts"
        description="Create and manage blog articles."
        actions={
          <button type="button" onClick={openCreate} className={portalPrimaryBtnClass}>
            <Plus size={16} />
            New Post
          </button>
        }
      />

      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 text-sm border border-navy-100 rounded-xl bg-white"
        >
          <option value="">All statuses</option>
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 text-sm border border-navy-100 rounded-xl bg-white"
        >
          <option value="">All categories</option>
          {['INSTITUTE_NEWS', 'COACHING_INSIGHTS', 'RESEARCH', 'EVENTS_RECAP', 'ANNOUNCEMENTS'].map((c) => (
            <option key={c} value={c}>{formatEnumLabel(c)}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-navy-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream-50 border-b border-navy-200 text-muted">
              <tr>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Featured</th>
                <th className="px-6 py-4 font-medium">SEO</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Updated</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50">
              {loading ? (
                <tr><td colSpan={7} className="px-6 py-8 text-center text-muted">Loading…</td></tr>
              ) : posts.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-8 text-center text-muted">No posts found.</td></tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-cream-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-brand-navy-900">{post.title}</p>
                      <p className="text-xs text-muted">{post.authorName} · /blog/{post.slug}</p>
                    </td>
                    <td className="px-6 py-4 text-muted">{formatEnumLabel(post.category)}</td>
                    <td className="px-6 py-4">
                      {post.featured ? (
                        <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium border bg-brand-gold-50 text-brand-gold-800 border-brand-gold-200">
                          Featured
                        </span>
                      ) : (
                        <span className="text-xs text-muted">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={clsx(
                        'inline-flex px-2 py-0.5 rounded-full text-xs font-medium border',
                        isBlogSeoComplete(post)
                          ? 'bg-green-50 text-green-700 border-green-100'
                          : 'bg-amber-50 text-amber-700 border-amber-100',
                      )}>
                        {isBlogSeoComplete(post) ? 'Complete' : 'Needs SEO'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={clsx(
                        'inline-flex px-2 py-0.5 rounded-full text-xs font-medium border',
                        post.status === 'PUBLISHED' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-amber-50 text-amber-700 border-amber-100',
                      )}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted">{formatDate(post.updatedAt)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => openEdit(post.id)} className="text-muted hover:text-brand-navy-900" title="Edit">
                          <Pencil size={14} />
                        </button>
                        {post.status === 'DRAFT' && (
                          <button type="button" onClick={() => handlePublish(post.id)} className="text-xs text-brand-gold-700 hover:underline">
                            Publish
                          </button>
                        )}
                        {post.status === 'PUBLISHED' && (
                          <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-brand-navy-900" title="View live">
                            <ExternalLink size={14} />
                          </a>
                        )}
                        <button type="button" onClick={() => handleDelete(post.id, post.title)} className="text-red-600 hover:text-red-700">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-navy-900/60" onClick={closeModal} />
          <BlogPostEditor
            form={form}
            onChange={setForm}
            onSubmit={handleSubmit}
            onCancel={closeModal}
            onPickCoverImage={() => {
              setMediaPickerTarget('cover');
              setMediaPickerOpen(true);
            }}
            onPickContentImage={() => {
              setMediaPickerTarget('content');
              contentImageInsertRef.current = (url: string) => {
                setForm((prev) => ({
                  ...prev,
                  content: `${prev.content}<p><img src="${url}" alt="" /></p>`,
                }));
              };
              setMediaPickerOpen(true);
            }}
            saving={saving}
            mode={modal}
          />
        </div>
      )}

      <MediaPicker
        open={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelect={(url, media) => {
          if (mediaPickerTarget === 'content') {
            contentImageInsertRef.current?.(url);
            contentImageInsertRef.current = null;
          } else {
            setForm((prev) => ({
              ...prev,
              coverImageUrl: url,
              coverImageAlt: prev.coverImageAlt || media?.altText || prev.title,
            }));
          }
          setMediaPickerOpen(false);
        }}
      />
    </div>
  );
}
