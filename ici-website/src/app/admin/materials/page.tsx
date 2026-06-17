'use client';

import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { Plus, Trash2 } from 'lucide-react';
import { formatEnumLabel } from '@/lib/admin-utils';
import PortalPageHeader from '@/components/portal/PortalPageHeader';
import { portalPrimaryBtnClass } from '@/components/portal/portal-styles';

type Material = {
  id: string;
  title: string;
  description: string | null;
  fileUrl: string;
  fileName: string;
  fileType: string;
  level: string;
  moduleNumber: number;
  isPublished: boolean;
  fileSizeBytes: number;
  _count: { access: number };
};

const levels = ['CATALYST', 'ARCHITECT', 'SAGE', 'LUMINARY', 'ALL_LEVELS'];
const fileTypes = ['PDF', 'VIDEO', 'AUDIO', 'DOCUMENT', 'PRESENTATION', 'OTHER'];

export default function AdminMaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [levelFilter, setLevelFilter] = useState('');
  const [publishedFilter, setPublishedFilter] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    fileUrl: '',
    bunnyPath: '',
    fileName: '',
    fileType: 'PDF',
    fileSizeBytes: 0,
    level: 'CATALYST',
    moduleNumber: 1,
  });

  const loadMaterials = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (levelFilter) params.set('level', levelFilter);
      if (publishedFilter) params.set('published', publishedFilter);
      const res = await fetch(`/api/admin/materials?${params}`);
      const data = await res.json();
      setMaterials(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Failed to load materials');
    } finally {
      setLoading(false);
    }
  }, [levelFilter, publishedFilter]);

  useEffect(() => { loadMaterials(); }, [loadMaterials]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await fetch('/api/admin/materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Create failed');
      }
      toast.success('Material created');
      setShowCreate(false);
      loadMaterials();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create material');
    } finally {
      setCreating(false);
    }
  };

  const togglePublished = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/materials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !current }),
      });
      if (!res.ok) throw new Error('Update failed');
      toast.success(current ? 'Material unpublished' : 'Material published');
      loadMaterials();
    } catch {
      toast.error('Failed to update material');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/materials/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Material deleted');
      loadMaterials();
    } catch {
      toast.error('Failed to delete material');
    }
  };

  return (
    <div>
      <PortalPageHeader
        title="Course Materials"
        description="Manage downloadable materials for students."
        actions={
          <button type="button" onClick={() => setShowCreate(true)} className={portalPrimaryBtnClass}>
            <Plus size={16} /> Add Material
          </button>
        }
      />

      <div className="flex flex-wrap gap-3 mb-6">
        <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)} className="px-3 py-2 text-sm border border-navy-100 rounded-xl bg-white">
          <option value="">All levels</option>
          {levels.map((l) => (<option key={l} value={l}>{formatEnumLabel(l)}</option>))}
        </select>
        <select value={publishedFilter} onChange={(e) => setPublishedFilter(e.target.value)} className="px-3 py-2 text-sm border border-navy-100 rounded-xl bg-white">
          <option value="">All</option>
          <option value="true">Published</option>
          <option value="false">Draft</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-navy-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream-50 border-b border-navy-200 text-muted">
              <tr>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Level</th>
                <th className="px-6 py-4 font-medium">Module</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Students</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50">
              {loading ? (
                <tr><td colSpan={7} className="px-6 py-8 text-center text-muted">Loading…</td></tr>
              ) : materials.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-8 text-center text-muted">No materials found.</td></tr>
              ) : (
                materials.map((m) => (
                  <tr key={m.id} className="hover:bg-cream-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-brand-navy-900">{m.title}</p>
                      <p className="text-xs text-muted">{m.fileName}</p>
                    </td>
                    <td className="px-6 py-4 text-muted">{formatEnumLabel(m.level)}</td>
                    <td className="px-6 py-4 text-muted">{m.moduleNumber}</td>
                    <td className="px-6 py-4 text-muted">{m.fileType}</td>
                    <td className="px-6 py-4 text-muted">{m._count.access}</td>
                    <td className="px-6 py-4">
                      <button type="button" onClick={() => togglePublished(m.id, m.isPublished)} className={clsx('inline-flex px-2 py-0.5 rounded-full text-xs font-medium border cursor-pointer',
                        m.isPublished ? 'bg-green-50 text-green-700 border-green-100' : 'bg-amber-50 text-amber-700 border-amber-100')}>
                        {m.isPublished ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button type="button" onClick={() => handleDelete(m.id, m.title)} className="text-red-600 hover:text-red-700"><Trash2 size={14} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-navy-900/60" onClick={() => setShowCreate(false)} />
          <form onSubmit={handleCreate} className="relative bg-white rounded-2xl shadow-xl border border-navy-100 w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-h3 text-brand-navy-900">Add Course Material</h2>
            <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full p-3 text-sm border border-navy-100 rounded-xl" />
            <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full p-3 text-sm border border-navy-100 rounded-xl" rows={2} />
            <input required type="url" placeholder="File URL" value={form.fileUrl} onChange={(e) => setForm({ ...form, fileUrl: e.target.value })} className="w-full p-3 text-sm border border-navy-100 rounded-xl" />
            <input required placeholder="Bunny path" value={form.bunnyPath} onChange={(e) => setForm({ ...form, bunnyPath: e.target.value })} className="w-full p-3 text-sm border border-navy-100 rounded-xl" />
            <input required placeholder="File name" value={form.fileName} onChange={(e) => setForm({ ...form, fileName: e.target.value })} className="w-full p-3 text-sm border border-navy-100 rounded-xl" />
            <div className="grid grid-cols-2 gap-3">
              <select value={form.fileType} onChange={(e) => setForm({ ...form, fileType: e.target.value })} className="p-3 text-sm border border-navy-100 rounded-xl">
                {fileTypes.map((t) => (<option key={t} value={t}>{t}</option>))}
              </select>
              <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className="p-3 text-sm border border-navy-100 rounded-xl">
                {levels.map((l) => (<option key={l} value={l}>{formatEnumLabel(l)}</option>))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input required type="number" min={1} placeholder="Module number" value={form.moduleNumber} onChange={(e) => setForm({ ...form, moduleNumber: parseInt(e.target.value, 10) || 1 })} className="p-3 text-sm border border-navy-100 rounded-xl" />
              <input required type="number" min={0} placeholder="File size (bytes)" value={form.fileSizeBytes} onChange={(e) => setForm({ ...form, fileSizeBytes: parseInt(e.target.value, 10) || 0 })} className="p-3 text-sm border border-navy-100 rounded-xl" />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowCreate(false)} className="px-4 py-2 text-sm border border-navy-100 rounded-xl">Cancel</button>
              <button type="submit" disabled={creating} className="px-4 py-2 text-sm text-white bg-brand-navy-900 rounded-xl disabled:opacity-50">{creating ? 'Creating…' : 'Create'}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
