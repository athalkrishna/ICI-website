import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import { Users, GraduationCap, Network, HeartHandshake, BookOpen, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'ICI Alumni | International Coaching Institute',
  description: 'ICI alumni stay connected for supervision, referrals, continued learning and friendship. Qualifying is the beginning of your relationship with the institute.'
}

export default function AlumniPage() {
  const benefitsLinks = [
    { label: 'Peer supervision and reflective practice groups', icon: Users },
    { label: 'Access to masterclasses and events', icon: GraduationCap },
    { label: 'A referral network of practising coaches', icon: Network },
    { label: 'Opportunities to teach, mentor and contribute', icon: HeartHandshake },
    { label: 'Continued professional development', icon: BookOpen },
  ]

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
            <div className="section-label mb-8 justify-start text-gold-400">For Alumni</div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-tight">
              Once an ICI coach, always part of ICI
            </h1>
            <p className="font-body text-xl text-blue-100/80 leading-relaxed max-w-3xl mb-12">
              The credential was a milestone, not an exit. Our alumni stay connected for the things that make a long coaching career sustainable: supervision, referrals, continued learning and the company of people who understand the work. The longer you practise, the more this matters. Welcome back, whenever you need us.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Benefits Section ── */}
      <section className="py-24 relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
            
            <AnimatedSection>
              <h2 className="font-display text-4xl font-bold text-white mb-6">Your alumni benefits</h2>
              <p className="font-body text-lg text-blue-100/70 leading-relaxed mb-8">
                As a credentialed member of the ICI network, you have ongoing access to resources designed to support and elevate your practice.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="grid gap-4">
                {benefitsLinks.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div 
                      key={index}
                      className="group flex items-center justify-between p-6 bg-navy-800/50 backdrop-blur-sm border border-white/5 hover:border-gold-500/30 rounded-2xl transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-navy-900 border border-white/5 flex items-center justify-center text-gold-400 group-hover:bg-gold-500/10 group-hover:scale-110 transition-all duration-300">
                          <Icon size={20} />
                        </div>
                        <span className="font-sans font-medium text-lg text-white group-hover:text-gold-200 transition-colors">
                          {item.label}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </AnimatedSection>
            
          </div>
        </div>
      </section>

      {/* ── Stay Involved Section ── */}
      <section className="py-24 bg-navy-800/30 border-t border-white/5 relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <AnimatedSection className="max-w-4xl text-center mx-auto">
            <h2 className="font-display text-4xl font-bold text-white mb-6">Stay involved</h2>
            <p className="font-body text-xl text-blue-100/80 leading-relaxed mb-12">
              Keep your details current, join the next event, and tell us when something good happens in your practice. Your story may be exactly what a future student needs to read.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link href="/account" className="btn-primary">
                Update your details
              </Link>
              <Link href="/events" className="btn-secondary inline-flex items-center gap-2">
                See upcoming events <ArrowRight size={18} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  )
}
