import AnimatedSection from '@/components/shared/AnimatedSection'
import type { Metadata } from 'next'
import Link from 'next/link'
import EventsForm from '@/components/shared/EventsForm'
import { getUpcomingEvents } from '@/lib/queries'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import PageHero from '@/components/layout/PageHero'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, cmsHtml, stripHtml } from '@/lib/cms-helpers'
import {
  EVENTS_DEFAULTS,
  EVENTS_HERO_BODY_HTML,
  defaultEventsFormCopy,
  type EventsFormCopy,
} from '@/lib/events-defaults'
import type { ContentMap } from '@/lib/content'
import { pageMetadata } from '@/lib/page-metadata'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/events');
}

function buildEventsFormCopy(content: ContentMap): EventsFormCopy {
  const d = EVENTS_DEFAULTS;
  const defaults = defaultEventsFormCopy();

  return {
    placeholderEmail: cmsField(content, 'form_placeholder_email', d.form_placeholder_email),
    submitText: cmsField(content, 'form_submit_text', d.form_submit_text),
    submittingText: cmsField(content, 'form_submitting_text', d.form_submitting_text),
    successMessage: cmsField(content, 'form_success_message', defaults.successMessage),
    errorMessage: cmsField(content, 'form_error_message', d.form_error_message),
  };
}

export default async function EventsPage() {
  const content = await getPublishedPageContent('/events')
  const d = EVENTS_DEFAULTS
  const formCopy = buildEventsFormCopy(content)

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
      
      <PageHero
        eyebrow={cmsField(content, 'hero_eyebrow', d.hero_eyebrow)}
        title={cmsField(content, 'hero_heading', d.hero_heading)}
        body={stripHtml(cmsHtml(content, 'hero_body', EVENTS_HERO_BODY_HTML))}
      />

      {/* ── Upcoming Events ── */}
      <Section spacing="standard" className="relative z-20">
        <Container>
          <AnimatedSection>
            <h2 className="text-h2 text-brand-navy-900 mb-12">
              {cmsField(content, 'upcoming_heading', d.upcoming_heading)}
            </h2>
            
            {events.length === 0 ? (
              <Container size="narrow" className="bg-white border border-navy-100 shadow-xl rounded-[24px] overflow-hidden p-10 md:p-16 flex flex-col items-center justify-center text-center">
                <p className="text-muted mb-8 text-body">
                  {cmsField(content, 'empty_state_body', d.empty_state_body)}
                </p>
                <EventsForm copy={formCopy} />
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
                        {cmsField(content, 'register_button_text', d.register_button_text)}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-16">
              <Link href={cmsField(content, 'cta_1_link', d.cta_1_link)} className="btn-primary text-center">
                {cmsField(content, 'cta_1_text', d.cta_1_text)}
              </Link>
              <Link href={cmsField(content, 'cta_2_link', d.cta_2_link)} className="btn-secondary-light text-center">
                {cmsField(content, 'cta_2_text', d.cta_2_text)}
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
              {cmsField(content, 'masterclasses_heading', d.masterclasses_heading)}
            </h2>
            <p className="text-muted mb-12 text-body">
              {cmsField(content, 'masterclasses_body', d.masterclasses_body)}
            </p>
            <div className="flex flex-wrap justify-start items-center gap-4">
              <Link href={cmsField(content, 'masterclasses_cta_link', d.masterclasses_cta_link)} className="btn-primary">
                {cmsField(content, 'masterclasses_cta_text', d.masterclasses_cta_text)}
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

    </div>
  )
}
