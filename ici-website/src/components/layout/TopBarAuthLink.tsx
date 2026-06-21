'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSession } from 'next-auth/react';
import type { Session } from 'next-auth';
import type { UserRole } from '@prisma/client';

function accountHref(role: UserRole | undefined) {
  if (role === 'STUDENT') return '/dashboard';
  if (role === 'ADMIN' || role === 'SUPER_ADMIN') return '/admin';
  return '/login';
}

type TopBarAuthLinkProps = {
  loginHref?: string;
  loginText?: string;
  className?: string;
};

export default function TopBarAuthLink({
  loginHref = '/login',
  loginText = 'Log In',
  className = 'hover:text-brand-gold-400 transition-colors whitespace-nowrap',
}: TopBarAuthLinkProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    const load = () => {
      getSession()
        .then((data) => {
          if (active) {
            setSession(data);
            setReady(true);
          }
        })
        .catch(() => {
          if (active) setReady(true);
        });
    };

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(load, { timeout: 3000 });
      return () => {
        active = false;
        window.cancelIdleCallback(id);
      };
    }

    const timer = window.setTimeout(load, 2000);
    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, []);

  if (!ready) {
    return (
      <Link href={loginHref} className={className}>
        {loginText}
      </Link>
    );
  }

  if (session?.user) {
    return (
      <Link href={accountHref(session.user.role)} className={className}>
        My Account
      </Link>
    );
  }

  return (
    <Link href={loginHref} className={className}>
      {loginText}
    </Link>
  );
}
