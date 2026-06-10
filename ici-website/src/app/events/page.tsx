import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Video } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Coaching Events, Summits & Masterclasses | ICI',
  description: 'Join ICI events: masterclasses, summits and live sessions for coaches and leaders. Learn, connect and grow with the wider coaching community.'
}

export default function EventsPage() {
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
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Pull from live events feed. Each event should show: title, date, online or location, one-line description, and a Register link. Never display past events. */}
              
              {/* Placeholder Event Card */}
              <div className="bg-navy-800/50 border border-white/5 rounded-[24px] overflow-hidden flex flex-col hover:border-gold-500/30 transition-colors relative">
                <div className="absolute top-4 right-4 bg-gold-500/10 text-gold-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-gold-500/20">
                  Example / Placeholder
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-blue-100/50 text-sm font-bold uppercase tracking-wider mb-4">
                    <Calendar size={16} />
                    <span>To be confirmed</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-3">ICI Global Summit</h3>
                  <div className="flex items-center gap-2 text-gold-400 text-sm font-bold uppercase tracking-wider mb-6">
                    <Video size={16} />
                    <span>Online</span>
                  </div>
                  <p className="font-body text-blue-100/80 leading-relaxed mb-8 flex-1">
                    A gathering of coaches from across our network for a day of practice, ideas and connection.
                  </p>
                  <Link href="#register" className="btn-outline w-full text-center">
                    Register now
                  </Link>
                </div>
              </div>

            </div>
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
              <Link href="#all-events" className="btn-primary">
                See all events
              </Link>
              <Link href="/contact" className="btn-secondary">
                Register your interest
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  )
}
