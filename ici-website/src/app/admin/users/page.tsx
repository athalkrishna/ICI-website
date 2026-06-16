'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { Plus, Trash2, Pencil } from 'lucide-react';
import { formatDate, formatEnumLabel } from '@/lib/admin-utils';
import PortalPageHeader from '@/components/portal/PortalPageHeader';
import { portalPrimaryBtnClass } from '@/components/portal/portal-styles';

type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: 'SUPER_ADMIN' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  lastLoginAt: string | null;
  createdAt: string;
};

export default function AdminUsersPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', role: 'ADMIN' as 'ADMIN' | 'SUPER_ADMIN', status: 'ACTIVE' as 'ACTIVE' | 'INACTIVE' | 'SUSPENDED', password: '' });

  const isSuperAdmin = session?.user?.role === 'SUPER_ADMIN';

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      if (res.status === 403) {
        router.push('/admin');
        return;
      }
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (session && !isSuperAdmin) {
      router.push('/admin');
      return;
    }
    if (isSuperAdmin) loadUsers();
  }, [session, isSuperAdmin, loadUsers, router]);

  const openCreate = () => {
    setEditingId(null);
    setForm({ name: '', email: '', role: 'ADMIN', status: 'ACTIVE', password: '' });
    setTempPassword(null);
    setModalOpen(true);
  };

  const openEdit = (user: AdminUser) => {
    setEditingId(user.id);
    setForm({ name: user.name, email: user.email, role: user.role, status: user.status, password: '' });
    setTempPassword(null);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = editingId
        ? { name: form.name, email: form.email, role: form.role, status: form.status, ...(form.password ? { password: form.password } : {}) }
        : { name: form.name, email: form.email, role: form.role, status: form.status, ...(form.password ? { password: form.password } : {}) };

      const res = editingId
        ? await fetch(`/api/admin/users/${editingId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        : await fetch('/api/admin/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Save failed');
      }

      const data = await res.json();
      if (data.tempPassword) setTempPassword(data.tempPassword);
      toast.success(editingId ? 'User updated' : 'User created');
      if (!data.tempPassword) setModalOpen(false);
      loadUsers();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save user');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete admin user "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Delete failed');
      }
      toast.success('User deleted');
      loadUsers();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete user');
    }
  };

  if (!isSuperAdmin) {
    return <p className="text-muted">Access restricted to super administrators.</p>;
  }

  return (
    <div>
      <PortalPageHeader
        title="Users"
        description="Manage admin and super admin accounts."
        actions={
          <button type="button" onClick={openCreate} className={portalPrimaryBtnClass}>
            <Plus size={16} /> Add User
          </button>
        }
      />

      <div className="bg-white rounded-2xl shadow-md border border-navy-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream-50 border-b border-navy-200 text-muted">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Last Login</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50">
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-muted">Loading…</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-muted">No users found.</td></tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-cream-50">
                    <td className="px-6 py-4 font-medium text-brand-navy-900">{user.name}</td>
                    <td className="px-6 py-4 text-muted">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={clsx('inline-flex px-2 py-0.5 rounded-full text-xs font-medium border',
                        user.role === 'SUPER_ADMIN' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-navy-50 text-navy-700 border-navy-100')}>
                        {formatEnumLabel(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={clsx('inline-flex px-2 py-0.5 rounded-full text-xs font-medium border',
                        user.status === 'ACTIVE' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100')}>
                        {formatEnumLabel(user.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted">{user.lastLoginAt ? formatDate(user.lastLoginAt) : 'Never'}</td>
                    <td className="px-6 py-4">
                      {user.id !== session?.user?.id && (
                        <div className="flex gap-2">
                          <button type="button" onClick={() => openEdit(user)} className="text-brand-gold-700 hover:text-brand-gold-800"><Pencil size={14} /></button>
                          <button type="button" onClick={() => handleDelete(user.id, user.name)} className="text-red-600 hover:text-red-700"><Trash2 size={14} /></button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-navy-900/60" onClick={() => setModalOpen(false)} />
          <form onSubmit={handleSave} className="relative bg-white rounded-2xl shadow-xl border border-navy-100 w-full max-w-md p-6 space-y-4">
            <h2 className="text-h3 text-brand-navy-900">{editingId ? 'Edit' : 'Add'} User</h2>
            {tempPassword && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm">
                <p className="font-medium text-amber-800 mb-1">Temporary password (share securely):</p>
                <code className="text-brand-navy-900 font-mono">{tempPassword}</code>
              </div>
            )}
            <input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full p-3 text-sm border border-navy-100 rounded-xl" />
            <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full p-3 text-sm border border-navy-100 rounded-xl" />
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as 'ADMIN' | 'SUPER_ADMIN' })} className="w-full p-3 text-sm border border-navy-100 rounded-xl">
              <option value="ADMIN">Admin</option>
              <option value="SUPER_ADMIN">Super Admin</option>
            </select>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' })} className="w-full p-3 text-sm border border-navy-100 rounded-xl">
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
            <input type="password" placeholder={editingId ? 'New password (optional)' : 'Password (optional, auto-generated if blank)'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full p-3 text-sm border border-navy-100 rounded-xl" minLength={8} />
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
