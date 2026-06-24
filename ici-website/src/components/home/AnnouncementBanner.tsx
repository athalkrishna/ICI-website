import Link from 'next/link'

interface Announcement {
  _id: string;
  text: string;
  link?: string;
}

interface AnnouncementBannerProps {
  announcements: Announcement[];
}

function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

export default function AnnouncementBanner({ announcements }: AnnouncementBannerProps) {
  if (announcements.length === 0) return null;

  const marqueeItems = [...announcements, ...announcements, ...announcements, ...announcements];

  return (
    <div className="bg-brand-gold-500 text-brand-navy-700 w-full overflow-hidden overflow-x-hidden flex">
      <div className="flex animate-ticker whitespace-nowrap hover:[animation-play-state:paused] motion-reduce:animate-none w-max">
        {marqueeItems.map((item, i) => (
          <div key={`${item._id}-${i}`} className="flex items-center min-h-[44px] gap-2 mx-10 text-sm font-sans font-semibold shrink-0">
            <span className="text-brand-navy-600"><CalendarIcon /></span>
            {item.link ? (
              <Link href={item.link} className="hover:text-brand-navy-900 transition-colors inline-flex items-center min-h-[44px] py-2">
                {item.text}
              </Link>
            ) : (
              <span className="inline-flex items-center min-h-[44px] py-2">{item.text}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
