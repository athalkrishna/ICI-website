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
      <PortalShell sidebar={<DashboardSidebar />}>{children}</PortalShell>
    </DashboardProviders>
  );
}
