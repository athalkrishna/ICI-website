'use client';

import { useCallback, useEffect, useMemo, useRef, useState, use } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import {
  ChevronDown,
  ChevronRight,
  Save,
  Globe,
  Eye,
  History,
  ArrowLeft,
} from 'lucide-react';
import TipTapEditor from '@/components/admin/TipTapEditor';
import MediaPicker from '@/components/admin/MediaPicker';
import { resolvePageSlug, pageApiPath, formatDateTime, slugToPreviewPath, groupFieldsBySection } from '@/lib/admin-utils';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

type ContentFieldType =
  | 'TEXT'
  | 'TEXTAREA'
  | 'RICHTEXT'
  | 'IMAGE'
  | 'URL'
  | 'EMAIL'
  | 'PHONE'
  | 'NUMBER'
  | 'BOOLEAN'
  | 'CODE';

type ContentField = {
  id: string;
  key: string;
  label: string;
  helperText: string | null;
  type: ContentFieldType;
  value: string | null;
  section: string;
  order: number;
};

type PageData = {
  id: string;
  title: string;
  slug: string;
  status: 'DRAFT' | 'PUBLISHED';
  fields: ContentField[];
};

type PageVersion = {
  id: string;
  action: 'DRAFT_SAVED' | 'PUBLISHED';
  createdByName: string;
  createdAt: string;
};

