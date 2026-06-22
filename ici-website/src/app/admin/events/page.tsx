'use client';

import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { Plus, Trash2, Pencil, ExternalLink } from 'lucide-react';
import { formatDate, formatEnumLabel } from '@/lib/admin-utils';
import PortalPageHeader from '@/components/portal/PortalPageHeader';
import { portalPrimaryBtnClass } from '@/components/portal/portal-styles';
import EventEditor, {
  emptyEventForm,
  eventSeoComplete,
  eventToForm,
  formToEventPayload,
  EVENT_STATUSES,
} from '@/components/admin/EventEditor';
import MediaPicker from '@/components/admin/MediaPicker';

type EventItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  eventType: string;
  status: string;
  startDate: string;
  endDate: string;
  locationType: string;
  featured: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [modal, setModal] = useState<'create' | 'edit' | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyEventForm());
  const [saving, setSaving] = useState(false);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    try {
      const params = statusFilter ? `?status=${statusFilter}` : '';
      const res = await fetch(`/api/admin/events${params}`);
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const closeModal = () => {
    setModal(null);
    setEditingId(null);
    setForm(emptyEventForm());
  };

  const openCreate = () => {
    setForm(emptyEventForm());
    setEditingId(null);
    setModal('create');
  };

  const openEdit = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/events/${id}`);
      if (!res.ok) throw new Error('Failed to load event');
      const event = await res.json();
      setForm(eventToForm(event));
      setEditingId(id);
      setModal('edit');
    } catch {
      toast.error('Failed to load event');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = formToEventPayload(form);
      const res = await fetch(
        modal === 'edit' && editingId ? `/api/admin/events/${editingId}` : '/api/admin/events',
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
      toast.success(modal === 'edit' ? 'Event updated' : 'Event created');
      closeModal();
      loadEvents();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save event');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/events/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Event deleted');
      loadEvents();
    } catch {
      toast.error('Failed to delete event');
    }
  };

  return (
    <div>
      <PortalPageHeader
        title="Events"
        description="Manage webinars, workshops and summits."
        actions={
          <button type="button" onClick={openCreate} className={portalPrimaryBtnClass}>
            <Plus size={16} /> New Event
          </button>
        }
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="mb-6 px-3 py-2 text-sm border border-navy-100 rounded-xl bg-white"
      >
        <option value="">All statuses</option>
        {EVENT_STATUSES.map((s) => (
          <option key={s} value={s}>
            {formatEnumLabel(s)}
          </option>
        ))}
      </select>

      <div className="bg-white rounded-2xl shadow-md border border-navy-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream-50 border-b border-navy-200 text-muted">
              <tr>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Start Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">SEO</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted">
                    Loading…
                  </td>
                </tr>
              ) : events.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted">
                    No events found.
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event.id} className="hover:bg-cream-50">
                    <td className="px-6 py-4 font-medium text-brand-navy-900">{event.title}</td>
                    <td className="px-6 py-4 text-muted">{formatEnumLabel(event.eventType)}</td>
                    <td className="px-6 py-4 text-muted">{formatDate(event.startDate)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={clsx(
                          'inline-flex px-2 py-0.5 rounded-full text-xs font-medium border',
                          event.status === 'UPCOMING'
                            ? 'bg-blue-50 text-blue-700 border-blue-100'
                            : event.status === 'COMPLETED'
                              ? 'bg-gray-50 text-gray-600 border-gray-100'
                              : 'bg-amber-50 text-amber-700 border-amber-100',
                        )}
                      >
                        {formatEnumLabel(event.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={clsx(
                          'inline-flex px-2 py-0.5 rounded-full text-xs font-medium',
                          eventSeoComplete({
                            title: event.title,
                            description: event.description,
                            metaTitle: event.metaTitle ?? '',
                            metaDescription: event.metaDescription ?? '',
                          })
                            ? 'bg-green-50 text-green-700'
                            : 'bg-amber-50 text-amber-700',
                        )}
                      >
                        {eventSeoComplete({
                          title: event.title,
                          description: event.description,
                          metaTitle: event.metaTitle ?? '',
                          metaDescription: event.metaDescription ?? '',
                        })
                          ? 'Complete'
                          : 'Needs review'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(event.id)}
                          className="p-1.5 text-navy-500 hover:text-brand-navy-900"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <a
                          href={`/events/${event.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-navy-500 hover:text-brand-navy-900"
                          title="View"
                        >
                          <ExternalLink size={14} />
                        </a>
                        <button
                          type="button"
                          onClick={() => handleDelete(event.id, event.title)}
                          className="p-1.5 text-red-600 hover:text-red-700"
                          title="Delete"
                        >
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
          <EventEditor
            form={form}
            onChange={setForm}
            onSubmit={handleSubmit}
            onCancel={closeModal}
            onPickCoverImage={() => setMediaPickerOpen(true)}
            saving={saving}
            mode={modal}
          />
        </div>
      )}

      <MediaPicker
        open={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelect={(url, media) => {
          setForm((prev) => ({
            ...prev,
            coverImageUrl: url,
            coverImageAlt: prev.coverImageAlt || media?.altText || prev.title,
          }));
          setMediaPickerOpen(false);
        }}
      />
    </div>
  );
}
