import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import EventsForm from '@/components/shared/EventsForm'
import { getUpcomingEvents } from '@/lib/queries'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, cmsHtml, stripHtml } from '@/lib/cms-helpers'

export const metadata: Metadata = {
  title: 'Coaching Events, Summits & Masterclasses | ICI',
  description: 'Join ICI events: masterclasses, summits and live sessions for coaches and leaders. Learn, connect and grow with the wider coaching community.'
}

export default async function EventsPage() {
  const content = await getPublishedPageContent('/events')

  let events: any[] = [];
  try {
    const fetched = await getUpcomingEvents();
    if (fetched && fetched.length > 0) {
      events = fetched;
    }
  } catch (e) {
    // Sanity not yet configured
  }

  return (
    <div className="bg-cream-50 min-h-screen font-sans selection:bg-brand-gold-500/30">
      
      {/* ── Hero Section ── */}
      <Section spacing="hero" className="bg-brand-navy-800 lg: lg: relative overflow-hidden border-b border-faint">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <Container className="relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-[1px] gradient-accent-gold"></div>
              <div className="text-eyebrow text-brand-gold-400">
                {cmsField(content, 'hero_eyebrow', 'Events')}
              </div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              {cmsField(content, 'hero_heading', 'Where the community comes together')}
            </h1>
            <p className="text-navy-100 text-base max-w-2xl mb-12">
              {stripHtml(cmsHtml(content, 'hero_body', 'Some things only happen when people gather, even online. ICI events bring together coaches, leaders and the people we teach for masterclasses, summits and live sessions that go deeper than any recording can. Below are the events coming up. Each one is a chance to learn something real and meet people worth knowing.'))}
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Upcoming Events ── */}
      <Section spacing="standard" className="relative z-20">
        <Container>
          <AnimatedSection>
            <h2 className="text-h2 text-brand-navy-900 mb-12">
              {cmsField(content, 'upcoming_heading', 'Upcoming events')}
            </h2>
            
            {events.length === 0 ? (
              <Container size="narrow" className="bg-white border border-navy-100 shadow-xl rounded-[24px] overflow-hidden p-10 md:p-16 flex flex-col items-center justify-center text-center">
                <p className="text-muted mb-8 text-body">
                  {cmsField(content, 'empty_state_body', 'Our first public events are being scheduled. Register your interest and we will tell you first.')}
                </p>
                <EventsForm />
              </Container>
            ) : (
              <div className="grid gap-8 max-w-4xl mx-auto">
                {events.map((event: any) => (
                  <div key={event._id} className="bg-white border border-navy-100 shadow-xl rounded-[24px] overflow-hidden p-8 md:p-10">
                    <h3 className="text-h3 text-brand-navy-900 mb-2">{event.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm font-sans text-brand-gold-700 mb-6 uppercase tracking-wider">
                      <span>{new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      <span className="w-1.5 h-1.5 bg-brand-gold-500/50 rounded-full"></span>
                      <span>{event.format || 'Online'}</span>
                    </div>
                    {event.description && (
                      <p className="text-muted mb-8 text-body">{event.description}</p>
                    )}
                    {event.registerLink && (
                      <Link href={event.registerLink} target="_blank" className="btn-primary inline-flex">
                        {cmsField(content, 'register_button_text', 'Register for event')}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-16">
              <Link href="#all-events" className="btn-primary text-center">
                {cmsField(content, 'cta_1_text', 'See all events')}
              </Link>
              <Link href="#events-form" className="btn-secondary-light text-center">
                {cmsField(content, 'cta_2_text', 'Register your interest')}
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Masterclasses ── */}
      <Section spacing="standard" className="bg-cream-50 border-t border-navy-100 relative z-20">
        <Container>
          <AnimatedSection className="max-w-3xl">
            <h2 className="text-h2 text-brand-navy-900 mb-6">
              {cmsField(content, 'masterclasses_heading', 'Masterclasses')}
            </h2>
            <p className="text-muted mb-12 text-body">
              {cmsField(content, 'masterclasses_body', 'Short, focused live sessions led by ICI faculty and guests on specific aspects of the craft. Open to students, alumni and, where noted, the public.')}
            </p>
            <div className="flex flex-wrap justify-start items-center gap-4">
              <Link href="#events-form" className="btn-primary">
                {cmsField(content, 'masterclasses_cta_text', 'Register your interest')}
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

    </div>
  )
}
