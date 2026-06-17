'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import SiteFooter from '@/components/layout/SiteFooter';
import SiteMain from '@/components/layout/SiteMain';
import SiteCookieNotice from '@/components/layout/SiteCookieNotice';
import { isPortalRoute } from '@/lib/portal-routes';
import type { ContentMap } from '@/lib/content';

export default function SiteChrome({
  children,
  globalContent,
}: {
  children: React.ReactNode;
  globalContent: ContentMap;
}) {
  const pathname = usePathname();
  const portal = isPortalRoute(pathname);

  return (
    <div
      className={clsx(
        'flex flex-col',
        portal ? 'h-dvh max-h-dvh overflow-hidden' : 'min-h-dvh',
      )}
    >
      <Navbar globalContent={globalContent} />
      <SiteMain>{children}</SiteMain>
      <SiteFooter globalContent={globalContent} />
      <SiteCookieNotice />
    </div>
  );
}
