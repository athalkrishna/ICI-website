import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AnimatedSection from '@/components/shared/AnimatedSection'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import { getEventBySlug } from '@/lib/data'
import { ArrowLeft, Calendar, MapPin } from 'lucide-react'

type PageProps = {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const event = await getEventBySlug(slug)
  if (!event) return { title: 'Event Not Found' }

  return {
    title: event.title,
    description: event.description,
  }
}

function formatDateRange(start: Date, end: Date) {
  const startStr = new Date(start).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  const endStr = new Date(end).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  return startStr === endStr ? startStr : `${startStr} – ${endStr}`
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params
  const event = await getEventBySlug(slug)
  if (!event) notFound()

  const locationLabel = event.locationType === 'ONLINE'
    ? 'Online'
    : event.locationDetail || event.locationType

  return (
    <div className="bg-cream-50 min-h-screen font-sans selection:bg-brand-gold-500/30">
      <Section spacing="hero" className="bg-brand-navy-800 relative overflow-hidden border-b border-faint">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <Container className="relative z-20">
          <AnimatedSection className="max-w-4xl">
            <Link href="/events" className="inline-flex items-center gap-2 text-brand-gold-400 hover:text-brand-gold-300 text-sm mb-8 transition-colors">
              <ArrowLeft size={16} /> Back to events
            </Link>
            <div className="text-eyebrow text-brand-gold-400 mb-4">{event.eventType.replace(/_/g, ' ')}</div>
            <h1 className="text-h1 text-white mb-6">{event.title}</h1>
            <p className="text-navy-100 text-base max-w-3xl mb-8">{event.description}</p>
            <div className="flex flex-wrap gap-6 text-sm text-navy-200">
              <span className="inline-flex items-center gap-2">
                <Calendar size={16} className="text-brand-gold-400" />
                {formatDateRange(event.startDate, event.endDate)}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin size={16} className="text-brand-gold-400" />
                {locationLabel}
              </span>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {event.coverImageUrl && (
        <div className="relative -mt-8 z-10">
          <Container>
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border border-navy-100">
              <Image
                src={event.coverImageUrl}
                alt={event.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>
          </Container>
        </div>
      )}

      <Section spacing="standard" className="relative z-20">
        <Container size="narrow">
          <AnimatedSection>
            <article
              className="prose prose-lg max-w-none prose-p:text-muted-dark prose-headings:text-brand-navy-900 prose-a:text-brand-gold-600"
              dangerouslySetInnerHTML={{ __html: event.fullDescription }}
            />
            {event.registrationLink && (
              <div className="mt-12">
                <Link href={event.registrationLink} target="_blank" className="btn-primary inline-flex">
                  Register for this event
                </Link>
              </div>
            )}
          </AnimatedSection>
        </Container>
      </Section>
    </div>
  )
}
