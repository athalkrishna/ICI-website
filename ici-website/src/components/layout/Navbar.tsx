'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Search, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { navItems } from '@/data/navigation'
import MobileMenu from './MobileMenu'

export default function Navbar() {
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
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-navy-700 shadow-nav'
            : 'bg-white shadow-sm'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              {/* SVG inline logo */}
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="19" stroke={scrolled ? '#C9A84C' : '#0A1F44'} strokeWidth="1.5"/>
                <path d="M20 4 C10 4, 4 11, 4 20 C4 29, 10 36, 20 36 C30 36, 36 29, 36 20 C36 11, 30 4, 20 4Z"
                      stroke={scrolled ? '#C9A84C' : '#0A1F44'} strokeWidth="1" fill="none"/>
                <path d="M4 20 Q12 16 20 20 Q28 24 36 20" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
                <path d="M4 20 Q12 24 20 20 Q28 16 36 20" stroke="#C9A84C" strokeWidth="1" fill="none" strokeDasharray="2,2"/>
              </svg>
              <div>
                <div className={`font-display font-bold text-xl leading-none tracking-tight ${scrolled ? 'text-white' : 'text-navy-700'}`}>
                  ICI
                </div>
                <div className={`font-sans text-[9px] tracking-[0.18em] uppercase leading-none mt-0.5 ${scrolled ? 'text-gold-400' : 'text-navy-400'}`}>
                  International Coaching Institute
                </div>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden xl:flex items-center gap-1" onMouseLeave={() => setActiveMenu(null)}>
              {navItems.map((item) => (
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
                      className={`flex items-center gap-0.5 px-1 xl:px-1 2xl:px-2 py-2 rounded-lg text-[13px] 2xl:text-sm font-sans font-medium whitespace-nowrap
                        transition-colors duration-200
                        ${scrolled
                          ? 'text-gray-200 hover:text-white hover:bg-white/10'
                          : 'text-navy-600 hover:text-navy-700 hover:bg-navy-50'
                        }
                        ${pathname.startsWith(item.href) ? (scrolled ? 'text-gold-400' : 'text-gold-600') : ''}
                      `}
                    >
                      {item.label}
                      <ChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === item.label ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center gap-0.5 px-1 xl:px-1 2xl:px-2 py-2 rounded-lg text-[13px] 2xl:text-sm font-sans font-medium whitespace-nowrap
                        transition-colors duration-200
                        ${scrolled
                          ? 'text-gray-200 hover:text-white hover:bg-white/10'
                          : 'text-navy-600 hover:text-navy-700 hover:bg-navy-50'
                        }
                        ${pathname.startsWith(item.href) ? (scrolled ? 'text-gold-400' : 'text-gold-600') : ''}
                      `}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {item.children && activeMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-0 mt-1 w-[580px] bg-white rounded-xl shadow-2xl border border-gray-100 p-6 grid grid-cols-2 gap-6"
                      >
                        {item.children.map((group) => (
                          <div key={group.heading}>
                            <p className="text-[10px] font-sans font-semibold tracking-[0.15em] uppercase text-gold-600 mb-3 pb-2 border-b border-gold-100">
                              {group.heading}
                            </p>
                            <ul className="space-y-1">
                              {group.links.map((link) => (
                                <li key={link.label}>
                                  <Link
                                    href={link.href}
                                    className="flex items-start gap-2 px-2 py-1.5 rounded-lg hover:bg-cream-100 group transition-colors"
                                  >
                                    <span className="text-gold-500 mt-0.5 shrink-0">›</span>
                                    <div>
                                      <div className="text-sm font-sans font-medium text-navy-700 group-hover:text-navy-800">
                                        {link.label}
                                      </div>
                                      {link.desc && (
                                        <div className="text-xs text-gray-400 font-sans mt-0.5">{link.desc}</div>
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
              ))}
            </nav>

            {/* ── Right CTAs ── */}
            <div className="flex items-center gap-2 xl:gap-3 shrink-0">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 rounded-lg transition-colors ${scrolled ? 'text-white hover:bg-white/10' : 'text-navy-600 hover:bg-navy-50'}`}
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              <Link
                href="/programs"
                className={`hidden lg:inline-flex xl:hidden items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-sans font-medium border transition-colors whitespace-nowrap
                  ${scrolled ? 'border-white/30 text-white hover:bg-white/10' : 'border-navy-200 text-navy-600 hover:bg-navy-50'}`}
              >
                Find a Coach
              </Link>

              <Link
                href="/apply"
                className="btn-primary hidden md:inline-flex whitespace-nowrap px-3 2xl:px-5 shrink-0"
              >
                Apply Now
                <span aria-hidden>→</span>
              </Link>

              <button
                className={`xl:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-white hover:bg-white/10' : 'text-navy-600 hover:bg-navy-50'}`}
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>

          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-100 bg-white overflow-hidden"
            >
              <div className="max-w-2xl mx-auto px-4 py-4 flex gap-3">
                <input
                  type="search"
                  placeholder="Search programs, resources, faculty..."
                  autoFocus
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
                <button className="btn-primary py-2.5">Search</button>
                <button onClick={() => setSearchOpen(false)} className="p-2.5 hover:bg-gray-100 rounded-lg">
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
