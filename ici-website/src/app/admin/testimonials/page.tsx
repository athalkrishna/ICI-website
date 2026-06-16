'use client';

import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { Plus, Trash2, Pencil } from 'lucide-react';
import { formatEnumLabel } from '@/lib/admin-utils';
import PortalPageHeader from '@/components/portal/PortalPageHeader';
import { portalPrimaryBtnClass } from '@/components/portal/portal-styles';

type Testimonial = {
  id: string;
  studentName: string;
  studentTitle: string;
  studentLocation: string;
  studentAvatarUrl: string | null;
  credentialLevel: string;
  quote: string;
  isPublished: boolean;
  displayOrder: number;
};

const levels = ['CATALYST', 'ARCHITECT', 'SAGE', 'LUMINARY'];

const emptyForm = {
  studentName: '',
  studentTitle: '',
  studentLocation: '',
  studentAvatarUrl: '',
  credentialLevel: 'CATALYST',
  quote: '',
  isPublished: false,
  displayOrder: 0,
};

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [publishedFilter, setPublishedFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const params = publishedFilter ? `?published=${publishedFilter}` : '';
      const res = await fetch(`/api/admin/testimonials${params}`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  }, [publishedFilter]);

  useEffect(() => { loadItems(); }, [loadItems]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (item: Testimonial) => {
    setEditingId(item.id);
    setForm({
      studentName: item.studentName,
      studentTitle: item.studentTitle,
      studentLocation: item.studentLocation,
      studentAvatarUrl: item.studentAvatarUrl ?? '',
      credentialLevel: item.credentialLevel,
      quote: item.quote,
      isPublished: item.isPublished,
      displayOrder: item.displayOrder,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        studentAvatarUrl: form.studentAvatarUrl || null,
      };
      const res = editingId
        ? await fetch(`/api/admin/testimonials/${editingId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        : await fetch('/api/admin/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Save failed');
      }
      toast.success(editingId ? 'Testimonial updated' : 'Testimonial created');
      setModalOpen(false);
      loadItems();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete testimonial from ${name}?`)) return;
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Testimonial deleted');
      loadItems();
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div>
      <PortalPageHeader
        title="Testimonials"
        description="Manage student testimonials on the homepage."
        actions={
          <button type="button" onClick={openCreate} className={portalPrimaryBtnClass}>
            <Plus size={16} /> Add Testimonial
          </button>
        }
      />

      <select value={publishedFilter} onChange={(e) => setPublishedFilter(e.target.value)} className="mb-6 px-3 py-2 text-sm border border-navy-100 rounded-xl bg-white">
        <option value="">All</option>
        <option value="true">Published</option>
        <option value="false">Draft</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <p className="text-muted col-span-2">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-muted col-span-2">No testimonials found.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-md border border-navy-100 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-brand-navy-900">{item.studentName}</h3>
                  <p className="text-sm text-muted">{item.studentTitle} · {item.studentLocation}</p>
                </div>
                <span className={clsx('inline-flex px-2 py-0.5 rounded-full text-xs font-medium border',
                  item.isPublished ? 'bg-green-50 text-green-700 border-green-100' : 'bg-amber-50 text-amber-700 border-amber-100')}>
                  {item.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>
              <p className="text-sm text-navy-700 italic mb-4 line-clamp-3">&ldquo;{item.quote}&rdquo;</p>
              <div className="flex items-center justify-between text-xs text-muted">
                <span>{formatEnumLabel(item.credentialLevel)} · Order {item.displayOrder}</span>
                <div className="flex gap-2">
                  <button type="button" onClick={() => openEdit(item)} className="text-brand-gold-700 hover:text-brand-gold-800"><Pencil size={14} /></button>
                  <button type="button" onClick={() => handleDelete(item.id, item.studentName)} className="text-red-600 hover:text-red-700"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-navy-900/60" onClick={() => setModalOpen(false)} />
          <form onSubmit={handleSave} className="relative bg-white rounded-2xl shadow-xl border border-navy-100 w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-h3 text-brand-navy-900">{editingId ? 'Edit' : 'Add'} Testimonial</h2>
            <input required placeholder="Student name" value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })} className="w-full p-3 text-sm border border-navy-100 rounded-xl" />
            <input required placeholder="Title / role" value={form.studentTitle} onChange={(e) => setForm({ ...form, studentTitle: e.target.value })} className="w-full p-3 text-sm border border-navy-100 rounded-xl" />
            <input required placeholder="Location" value={form.studentLocation} onChange={(e) => setForm({ ...form, studentLocation: e.target.value })} className="w-full p-3 text-sm border border-navy-100 rounded-xl" />
            <input placeholder="Avatar URL (optional)" value={form.studentAvatarUrl} onChange={(e) => setForm({ ...form, studentAvatarUrl: e.target.value })} className="w-full p-3 text-sm border border-navy-100 rounded-xl" />
            <select value={form.credentialLevel} onChange={(e) => setForm({ ...form, credentialLevel: e.target.value })} className="w-full p-3 text-sm border border-navy-100 rounded-xl">
              {levels.map((l) => (<option key={l} value={l}>{formatEnumLabel(l)}</option>))}
            </select>
            <textarea required placeholder="Quote" value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} rows={4} className="w-full p-3 text-sm border border-navy-100 rounded-xl" />
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} />
                Published
              </label>
              <input type="number" placeholder="Order" value={form.displayOrder} onChange={(e) => setForm({ ...form, displayOrder: parseInt(e.target.value, 10) || 0 })} className="w-24 p-2 text-sm border border-navy-100 rounded-xl" />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm border border-navy-100 rounded-xl">Cancel</button>
              <button type="submit" disabled={saving} className="px-4 py-2 text-sm text-white bg-brand-navy-900 rounded-xl disabled:opacity-50">{saving ? 'Saving…' : 'Save'}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
