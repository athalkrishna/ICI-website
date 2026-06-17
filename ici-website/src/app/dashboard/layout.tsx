import { ReactNode } from 'react';
import DashboardProviders from './DashboardProviders';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import PortalShell from '@/components/portal/PortalShell';

export const metadata = {
  title: 'Student Portal | International Coaching Institute',
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardProviders>
      <div className="h-full min-h-0">
        <PortalShell sidebar={<DashboardSidebar />}>{children}</PortalShell>
      </div>
    </DashboardProviders>
  );
}
