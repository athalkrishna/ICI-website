'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { isPortalRoute } from '@/lib/portal-routes';

const CookieNotice = dynamic(() => import('@/components/shared/CookieNotice'), { ssr: false });

export default function SiteCookieNotice() {
  const pathname = usePathname();

  if (isPortalRoute(pathname)) {
    return null;
  }

  return <CookieNotice />;
}
