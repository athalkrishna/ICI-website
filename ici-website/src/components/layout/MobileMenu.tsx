'use client';

import Link from 'next/link';
import { navItems } from '@/data/navigation';
import { cmsField } from '@/lib/cms-helpers';
import type { ContentMap } from '@/lib/content';
import TopBarAuthLink from '@/components/layout/TopBarAuthLink';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  globalContent?: ContentMap;
}

function IconX() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 6 6 18" /><path d="M6 6 18 18" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export default function MobileMenu({ isOpen, onClose, globalContent = {} }: Props) {
  if (!isOpen) return null;

  const siteEmail = cmsField(globalContent, 'site_email', 'info@internationalcoachinginstitute.org');
  const sitePhone = cmsField(globalContent, 'site_phone', '+91 98199 84575');
  const linkedinUrl = cmsField(globalContent, 'linkedin_url', 'https://www.linkedin.com/company/internationalcoachinginstitute');
  const loginHref = cmsField(globalContent, 'login_link', '/login');
  const loginText = cmsField(globalContent, 'login_text', 'Log In');

  return (
    <div className="fixed inset-0 z-[60] bg-white overflow-y-auto flex flex-col xl:hidden animate-menu-in">
      <div className="flex items-center justify-between p-4 border-b border-navy-100">
        <span className="font-display font-bold text-xl text-brand-navy-700">ICI Menu</span>
        <button type="button" onClick={onClose} className="p-2 min-h-[44px] min-w-[44px] text-brand-navy-600 hover:bg-cream-100 rounded-lg" aria-label="Close menu">
          <IconX />
        </button>
      </div>

      <div className="bg-brand-navy-900 text-navy-100/90 px-4 py-3 border-b border-brand-navy-800">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-sans">
          <a href={`mailto:${siteEmail}`} className="inline-flex items-center gap-2 min-h-[44px] hover:text-brand-gold-400 transition-colors" onClick={onClose}>
            <IconMail />
            <span className="truncate max-w-[200px]">{siteEmail}</span>
          </a>
          <a href={`tel:${sitePhone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 min-h-[44px] hover:text-brand-gold-400 transition-colors" onClick={onClose}>
            <IconPhone />
            <span>{sitePhone}</span>
          </a>
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 min-h-[44px] hover:text-brand-gold-400 transition-colors" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            LinkedIn
          </a>
          <TopBarAuthLink loginHref={loginHref} loginText={loginText} className="inline-flex items-center min-h-[44px] text-brand-gold-400 hover:text-brand-gold-300 transition-colors font-semibold" />
        </div>
      </div>

      <div className="p-4 flex-1">
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.label}>
              {item.children ? (
                <div className="font-sans font-bold text-brand-navy-700 mb-2">{item.label}</div>
              ) : (
                <Link href={item.href} className="font-sans font-bold text-brand-navy-700 mb-2 block min-h-[44px] flex items-center" onClick={onClose}>
                  {item.label}
                </Link>
              )}
              {item.children && (
                <ul className="pl-4 space-y-2 border-l-2 border-brand-gold-200">
                  {item.children.map((group) => (
                    <li key={group.heading}>
                      <div className="text-xs text-brand-gold-600 font-semibold uppercase tracking-wider mb-1 mt-2">{group.heading}</div>
                      <ul className="space-y-2">
                        {group.links.map((link) => (
                          <li key={link.label}>
                            <Link href={link.href} className="text-sm text-muted hover:text-brand-navy-700 block min-h-[44px] flex items-center" onClick={onClose}>
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 border-t border-navy-100 bg-cream-50 space-y-3">
        <Link href="/find-a-coach" className="btn-primary w-full justify-center" onClick={onClose}>
          Find a Coach
        </Link>
        <Link href="/apply" className="btn-secondary w-full justify-center" onClick={onClose}>
          Apply Now
        </Link>
      </div>
    </div>
  );
}
