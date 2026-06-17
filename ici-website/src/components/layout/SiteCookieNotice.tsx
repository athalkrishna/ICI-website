'use client';

import { usePathname } from 'next/navigation';
import CookieNotice from '@/components/shared/CookieNotice';
import { isPortalRoute } from '@/lib/portal-routes';

export default function SiteCookieNotice() {
  const pathname = usePathname();

  if (isPortalRoute(pathname)) {
    return null;
  }

  return <CookieNotice />;
}
