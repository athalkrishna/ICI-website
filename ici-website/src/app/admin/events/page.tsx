'use client';

import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { Plus, Trash2 } from 'lucide-react';
import { formatDate, formatEnumLabel } from '@/lib/admin-utils';
import PortalPageHeader from '@/components/portal/PortalPageHeader';
import { portalPrimaryBtnClass } from '@/components/portal/portal-styles';

type EventItem = {
  id: string;
  title: string;
  slug: string;
  eventType: string;
  status: string;
  startDate: string;
  endDate: string;
  locationType: string;
  featured: boolean;
};

const eventTypes = ['WEBINAR', 'SUMMIT', 'WORKSHOP', 'MASTERCLASS', 'COMMUNITY_CALL', 'OTHER'];
const eventStatuses = ['UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED'];
const locationTypes = ['ONLINE', 'IN_PERSON', 'HYBRID'];

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    fullDescription: '',
    eventType: 'WEBINAR',
    startDate: '',
    endDate: '',
    locationType: 'ONLINE',
  });

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

  useEffect(() => { loadEvents(); }, [loadEvents]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          startDate: new Date(form.startDate).toISOString(),
          endDate: new Date(form.endDate).toISOString(),
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Create failed');
      }
      toast.success('Event created');
      setShowCreate(false);
      loadEvents();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create event');
    } finally {
      setCreating(false);
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
          <button type="button" onClick={() => setShowCreate(true)} className={portalPrimaryBtnClass}>
            <Plus size={16} /> New Event
          </button>
        }
      />

      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="mb-6 px-3 py-2 text-sm border border-navy-100 rounded-xl bg-white">
        <option value="">All statuses</option>
        {eventStatuses.map((s) => (<option key={s} value={s}>{formatEnumLabel(s)}</option>))}
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
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-muted">Loading…</td></tr>
              ) : events.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-muted">No events found.</td></tr>
              ) : (
                events.map((event) => (
                  <tr key={event.id} className="hover:bg-cream-50">
                    <td className="px-6 py-4 font-medium text-brand-navy-900">{event.title}</td>
                    <td className="px-6 py-4 text-muted">{formatEnumLabel(event.eventType)}</td>
                    <td className="px-6 py-4 text-muted">{formatDate(event.startDate)}</td>
                    <td className="px-6 py-4">
                      <span className={clsx('inline-flex px-2 py-0.5 rounded-full text-xs font-medium border',
                        event.status === 'UPCOMING' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        event.status === 'COMPLETED' ? 'bg-gray-50 text-gray-600 border-gray-100' :
                        'bg-amber-50 text-amber-700 border-amber-100')}>{formatEnumLabel(event.status)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button type="button" onClick={() => handleDelete(event.id, event.title)} className="text-red-600 hover:text-red-700"><Trash2 size={14} /></button>
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
            <h2 className="text-h3 text-brand-navy-900">New Event</h2>
            <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full p-3 text-sm border border-navy-100 rounded-xl" />
            <textarea required placeholder="Short description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full p-3 text-sm border border-navy-100 rounded-xl" rows={2} />
            <textarea required placeholder="Full description" value={form.fullDescription} onChange={(e) => setForm({ ...form, fullDescription: e.target.value })} className="w-full p-3 text-sm border border-navy-100 rounded-xl" rows={4} />
            <select value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })} className="w-full p-3 text-sm border border-navy-100 rounded-xl">
              {eventTypes.map((t) => (<option key={t} value={t}>{formatEnumLabel(t)}</option>))}
            </select>
            <select value={form.locationType} onChange={(e) => setForm({ ...form, locationType: e.target.value })} className="w-full p-3 text-sm border border-navy-100 rounded-xl">
              {locationTypes.map((t) => (<option key={t} value={t}>{formatEnumLabel(t)}</option>))}
            </select>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted block mb-1">Start</label>
                <input required type="datetime-local" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="w-full p-3 text-sm border border-navy-100 rounded-xl" />
              </div>
              <div>
                <label className="text-xs text-muted block mb-1">End</label>
                <input required type="datetime-local" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="w-full p-3 text-sm border border-navy-100 rounded-xl" />
              </div>
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
