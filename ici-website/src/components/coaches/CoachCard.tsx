import Image from 'next/image';
import Link from 'next/link';
import { MapPin, BadgeCheck } from 'lucide-react';
import type { CoachListing } from '@/lib/coaches';
import {
  availabilityLabel,
  credentialLevelLabel,
  specialisationLabel,
} from '@/lib/coach-labels';

type CoachCardProps = {
  coach: CoachListing;
  contactHref?: string;
};

export default function CoachCard({ coach, contactHref = '/contact' }: CoachCardProps) {
  const ctaHref = coach.bookingUrl || contactHref;
  const ctaLabel = coach.bookingUrl ? 'Book a session' : 'Get in touch';

  return (
    <article className="bg-white border border-navy-100 rounded-2xl shadow-md overflow-hidden flex flex-col h-full">
      <div className="relative aspect-[4/3] bg-cream-100">
        {coach.imageUrl ? (
          <Image
            src={coach.imageUrl}
            alt={coach.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-brand-navy-400 font-display text-4xl font-bold">
            {coach.name.charAt(0)}
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-display text-lg font-bold text-brand-navy-900">{coach.name}</h3>
            <p className="text-sm text-muted">{coach.title}</p>
          </div>
          <BadgeCheck size={18} className="text-brand-gold-600 shrink-0 mt-1" aria-hidden />
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {coach.specialisation && (
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-cream-100 text-brand-navy-700">
              {specialisationLabel(coach.specialisation)}
            </span>
          )}
          {coach.credentialLevel && (
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-brand-gold-500/15 text-brand-gold-800">
              {credentialLevelLabel(coach.credentialLevel)}
            </span>
          )}
        </div>

        <p className="text-sm text-navy-700 line-clamp-3 mb-4 flex-1">{coach.bio}</p>

        <div className="space-y-1 text-xs text-muted mb-4">
          {coach.location && (
            <p className="flex items-center gap-1.5">
              <MapPin size={14} className="shrink-0" />
              {coach.location}
            </p>
          )}
          <p>Languages: {coach.languages.join(', ')}</p>
          <p>{availabilityLabel(coach.availability)}</p>
        </div>

        <Link href={ctaHref} className="btn-primary justify-center text-sm py-3 mt-auto" target={coach.bookingUrl ? '_blank' : undefined}>
          {ctaLabel}
        </Link>
      </div>
    </article>
  );
}
