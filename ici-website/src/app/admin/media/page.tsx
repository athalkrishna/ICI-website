'use client';

import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Upload, Trash2, Copy, Search, Save } from 'lucide-react';
import clsx from 'clsx';
import { formatDate } from '@/lib/admin-utils';
import PortalPageHeader from '@/components/portal/PortalPageHeader';
import { portalInputClass, portalPrimaryBtnClass } from '@/components/portal/portal-styles';

type MediaFile = {
  id: string;
  fileName: string;
  bunnyUrl: string;
  fileType: string;
  mimeType: string;
  fileSizeBytes: number;
  altText: string | null;
  createdAt: string;
  uploader?: { name: string };
};

export default function AdminMediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [fileType, setFileType] = useState('');
  const [uploadAltText, setUploadAltText] = useState('');
  const [savingAltId, setSavingAltId] = useState<string | null>(null);
  const [altDrafts, setAltDrafts] = useState<Record<string, string>>({});

  const loadMedia = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: '100' });
      if (fileType) params.set('fileType', fileType);
      const res = await fetch(`/api/admin/media?${params}`);
      const data = await res.json();
      const list: MediaFile[] = data.files ?? [];
      setFiles(list);
      setAltDrafts(
        Object.fromEntries(list.map((file) => [file.id, file.altText ?? ''])),
      );
    } catch {
      toast.error('Failed to load media');
    } finally {
      setLoading(false);
    }
  }, [fileType]);

  useEffect(() => { loadMedia(); }, [loadMedia]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    if (uploadAltText.trim()) {
      formData.append('altText', uploadAltText.trim());
    }
    try {
      const res = await fetch('/api/admin/media/upload', { method: 'POST', body: formData });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Upload failed');
      }
      toast.success('File uploaded');
      setUploadAltText('');
      loadMedia();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const saveAltText = async (id: string) => {
    const altText = altDrafts[id]?.trim() || null;
    setSavingAltId(id);
    try {
      const res = await fetch(`/api/admin/media/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ altText }),
      });
      if (!res.ok) throw new Error('Save failed');
      const updated = await res.json();
      setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, altText: updated.altText } : f)));
      toast.success('Alt text saved');
    } catch {
      toast.error('Failed to save alt text');
    } finally {
      setSavingAltId(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/media/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('File deleted');
      loadMedia();
    } catch {
      toast.error('Failed to delete file');
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied');
  };

  const filtered = files.filter((f) => f.fileName.toLowerCase().includes(search.toLowerCase()));

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

  return (
    <div>
      <PortalPageHeader
        title="Media Library"
        description="Upload images and documents. Set alt text on images for accessibility and SEO."
        actions={
          <label className={`${portalPrimaryBtnClass} cursor-pointer`}>
            <Upload size={16} />
            {uploading ? 'Uploading…' : 'Upload File'}
            <input
              type="file"
              className="sr-only"
              onChange={handleUpload}
              disabled={uploading}
              accept="image/jpeg,image/png,image/webp,image/svg+xml,application/pdf"
            />
          </label>
        }
      />

      <div className="mb-6 max-w-xl">
        <label className="text-sm font-medium text-navy-700 block mb-1">
          Alt text for next upload (optional)
        </label>
        <input
          type="text"
          value={uploadAltText}
          onChange={(e) => setUploadAltText(e.target.value)}
          placeholder="Describe the image for accessibility and SEO"
          className={`w-full ${portalInputClass}`}
        />
        <p className="text-xs text-muted mt-1">
          You can also edit alt text on any image after upload.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input type="text" placeholder="Search files…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 pr-4 py-2 text-sm border border-navy-100 rounded-xl bg-white w-64" />
        </div>
        <select value={fileType} onChange={(e) => setFileType(e.target.value)} className="px-3 py-2 text-sm border border-navy-100 rounded-xl bg-white">
          <option value="">All types</option>
          <option value="IMAGE">Images</option>
          <option value="DOCUMENT">Documents</option>
          <option value="VIDEO">Video</option>
          <option value="AUDIO">Audio</option>
        </select>
      </div>

      {loading ? (
        <p className="text-muted">Loading media…</p>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-navy-100 p-12 text-center text-muted">No media files found.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((file) => {
            const draft = altDrafts[file.id] ?? file.altText ?? '';
            const altDirty = draft !== (file.altText ?? '');
            const missingAlt = file.fileType === 'IMAGE' && !file.altText?.trim();

            return (
              <div key={file.id} className="bg-white rounded-2xl shadow-md border border-navy-100 overflow-hidden group">
                <div className="aspect-square bg-cream-50 relative">
                  {file.fileType === 'IMAGE' ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={file.bunnyUrl} alt={file.altText || file.fileName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-muted p-4 text-center">{file.mimeType}</div>
                  )}
                  <div className="absolute inset-0 bg-brand-navy-900/0 group-hover:bg-brand-navy-900/40 transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button type="button" onClick={() => copyUrl(file.bunnyUrl)} className="p-2 bg-white rounded-lg text-brand-navy-900 hover:bg-cream-50" title="Copy URL"><Copy size={16} /></button>
                    <button type="button" onClick={() => handleDelete(file.id, file.fileName)} className="p-2 bg-white rounded-lg text-red-600 hover:bg-red-50" title="Delete"><Trash2 size={16} /></button>
                  </div>
                  {missingAlt && (
                    <span className="absolute top-2 left-2 text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                      Missing alt
                    </span>
                  )}
                </div>
                <div className="p-3 space-y-2">
                  <p className="text-xs font-medium text-brand-navy-900 truncate" title={file.fileName}>{file.fileName}</p>
                  <div className="flex items-center justify-between">
                    <span className={clsx('text-[10px] px-1.5 py-0.5 rounded', file.fileType === 'IMAGE' ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600')}>{file.fileType}</span>
                    <span className="text-[10px] text-muted">{formatSize(file.fileSizeBytes)}</span>
                  </div>
                  {file.fileType === 'IMAGE' && (
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-brand-navy-900">Alt text (SEO)</label>
                      <input
                        type="text"
                        value={draft}
                        onChange={(e) => setAltDrafts((prev) => ({ ...prev, [file.id]: e.target.value }))}
                        placeholder="Describe this image"
                        className="w-full px-2 py-1.5 text-xs border border-navy-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-gold-400/40"
                      />
                      {altDirty && (
                        <button
                          type="button"
                          onClick={() => saveAltText(file.id)}
                          disabled={savingAltId === file.id}
                          className="inline-flex items-center gap-1 text-[10px] font-medium text-brand-gold-700 hover:underline disabled:opacity-50"
                        >
                          <Save size={12} />
                          {savingAltId === file.id ? 'Saving…' : 'Save alt text'}
                        </button>
                      )}
                    </div>
                  )}
                  <p className="text-[10px] text-muted">{formatDate(file.createdAt)}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
