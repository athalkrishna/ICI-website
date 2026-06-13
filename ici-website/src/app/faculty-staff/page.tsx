import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, BookOpen, Users, Monitor, Phone, ArrowRight } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Faculty & Staff | International Coaching Institute',
  description: 'Resources and tools for ICI faculty and staff: schedules, supervision, internal systems and support. Everything the team needs, in one place.'
}

export default function FacultyStaffPage() {
  const accessLinks = [
    { label: 'Teaching schedules and student information', icon: Calendar },
    { label: 'Faculty resources and materials', icon: BookOpen },
    { label: 'Supervision and faculty development', icon: Users },
    { label: 'Internal systems and tools', icon: Monitor },
    { label: 'Operations and support contacts', icon: Phone },
  ]

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
              <div className="text-eyebrow text-brand-gold-400">For Faculty & Staff</div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              For the people who make ICI work
            </h1>
            <p className="text-navy-100 text-base max-w-3xl mb-12">
              Teaching coaching well is demanding, and so is running the institute behind it. This area gives faculty and staff quick access to what they need: schedules, systems, materials and support. If you teach or work with us, start here.
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Quick Access Section ── */}
      <Section spacing="standard" className="relative z-20">
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
            
            <AnimatedSection>
              <h2 className="text-h2 text-brand-navy-900 mb-6">Quick access</h2>
              <p className="text-muted mb-8 text-body">
                Log in to access your dashboard, secure documents, and scheduling systems.
              </p>
              <Link href="/login" className="btn-primary inline-flex items-center gap-2">
                Log in to your account <ArrowRight size={18} />
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="grid gap-4">
                {accessLinks.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Link 
                      key={index}
                      href="/login"
                      className="group flex items-center justify-between p-6 bg-white border border-navy-100 shadow-sm hover:border-brand-gold-500 hover:shadow-md rounded-2xl transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-cream-50 border border-navy-100 flex items-center justify-center text-brand-gold-600 group-hover:bg-brand-gold-50 group-hover:scale-110 transition-all duration-300">
                          <Icon size={20} />
                        </div>
                        <span className="font-sans font-medium text-lg text-brand-navy-900 group-hover:text-brand-gold-700 transition-colors">
                          {item.label}
                        </span>
                      </div>
                      <ArrowRight size={20} className="text-muted group-hover:text-brand-gold-500 group-hover:translate-x-1 transition-all" />
                    </Link>
                  )
                })}
              </div>
            </AnimatedSection>
            
          </div>
        </Container>
      </Section>

      {/* ── Join the faculty Section ── */}
      <Section spacing="standard" className="bg-cream-50 border-t border-navy-100 relative z-20">
        <Container>
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <h2 className="text-h2 text-brand-navy-900 mb-6">Join the faculty</h2>
            <p className="text-muted mb-12 text-body">
              We are always interested in practising coaches who can teach with rigour and humanity. If that is you, we would like to hear from you.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link href="/contact" className="btn-secondary-light">
                Express interest in teaching <ArrowRight size={18} />
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

    </div>
  )
}
