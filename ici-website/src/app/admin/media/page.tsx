'use client';

import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Upload, Trash2, Copy, Search } from 'lucide-react';
import clsx from 'clsx';
import { formatDate } from '@/lib/admin-utils';
import PortalPageHeader from '@/components/portal/PortalPageHeader';
import { portalPrimaryBtnClass } from '@/components/portal/portal-styles';

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

  const loadMedia = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: '100' });
      if (fileType) params.set('fileType', fileType);
      const res = await fetch(`/api/admin/media?${params}`);
      const data = await res.json();
      setFiles(data.files ?? []);
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
    try {
      const res = await fetch('/api/admin/media/upload', { method: 'POST', body: formData });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Upload failed');
      }
      toast.success('File uploaded');
      loadMedia();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
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
        description="Upload and manage images and documents on the CDN."
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
          {filtered.map((file) => (
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
              </div>
              <div className="p-3">
                <p className="text-xs font-medium text-brand-navy-900 truncate" title={file.fileName}>{file.fileName}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className={clsx('text-[10px] px-1.5 py-0.5 rounded', file.fileType === 'IMAGE' ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600')}>{file.fileType}</span>
                  <span className="text-[10px] text-muted">{formatSize(file.fileSizeBytes)}</span>
                </div>
                <p className="text-[10px] text-muted mt-1">{formatDate(file.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
