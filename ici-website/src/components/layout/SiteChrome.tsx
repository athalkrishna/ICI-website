'use client';

import dynamic from 'next/dynamic';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { isPortalRoute } from '@/lib/portal-routes';
import type { ContentMap } from '@/lib/content';

const SiteCookieNotice = dynamic(() => import('@/components/layout/SiteCookieNotice'), { ssr: false });

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
        'flex flex-col w-full max-w-full overflow-x-hidden',
        portal ? 'h-dvh max-h-dvh overflow-hidden' : 'min-h-dvh',
      )}
    >
      {!portal && <Navbar globalContent={globalContent} />}
      <main
        id="main-content"
        className={
          portal
            ? 'min-h-0 flex-1 overflow-hidden bg-cream-50 flex flex-col'
            : 'flex-1 w-full max-w-full overflow-x-hidden'
        }
      >
        {children}
      </main>
      {!portal && <Footer globalContent={globalContent} />}
      <SiteCookieNotice />
    </div>
  );
}
