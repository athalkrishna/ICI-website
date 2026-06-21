'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { ArrowLeft, Upload, Plus, Trash2, GraduationCap, Mail, Users } from 'lucide-react';
import { formatDate } from '@/lib/admin-utils';
import PortalPageHeader from '@/components/portal/PortalPageHeader';
import { portalInputClass, portalPrimaryBtnClass } from '@/components/portal/portal-styles';

type AlumniContact = {
  id: string;
  email: string;
  name: string | null;
  source: string | null;
  subscribedAt: string;
};

type Stats = {
  total: number;
  dashboardStudents: number;
  alumni: number;
  externalSubscribers: number;
};

export default function NewsletterSubscribersPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [alumni, setAlumni] = useState<AlumniContact[]>([]);
  const [alumniTotal, setAlumniTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [search, setSearch] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      const [statsRes, alumniRes] = await Promise.all([
        fetch('/api/admin/newsletter/recipients'),
        fetch(`/api/admin/newsletter/alumni?${params}`),
      ]);
      const statsData = await statsRes.json();
      const alumniData = await alumniRes.json();
      setStats(statsData?.total != null ? statsData : null);
      setAlumni(Array.isArray(alumniData.contacts) ? alumniData.contacts : []);
      setAlumniTotal(alumniData.total ?? 0);
    } catch {
      toast.error('Failed to load subscriber lists');
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCsvImport = async (file: File) => {
    setImporting(true);
    try {
      const text = await file.text();
      const res = await fetch('/api/admin/newsletter/alumni', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csv: text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Import failed');
      toast.success(`Imported ${data.imported} alumni (${data.skipped} skipped — already dashboard students)`);
      loadData();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Import failed');
    } finally {
      setImporting(false);
    }
  };

  const handleAddAlumni = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/newsletter/alumni', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newEmail, name: newName || null }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add');
      toast.success('Alumni contact added');
      setNewEmail('');
      setNewName('');
      loadData();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to add contact');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this alumni contact from the newsletter list?')) return;
    try {
      const res = await fetch(`/api/admin/newsletter/alumni?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Contact removed');
      loadData();
    } catch {
      toast.error('Failed to remove contact');
    }
  };

  return (
    <div>
      <Link href="/admin/newsletter" className="inline-flex items-center gap-1 text-sm text-muted hover:text-brand-navy-900 mb-4">
        <ArrowLeft size={14} />
        Back to Newsletter
      </Link>

      <PortalPageHeader
        title="Newsletter Subscribers"
        description="Three audiences receive every published newsletter. Only dashboard students get login access."
      />

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white border border-navy-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-brand-navy-900 font-medium mb-2">
              <GraduationCap size={18} className="text-brand-gold-600" />
              Dashboard students
            </div>
            <p className="text-3xl font-semibold text-brand-navy-900">{stats.dashboardStudents}</p>
            <p className="text-xs text-muted mt-2">
              Paid enrolments + manual admin enrollments. Each gets a student dashboard and welcome email with login credentials.
            </p>
            <Link href="/admin/students" className="text-xs text-brand-gold-700 hover:underline mt-2 inline-block">
              Manage in Students →
            </Link>
          </div>
          <div className="bg-white border border-navy-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-brand-navy-900 font-medium mb-2">
              <Users size={18} className="text-brand-gold-600" />
              Alumni list
            </div>
            <p className="text-3xl font-semibold text-brand-navy-900">{stats.alumni}</p>
            <p className="text-xs text-muted mt-2">
              Legacy / 25k+ student database. Newsletter only — no dashboard access.
            </p>
          </div>
          <div className="bg-white border border-navy-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-brand-navy-900 font-medium mb-2">
              <Mail size={18} className="text-brand-gold-600" />
              Website subscribers
            </div>
            <p className="text-3xl font-semibold text-brand-navy-900">{stats.externalSubscribers}</p>
            <p className="text-xs text-muted mt-2">Signed up via footer form. No dashboard.</p>
          </div>
        </div>
      )}

      <section className="bg-white rounded-2xl border border-navy-100 p-6 mb-8">
        <h2 className="text-h3 text-brand-navy-900 mb-2">Import alumni contacts (CSV)</h2>
        <p className="text-sm text-muted mb-4">
          Upload your 25k student list. Format: one row per line — <code className="font-mono text-xs bg-cream-50 px-1 rounded">email,name</code>.
          Rows that match existing dashboard students are skipped automatically.
        </p>
        <label className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-navy-100 rounded-xl cursor-pointer hover:bg-cream-50">
          <Upload size={16} />
          {importing ? 'Importing…' : 'Choose CSV file'}
          <input
            type="file"
            accept=".csv,.txt"
            className="hidden"
            disabled={importing}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleCsvImport(file);
              e.target.value = '';
            }}
          />
        </label>
      </section>

      <section className="bg-white rounded-2xl border border-navy-100 overflow-hidden">
        <div className="p-6 border-b border-navy-100 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-h3 text-brand-navy-900">Alumni newsletter list</h2>
            <p className="text-sm text-muted">{alumniTotal} contacts total</p>
          </div>
          <input
            type="search"
            placeholder="Search email or name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`${portalInputClass} w-64`}
          />
        </div>

        <form onSubmit={handleAddAlumni} className="p-6 border-b border-navy-50 flex flex-wrap gap-3 items-end bg-cream-50/50">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-medium text-navy-700 mb-1">Email</label>
            <input required type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className={portalInputClass} />
          </div>
          <div className="flex-1 min-w-[160px]">
            <label className="block text-xs font-medium text-navy-700 mb-1">Name (optional)</label>
            <input value={newName} onChange={(e) => setNewName(e.target.value)} className={portalInputClass} />
          </div>
          <button type="submit" className={portalPrimaryBtnClass}>
            <Plus size={16} />
            Add contact
          </button>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-cream-50 text-muted border-b border-navy-100">
              <tr>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Source</th>
                <th className="px-6 py-3 font-medium">Added</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-muted">Loading…</td></tr>
              ) : alumni.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-muted">No alumni contacts yet. Import a CSV to get started.</td></tr>
              ) : (
                alumni.map((c) => (
                  <tr key={c.id} className="hover:bg-cream-50">
                    <td className="px-6 py-3 font-mono text-xs">{c.email}</td>
                    <td className="px-6 py-3">{c.name ?? '—'}</td>
                    <td className="px-6 py-3 text-muted capitalize">{c.source ?? 'import'}</td>
                    <td className="px-6 py-3 text-muted">{formatDate(c.subscribedAt)}</td>
                    <td className="px-6 py-3">
                      <button type="button" onClick={() => handleDelete(c.id)} className="text-red-600 hover:text-red-700">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