export default function PageEditor({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: rawSlug } = use(params);
  const dbSlug = resolvePageSlug(rawSlug);
  const apiBase = pageApiPath(dbSlug);

  const [page, setPage] = useState<PageData | null>(null);
  const [values, setValues] = useState<Record<string, string | null>>({});
  const [savedValues, setSavedValues] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [showVersions, setShowVersions] = useState(false);
  const [versions, setVersions] = useState<PageVersion[]>([]);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [mediaTargetKey, setMediaTargetKey] = useState<string | null>(null);
  const [richtextImageKey, setRichtextImageKey] = useState<string | null>(null);
  const richtextInsertRef = useRef<((url: string) => void) | null>(null);

  const isDirty = useMemo(() => {
    return Object.keys(values).some((key) => values[key] !== savedValues[key]);
  }, [values, savedValues]);

  const loadPage = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(apiBase);
      if (!res.ok) throw new Error('Page not found');
      const data: PageData = await res.json();
      setPage(data);
      const initial: Record<string, string | null> = {};
      data.fields.forEach((f) => {
        initial[f.key] = f.value;
      });
      setValues(initial);
      setSavedValues(initial);
    } catch {
      toast.error('Failed to load page');
    } finally {
      setLoading(false);
    }
  }, [apiBase]);

  const loadVersions = useCallback(async () => {
    try {
      const res = await fetch(`${apiBase}/versions`);
      if (!res.ok) return;
      const data = await res.json();
      setVersions(Array.isArray(data) ? data : []);
    } catch {
      /* ignore */
    }
  }, [apiBase]);

  useEffect(() => {
    loadPage();
  }, [loadPage]);

  useEffect(() => {
    if (showVersions) loadVersions();
  }, [showVersions, loadVersions]);

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [isDirty]);

  const sections = useMemo(() => {
    if (!page) return [];
    return groupFieldsBySection(page.fields);
  }, [page]);

  const updateValue = (key: string, value: string | null) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const toggleSection = (section: string) => {
    setCollapsed((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const openMediaPicker = (key: string) => {
    setMediaTargetKey(key);
    setMediaPickerOpen(true);
  };

  const handleSaveDraft = async () => {
    if (!page) return;
    setSaving(true);
    try {
      const res = await fetch(apiBase, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: page.fields.map((f) => ({ key: f.key, value: values[f.key] ?? null })),
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Save failed');
      }
      const data: PageData = await res.json();
      setPage(data);
      setSavedValues({ ...values });
      toast.success('Draft saved');
      loadVersions();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save draft');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (isDirty) {
      await handleSaveDraft();
    }
    setPublishing(true);
    try {
      const res = await fetch(`${apiBase}/publish`, { method: 'POST' });
      if (!res.ok) throw new Error('Publish failed');
      const data: PageData = await res.json();
      setPage(data);
      toast.success('Page published');
      loadVersions();
    } catch {
      toast.error('Failed to publish page');
    } finally {
      setPublishing(false);
    }
  };

  const handleRestore = async (versionId: string) => {
    if (!confirm('Restore this version? Current unsaved changes will be lost.')) return;
    try {
      const res = await fetch(`${apiBase}/restore/${versionId}`, { method: 'POST' });
      if (!res.ok) throw new Error('Restore failed');
      toast.success('Version restored');
      await loadPage();
      loadVersions();
    } catch {
      toast.error('Failed to restore version');
    }
  };

  const handleMediaSelect = (url: string) => {
    if (richtextImageKey && richtextInsertRef.current) {
      richtextInsertRef.current(url);
      setRichtextImageKey(null);
      richtextInsertRef.current = null;
    } else if (mediaTargetKey) {
      updateValue(mediaTargetKey, url);
      setMediaTargetKey(null);
    }
  };

  const renderField = (field: ContentField) => {
    const value = values[field.key] ?? '';

    switch (field.type) {
      case 'TEXT':
      case 'URL':
      case 'EMAIL':
      case 'PHONE':
        return (
          <input
            type={field.type === 'EMAIL' ? 'email' : field.type === 'PHONE' ? 'tel' : 'text'}
            value={value}
            onChange={(e) => updateValue(field.key, e.target.value)}
            className="w-full p-3 text-sm border border-navy-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50"
          />
        );
      case 'NUMBER':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => updateValue(field.key, e.target.value)}
            className="w-full p-3 text-sm border border-navy-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50"
          />
        );
      case 'TEXTAREA':
        return (
          <textarea
            value={value}
            rows={4}
            onChange={(e) => updateValue(field.key, e.target.value)}
            className="w-full p-3 text-sm border border-navy-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50"
          />
        );
      case 'RICHTEXT':
        return (
          <TipTapEditor
            value={value}
            onChange={(html) => updateValue(field.key, html)}
            onImageRequest={() => {
              setRichtextImageKey(field.key);
              setMediaPickerOpen(true);
              richtextInsertRef.current = (url: string) => {
                const current = values[field.key] ?? '';
                updateValue(field.key, `${current}<p><img src="${url}" alt="" /></p>`);
              };
            }}
          />
        );
      case 'IMAGE':
        return (
          <div className="space-y-3">
            {value && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value} alt={field.label} className="max-h-40 rounded-xl border border-navy-100" />
            )}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => openMediaPicker(field.key)}
                className="px-4 py-2 text-sm font-medium text-brand-navy-900 border border-navy-100 rounded-xl hover:bg-cream-50"
              >
                {value ? 'Change Image' : 'Select Image'}
              </button>
              {value && (
                <button
                  type="button"
                  onClick={() => updateValue(field.key, null)}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        );
      case 'BOOLEAN':
        return (
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={value === 'true'}
              onChange={(e) => updateValue(field.key, e.target.checked ? 'true' : 'false')}
              className="w-5 h-5 rounded border-navy-200 text-brand-navy-900 focus:ring-brand-gold-500"
            />
            <span className="text-sm text-navy-700">{value === 'true' ? 'Enabled' : 'Disabled'}</span>
          </label>
        );
      case 'CODE':
        return (
          <div className="border border-navy-100 rounded-xl overflow-hidden">
            <MonacoEditor
              height="200px"
              language="html"
              theme="vs-light"
              value={value}
              onChange={(v) => updateValue(field.key, v ?? '')}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                wordWrap: 'on',
                scrollBeyondLastLine: false,
              }}
            />
          </div>
        );
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => updateValue(field.key, e.target.value)}
            className="w-full p-3 text-sm border border-navy-100 rounded-xl"
          />
        );
    }
  };

  if (loading) {
    return <p className="text-muted">Loading editor…</p>;
  }

  if (!page) {
    return (
      <div>
        <p className="text-red-600 mb-4">Page not found.</p>
        <Link href="/admin/pages" className="text-brand-gold-700 hover:underline">
          Back to pages
        </Link>
      </div>
    );
  }

  const previewPath = slugToPreviewPath(dbSlug);

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <Link
            href="/admin/pages"
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-brand-navy-900 mb-2"
          >
            <ArrowLeft size={14} />
            Back to pages
          </Link>
          <h1 className="text-h2 text-brand-navy-900">{page.title}</h1>
          <p className="text-sm text-muted font-mono mt-1">{page.slug}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {isDirty && (
            <span className="text-xs text-amber-600 font-medium px-2">Unsaved changes</span>
          )}
          <span
            className={clsx(
              'inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border',
              page.status === 'PUBLISHED'
                ? 'bg-green-50 text-green-700 border-green-100'
                : 'bg-amber-50 text-amber-700 border-amber-100'
            )}
          >
            {page.status}
          </span>
          <button
            type="button"
            onClick={() => setShowVersions(!showVersions)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-navy-100 rounded-xl hover:bg-cream-50"
          >
            <History size={16} />
            History
          </button>
          <Link
            href={previewPath}
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-navy-100 rounded-xl hover:bg-cream-50"
          >
            <Eye size={16} />
            Preview
          </Link>
          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={saving || !isDirty}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-navy-900 border border-navy-100 rounded-xl hover:bg-cream-50 disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? 'Saving…' : 'Save Draft'}
          </button>
          <button
            type="button"
            onClick={handlePublish}
            disabled={publishing}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-navy-900 hover:bg-brand-navy-800 rounded-xl disabled:opacity-50"
          >
            <Globe size={16} />
            {publishing ? 'Publishing…' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        <div className={clsx('flex-1 space-y-4', showVersions && 'xl:mr-80')}>
          {sections.map(([section, fields]) => {
            const isCollapsed = collapsed[section];
            return (
              <div
                key={section}
                className="bg-white rounded-2xl shadow-md border border-navy-100 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleSection(section)}
                  className="w-full flex items-center justify-between p-4 hover:bg-cream-50 transition text-left"
                >
                  <h2 className="text-h3 text-brand-navy-900">{section}</h2>
                  {isCollapsed ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
                </button>
                {!isCollapsed && (
                  <div className="px-4 pb-4 space-y-6 border-t border-navy-50">
                    {fields.map((field) => (
                      <div key={field.key}>
                        <label className="block text-sm font-medium text-navy-700 mb-1">
                          {field.label}
                          <span className="text-xs text-muted font-mono ml-2">{field.key}</span>
                        </label>
                        {field.helperText && (
                          <p className="text-xs text-muted mb-2">{field.helperText}</p>
                        )}
                        {renderField(field)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {showVersions && (
          <aside className="fixed right-0 top-0 bottom-0 w-80 bg-white border-l border-navy-100 shadow-xl z-40 overflow-y-auto p-6 mt-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-h3 text-brand-navy-900">Version History</h3>
              <button type="button" onClick={() => setShowVersions(false)} className="text-muted hover:text-navy-900">
                ×
              </button>
            </div>
            {versions.length === 0 ? (
              <p className="text-sm text-muted">No versions yet.</p>
            ) : (
              <ul className="space-y-3">
                {versions.map((v) => (
                  <li key={v.id} className="p-3 border border-navy-100 rounded-xl">
                    <p className="text-sm font-medium text-brand-navy-900">{v.action.replace('_', ' ')}</p>
                    <p className="text-xs text-muted mt-1">{v.createdByName}</p>
                    <p className="text-xs text-muted">{formatDateTime(v.createdAt)}</p>
                    <button
                      type="button"
                      onClick={() => handleRestore(v.id)}
                      className="mt-2 text-xs text-brand-gold-700 hover:underline"
                    >
                      Restore
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        )}
      </div>

      <MediaPicker
        open={mediaPickerOpen}
        onClose={() => {
          setMediaPickerOpen(false);
          setMediaTargetKey(null);
          setRichtextImageKey(null);
        }}
        onSelect={handleMediaSelect}
      />
    </div>
  );
}
