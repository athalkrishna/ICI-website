'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { ImageIcon, Plus, Trash2, Pencil } from 'lucide-react';
import { formatEnumLabel } from '@/lib/admin-utils';
import {
  COACH_AVAILABILITY_OPTIONS,
  COACH_LEVEL_OPTIONS,
  COACH_SPECIALISATION_OPTIONS,
  specialisationLabel,
} from '@/lib/coach-labels';
import PortalPageHeader from '@/components/portal/PortalPageHeader';
import MediaPicker from '@/components/admin/MediaPicker';
import { portalPrimaryBtnClass } from '@/components/portal/portal-styles';

type Coach = {
  id: string;
  slug: string;
  name: string;
  title: string;
  bio: string;
  imageUrl: string | null;
  specialisation: string | null;
  credentialLevel: string | null;
  languages: string;
  location: string | null;
  availability: string;
  bookingUrl: string | null;
  email: string | null;
  linkedinUrl: string | null;
  showOnFaculty: boolean;
  showInDirectory: boolean;
  isPublished: boolean;
  displayOrder: number;
};

const emptyForm = {
  slug: '',
  name: '',
  title: '',
  bio: '',
  imageUrl: '',
  specialisation: '',
  credentialLevel: '',
  languages: 'English',
  location: '',
  availability: 'TAKING_CLIENTS',
  bookingUrl: '',
  email: '',
  linkedinUrl: '',
  showOnFaculty: true,
  showInDirectory: true,
  isPublished: false,
  displayOrder: 0,
};

