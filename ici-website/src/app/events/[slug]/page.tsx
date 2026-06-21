import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AnimatedSection from '@/components/shared/AnimatedSection'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import PageHero from '@/components/layout/PageHero'
import { getEventBySlug } from '@/lib/data'

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

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params
  const event = await getEventBySlug(slug)
  if (!event) notFound()

  return (
    <div className="bg-cream-50 min-h-screen font-sans selection:bg-brand-gold-500/30">
      <PageHero
        eyebrow={event.eventType.replace(/_/g, ' ')}
        title={event.title}
        body={event.description}
      />

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
