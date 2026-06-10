import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import EventsForm from '@/components/shared/EventsForm'
import { getUpcomingEvents } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Coaching Events, Summits & Masterclasses | ICI',
  description: 'Join ICI events: masterclasses, summits and live sessions for coaches and leaders. Learn, connect and grow with the wider coaching community.'
}

export default async function EventsPage() {
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
    <div className="bg-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
      
      {/* ── Hero Section ── */}
      <section className="bg-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="section-label mb-8 justify-start text-gold-400">Events</div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-tight">
              Where the community comes together
            </h1>
            <p className="font-body text-xl text-blue-100/80 leading-relaxed max-w-3xl mb-12">
              Some things only happen when people gather, even online. ICI events bring together coaches, leaders and the people we teach for masterclasses, summits and live sessions that go deeper than any recording can. Below are the events coming up. Each one is a chance to learn something real and meet people worth knowing.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Upcoming Events ── */}
      <section className="py-24 relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <AnimatedSection>
            <h2 className="font-display text-4xl font-bold text-white mb-12">Upcoming events</h2>
            
            {events.length === 0 ? (
              <div className="bg-navy-800/50 border border-white/5 rounded-[24px] overflow-hidden p-10 md:p-16 flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
                <p className="font-body text-2xl text-blue-100/80 leading-relaxed font-light mb-8">
                  Our first public events are being scheduled. Register your interest and we will tell you first.
                </p>
                <EventsForm />
              </div>
            ) : (
              <div className="grid gap-8 max-w-4xl mx-auto">
                {events.map((event: any) => (
                  <div key={event._id} className="bg-navy-800/50 border border-white/5 rounded-[24px] overflow-hidden p-8 md:p-10">
                    <h3 className="font-display text-3xl font-bold text-white mb-2">{event.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm font-sans text-gold-400 mb-6 uppercase tracking-wider">
                      <span>{new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      <span className="w-1.5 h-1.5 bg-gold-400/50 rounded-full"></span>
                      <span>{event.format || 'Online'}</span>
                    </div>
                    {event.description && (
                      <p className="font-body text-blue-100/80 leading-relaxed mb-8">{event.description}</p>
                    )}
                    {event.registerLink && (
                      <Link href={event.registerLink} target="_blank" className="btn-primary inline-flex">
                        Register for event
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* ── Masterclasses ── */}
      <section className="py-24 bg-navy-800/30 border-t border-y border-white/5 relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <AnimatedSection className="max-w-3xl text-center mx-auto">
            <h2 className="font-display text-4xl font-bold text-white mb-6">Masterclasses</h2>
            <p className="font-body text-lg text-blue-100/80 leading-relaxed mb-12">
              Short, focused live sessions led by ICI faculty and guests on specific aspects of the craft. Open to students, alumni and, where noted, the public.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link href="#events-form" className="btn-primary">
                Register your interest
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  )
}
