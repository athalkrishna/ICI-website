'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { Plus, Trash2, Send, Pencil, Users, BookmarkPlus } from 'lucide-react';
import { formatDate, formatDateTime } from '@/lib/admin-utils';
import PortalPageHeader from '@/components/portal/PortalPageHeader';
import { portalPrimaryBtnClass, portalTableWrapperClass } from '@/components/portal/portal-styles';
import NewsletterTemplateGallery, {
  type TemplateSummary,
} from '@/components/admin/newsletter/NewsletterTemplateGallery';
import NewsletterBlockEditor, {
  AddBlockMenu,
  type BlogPostOption,
} from '@/components/admin/newsletter/NewsletterBlockEditor';
import NewsletterPreviewPanel from '@/components/admin/newsletter/NewsletterPreviewPanel';
import TipTapEditor from '@/components/admin/TipTapEditor';
import {
  cloneBlocksWithNewIds,
  emptyBlock,
  legacyToBlocks,
  parseBlocks,
  type NewsletterBlock,
  type NewsletterBlockType,
} from '@/lib/newsletter-blocks';
import { builtInGalleryTemplates } from '@/lib/newsletter-template-defaults';

type Newsletter = {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  blocks: unknown;
  templateId: string | null;
  status: 'DRAFT' | 'SENT';
  recipientCount: number | null;
  sentCount: number | null;
  failedCount: number | null;
  createdAt: string;
  sentAt: string | null;
};

type RecipientStats = {
  total: number;
  dashboardStudents: number;
  alumni: number;
  externalSubscribers: number;
  students: number;
};

type ComposerTab = 'edit' | 'preview';

type FormState = {
  title: string;
  blocks: NewsletterBlock[];
  templateId: string | null;
};

function emptyForm(): FormState {
  return { title: '', blocks: [emptyBlock('rich_text')], templateId: null };
}

