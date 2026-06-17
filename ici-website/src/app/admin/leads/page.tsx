'use client';

import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { Download, Search, Trash2, X } from 'lucide-react';
import { formatDate, formatDateTime, formatEnumLabel } from '@/lib/admin-utils';
import PortalPageHeader from '@/components/portal/PortalPageHeader';
import { portalSecondaryBtnClass } from '@/components/portal/portal-styles';

type Lead = {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  country: string | null;
  programmeInterest: string;
  source: string;
  status: string;
  message: string | null;
  notes: string | null;
  assignedTo: string | null;
  createdAt: string;
  statusHistory?: Array<{
    id: string;
    fromStatus: string | null;
    toStatus: string;
    note: string | null;
    createdAt: string;
  }>;
};

const statuses = ['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST', 'SPAM'];
const sources = ['HOME_FORM', 'CONTACT_FORM', 'APPLY_FORM', 'ASSESSMENT_FORM', 'OTHER'];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [search, setSearch] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editNotes, setEditNotes] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');

  const loadLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
      if (sourceFilter) params.set('source', sourceFilter);
      if (search) params.set('search', search);
      const res = await fetch(`/api/admin/leads?${params}`);
      const data = await res.json();
      setLeads(data.leads ?? []);
      setTotal(data.total ?? 0);
    } catch {
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, sourceFilter, search]);

  useEffect(() => {
    const timer = setTimeout(loadLeads, search ? 300 : 0);
    return () => clearTimeout(timer);
  }, [loadLeads, search]);

  const openDetail = async (lead: Lead) => {
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`);
      const data = await res.json();
      setSelectedLead(data);
      setEditNotes(data.notes ?? '');
      setEditStatus(data.status);
      setStatusNote('');
    } catch {
      toast.error('Failed to load lead details');
    }
  };

  const handleSave = async () => {
    if (!selectedLead) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/leads/${selectedLead.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notes: editNotes,
          status: editStatus,
          statusNote: statusNote || undefined,
        }),
      });
      if (!res.ok) throw new Error('Save failed');
      toast.success('Lead updated');
      setSelectedLead(null);
      loadLeads();
    } catch {
      toast.error('Failed to update lead');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (lead: Lead) => {
    if (!confirm(`Delete lead "${lead.fullName}"? This cannot be undone.`)) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Lead deleted');
      if (selectedLead?.id === lead.id) setSelectedLead(null);
      loadLeads();
    } catch {
      toast.error('Failed to delete lead');
    } finally {
      setDeleting(false);
    }
  };

  const handleExport = () => {
    const params = new URLSearchParams();
    if (statusFilter) params.set('status', statusFilter);
    if (sourceFilter) params.set('source', sourceFilter);
    window.open(`/api/admin/leads/export?${params}`, '_blank');
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'NEW': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'CONTACTED': return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'QUALIFIED': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'CONVERTED': return 'bg-green-50 text-green-700 border-green-100';
      case 'LOST': return 'bg-gray-50 text-gray-600 border-gray-100';
      case 'SPAM': return 'bg-red-50 text-red-700 border-red-100';
      default: return 'bg-navy-50 text-navy-700 border-navy-100';
    }
  };

  return (
    <div>
      <PortalPageHeader
        title="Leads"
        description="View and manage form submissions."
        actions={
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted bg-white px-4 py-2 rounded-xl border border-navy-100">
              {total} total
            </span>
            <button type="button" onClick={handleExport} className={portalSecondaryBtnClass}>
              <Download size={16} /> Export CSV
            </button>
          </div>
        }
      />

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input type="text" placeholder="Search name, email, phone…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 pr-4 py-2 text-sm border border-navy-100 rounded-xl bg-white w-64" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 text-sm border border-navy-100 rounded-xl bg-white">
          <option value="">All statuses</option>
          {statuses.map((s) => (<option key={s} value={s}>{formatEnumLabel(s)}</option>))}
        </select>
        <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)} className="px-3 py-2 text-sm border border-navy-100 rounded-xl bg-white">
          <option value="">All sources</option>
          {sources.map((s) => (<option key={s} value={s}>{formatEnumLabel(s)}</option>))}
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-navy-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-cream-50 border-b border-navy-200 text-muted">
              <tr>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Interest</th>
                <th className="px-6 py-4 font-medium">Source</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50">
              {loading ? (
                <tr><td colSpan={7} className="px-6 py-8 text-center text-muted">Loading…</td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-8 text-center text-muted">No leads found.</td></tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} onClick={() => openDetail(lead)} className="hover:bg-cream-50 cursor-pointer transition-colors">
                    <td className="px-6 py-4 text-muted">{formatDate(lead.createdAt)}</td>
                    <td className="px-6 py-4 font-medium text-brand-navy-900">{lead.fullName}</td>
                    <td className="px-6 py-4">
                      <span className="block text-navy-700">{lead.email}</span>
                      {lead.phone && <span className="text-xs text-muted">{lead.phone}</span>}
                    </td>
                    <td className="px-6 py-4 text-muted">{formatEnumLabel(lead.programmeInterest)}</td>
                    <td className="px-6 py-4 text-muted">{formatEnumLabel(lead.source)}</td>
                    <td className="px-6 py-4">
                      <span className={clsx('inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border', statusColor(lead.status))}>
                        {formatEnumLabel(lead.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(lead);
                        }}
                        disabled={deleting}
                        className="text-red-600 hover:text-red-700 disabled:opacity-50"
                        title="Delete lead"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-navy-900/60" onClick={() => setSelectedLead(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl border border-navy-100 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-navy-100">
              <h2 className="text-h3 text-brand-navy-900">{selectedLead.fullName}</h2>
              <button type="button" onClick={() => setSelectedLead(null)} className="text-muted hover:text-navy-900"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted block">Email</span><a href={`mailto:${selectedLead.email}`} className="text-brand-gold-700 hover:underline">{selectedLead.email}</a></div>
                <div><span className="text-muted block">Phone</span>{selectedLead.phone || '—'}</div>
                <div><span className="text-muted block">Country</span>{selectedLead.country || '—'}</div>
                <div><span className="text-muted block">Interest</span>{formatEnumLabel(selectedLead.programmeInterest)}</div>
                <div><span className="text-muted block">Source</span>{formatEnumLabel(selectedLead.source)}</div>
                <div><span className="text-muted block">Submitted</span>{formatDateTime(selectedLead.createdAt)}</div>
              </div>
              {selectedLead.message && (
                <div><span className="text-muted text-sm block mb-1">Message</span><p className="text-sm bg-cream-50 p-3 rounded-xl">{selectedLead.message}</p></div>
              )}
              <div>
                <label className="text-sm font-medium text-navy-700 block mb-1">Status</label>
                <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} className="w-full p-3 text-sm border border-navy-100 rounded-xl">
                  {statuses.map((s) => (<option key={s} value={s}>{formatEnumLabel(s)}</option>))}
                </select>
              </div>
              {editStatus !== selectedLead.status && (
                <div>
                  <label className="text-sm font-medium text-navy-700 block mb-1">Status change note</label>
                  <input value={statusNote} onChange={(e) => setStatusNote(e.target.value)} className="w-full p-3 text-sm border border-navy-100 rounded-xl" placeholder="Optional note for history" />
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-navy-700 block mb-1">Internal notes</label>
                <textarea value={editNotes} onChange={(e) => setEditNotes(e.target.value)} rows={3} className="w-full p-3 text-sm border border-navy-100 rounded-xl" />
              </div>
              {selectedLead.statusHistory && selectedLead.statusHistory.length > 0 && (
                <div>
                  <span className="text-sm font-medium text-navy-700 block mb-2">Status History</span>
                  <ul className="space-y-2 text-xs text-muted">
                    {selectedLead.statusHistory.map((h) => (
                      <li key={h.id} className="bg-cream-50 p-2 rounded-lg">
                        {h.fromStatus ? formatEnumLabel(h.fromStatus) : 'New'} → {formatEnumLabel(h.toStatus)}
                        {h.note && `: ${h.note}`}
                        <span className="block">{formatDateTime(h.createdAt)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleDelete(selectedLead)}
                  disabled={deleting || saving}
                  className="px-4 py-2 text-sm text-red-600 border border-red-200 rounded-xl hover:bg-red-50 disabled:opacity-50"
                >
                  {deleting ? 'Deleting…' : 'Delete lead'}
                </button>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setSelectedLead(null)} className="px-4 py-2 text-sm border border-navy-100 rounded-xl">Cancel</button>
                  <button type="button" onClick={handleSave} disabled={saving || deleting} className="px-4 py-2 text-sm text-white bg-brand-navy-900 rounded-xl disabled:opacity-50">{saving ? 'Saving…' : 'Save'}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
