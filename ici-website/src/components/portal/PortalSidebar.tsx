'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { LogOut, LucideIcon } from 'lucide-react';
import clsx from 'clsx';
import {
  portalNavActiveClass,
  portalNavInactiveClass,
  portalSidebarClass,
} from './portal-styles';

export type PortalNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
  external?: boolean;
};

type PortalSidebarProps = {
  portalName: string;
  homeHref: string;
  navItems: PortalNavItem[];
  userName?: string;
  userMeta?: string;
  logoutCallbackUrl: string;
};

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function PortalSidebar({
  portalName,
  homeHref,
  navItems,
  userName,
  userMeta,
  logoutCallbackUrl,
}: PortalSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={portalSidebarClass}>
      <div className="shrink-0 p-5 sm:p-6 border-b border-white/10 min-w-0">
        <Link href={homeHref} className="block group min-w-0">
          <p className="text-brand-gold-400 text-xs font-semibold uppercase tracking-widest mb-1.5 group-hover:text-brand-gold-300 transition-colors truncate">
            International Coaching Institute
          </p>
          <p className="font-display text-lg sm:text-xl text-white tracking-wide truncate">{portalName}</p>
        </Link>
      </div>

      <nav className="portal-sidebar-nav flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain px-3 py-4">
        <ul className="space-y-1 pb-2">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href, item.exact);
            const Icon = item.icon;
            const linkClass = clsx(
              'flex items-center gap-3 min-w-0 py-2.5 px-3 rounded-lg text-sm font-medium transition',
              active ? portalNavActiveClass : portalNavInactiveClass,
            );

            return (
              <li key={item.href} className="min-w-0">
                {item.external ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <Icon size={18} className={clsx('shrink-0', active ? 'text-brand-gold-400' : 'text-white/60')} />
                    <span className="truncate">{item.label}</span>
                  </a>
                ) : (
                  <Link href={item.href} className={linkClass}>
                    <Icon size={18} className={clsx('shrink-0', active ? 'text-brand-gold-400' : 'text-white/60')} />
                    <span className="truncate">{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="shrink-0 min-w-0 px-3 py-4 border-t border-white/10 bg-brand-navy-900">
        {userName && (
          <div className="mb-3 px-3 min-w-0">
            <p className="text-sm text-white truncate font-medium">{userName}</p>
            {userMeta && <p className="text-xs text-white/50 truncate mt-0.5">{userMeta}</p>}
          </div>
        )}
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: logoutCallbackUrl })}
          className={clsx(
            'flex items-center gap-2 w-full min-w-0 py-2.5 px-3 rounded-lg text-sm font-medium transition',
            portalNavInactiveClass,
          )}
        >
          <LogOut size={16} className="shrink-0" />
          <span className="truncate">Log out</span>
        </button>
      </div>
    </aside>
  );
}
