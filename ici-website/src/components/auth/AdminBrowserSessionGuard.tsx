'use client';

import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';

export const ADMIN_BROWSER_SESSION_KEY = 'ici_admin_browser_session';

export function markAdminBrowserSession() {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(ADMIN_BROWSER_SESSION_KEY, '1');
  }
}

export default function AdminBrowserSessionGuard() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== 'authenticated' || !session?.user) return;

    const role = session.user.role;
    if (role !== 'ADMIN' && role !== 'SUPER_ADMIN') return;

    if (!sessionStorage.getItem(ADMIN_BROWSER_SESSION_KEY)) {
      void signOut({ callbackUrl: '/admin/login' });
    }
  }, [session, status]);

  return null;
}
