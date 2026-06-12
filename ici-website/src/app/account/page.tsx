import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import Section from '@/components/layout/Section'

export const metadata: Metadata = {
  title: {
    absolute: 'My Account | International Coaching Institute',
  },
  description: 'Manage your ICI account: your programme, schedule, materials, supervision, profile and billing.'
}

export default function AccountPage() {
  const sections = [
    'My programme',
    'Schedule',
    'Materials',
    'Supervision',
    'Profile & details',
    'Billing'
  ]

  return (
    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-brand-gold-500/30">
      
      {/* ── Hero Section ── */}
      <Section spacing="hero" className="bg-brand-navy-800 relative overflow-hidden border-b border-faint">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-[1px] gradient-accent-gold"></div>
              <div className="text-eyebrow text-brand-gold-400">MY ACCOUNT</div>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h1 className="text-h1 text-white">
                Your account
              </h1>
              <Link href="/login" className="btn-secondary-light bg-transparent text-white border-white/30 hover:border-white hover:bg-white/5 transition-all text-sm py-2 px-6">
                Log out
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </Section>

      {/* ── Account Navigation ── */}
      <div className="bg-white border-b border-navy-100 sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex overflow-x-auto hide-scrollbar gap-8">
            {sections.map((section, i) => (
              <button 
                key={section}
                className={`py-4 font-sans font-bold text-sm tracking-wide whitespace-nowrap border-b-2 transition-colors ${i === 0 ? 'border-brand-gold-500 text-brand-navy-900' : 'border-transparent text-muted hover:text-brand-navy-700 hover:border-brand-navy-200'}`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Empty State Content ── */}
      <Section spacing="standard" className="relative z-20">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection>
            <div className="bg-white p-12 md:p-16 text-center rounded-3xl shadow-md border border-navy-100 max-w-3xl mx-auto">
              <div className="w-16 h-16 bg-brand-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-gold-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
              </div>
              <h2 className="text-h3 text-brand-navy-900 mb-4">You have not enrolled on a level yet.</h2>
              <p className="text-muted text-body mb-8">
                Explore the Mastery Pathway to find your starting point, or speak to an advisor to discuss your options.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/credentials" className="btn-primary">
                  Explore the Mastery Pathway
                </Link>
                <Link href="/admissions/contact" className="btn-secondary-light">
                  Speak to an advisor
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Section>

    </div>
  )
}
