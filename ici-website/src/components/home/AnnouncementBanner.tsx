'use client'
import { Trophy, Calendar, MapPin } from 'lucide-react'
import Link from 'next/link'

const items = [
  { icon: <Trophy size={14} />, text: 'ICI Ranked #1 Coaching Institute in Asia-Pacific 2025', href: '/about/rankings' },
  { icon: <Calendar size={14} />, text: 'Next Cohort Starts August 1 — Apply Before June 30', href: '/apply', cta: 'Apply Now →' },
  { icon: <MapPin size={14} />, text: 'New Campus Opening: Dubai, UAE — 2026', href: '/about/global' },
]

export default function AnnouncementBanner() {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items]

  return (
    <div className="bg-gold-500 text-navy-700 py-2.5 overflow-hidden">
      <div className="flex animate-ticker whitespace-nowrap">
        {doubled.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="inline-flex items-center gap-2 mx-10 text-sm font-sans font-semibold hover:text-navy-900 transition-colors shrink-0"
          >
            <span className="text-navy-600">{item.icon}</span>
            {item.text}
            {item.cta && (
              <span className="ml-1 underline underline-offset-2">{item.cta}</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
