'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/layout/Footer';
import type { ContentMap } from '@/lib/content';
import { isPortalRoute } from '@/lib/portal-routes';

export default function SiteFooter({ globalContent }: { globalContent: ContentMap }) {
  const pathname = usePathname();

  if (isPortalRoute(pathname)) {
    return null;
  }

  return <Footer globalContent={globalContent} />;
}
