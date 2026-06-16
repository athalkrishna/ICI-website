'use client';

import { useState } from 'react';
import { Copy, Check, KeyRound, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export type StudentCredentials = {
  name: string;
  email: string;
  loginUrl: string;
  tempPassword?: string;
};

type Props = {
  open: boolean;
  credentials: StudentCredentials | null;
  studentId?: string;
  onClose: () => void;
  onPasswordReset?: (updated: StudentCredentials) => void;
};

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(`${label} copied`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Copy failed');
    }
  };

  return (
    <div>
      <label className="block text-xs font-medium text-muted mb-1">{label}</label>
      <div className="flex gap-2">
        <input
          readOnly
          value={value}
          className="flex-1 p-3 text-sm border border-navy-100 rounded-xl bg-cream-50 font-mono"
        />
        <button
          type="button"
          onClick={copy}
          className="px-3 py-2 border border-navy-100 rounded-xl hover:bg-cream-50"
          title={`Copy ${label}`}
        >
          {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  );
}

export default function StudentCredentialsModal({
  open,
  credentials,
  studentId,
  onClose,
  onPasswordReset,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [resetting, setResetting] = useState(false);

  if (!open || !credentials) return null;

  const handleReset = async () => {
    if (!studentId) return;
    if (!confirm('Generate a new temporary password? The student will receive it by email and the old password will stop working.')) {
      return;
    }

    setResetting(true);
    try {
      const res = await fetch(`/api/admin/students/${studentId}/reset-password`, { method: 'POST' });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Reset failed');
      }
      const data = await res.json();
      const updated: StudentCredentials = {
        name: data.name ?? credentials.name,
        email: data.email ?? credentials.email,
        loginUrl: data.loginUrl ?? credentials.loginUrl,
        tempPassword: data.tempPassword,
      };
      setShowPassword(true);
      onPasswordReset?.(updated);
      toast.success('New temporary password generated');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to reset password');
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-navy-900/60" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl border border-navy-100 w-full max-w-lg p-6">
        <div className="flex items-start gap-3 mb-6">
          <div className="p-2 bg-brand-gold-500/10 rounded-xl">
            <KeyRound size={22} className="text-brand-gold-600" />
          </div>
          <div>
            <h2 className="text-h3 text-brand-navy-900">Student login credentials</h2>
            <p className="text-sm text-muted mt-1">{credentials.name}</p>
          </div>
        </div>

        <div className="space-y-4">
          <CopyField label="Login email" value={credentials.email} />
          <CopyField label="Login URL" value={credentials.loginUrl} />

          {credentials.tempPassword ? (
            <div>
              <label className="block text-xs font-medium text-muted mb-1">Temporary password</label>
              <div className="flex gap-2">
                <input
                  readOnly
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.tempPassword}
                  className="flex-1 p-3 text-sm border border-green-200 rounded-xl bg-green-50 font-mono text-brand-navy-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="px-3 py-2 border border-navy-100 rounded-xl hover:bg-cream-50"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    await navigator.clipboard.writeText(credentials.tempPassword!);
                    toast.success('Password copied');
                  }}
                  className="px-3 py-2 border border-navy-100 rounded-xl hover:bg-cream-50"
                >
                  <Copy size={16} />
                </button>
              </div>
              <p className="text-xs text-amber-700 mt-2 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                Save this password now. For security it cannot be viewed again after you close this window.
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-navy-100 bg-cream-50 p-4 text-sm text-muted">
              <p className="mb-2">
                Passwords are stored securely and cannot be retrieved. You can generate a new temporary password below — it will be shown here once and emailed to the student.
              </p>
              {studentId && (
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={resetting}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-navy-900 hover:bg-brand-navy-800 rounded-xl disabled:opacity-50"
                >
                  <KeyRound size={14} />
                  {resetting ? 'Generating…' : 'Reset & show new password'}
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-navy-100">
          {credentials.tempPassword && studentId && (
            <button
              type="button"
              onClick={handleReset}
              disabled={resetting}
              className="mr-auto px-4 py-2 text-sm border border-navy-100 rounded-xl hover:bg-cream-50 disabled:opacity-50"
            >
              {resetting ? 'Resetting…' : 'Generate new password'}
            </button>
          )}
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-white bg-brand-navy-900 rounded-xl">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
