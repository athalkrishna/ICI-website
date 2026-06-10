'use client'
import { Calendar } from 'lucide-react'
import Link from 'next/link'

interface Announcement {
  _id: string;
  text: string;
  link?: string;
}

interface AnnouncementBannerProps {
  announcements: Announcement[];
}

export default function AnnouncementBanner({ announcements }: AnnouncementBannerProps) {
  // Duplicate items for seamless loop if there are few
  const doubled = [...announcements, ...announcements]

  if (announcements.length === 0) return null;

  return (
    <div className="bg-gold-500 text-navy-700 w-full overflow-hidden overflow-x-hidden">
      <div className="flex animate-ticker whitespace-nowrap">
        {doubled.map((item, i) => (
          <div key={`${item._id}-${i}`} className="flex items-center min-h-[44px] gap-2 mx-10 text-[13px] md:text-sm font-sans font-semibold shrink-0">
            <span className="text-navy-600"><Calendar size={14} /></span>
            {item.link ? (
              <Link href={item.link} className="hover:text-navy-900 transition-colors">
                {item.text}
              </Link>
            ) : (
              <span>{item.text}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
