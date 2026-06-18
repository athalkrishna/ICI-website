'use client';

import Link from 'next/link';
import { ExternalLink, Menu } from 'lucide-react';

type PortalDashboardHeaderProps = {
  title: string;
  userName?: string;
  userMeta?: string;
  siteHref?: string;
  onMenuClick?: () => void;
};

export default function PortalDashboardHeader({
  title,
  userName,
  userMeta,
  siteHref = '/',
  onMenuClick,
}: PortalDashboardHeaderProps) {
  return (
    <header className="shrink-0 z-20 border-b border-navy-100 bg-white/95 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 min-h-[3.5rem]">
        <div className="flex items-center gap-3 min-w-0">
          {onMenuClick && (
            <button
              type="button"
              onClick={onMenuClick}
              className="lg:hidden p-2 -ml-1 rounded-lg text-brand-navy-700 hover:bg-cream-100 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>
          )}
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-brand-gold-600 truncate">
              International Coaching Institute
            </p>
            <h1 className="font-display text-lg sm:text-xl text-brand-navy-900 truncate leading-tight">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <Link
            href={siteHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-brand-navy-700 hover:text-brand-gold-600 transition-colors"
          >
            View website
            <ExternalLink size={14} className="shrink-0" />
          </Link>
          {userName && (
            <div className="text-right min-w-0 max-w-[10rem] sm:max-w-[14rem] pl-2 sm:pl-3 border-l border-navy-100">
              <p className="text-xs sm:text-sm font-semibold text-brand-navy-900 truncate">{userName}</p>
              {userMeta && (
                <p className="text-[10px] sm:text-xs text-muted truncate">{userMeta}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
