'use client';

import { usePathname } from 'next/navigation';
import type { Session } from 'next-auth';
import AdminSidebar from './AdminSidebar';
import PortalShell from '@/components/portal/PortalShell';

export default function AdminLayoutShell({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const pathname = usePathname();

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <PortalShell
      sidebar={
        session?.user ? (
          <AdminSidebar userName={session.user.name} userRole={session.user.role} />
        ) : null
      }
    >
      {children}
    </PortalShell>
  );
}
