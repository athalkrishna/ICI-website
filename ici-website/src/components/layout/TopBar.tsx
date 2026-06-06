'use client'
import { Phone, Mail, Globe, ChevronDown } from 'lucide-react'

const audiences = ['Future Students', 'Current Students', 'Organizations', 'Alumni', 'Faculty & Staff']
const languages = ['English', 'Español', 'Français', '中文', 'हिन्दी']

export default function TopBar() {
  return (
    <div className="bg-navy-700 text-white text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-between">

        {/* Left: contact info */}
        <div className="hidden md:flex items-center gap-5">
          <a href="tel:+18004242623" className="flex items-center gap-1.5 hover:text-gold-400 transition-colors">
            <Phone size={12} />
            +1 (800) ICI-COACH
          </a>
          <a href="mailto:info@internationalcoachinginstitute.org" className="flex items-center gap-1.5 hover:text-gold-400 transition-colors">
            <Mail size={12} />
            info@internationalcoachinginstitute.org
          </a>
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-gold-400 transition-colors">
            <Globe size={12} />
            <span>English</span>
            <ChevronDown size={10} />
          </div>
        </div>

        {/* Right: audience links */}
        <div className="flex items-center gap-4 ml-auto">
          {audiences.map((a) => (
            <a key={a} href="#" className="hidden lg:block hover:text-gold-400 transition-colors">
              {a}
            </a>
          ))}
          <span className="text-gold-500 mx-1">|</span>
          <a href="/login" className="hover:text-gold-400 transition-colors">Log In</a>
          <a href="/account" className="hover:text-gold-400 transition-colors">My Account</a>
        </div>

      </div>
    </div>
  )
}