export default function AdminNewsletterPage() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [stats, setStats] = useState<RecipientStats | null>(null);
  const [templates, setTemplates] = useState<TemplateSummary[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPostOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [templatesLoading, setTemplatesLoading] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [modal, setModal] = useState<'create' | 'edit' | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [composerTab, setComposerTab] = useState<ComposerTab>('edit');
  const [previewHtml, setPreviewHtml] = useState('');
  const [previewLoading, setPreviewLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savingTemplate, setSavingTemplate] = useState(false);
  const [sending, setSending] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [newsRes, statsRes] = await Promise.all([
        fetch('/api/admin/newsletter'),
        fetch('/api/admin/newsletter/recipients'),
      ]);
      const newsData = await newsRes.json();
      const statsData = await statsRes.json();
      setNewsletters(Array.isArray(newsData) ? newsData : []);
      setStats(
        statsData?.total != null
          ? {
              total: statsData.total,
              dashboardStudents: statsData.dashboardStudents ?? statsData.students ?? 0,
              alumni: statsData.alumni ?? 0,
              externalSubscribers: statsData.externalSubscribers ?? 0,
              students: statsData.dashboardStudents ?? statsData.students ?? 0,
            }
          : null,
      );
    } catch {
      toast.error('Failed to load newsletters');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadTemplates = useCallback(async () => {
    setTemplatesLoading(true);
    try {
      const res = await fetch('/api/admin/newsletter/templates');
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to load templates');
      }
      const list = Array.isArray(data) ? data : [];
      setTemplates(list.length > 0 ? list : builtInGalleryTemplates());
    } catch {
      setTemplates(builtInGalleryTemplates());
    } finally {
      setTemplatesLoading(false);
    }
  }, []);

  const loadBlogPosts = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/blog?status=PUBLISHED');
      const data = await res.json();
      if (Array.isArray(data)) {
        setBlogPosts(
          data.map((post: BlogPostOption) => ({
            id: post.id,
            title: post.title,
            excerpt: post.excerpt,
            slug: post.slug,
            coverImageUrl: post.coverImageUrl,
          })),
        );
      }
    } catch {
      /* blog list optional */
    }
  }, []);

  useEffect(() => {
    loadData();
    loadTemplates();
    loadBlogPosts();
  }, [loadData, loadTemplates, loadBlogPosts]);

  const closeComposer = () => {
    setModal(null);
    setEditingId(null);
    setForm(emptyForm());
    setComposerTab('edit');
    setPreviewHtml('');
  };

  const openCreate = () => {
    setShowGallery(true);
    loadTemplates();
  };

  const startFromTemplate = (template: TemplateSummary) => {
    const blocks = cloneBlocksWithNewIds(parseBlocks(template.blocks));
    setForm({
      title: '',
      blocks: blocks.length > 0 ? blocks : [emptyBlock('rich_text')],
      templateId: template.id.startsWith('system:') ? null : template.id,
    });
    setEditingId(null);
    setShowGallery(false);
    setModal('create');
    setComposerTab('edit');
  };

  const openEdit = (newsletter: Newsletter) => {
    const blocks = parseBlocks(newsletter.blocks);
    setForm({
      title: newsletter.title,
      blocks:
        blocks.length > 0
          ? blocks
          : legacyToBlocks(newsletter.content, newsletter.imageUrl),
      templateId: newsletter.templateId,
    });
    setEditingId(newsletter.id);
    setModal('edit');
    setComposerTab('edit');
  };

  const payload = () => ({
    ...(editingId ? { id: editingId } : {}),
    title: form.title.trim(),
    blocks: form.blocks,
    templateId: form.templateId,
  });

  const refreshPreview = useCallback(async () => {
    if (!form.title.trim()) {
      setPreviewHtml('');
      return;
    }
    setPreviewLoading(true);
    try {
      const res = await fetch('/api/admin/newsletter/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: form.title.trim(), blocks: form.blocks }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Preview failed');
      setPreviewHtml(data.html ?? '');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Preview failed');
    } finally {
      setPreviewLoading(false);
    }
  }, [form.title, form.blocks]);

  useEffect(() => {
    if (composerTab === 'preview' && modal) {
      refreshPreview();
    }
  }, [composerTab, modal, refreshPreview]);

  const updateBlock = (index: number, block: NewsletterBlock) => {
    setForm((f) => ({
      ...f,
      blocks: f.blocks.map((b, i) => (i === index ? block : b)),
    }));
  };

  const moveBlock = (index: number, direction: -1 | 1) => {
    setForm((f) => {
      const next = [...f.blocks];
      const target = index + direction;
      if (target < 0 || target >= next.length) return f;
      [next[index], next[target]] = [next[target], next[index]];
      return { ...f, blocks: next };
    });
  };

  const removeBlock = (index: number) => {
    setForm((f) => {
      if (f.blocks.length <= 1) {
        toast.error('Keep at least one block');
        return f;
      }
      return { ...f, blocks: f.blocks.filter((_, i) => i !== index) };
    });
  };

  const addBlock = (type: NewsletterBlockType) => {
    setForm((f) => ({ ...f, blocks: [...f.blocks, emptyBlock(type)] }));
  };

  const saveDraft = async () => {
    if (!form.title.trim()) {
      toast.error('Title is required');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload()),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');
      toast.success('Draft saved');
      if (!editingId && data.id) setEditingId(data.id);
      closeComposer();
      loadData();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save draft');
    } finally {
      setSaving(false);
    }
  };

  const publishAndSend = async () => {
    if (!form.title.trim()) {
      toast.error('Title is required');
      return;
    }
    const isResend =
      editingId && newsletters.find((n) => n.id === editingId)?.status === 'SENT';
    const confirmed = window.confirm(
      isResend
        ? `Update and resend this newsletter to ${stats?.total ?? 'all'} recipients?`
        : `Publish and send this newsletter to ${stats?.total ?? 'all'} recipients?`,
    );
    if (!confirmed) return;

    setSending(true);
    try {
      const res = await fetch('/api/admin/newsletter/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload()),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send');

      toast.success(
        `Sent to ${data.sentCount ?? 0} of ${data.recipientCount ?? 0} recipients` +
          (data.failedCount ? ` (${data.failedCount} failed)` : ''),
      );
      closeComposer();
      loadData();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to send newsletter');
    } finally {
      setSending(false);
    }
  };

  const saveAsTemplate = async () => {
    const name = window.prompt('Template name (e.g. Monthly Update):');
    if (!name?.trim()) return;
    const description = window.prompt('Short description (optional):') ?? '';

    setSavingTemplate(true);
    try {
      const res = await fetch('/api/admin/newsletter/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim() || undefined,
          blocks: form.blocks,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save template');
      toast.success('Template saved — it will appear in the gallery next time');
      loadTemplates();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save template');
    } finally {
      setSavingTemplate(false);
    }
  };

  const deleteNewsletter = async (id: string, title: string) => {
    if (!window.confirm(`Delete newsletter "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/newsletter/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      toast.success('Newsletter deleted');
      loadData();
    } catch {
      toast.error('Failed to delete newsletter');
    }
  };

  const isBlankMode = useMemo(() => {
    return form.blocks.length === 1 && form.blocks[0]?.type === 'rich_text';
  }, [form.blocks]);

  return (
    <div>
      <PortalPageHeader
        title="Newsletter"
        description="Compose template-driven newsletters and send to students and subscribers."
        actions={
          <button type="button" onClick={openCreate} className={portalPrimaryBtnClass}>
            <Plus className="w-4 h-4" />
            New Newsletter
          </button>
        }
      />

      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="bg-white border border-navy-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-navy-500 text-sm mb-1">
              <Users className="w-4 h-4" />
              Total recipients
            </div>
            <p className="text-2xl font-semibold text-brand-navy-900">{stats.total}</p>
          </div>
          <div className="bg-white border border-navy-100 rounded-2xl p-5">
            <p className="text-navy-500 text-sm mb-1">Dashboard students</p>
            <p className="text-xs text-muted mb-2">Paid + manually enrolled</p>
            <p className="text-2xl font-semibold text-brand-navy-900">{stats.dashboardStudents}</p>
          </div>
          <div className="bg-white border border-navy-100 rounded-2xl p-5">
            <p className="text-navy-500 text-sm mb-1">Alumni (newsletter only)</p>
            <p className="text-xs text-muted mb-2">No dashboard access</p>
            <p className="text-2xl font-semibold text-brand-navy-900">{stats.alumni}</p>
          </div>
          <div className="bg-white border border-navy-100 rounded-2xl p-5">
            <p className="text-navy-500 text-sm mb-1">Website subscribers</p>
            <p className="text-2xl font-semibold text-brand-navy-900">{stats.externalSubscribers}</p>
          </div>
        </div>
      )}

      <p className="text-sm text-muted mb-4">
        All lists receive newsletters when you publish.{' '}
        <Link href="/admin/newsletter/subscribers" className="text-brand-gold-700 hover:underline">
          Manage subscriber lists →
        </Link>
        {' · '}
        <Link
          href="/admin/settings/newsletter-branding"
          className="text-brand-gold-700 hover:underline"
        >
          Newsletter branding →
        </Link>
      </p>

      <div className="bg-white border border-navy-100 rounded-2xl overflow-hidden">
        <div className={portalTableWrapperClass}>
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-cream-50 text-navy-600">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Title</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Recipients</th>
                <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Sent</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-navy-400">
                    Loading…
                  </td>
                </tr>
              ) : newsletters.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-navy-400">
                    No newsletters yet. Create your first one.
                  </td>
                </tr>
              ) : (
                newsletters.map((item) => (
                  <tr key={item.id} className="border-t border-navy-50">
                    <td className="px-4 py-3 font-medium text-brand-navy-900">{item.title}</td>
                    <td className="px-4 py-3">
                      <span
                        className={clsx(
                          'inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium',
                          item.status === 'SENT'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-amber-100 text-amber-800',
                        )}
                      >
                        {item.status === 'SENT' ? 'Sent' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-navy-600 hidden md:table-cell">
                      {item.recipientCount ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-navy-600 hidden lg:table-cell">
                      {item.sentAt ? formatDateTime(item.sentAt) : formatDate(item.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(item)}
                          className="p-2 rounded-lg text-navy-500 hover:bg-cream-100"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteNewsletter(item.id, item.title)}
                          className="p-2 rounded-lg text-red-500 hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {showGallery && (
        <NewsletterTemplateGallery
          templates={templates}
          loading={templatesLoading}
          onSelect={startFromTemplate}
          onClose={() => setShowGallery(false)}
          onRetry={loadTemplates}
        />
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-xl">
            <div className="p-6 border-b border-navy-100">
              <h2 className="text-lg font-semibold text-brand-navy-900">
                {modal === 'create' ? 'New Newsletter' : 'Edit Newsletter'}
              </h2>
              {stats && (
                <p className="text-sm text-navy-500 mt-1">
                  Will send to {stats.total} recipients ({stats.students} students +{' '}
                  {stats.externalSubscribers} external)
                </p>
              )}
              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setComposerTab('edit')}
                  className={clsx(
                    'px-4 py-2 rounded-lg text-sm font-medium',
                    composerTab === 'edit'
                      ? 'bg-brand-navy-900 text-white'
                      : 'bg-cream-100 text-navy-600',
                  )}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setComposerTab('preview')}
                  className={clsx(
                    'px-4 py-2 rounded-lg text-sm font-medium',
                    composerTab === 'preview'
                      ? 'bg-brand-navy-900 text-white'
                      : 'bg-cream-100 text-navy-600',
                  )}
                >
                  Preview
                </button>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="text-sm font-medium text-navy-700 block mb-1">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-navy-100 rounded-xl"
                  placeholder="Newsletter subject line"
                />
              </div>

              {composerTab === 'edit' ? (
                <>
                  {isBlankMode ? (
                    <div>
                      <label className="text-sm font-medium text-navy-700 block mb-1">Content</label>
                      <div className="border border-navy-100 rounded-xl overflow-hidden">
                        <TipTapEditor
                          value={(form.blocks[0].data as { html: string }).html}
                          onChange={(html) =>
                            updateBlock(0, {
                              ...form.blocks[0],
                              data: { html },
                            })
                          }
                          placeholder="Write your newsletter content…"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4">
                        {form.blocks.map((block, index) => (
                          <NewsletterBlockEditor
                            key={block.id}
                            block={block}
                            index={index}
                            total={form.blocks.length}
                            blogPosts={blogPosts}
                            onChange={(updated) => updateBlock(index, updated)}
                            onMoveUp={() => moveBlock(index, -1)}
                            onMoveDown={() => moveBlock(index, 1)}
                            onRemove={() => removeBlock(index)}
                          />
                        ))}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-navy-700 mb-2">Add block</p>
                        <AddBlockMenu onAdd={addBlock} />
                      </div>
                    </>
                  )}

                  <p className="text-xs text-navy-400">
                    Footer (logo, address, social links, unsubscribe) is added automatically from{' '}
                    <Link
                      href="/admin/settings/newsletter-branding"
                      className="text-brand-gold-700 hover:underline"
                    >
                      newsletter branding settings
                    </Link>
                    .
                  </p>
                </>
              ) : (
                <NewsletterPreviewPanel html={previewHtml} loading={previewLoading} />
              )}
            </div>

            <div className="p-6 border-t border-navy-100 flex flex-wrap gap-3 justify-between">
              <button
                type="button"
                onClick={saveAsTemplate}
                disabled={savingTemplate || saving || sending}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm text-navy-600 hover:bg-cream-50 rounded-xl disabled:opacity-60"
              >
                <BookmarkPlus className="w-4 h-4" />
                {savingTemplate ? 'Saving…' : 'Save as template'}
              </button>

              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={closeComposer} className="px-4 py-2 text-navy-600">
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveDraft}
                  disabled={saving || sending}
                  className="px-4 py-2 border border-navy-200 rounded-xl text-navy-700 hover:bg-cream-50 disabled:opacity-60"
                >
                  {saving ? 'Saving…' : 'Save Draft'}
                </button>
                <button
                  type="button"
                  onClick={publishAndSend}
                  disabled={saving || sending}
                  className={clsx(portalPrimaryBtnClass, 'disabled:opacity-60')}
                >
                  <Send className="w-4 h-4" />
                  {sending
                    ? 'Sending…'
                    : editingId && newsletters.find((n) => n.id === editingId)?.status === 'SENT'
                      ? 'Update & Resend'
                      : 'Publish & Send'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
