'use client';

import { useCallback, useEffect, useState } from 'react';
import { X, Upload, Search, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import clsx from 'clsx';

type MediaFile = {
  id: string;
  fileName: string;
  bunnyUrl: string;
  fileType: string;
  altText: string | null;
  mimeType: string;
};

type MediaPickerProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string, media?: MediaFile) => void;
  fileType?: 'IMAGE' | 'VIDEO' | 'DOCUMENT' | 'AUDIO';
};

export default function MediaPicker({ open, onClose, onSelect, fileType = 'IMAGE' }: MediaPickerProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const loadMedia = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: '50', fileType });
      const res = await fetch(`/api/admin/media?${params}`);
      if (!res.ok) throw new Error('Failed to load media');
      const data = await res.json();
      setFiles(data.files ?? []);
    } catch {
      toast.error('Failed to load media library');
    } finally {
      setLoading(false);
    }
  }, [fileType]);

  useEffect(() => {
    if (open) {
      loadMedia();
      setSelectedId(null);
      setSearch('');
    }
  }, [open, loadMedia]);

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
      const data = await res.json();
      toast.success('File uploaded');
      await loadMedia();
      if (data.mediaFile) {
        setSelectedId(data.mediaFile.id);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleConfirm = () => {
    const selected = files.find((f) => f.id === selectedId);
    if (selected) {
      onSelect(selected.bunnyUrl, selected);
      onClose();
    }
  };

  const filtered = files.filter((f) =>
    f.fileName.toLowerCase().includes(search.toLowerCase())
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-navy-900/60" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl border border-navy-100 w-full max-w-3xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-navy-100">
          <h2 className="text-h3 text-brand-navy-900">Media Library</h2>
          <button type="button" onClick={onClose} className="text-muted hover:text-navy-900">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 border-b border-navy-100 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search files…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-navy-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50"
            />
          </div>
          <label className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-navy-900 hover:bg-brand-navy-800 rounded-xl cursor-pointer transition">
            <Upload size={16} />
            {uploading ? 'Uploading…' : 'Upload'}
            <input type="file" className="sr-only" onChange={handleUpload} disabled={uploading} accept="image/*,application/pdf" />
          </label>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <p className="text-center text-muted py-12">Loading media…</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted py-12">No media files found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filtered.map((file) => (
                <button
                  key={file.id}
                  type="button"
                  onClick={() => setSelectedId(file.id)}
                  className={clsx(
                    'relative aspect-square rounded-xl border-2 overflow-hidden transition',
                    selectedId === file.id
                      ? 'border-brand-gold-500 ring-2 ring-brand-gold-500/30'
                      : 'border-navy-100 hover:border-brand-navy-300'
                  )}
                >
                  {file.fileType === 'IMAGE' ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={file.bunnyUrl} alt={file.altText || file.fileName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-cream-50 text-xs text-muted p-2 text-center">
                      {file.fileName}
                    </div>
                  )}
                  {selectedId === file.id && (
                    <div className="absolute top-2 right-2 bg-brand-gold-500 text-white rounded-full p-1">
                      <Check size={12} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-navy-100 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-navy-700 hover:bg-cream-50 rounded-xl border border-navy-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!selectedId}
            className="px-4 py-2 text-sm font-medium text-white bg-brand-navy-900 hover:bg-brand-navy-800 rounded-xl disabled:opacity-50"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
}
