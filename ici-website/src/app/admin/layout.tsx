import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { getSafeServerSession } from '@/lib/auth';
import AdminProviders from './AdminProviders';
import AdminLayoutShell from '@/components/admin/AdminLayoutShell';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getSafeServerSession();

  return (
    <AdminProviders>
      <AdminLayoutShell session={session}>{children}</AdminLayoutShell>
    </AdminProviders>
  );
}
