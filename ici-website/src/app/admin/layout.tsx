import { ReactNode } from 'react';
import { getSafeServerSession } from '@/lib/auth';
import AdminProviders from './AdminProviders';
import AdminLayoutShell from '@/components/admin/AdminLayoutShell';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getSafeServerSession();

  return (
    <AdminProviders>
      <AdminLayoutShell session={session}>{children}</AdminLayoutShell>
    </AdminProviders>
  );
}
