'use client';

import { usePathname } from 'next/navigation';
import type { Session } from 'next-auth';
import AdminSidebar from './AdminSidebar';
import PortalShell from '@/components/portal/PortalShell';
import { formatEnumLabel } from '@/lib/admin-utils';

export default function AdminLayoutShell({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const pathname = usePathname();

  if (pathname === '/admin/login') {
    return <div className="h-full min-h-0 overflow-y-auto">{children}</div>;
  }

  return (
    <div className="h-full min-h-0">
      <PortalShell
        mobileTitle="Admin Portal"
        headerUserName={session?.user?.name}
        headerUserMeta={session?.user?.role ? formatEnumLabel(session.user.role) : undefined}
        siteHref="/"
        sidebar={
          session?.user ? (
            <AdminSidebar userName={session.user.name} userRole={session.user.role} />
          ) : null
        }
      >
        {children}
      </PortalShell>
    </div>
  );
}
