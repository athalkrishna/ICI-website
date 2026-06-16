'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ChevronDown, Search, Menu, X, Mail, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { navItems } from '@/data/navigation'
import MobileMenu from './MobileMenu'
import Container from '@/components/layout/Container'
import { cmsField } from '@/lib/cms-helpers'
import type { ContentMap } from '@/lib/content'

export default function Navbar({
  isLoggedIn = false,
  globalContent = {},
}: {
  isLoggedIn?: boolean;
  globalContent?: ContentMap;
}) {
  const [scrolled, setScrolled]         = useState(false)
  const [activeMenu, setActiveMenu]     = useState<string | null>(null)
  const [mobileOpen, setMobileOpen]     = useState(false)
  const [searchOpen, setSearchOpen]     = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mega menu on route change
  useEffect(() => { setActiveMenu(null); setMobileOpen(false) }, [pathname])

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${ scrolled ? 'bg-brand-navy-700 shadow-nav' : 'bg-white shadow-sm' }`}
      >
        {/* ── Top Bar ── */}
        <div className={`hidden lg:flex justify-between items-center px-4 lg:px-8 py-2 text-sm font-sans transition-all duration-300 ${scrolled ? 'h-0 overflow-hidden py-0 opacity-0' : 'bg-brand-navy-900 text-navy-100/80 border-b border-brand-navy-800'}`}>
          <Container className="flex justify-between items-center w-full px-0">
            <div className="flex gap-6 items-center text-white">
              <a href={`mailto:${cmsField(globalContent, 'site_email', 'info@internationalcoachinginstitute.org')}`} className="hover:text-brand-gold-400 flex items-center gap-1.5 transition-colors">
                <Mail size={14} /> {cmsField(globalContent, 'site_email', 'info@internationalcoachinginstitute.org')}
              </a>
              <a href={`tel:${cmsField(globalContent, 'site_phone', '+919819984575').replace(/\s/g, '')}`} className="hover:text-brand-gold-400 flex items-center gap-1.5 transition-colors">
                <Phone size={14} /> {cmsField(globalContent, 'site_phone', '+91 98199 84575')}
              </a>
            </div>
            <div className="flex items-center gap-4 text-brand-gold-100 mr-12">
              <a href={cmsField(globalContent, 'linkedin_url', 'https://www.linkedin.com/company/internationalcoachinginstitute')} target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold-400 transition-colors flex items-center" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <span className="text-brand-gold-500/50">|</span>
              {isLoggedIn ? (
                <Link href="/account" className="hover:text-brand-gold-400 transition-colors whitespace-nowrap">My Account</Link>
              ) : (
                <Link href={cmsField(globalContent, 'login_link', '/login')} className="hover:text-brand-gold-400 transition-colors whitespace-nowrap">{cmsField(globalContent, 'login_text', 'Log In')}</Link>
              )}
            </div>
          </Container>
        </div>

        <Container>
          <div className="flex items-center justify-between h-20">

            {/* ── Logo ── */}
            <Link 
              href="/" 
              className="flex items-center shrink-0 -ml-4 transition-all duration-300"
            >
              <Image 
                src={scrolled ? "/logo-white.png" : "/logo-transparent.png"}
                alt="International Coaching Institute logo" 
                width={300} 
                height={90} 
                className="w-[180px] md:w-[240px] h-auto object-contain" 
                priority 
              />
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden xl:flex items-center gap-1" onMouseLeave={() => setActiveMenu(null)}>
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
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        setActiveMenu(activeMenu === item.label ? null : item.label)
                      }}
                      className={`flex items-center gap-0.5 px-1 xl:px-1 2xl:px-2 py-2 rounded-lg text-sm 2xl:text-sm font-sans font-medium whitespace-nowrap transition-colors duration-200 ${scrolled ? 'text-gray-200 hover:text-white hover:bg-white/10' : 'text-brand-navy-600 hover:text-brand-navy-700 hover:bg-brand-navy-50' } ${pathname.startsWith(item.href) ? 'text-brand-gold-500' : ''}`}
                    >
                      {item.label}
                      <ChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === item.label ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center gap-0.5 px-1 xl:px-1 2xl:px-2 py-2 rounded-lg text-sm 2xl:text-sm font-sans font-medium whitespace-nowrap transition-colors duration-200 ${scrolled ? 'text-gray-200 hover:text-white hover:bg-white/10' : 'text-brand-navy-600 hover:text-brand-navy-700 hover:bg-brand-navy-50' } ${pathname.startsWith(item.href) ? 'text-brand-gold-500' : ''}`}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {item.children && activeMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={`absolute top-full ${index > 3 ? 'right-0' : 'left-0'} mt-2 ${useWideMenu ? 'w-[640px] grid grid-cols-2 gap-8' : 'w-[320px] flex flex-col'} bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white/50 p-6 ring-1 ring-black/5`}
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
                                <li key={link.label} className={isLargeMenu ? "break-inside-avoid mb-4" : ""}>
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
                      </motion.div>
                    )}
                  </AnimatePresence>
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
                <Search size={18} />
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
                <Menu size={22} />
              </button>
            </div>

          </div>
        </Container>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-navy-100 bg-white overflow-hidden"
            >
              <div className="max-w-2xl mx-auto px-4 py-4 flex gap-3">
                <input
                  type="search"
                  placeholder="Search programmes, resources, faculty..."
                  autoFocus
                  className="flex-1 px-4 py-2.5 rounded-lg border border-navy-200 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-gold-400"
                />
                <button className="btn-primary py-2.5">Search</button>
                <button onClick={() => setSearchOpen(false)} className="p-2.5 hover:bg-cream-100 rounded-lg">
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
