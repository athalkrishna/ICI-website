'use client';

import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { Plus, Search, KeyRound } from 'lucide-react';
import { formatDate, formatEnumLabel } from '@/lib/admin-utils';
import StudentCredentialsModal, { type StudentCredentials } from '@/components/admin/StudentCredentialsModal';
import PortalPageHeader from '@/components/portal/PortalPageHeader';
import { portalPrimaryBtnClass } from '@/components/portal/portal-styles';

type Student = {
  id: string;
  userId: string;
  phone: string | null;
  country: string | null;
  enrolledLevel: string | null;
  studentStatus: string;
  credentialIssued: boolean;
  materialAccessCount: number;
  user: {
    id: string;
    name: string;
    email: string;
    status: string;
    lastLoginAt: string | null;
  };
};

const studentStatuses = ['ENQUIRY', 'APPLIED', 'ENROLLED', 'ACTIVE', 'COMPLETED', 'DEFERRED', 'WITHDRAWN'];
const levels = ['CATALYST', 'ARCHITECT', 'SAGE', 'LUMINARY'];

const DEFAULT_LOGIN_URL =
  typeof window !== 'undefined'
    ? `${window.location.origin}/login`
    : 'http://localhost:3000/login';

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', country: '', enrolledLevel: 'CATALYST' });
  const [credentialsOpen, setCredentialsOpen] = useState(false);
  const [credentials, setCredentials] = useState<StudentCredentials | null>(null);
  const [credentialsStudentId, setCredentialsStudentId] = useState<string | undefined>();

  const openCredentials = (student: Student, tempPassword?: string) => {
    setCredentials({
      name: student.user.name,
      email: student.user.email,
      loginUrl: DEFAULT_LOGIN_URL,
      tempPassword,
    });
    setCredentialsStudentId(student.id);
    setCredentialsOpen(true);
  };

  const loadStudents = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
      if (levelFilter) params.set('level', levelFilter);
      if (search) params.set('search', search);
      const res = await fetch(`/api/admin/students?${params}`);
      const data = await res.json();
      setStudents(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, levelFilter, search]);

  useEffect(() => {
    const timer = setTimeout(loadStudents, search ? 300 : 0);
    return () => clearTimeout(timer);
  }, [loadStudents, search]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await fetch('/api/admin/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, enrolledLevel: form.enrolledLevel }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Create failed');
      }
      const data = await res.json();
      toast.success('Student created. Welcome email sent.');
      setShowCreate(false);
      setForm({ name: '', email: '', phone: '', country: '', enrolledLevel: 'CATALYST' });
      await loadStudents();

      if (data.credentials) {
        setCredentials({
          name: data.credentials.name,
          email: data.credentials.email,
          loginUrl: data.credentials.loginUrl ?? DEFAULT_LOGIN_URL,
          tempPassword: data.credentials.tempPassword,
        });
        setCredentialsStudentId(data.profile?.id);
        setCredentialsOpen(true);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create student');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      <PortalPageHeader
        title="Students"
        description="Manage enrolled students and view login credentials."
        actions={
          <button type="button" onClick={() => setShowCreate(true)} className={portalPrimaryBtnClass}>
            <Plus size={16} /> Add Student
          </button>
        }
      />

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input type="text" placeholder="Search students…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 pr-4 py-2 text-sm border border-navy-100 rounded-xl bg-white w-64" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 text-sm border border-navy-100 rounded-xl bg-white">
          <option value="">All statuses</option>
          {studentStatuses.map((s) => (<option key={s} value={s}>{formatEnumLabel(s)}</option>))}
        </select>
        <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)} className="px-3 py-2 text-sm border border-navy-100 rounded-xl bg-white">
          <option value="">All levels</option>
          {levels.map((l) => (<option key={l} value={l}>{formatEnumLabel(l)}</option>))}
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-navy-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream-50 border-b border-navy-200 text-muted">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Level</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Materials</th>
                <th className="px-6 py-4 font-medium">Last Login</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50">
              {loading ? (
                <tr><td colSpan={7} className="px-6 py-8 text-center text-muted">Loading…</td></tr>
              ) : students.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-8 text-center text-muted">No students found.</td></tr>
              ) : (
                students.map((s) => (
                  <tr key={s.id} className="hover:bg-cream-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-brand-navy-900">{s.user.name}</p>
                      {s.credentialIssued && <span className="text-xs text-green-600">Credential issued</span>}
                    </td>
                    <td className="px-6 py-4 text-muted">{s.user.email}</td>
                    <td className="px-6 py-4 text-muted">{s.enrolledLevel ? formatEnumLabel(s.enrolledLevel) : '—'}</td>
                    <td className="px-6 py-4">
                      <span className={clsx('inline-flex px-2 py-0.5 rounded-full text-xs font-medium border',
                        s.studentStatus === 'ACTIVE' || s.studentStatus === 'ENROLLED' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-navy-50 text-navy-700 border-navy-100')}>
                        {formatEnumLabel(s.studentStatus)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted">{s.materialAccessCount}</td>
                    <td className="px-6 py-4 text-muted">{s.user.lastLoginAt ? formatDate(s.user.lastLoginAt) : 'Never'}</td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => openCredentials(s)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-brand-navy-900 border border-navy-100 rounded-lg hover:bg-cream-50"
                      >
                        <KeyRound size={14} />
                        Login details
                      </button>
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
          <form onSubmit={handleCreate} className="relative bg-white rounded-2xl shadow-xl border border-navy-100 w-full max-w-md p-6 space-y-4">
            <h2 className="text-h3 text-brand-navy-900">Add Student</h2>
            <input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full p-3 text-sm border border-navy-100 rounded-xl" />
            <input required type="email" placeholder="Email (login username)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full p-3 text-sm border border-navy-100 rounded-xl" />
            <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full p-3 text-sm border border-navy-100 rounded-xl" />
            <input placeholder="Country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="w-full p-3 text-sm border border-navy-100 rounded-xl" />
            <select value={form.enrolledLevel} onChange={(e) => setForm({ ...form, enrolledLevel: e.target.value })} className="w-full p-3 text-sm border border-navy-100 rounded-xl">
              {levels.map((l) => (<option key={l} value={l}>{formatEnumLabel(l)}</option>))}
            </select>
            <p className="text-xs text-muted">A temporary password will be generated and shown to you after creation.</p>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setShowCreate(false)} className="px-4 py-2 text-sm border border-navy-100 rounded-xl">Cancel</button>
              <button type="submit" disabled={creating} className="px-4 py-2 text-sm text-white bg-brand-navy-900 rounded-xl disabled:opacity-50">{creating ? 'Creating…' : 'Create & Send Welcome'}</button>
            </div>
          </form>
        </div>
      )}

      <StudentCredentialsModal
        open={credentialsOpen}
        credentials={credentials}
        studentId={credentialsStudentId}
        onClose={() => {
          setCredentialsOpen(false);
          setCredentials(null);
          setCredentialsStudentId(undefined);
        }}
        onPasswordReset={(updated) => setCredentials(updated)}
      />
    </div>
  );
}
