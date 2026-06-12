import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import { Briefcase, Building, Users, Target, BarChart, ArrowRight } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Coaching for Organisations | ICI',
  description: 'Build a coaching culture with ICI. Train managers and internal coaches one-to-one, develop leaders, and make feedback and accountability part of how people work.'
}

export default function OrganizationsPage() {
  const workLinks = [
    { label: 'Train managers and leaders to coach in the flow of work', icon: Users },
    { label: 'Develop internal coaches your organisation owns', icon: Building },
    { label: 'Executive coaching for senior leaders', icon: Briefcase },
    { label: 'Tailored programmes built around your context', icon: Target },
    { label: 'Measurement that speaks the language of the business', icon: BarChart },
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
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-[1px] gradient-accent-gold"></div>
              <div className="text-eyebrow text-brand-gold-400">For Organisations</div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              Build a coaching culture, not just send people on a course
            </h1>
            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
              Most leadership training is forgotten within a month because it teaches ideas, not habits. Coaching is different. When managers learn to coach, the change shows up in everyday conversations: clearer feedback, real accountability, people who grow instead of stall. ICI helps organisations build that capability from the inside, one-to-one, and own it.
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── How we work Section ── */}
      <Section spacing="standard" className="relative z-20">
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
            
            <AnimatedSection>
              <h2 className="text-h2 text-white mb-6">How we work with organisations</h2>
              <p className="text-navy-100/70 mb-8 text-body">
                We do not do off-the-shelf theory. We partner with you to embed coaching behaviours directly into your operational rhythm.
              </p>
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                Request a proposal <ArrowRight size={18} />
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="grid gap-4">
                {workLinks.map((item, index) => {
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

      {/* ── Why it works Section ── */}
      <Section spacing="standard" className="bg-brand-navy-800/30 border-t border-faint relative z-20">
        <Container>
          <AnimatedSection className="max-w-4xl">
            <h2 className="text-h2 text-white mb-6">Why it works</h2>
            <p className="text-muted-dark mb-12 text-body">
              Because it changes habits, not just knowledge. Our programmes are live, one-to-one and grounded in how leaders actually behave under pressure, drawing on deep experience inside demanding organisations.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link href="/contact" className="btn-secondary inline-flex items-center gap-2">
                Speak to our team <ArrowRight size={18} />
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

    </div>
  )
}
