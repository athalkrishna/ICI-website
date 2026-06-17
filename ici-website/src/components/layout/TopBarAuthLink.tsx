'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
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
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <span className={`${className} opacity-70`} aria-hidden>
        {loginText}
      </span>
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
