import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import { Users, GraduationCap, Network, HeartHandshake, BookOpen, ArrowRight } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

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
    <div className="bg-brand-navy-900 min-h-screen font-sans text-navy-50 selection:bg-brand-gold-500/30 selection:text-brand-gold-200">
      
      {/* ── Hero Section ── */}
      <Section spacing="hero" className="bg-brand-navy-800 lg: lg: relative overflow-hidden border-b border-faint">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <Container className="relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="text-eyebrow flex items-center gap-3 mb-8 justify-start">For Alumni</div>
            <h1 className="text-h1 text-white mb-8">
              Once an ICI coach, always part of ICI
            </h1>
            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
              The credential was a milestone, not an exit. Our alumni stay connected for the things that make a long coaching career sustainable: supervision, referrals, continued learning and the company of people who understand the work. The longer you practise, the more this matters. Welcome back, whenever you need us.
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Benefits Section ── */}
      <Section spacing="standard" className="relative z-20">
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
            
            <AnimatedSection>
              <h2 className="text-h2 text-white mb-6">Your alumni benefits</h2>
              <p className="text-navy-100/70 mb-8 text-body">
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
                      className="group flex items-center justify-between p-6 bg-brand-navy-800/50 backdrop-blur-sm border border-faint hover:border-brand-gold-500/30 rounded-2xl transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-brand-navy-900 border border-faint flex items-center justify-center text-brand-gold-400 group-hover:bg-brand-gold-500/10 group-hover:scale-110 transition-all duration-300">
                          <Icon size={20} />
                        </div>
                        <span className="font-sans font-medium text-lg text-white group-hover:text-brand-gold-200 transition-colors">
                          {item.label}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </AnimatedSection>
            
          </div>
        </Container>
      </Section>

      {/* ── Stay Involved Section ── */}
      <Section spacing="standard" className="bg-brand-navy-800/30 border-t border-faint relative z-20">
        <Container>
          <AnimatedSection className="max-w-4xl text-center mx-auto">
            <h2 className="text-h2 text-white mb-6">Stay involved</h2>
            <p className="text-muted-dark mb-12 text-body">
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
        </Container>
      </Section>

    </div>
  )
}
