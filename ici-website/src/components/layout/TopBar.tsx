'use client'
import { Phone, Mail, Globe, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Container from '@/components/layout/Container'

const audiences = [
  { label: 'Future Students', href: '/future-students' },
  { label: 'Current Students', href: '/current-students' },
  { label: 'Organisations', href: '/organisations' },
  { label: 'Alumni', href: '/alumni' },
  { label: 'Faculty & Staff', href: '/faculty-staff' }
]

export default function TopBar({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  return (
    <div className="bg-brand-navy-700 text-white text-xs font-sans">
      <Container className="h-8 md:h-9 flex items-center justify-between">

        {/* Left: contact info */}
        <div className="hidden md:flex items-center gap-5">
          <a href="tel:+919819984575" className="flex items-center gap-1.5 hover:text-brand-gold-400 transition-colors">
            <Phone size={12} />
            (+91) 98199 84575
          </a>
          <a href="mailto:info@internationalcoachinginstitute.org" className="flex items-center gap-1.5 hover:text-brand-gold-400 transition-colors">
            <Mail size={12} />
            info@internationalcoachinginstitute.org
          </a>
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-brand-gold-400 transition-colors">
            <Globe size={12} />
            <span>Language: English</span>
          </div>
        </div>

        {/* Right: audience links */}
        <div className="flex items-center gap-4 ml-auto">
          {audiences.map((a) => (
            <Link key={a.label} href={a.href} className="hidden xl:block hover:text-brand-gold-400 transition-colors whitespace-nowrap">
              {a.label}
            </Link>
          ))}
          <span className="text-brand-gold-500 mx-1">|</span>
          <Link href="/login" className="hover:text-brand-gold-400 transition-colors whitespace-nowrap">Log In</Link>
          <span className="text-brand-gold-500 mx-1">|</span>
          <Link href="/account" className="hover:text-brand-gold-400 transition-colors whitespace-nowrap">My Account</Link>
        </div>

      </Container>
    </div>
  )
}
