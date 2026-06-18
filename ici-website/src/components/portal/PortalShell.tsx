'use client';

import { ReactNode, useEffect, useState } from 'react';
import clsx from 'clsx';
import { X } from 'lucide-react';
import PortalDashboardHeader from './PortalDashboardHeader';
import {
  portalShellClass,
  portalMainContentClass,
  portalSidebarColumnClass,
} from './portal-styles';

type PortalShellProps = {
  sidebar: ReactNode;
  children: ReactNode;
  className?: string;
  mobileTitle?: string;
  headerUserName?: string;
  headerUserMeta?: string;
  siteHref?: string;
};

export default function PortalShell({
  sidebar,
  children,
  className,
  mobileTitle = 'Portal',
  headerUserName,
  headerUserMeta,
  siteHref = '/',
}: PortalShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  return (
    <div className={clsx(portalShellClass, className)}>
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          aria-label="Close navigation menu"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={clsx(
          portalSidebarColumnClass,
          'fixed inset-y-0 left-0 z-50 w-[min(16rem,88vw)] transform transition-transform duration-300 ease-out lg:static lg:z-auto lg:w-auto lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="lg:hidden absolute top-3 right-3 z-10 p-2 rounded-lg bg-brand-navy-800 text-white hover:bg-brand-navy-700"
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
        <div
          className="h-full min-h-0"
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button')) setMobileOpen(false);
          }}
        >
          {sidebar}
        </div>
      </div>

      <div className="flex flex-col flex-1 min-w-0 min-h-0 h-full overflow-hidden">
        <PortalDashboardHeader
          title={mobileTitle}
          userName={headerUserName}
          userMeta={headerUserMeta}
          siteHref={siteHref}
          onMenuClick={() => setMobileOpen(true)}
        />
        <div className={portalMainContentClass}>{children}</div>
      </div>
    </div>
  );
}
