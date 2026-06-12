import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Video, Users, FileCheck, Phone, ArrowRight } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Current Students | International Coaching Institute',
  description: 'Your ICI student hub: cohort schedule, session links, materials, supervision and support. Everything you need while you train, in one place.'
}

export default function CurrentStudentsPage() {
  const hubLinks = [
    { label: 'Session schedule and links', icon: Calendar },
    { label: 'Course materials and recordings', icon: Video },
    { label: 'Mentor coaching and supervision booking', icon: Users },
    { label: 'Assessment guidance and submission', icon: FileCheck },
    { label: 'Student support and contacts', icon: Phone },
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
            <div className="text-eyebrow text-brand-gold-400 flex items-center gap-3 mb-8 justify-start">For Current Students</div>
            <h1 className="text-h1 text-white mb-8">
              Welcome back
            </h1>
            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
              You are in the middle of the work, and this is your home base for it. Here you will find your schedule, your materials, your supervision and the people who can help. Coaching is learned by doing, and you are doing it. Use this hub to stay on track and get the most from your one-to-one sessions.
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Hub Section ── */}
      <Section spacing="standard" className="relative z-20">
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
            
            <AnimatedSection>
              <h2 className="text-h2 text-white mb-6">Your student hub</h2>
              <p className="text-navy-100/70 mb-8 text-body">
                Log in to access your complete learning environment, including upcoming sessions and submitted assessments.
              </p>
              <Link href="/login" className="btn-primary inline-flex items-center gap-2">
                Log in to your account <ArrowRight size={18} />
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="grid gap-4">
                {hubLinks.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Link 
                      key={index}
                      href="/login"
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
                      <ArrowRight size={20} className="text-navy-100/30 group-hover:text-brand-gold-400 group-hover:translate-x-1 transition-all" />
                    </Link>
                  )
                })}
              </div>
            </AnimatedSection>
            
          </div>
        </Container>
      </Section>

      {/* ── Need Help Section ── */}
      <Section spacing="standard" className="bg-brand-navy-800/30 border-t border-faint relative z-20">
        <Container>
          <AnimatedSection className="max-w-4xl text-center mx-auto">
            <h2 className="text-h2 text-white mb-6">Need help?</h2>
            <p className="text-muted-dark mb-12 text-body">
              If anything is unclear or part of the work feels hard, that is normal, and we are here. Reach out to your coach or the student support team rather than struggling alone.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link href="/contact" className="btn-secondary inline-flex items-center gap-2">
                Contact student support <ArrowRight size={18} />
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

    </div>
  )
}
