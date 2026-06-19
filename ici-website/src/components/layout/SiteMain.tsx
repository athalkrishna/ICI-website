'use client';

import { usePathname } from 'next/navigation';
import { isPortalRoute } from '@/lib/portal-routes';

export default function SiteMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const portal = isPortalRoute(pathname);

  return (
    <main
      id="main-content"
      className={portal ? 'min-h-0 flex-1 overflow-hidden bg-cream-50 flex flex-col' : 'flex-1 w-full max-w-full overflow-x-hidden'}
    >
      {children}
    </main>
  );
}
