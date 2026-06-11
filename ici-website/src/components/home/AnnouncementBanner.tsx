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
  if (announcements.length === 0) return null;

  return (
    <div className="bg-brand-gold-500 text-brand-navy-700 w-full overflow-hidden overflow-x-hidden">
      <div className="flex animate-ticker whitespace-nowrap">
        {announcements.map((item, i) => (
          <div key={`${item._id}-${i}`} className="flex items-center min-h-[44px] gap-2 mx-10 text-[13px] md:text-sm font-sans font-semibold shrink-0">
            <span className="text-brand-navy-600"><Calendar size={14} /></span>
            {item.link ? (
              <Link href={item.link} className="hover:text-brand-navy-900 transition-colors">
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
