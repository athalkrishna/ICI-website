'use client'
import { Award, Calendar, Globe } from 'lucide-react'
import Link from 'next/link'

const items = [
  { icon: <Calendar size={14} />, text: 'Next cohort begins every month. Enrol at your own place and pace.', href: '/apply' },
  { icon: <Globe size={14} />, text: 'Now enrolling worldwide: one-to-one, online coaching certification.', href: '/credentials' },
  { icon: <Award size={14} />, text: 'The ICI Mastery Pathway, from Catalyst to Luminary. Explore the credentials.', href: '/credentials' },
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
