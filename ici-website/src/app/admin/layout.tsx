import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import AdminProviders from './AdminProviders';
import AdminLayoutShell from '@/components/admin/AdminLayoutShell';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <AdminProviders>
      <AdminLayoutShell session={session}>{children}</AdminLayoutShell>
    </AdminProviders>
  );
}
