'use client';

import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { formatDateTime, formatEnumLabel } from '@/lib/admin-utils';
import PortalPageHeader from '@/components/portal/PortalPageHeader';

type EmailLog = {
  id: string;
  recipientEmail: string;
  subject: string;
  templateUsed: string;
  status: string;
  sentAt: string;
  errorMessage: string | null;
};

export default function AdminEmailLogsPage() {
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [templateFilter, setTemplateFilter] = useState('');

  const loadLogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '25' });
      if (statusFilter) params.set('status', statusFilter);
      if (templateFilter) params.set('template', templateFilter);
      const res = await fetch(`/api/admin/email-logs?${params}`);
      const data = await res.json();
      setLogs(data.logs ?? []);
      setTotal(data.total ?? 0);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, templateFilter]);

  useEffect(() => { loadLogs(); }, [loadLogs]);

  const totalPages = Math.ceil(total / 25);

  return (
    <div>
      <PortalPageHeader
        title="Email Logs"
        description="Track sent and failed transactional emails."
      />

      <div className="flex flex-wrap gap-3 mb-6">
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="px-3 py-2 text-sm border border-navy-100 rounded-xl bg-white">
          <option value="">All statuses</option>
          <option value="SENT">Sent</option>
          <option value="FAILED">Failed</option>
          <option value="BOUNCED">Bounced</option>
        </select>
        <select value={templateFilter} onChange={(e) => { setTemplateFilter(e.target.value); setPage(1); }} className="px-3 py-2 text-sm border border-navy-100 rounded-xl bg-white">
          <option value="">All templates</option>
          <option value="WELCOME_STUDENT">Welcome Student</option>
          <option value="LEAD_CONFIRMATION">Lead Confirmation</option>
          <option value="CREDENTIAL_ISSUED">Credential Issued</option>
          <option value="COURSE_ACCESS_GRANTED">Course Access</option>
          <option value="ADMIN_NEW_LEAD">Admin New Lead</option>
          <option value="PASSWORD_RESET">Password Reset</option>
          <option value="CUSTOM">Custom</option>
        </select>
        <span className="text-sm text-muted self-center">{total} emails</span>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-navy-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream-50 border-b border-navy-200 text-muted">
              <tr>
                <th className="px-6 py-4 font-medium">Sent</th>
                <th className="px-6 py-4 font-medium">Recipient</th>
                <th className="px-6 py-4 font-medium">Subject</th>
                <th className="px-6 py-4 font-medium">Template</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-muted">Loading…</td></tr>
              ) : logs.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-muted">No email logs found.</td></tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-cream-50">
                    <td className="px-6 py-4 text-muted whitespace-nowrap">{formatDateTime(log.sentAt)}</td>
                    <td className="px-6 py-4 text-brand-navy-900">{log.recipientEmail}</td>
                    <td className="px-6 py-4 text-navy-700 max-w-xs truncate" title={log.subject}>{log.subject}</td>
                    <td className="px-6 py-4 text-muted">{formatEnumLabel(log.templateUsed)}</td>
                    <td className="px-6 py-4">
                      <span className={clsx('inline-flex px-2 py-0.5 rounded-full text-xs font-medium border',
                        log.status === 'SENT' ? 'bg-green-50 text-green-700 border-green-100' :
                        log.status === 'FAILED' ? 'bg-red-50 text-red-700 border-red-100' :
                        'bg-amber-50 text-amber-700 border-amber-100')}>
                        {log.status}
                      </span>
                      {log.errorMessage && (
                        <span className="block text-xs text-red-600 mt-1 truncate max-w-[200px]" title={log.errorMessage}>{log.errorMessage}</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 p-4 border-t border-navy-100">
            <button type="button" disabled={page <= 1} onClick={() => setPage(page - 1)} className="px-3 py-1 text-sm border border-navy-100 rounded-lg disabled:opacity-50">Previous</button>
            <span className="text-sm text-muted">Page {page} of {totalPages}</span>
            <button type="button" disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="px-3 py-1 text-sm border border-navy-100 rounded-lg disabled:opacity-50">Next</button>
          </div>
        )}
      </div>
    </div>
  );
}