export default function AdminCoachesPage() {
  const [items, setItems] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);
  const [publishedFilter, setPublishedFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const params = publishedFilter ? `?published=${publishedFilter}` : '';
      const res = await fetch(`/api/admin/coaches${params}`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Failed to load coaches');
    } finally {
      setLoading(false);
    }
  }, [publishedFilter]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (item: Coach) => {
    setEditingId(item.id);
    setForm({
      slug: item.slug,
      name: item.name,
      title: item.title,
      bio: item.bio,
      imageUrl: item.imageUrl ?? '',
      specialisation: item.specialisation ?? '',
      credentialLevel: item.credentialLevel ?? '',
      languages: item.languages,
      location: item.location ?? '',
      availability: item.availability,
      bookingUrl: item.bookingUrl ?? '',
      email: item.email ?? '',
      linkedinUrl: item.linkedinUrl ?? '',
      showOnFaculty: item.showOnFaculty,
      showInDirectory: item.showInDirectory,
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
        imageUrl: form.imageUrl || null,
        specialisation: form.specialisation || null,
        credentialLevel: form.credentialLevel || null,
        location: form.location || null,
        bookingUrl: form.bookingUrl || null,
        email: form.email || null,
        linkedinUrl: form.linkedinUrl || null,
        slug: form.slug || undefined,
      };
      const res = editingId
        ? await fetch(`/api/admin/coaches/${editingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
        : await fetch('/api/admin/coaches', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Save failed (${res.status})`);
      }
      toast.success(editingId ? 'Coach updated' : 'Coach created');
      setModalOpen(false);
      loadItems();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete coach profile for ${name}?`)) return;
    try {
      const res = await fetch(`/api/admin/coaches/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Coach deleted');
      loadItems();
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div>
      <PortalPageHeader
        title="Coaches"
        description="Manage coach profiles for Find a Coach, Faculty, and other directory pages."
        actions={
          <button type="button" onClick={openCreate} className={portalPrimaryBtnClass}>
            <Plus size={16} /> Add Coach
          </button>
        }
      />

      <select
        value={publishedFilter}
        onChange={(e) => setPublishedFilter(e.target.value)}
        className="mb-6 px-3 py-2 text-sm border border-navy-100 rounded-xl bg-white"
      >
        <option value="">All</option>
        <option value="true">Published</option>
        <option value="false">Draft</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-muted col-span-full">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-muted col-span-full">No coaches yet. Add your first coach profile.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-md border border-navy-100 overflow-hidden">
              <div className="relative h-40 bg-cream-100">
                {item.imageUrl ? (
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="400px" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-brand-navy-300">
                    <ImageIcon size={32} />
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold text-brand-navy-900">{item.name}</h3>
                    <p className="text-sm text-muted">{item.title}</p>
                  </div>
                  <span
                    className={clsx(
                      'inline-flex px-2 py-0.5 rounded-full text-xs font-medium border shrink-0',
                      item.isPublished
                        ? 'bg-green-50 text-green-700 border-green-100'
                        : 'bg-amber-50 text-amber-700 border-amber-100',
                    )}
                  >
                    {item.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="text-xs text-muted mb-3 line-clamp-2">{item.bio}</p>
                <div className="flex flex-wrap gap-1.5 mb-4 text-xs">
                  {item.showInDirectory && (
                    <span className="px-2 py-0.5 rounded-full bg-cream-100 text-navy-700">Directory</span>
                  )}
                  {item.showOnFaculty && (
                    <span className="px-2 py-0.5 rounded-full bg-cream-100 text-navy-700">Faculty</span>
                  )}
                  {item.specialisation && (
                    <span className="px-2 py-0.5 rounded-full bg-brand-gold-500/15 text-brand-gold-800">
                      {specialisationLabel(item.specialisation as never)}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-muted">
                  <span>
                    {item.credentialLevel ? formatEnumLabel(item.credentialLevel) : 'No level'} · Order{' '}
                    {item.displayOrder}
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => openEdit(item)}
                      className="text-brand-gold-700 hover:text-brand-gold-800"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id, item.name)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-navy-900/60" onClick={() => setModalOpen(false)} />
          <form
            onSubmit={handleSave}
            className="relative bg-white rounded-2xl shadow-xl border border-navy-100 w-full max-w-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-h3 text-brand-navy-900">{editingId ? 'Edit' : 'Add'} Coach</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <input
                required
                placeholder="Full name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-3 text-sm border border-navy-100 rounded-xl"
              />
              <input
                placeholder="URL slug (auto-generated if empty)"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full p-3 text-sm border border-navy-100 rounded-xl"
              />
            </div>

            <input
              required
              placeholder="Professional title *"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-3 text-sm border border-navy-100 rounded-xl"
            />

            <textarea
              required
              placeholder="Bio *"
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              rows={4}
              className="w-full p-3 text-sm border border-navy-100 rounded-xl"
            />

            <div className="flex flex-col sm:flex-row gap-3 items-start">
              {form.imageUrl ? (
                <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-navy-100 shrink-0">
                  <Image src={form.imageUrl} alt="Preview" fill className="object-cover" sizes="96px" />
                </div>
              ) : null}
              <div className="flex flex-col gap-2 flex-1 w-full">
                <button
                  type="button"
                  onClick={() => setMediaOpen(true)}
                  className="px-4 py-2 text-sm border border-navy-100 rounded-xl hover:bg-cream-50 text-left"
                >
                  {form.imageUrl ? 'Change photo' : 'Choose photo from media library'}
                </button>
                <input
                  placeholder="Or paste image URL"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  className="w-full p-3 text-sm border border-navy-100 rounded-xl"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <select
                value={form.specialisation}
                onChange={(e) => setForm({ ...form, specialisation: e.target.value })}
                className="w-full p-3 text-sm border border-navy-100 rounded-xl"
              >
                <option value="">Specialism (optional)</option>
                {COACH_SPECIALISATION_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <select
                value={form.credentialLevel}
                onChange={(e) => setForm({ ...form, credentialLevel: e.target.value })}
                className="w-full p-3 text-sm border border-navy-100 rounded-xl"
              >
                <option value="">ICI level (optional)</option>
                {COACH_LEVEL_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <input
                placeholder="Languages (comma-separated)"
                value={form.languages}
                onChange={(e) => setForm({ ...form, languages: e.target.value })}
                className="w-full p-3 text-sm border border-navy-100 rounded-xl"
              />
              <input
                placeholder="Location (city, country)"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full p-3 text-sm border border-navy-100 rounded-xl"
              />
            </div>

            <select
              value={form.availability}
              onChange={(e) => setForm({ ...form, availability: e.target.value })}
              className="w-full p-3 text-sm border border-navy-100 rounded-xl"
            >
              {COACH_AVAILABILITY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Contact email (optional)"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-3 text-sm border border-navy-100 rounded-xl"
              />
              <input
                placeholder="Booking URL (optional)"
                value={form.bookingUrl}
                onChange={(e) => setForm({ ...form, bookingUrl: e.target.value })}
                className="w-full p-3 text-sm border border-navy-100 rounded-xl"
              />
            </div>

            <input
              placeholder="LinkedIn URL (optional)"
              value={form.linkedinUrl}
              onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
              className="w-full p-3 text-sm border border-navy-100 rounded-xl"
            />

            <div className="flex flex-wrap gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                />
                Published
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.showInDirectory}
                  onChange={(e) => setForm({ ...form, showInDirectory: e.target.checked })}
                />
                Show on Find a Coach
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.showOnFaculty}
                  onChange={(e) => setForm({ ...form, showOnFaculty: e.target.checked })}
                />
                Show on Faculty page
              </label>
              <input
                type="number"
                placeholder="Order"
                value={form.displayOrder}
                onChange={(e) => setForm({ ...form, displayOrder: parseInt(e.target.value, 10) || 0 })}
                className="w-24 p-2 text-sm border border-navy-100 rounded-xl"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm border border-navy-100 rounded-xl">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="px-4 py-2 text-sm text-white bg-brand-navy-900 rounded-xl disabled:opacity-50">
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}

      <MediaPicker
        open={mediaOpen}
        onClose={() => setMediaOpen(false)}
        fileType="IMAGE"
        onSelect={(url) => {
          setForm((f) => ({ ...f, imageUrl: url }));
          setMediaOpen(false);
        }}
      />
    </div>
  );
}
