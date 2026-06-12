import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Leadership & Faculty | International Coaching Institute',
  description: 'Our faculty are practicing coaches who deliver live, online, one-to-one programmes.'
}

export default function LeadershipFacultyPage() {
  return (
    <div className="bg-cream-50 min-h-screen">
      {/* ── Hero Section ── */}
      <Section spacing="hero" className="bg-brand-navy-800 relative overflow-hidden border-b border-faint">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <Container className="relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-[1px] gradient-accent-gold"></div>
              <div className="text-eyebrow text-brand-gold-400">About ICI</div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              Leadership & Faculty
            </h1>
            <p className="text-muted-dark text-body max-w-3xl">
              Taught by coaches, for coaches.
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Main Content ── */}
      <Section spacing="compact" className="lg:py-24">
        <Container>
          <AnimatedSection className="max-w-4xl space-y-8">
            <p className="text-navy-700 text-body">
              ICI programmes are delivered live, online and one-to-one, by faculty who still coach. You practise from early on, receive supervision, and are assessed on real coaching, not multiple-choice tests. The blend of leadership thinking, applied psychology, neuroscience and reflective practice means you come to understand both the person in front of you and yourself.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 pt-8">
              <Link href="/credentials" className="btn-primary text-center">
                Explore the Mastery Pathway
              </Link>
              <Link href="/contact" className="btn-secondary-light text-center">
                Speak to an advisor
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </Section>
    </div>
  )
}
