import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import { Users, Search, BookOpen, Heart, Globe } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'The ICI Coaching Community',
  description: 'Coaching can be solitary work. The ICI community connects coaches worldwide for supervision, referrals and real support, long after they qualify.'
}

export default function CommunityPage() {
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
            <div className="text-eyebrow text-brand-gold-400 flex items-center gap-3 mb-8 justify-start">Community</div>
            <h1 className="text-h1 text-white mb-8">
              You will not be coaching alone
            </h1>
            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
              Coaching can be quietly isolating. You hold other people's struggles all day, then close the call and sit with them by yourself. The ICI community exists so that you do not have to. When you train with us you join a working network of coaches who supervise one another, refer clients, share what is hard, and keep each other sharp. The credential gets you started. The community keeps you going.
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── What the community offers ── */}
      <Section spacing="standard" className="relative z-20">
        <Container>
          <AnimatedSection>
            <h2 className="text-h2 text-white mb-12">What the community offers</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Peer supervision and reflective practice groups', icon: <Users size={24} /> },
                { title: 'A referral network among practising coaches', icon: <Search size={24} /> },
                { title: 'Continued learning through masterclasses and events', icon: <BookOpen size={24} /> },
                { title: 'Honest support for the parts of coaching no one warns you about', icon: <Heart size={24} /> },
                { title: 'Connection across many countries and one shared standard', icon: <Globe size={24} /> }
              ].map((item, i) => (
                <div key={i} className="bg-brand-navy-800/50 border border-faint p-8 rounded-[24px] hover:bg-brand-navy-800 transition-colors">
                  <div className="w-12 h-12 bg-brand-navy-900 border border-subtle rounded-xl flex items-center justify-center text-brand-gold-400 mb-6">
                    {item.icon}
                  </div>
                  <h3 className="font-sans text-h3 text-white leading-snug">{item.title}</h3>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Alumni & Membership ── */}
      <Section spacing="standard" className="bg-brand-navy-800/30 border-t border-y border-faint relative z-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            
            <AnimatedSection>
              <h2 className="text-h2 text-white mb-6">Alumni network</h2>
              <p className="text-muted-dark mb-8 text-body">
                Qualifying is a beginning. ICI coaches stay connected for supervision, collaboration and friendship, and have access to ongoing learning. The longer you are in the field, the more this network is worth.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="text-h2 text-white mb-6">Membership and continuing development</h2>
              <p className="text-muted-dark mb-8 text-body">
                Coaching is a practice, which means it is never finished.
              </p>
              {/* <!-- Confirm membership offer, what it includes, and any cost, then replace this section --> */}
            </AnimatedSection>

          </div>

          <AnimatedSection delay={0.2} className="mt-16 text-center">
            <Link href="/apply" className="btn-primary">
              Join the community
            </Link>
          </AnimatedSection>
        </Container>
      </Section>

    </div>
  )
}
