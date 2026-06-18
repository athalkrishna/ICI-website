'use client';

import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PortalShell from '@/components/portal/PortalShell';

export default function DashboardPortalShell({ children }: { children: ReactNode }) {
  const { data: session } = useSession();

  return (
    <PortalShell
      mobileTitle="Student Portal"
      headerUserName={session?.user?.name}
      headerUserMeta={session?.user?.email ?? undefined}
      siteHref="/"
      sidebar={<DashboardSidebar />}
    >
      {children}
    </PortalShell>
  );
}
