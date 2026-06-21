'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { navItems } from '@/data/navigation'
import Container from '@/components/layout/Container'
import { cmsField } from '@/lib/cms-helpers'
import type { ContentMap } from '@/lib/content'

const MobileMenu = dynamic(() => import('./MobileMenu'), { ssr: false })
const TopBarAuthLink = dynamic(() => import('./TopBarAuthLink'), {
  ssr: false,
  loading: () => <span className="hover:text-brand-gold-400 transition-colors whitespace-nowrap">Log In</span>,
})

function IconMail() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function IconChevronDown({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function IconSearch() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function IconMenu() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

function IconX() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 6 6 18" /><path d="M6 6 18 18" />
    </svg>
  )
}

export default function Navbar({
  globalContent = {},
}: {
  globalContent?: ContentMap;
}) {
  const [scrolled, setScrolled]         = useState(false)
  const [activeMenu, setActiveMenu]     = useState<string | null>(null)
  const [mobileOpen, setMobileOpen]     = useState(false)
  const [searchOpen, setSearchOpen]     = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 80)
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mega menu on route change
  useEffect(() => { setActiveMenu(null); setMobileOpen(false) }, [pathname])

  const siteEmail = cmsField(globalContent, 'site_email', 'info@internationalcoachinginstitute.org')
  const sitePhone = cmsField(globalContent, 'site_phone', '+91 98199 84575')
  const linkedinUrl = cmsField(globalContent, 'linkedin_url', 'https://www.linkedin.com/company/internationalcoachinginstitute')
  const loginHref = cmsField(globalContent, 'login_link', '/login')
  const loginText = cmsField(globalContent, 'login_text', 'Log In')
  const topBarHidden = scrolled ? 'h-0 overflow-hidden py-0 opacity-0 pointer-events-none' : ''

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full max-w-full overflow-visible transition-all duration-300 ${ scrolled ? 'bg-brand-navy-700 shadow-nav' : 'bg-white shadow-sm' }`}
      >
        {/* ── Mobile & tablet top bar ── */}
        <div className={`flex lg:hidden items-center justify-between gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-sans transition-all duration-300 bg-brand-navy-900 text-navy-100/90 border-b border-brand-navy-800 ${topBarHidden}`}>
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <a
              href={`mailto:${siteEmail}`}
              className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] sm:min-w-0 sm:px-1 hover:text-brand-gold-400 transition-colors shrink-0"
              aria-label={`Email ${siteEmail}`}
            >
              <IconMail />
              <span className="hidden sm:inline ml-1.5 truncate max-w-[120px] md:max-w-[200px]">{siteEmail}</span>
            </a>
            <a
              href={`tel:${sitePhone.replace(/\s/g, '')}`}
              className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] sm:min-w-0 sm:px-1 hover:text-brand-gold-400 transition-colors shrink-0"
              aria-label={`Call ${sitePhone}`}
            >
              <IconPhone />
              <span className="hidden md:inline ml-1.5 whitespace-nowrap">{sitePhone}</span>
            </a>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] hover:text-brand-gold-400 transition-colors"
              aria-label="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <TopBarAuthLink
              loginHref={loginHref}
              loginText={loginText}
              className="inline-flex items-center min-h-[44px] px-1 text-brand-gold-400 hover:text-brand-gold-300 transition-colors font-semibold whitespace-nowrap"
            />
          </div>
        </div>

        {/* ── Desktop top bar ── */}
        <div className={`hidden lg:flex justify-between items-center px-4 lg:px-8 py-2 text-sm font-sans transition-all duration-300 ${topBarHidden} bg-brand-navy-900 text-navy-100/80 border-b border-brand-navy-800`}>
          <Container className="flex justify-between items-center w-full px-0">
            <div className="flex gap-6 items-center text-white">
              <a href={`mailto:${siteEmail}`} className="hover:text-brand-gold-400 flex items-center gap-1.5 transition-colors">
                <IconMail /> {siteEmail}
              </a>
              <a href={`tel:${sitePhone.replace(/\s/g, '')}`} className="hover:text-brand-gold-400 flex items-center gap-1.5 transition-colors">
                <IconPhone /> {sitePhone}
              </a>
            </div>
            <div className="flex items-center gap-4 text-brand-gold-100 mr-12">
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold-400 transition-colors flex items-center" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <span className="text-brand-gold-500/50">|</span>
              <TopBarAuthLink loginHref={loginHref} loginText={loginText} />
            </div>
          </Container>
        </div>

        <Container className="overflow-visible">
          <div className="flex items-center justify-between h-20 overflow-visible">

            {/* ── Logo ── */}
            <Link 
              href="/" 
              className="flex items-center shrink-0 -ml-4 transition-all duration-300"
            >
              <Image 
                src={scrolled ? '/logo-white.webp' : '/logo-transparent.webp'}
                alt="International Coaching Institute logo" 
                width={480} 
                height={320} 
                className="w-[180px] md:w-[240px] h-auto object-contain" 
                sizes="(max-width: 768px) 180px, 240px"
              />
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden xl:flex items-center gap-1 overflow-visible" onMouseLeave={() => setActiveMenu(null)}>
              {navItems.map((item, index) => {
                const isLargeMenu = item.children && item.children.length === 1 && item.children[0].links.length > 4;
                const isMultiGroup = item.children && item.children.length > 1;
                const useWideMenu = isLargeMenu || isMultiGroup;
                
                return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(item.label)}
                >
                  {item.children ? (
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        className={`flex items-center gap-0.5 px-1 xl:px-1 2xl:px-2 py-2 rounded-lg text-sm 2xl:text-sm font-sans font-medium whitespace-nowrap transition-colors duration-200 ${scrolled ? 'text-gray-200 hover:text-white hover:bg-white/10' : 'text-brand-navy-600 hover:text-brand-navy-700 hover:bg-brand-navy-50' } ${pathname.startsWith(item.href) ? 'text-brand-gold-500' : ''}`}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-expanded={activeMenu === item.label}
                        aria-haspopup="true"
                        aria-label={`Expand ${item.label} menu`}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveMenu(activeMenu === item.label ? null : item.label);
                        }}
                        className={`inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-2 rounded-md transition-colors duration-200 ${scrolled ? 'text-gray-200 hover:text-white hover:bg-white/10' : 'text-brand-navy-600 hover:text-brand-navy-700 hover:bg-brand-navy-50'}`}
                      >
                        <IconChevronDown className={`transition-transform duration-200 ${activeMenu === item.label ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center gap-0.5 px-1 xl:px-1 2xl:px-2 py-2 rounded-lg text-sm 2xl:text-sm font-sans font-medium whitespace-nowrap transition-colors duration-200 ${scrolled ? 'text-gray-200 hover:text-white hover:bg-white/10' : 'text-brand-navy-600 hover:text-brand-navy-700 hover:bg-brand-navy-50' } ${pathname.startsWith(item.href) ? 'text-brand-gold-500' : ''}`}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Mega Menu Dropdown */}
                  {item.children && activeMenu === item.label && (
                      <div
                        className={`absolute top-full ${index > 3 ? 'right-0' : 'left-0'} pt-2 z-[60] animate-menu-in`}
                        onMouseEnter={() => setActiveMenu(item.label)}
                      >
                        <div
                          className={`${useWideMenu ? 'w-[640px] grid grid-cols-2 gap-8' : 'w-[320px] flex flex-col'} bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white/50 p-6 ring-1 ring-black/5`}
                        >
                          {item.children.map((group) => (
                            <div key={group.heading} className={isLargeMenu ? 'col-span-2' : ''}>
                              {group.heading && (
                                <p className="text-xs font-sans font-bold tracking-[0.2em] uppercase text-brand-navy-400 mb-4 pb-3 border-b border-navy-100/60">
                                  {group.heading}
                                </p>
                              )}
                              <ul className={isLargeMenu ? 'columns-2 gap-8' : 'space-y-2'}>
                                {group.links.map((link) => (
                                  <li key={link.label} className={isLargeMenu ? 'break-inside-avoid mb-4' : ''}>
                                    <Link
                                      href={link.href}
                                      className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-brand-navy-50/50 group transition-all duration-200"
                                    >
                                      <span className="text-brand-gold-400 mt-0.5 shrink-0 transition-transform group-hover:translate-x-0.5">✦</span>
                                      <div>
                                        <div className="text-sm font-sans font-semibold text-brand-navy-800 group-hover:text-brand-gold-600 transition-colors">
                                          {link.label}
                                        </div>
                                        {link.desc && (
                                          <div className="text-xs text-muted font-sans mt-1 line-clamp-1 group-hover:text-muted-dark transition-colors text-left">{link.desc}</div>
                                        )}
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
                )
              })}
            </nav>

            {/* ── Right CTAs ── */}
            <div className="flex items-center gap-2 xl:gap-3 shrink-0">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 rounded-lg transition-colors ${scrolled ? 'text-white hover:bg-white/10' : 'text-brand-navy-600 hover:bg-brand-navy-50'}`}
                aria-label="Search"
              >
                <IconSearch />
              </button>

              <Link
                href={cmsField(globalContent, 'apply_button_link', '/apply')}
                className={`hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-btn border transition-colors whitespace-nowrap ${scrolled ? 'border-white/30 text-white hover:bg-white/10' : 'border-brand-navy-200 text-brand-navy-600 hover:bg-brand-navy-50'}`}
              >
                {cmsField(globalContent, 'apply_button_text', 'Apply Now')}
              </Link>

              <Link
                href="/find-a-coach"
                className="btn-primary hidden md:inline-flex whitespace-nowrap px-4 2xl:px-6 py-2.5 shrink-0"
              >
                Find a Coach
                <span aria-hidden>→</span>
              </Link>

              <button
                className={`xl:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-white hover:bg-white/10' : 'text-brand-navy-600 hover:bg-brand-navy-50'}`}
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <IconMenu />
              </button>
            </div>

          </div>
        </Container>

        {/* Search Bar */}
        {searchOpen && (
            <div className="border-t border-navy-100 bg-white overflow-hidden animate-menu-in">
              <div className="max-w-2xl mx-auto px-4 py-4 flex gap-3">
                <label htmlFor="site-search" className="sr-only">Search programmes, resources, and faculty</label>
                <input
                  id="site-search"
                  type="search"
                  placeholder="Search programmes, resources, faculty..."
                  autoFocus
                  className="flex-1 px-4 py-2.5 min-h-[44px] rounded-lg border border-navy-200 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-gold-400"
                />
                <button type="button" className="btn-primary py-2.5 min-h-[44px]">Search</button>
                <button type="button" onClick={() => setSearchOpen(false)} className="p-2.5 min-h-[44px] min-w-[44px] hover:bg-cream-100 rounded-lg" aria-label="Close search">
                  <IconX />
                </button>
              </div>
            </div>
          )}
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} globalContent={globalContent} />
    </>
  )
}
