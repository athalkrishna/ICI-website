'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { isPortalRoute } from '@/lib/portal-routes';

const CookieNotice = dynamic(() => import('@/components/shared/CookieNotice'), { ssr: false });

export default function DeferredCookieNotice() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      if (!cancelled) setReady(true);
    };

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(load, { timeout: 4000 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const timer = window.setTimeout(load, 3000);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  if (isPortalRoute(pathname) || !ready) {
    return null;
  }

  return <CookieNotice />;
}
