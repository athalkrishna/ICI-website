import { ReactNode } from 'react';
import DashboardProviders from './DashboardProviders';
import DashboardPortalShell from './DashboardPortalShell';

export const metadata = {
  title: 'Student Portal',
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardProviders>
      <div className="h-full min-h-0">
        <DashboardPortalShell>{children}</DashboardPortalShell>
      </div>
    </DashboardProviders>
  );
}
