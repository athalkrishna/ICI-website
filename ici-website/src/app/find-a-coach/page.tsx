import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import { Search, SlidersHorizontal, ArrowRight } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Find a Certified ICI Coach',
  description: 'Looking for a coach you can trust? Find an ICI-certified coach by specialism, level and language. Every coach here earned their credential through real practice.'
}

export default function FindACoachPage() {
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
              <div className="text-eyebrow text-brand-gold-400">Find a Coach</div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              Find a coach you can trust
            </h1>
            <p className="text-navy-100 text-base max-w-2xl mb-12">
              Anyone can call themselves a coach. The coaches listed here have earned an ICI credential through real training, one-to-one, and assessment on real coaching, which means you can approach them with confidence. Tell us what you are looking for and we will help you find someone who fits.
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Directory Section ── */}
      <Section spacing="standard" className="relative z-20">
        <Container>
          
          <AnimatedSection>
            {/* Filter UI Shell */}
            <div className="bg-white border border-navy-100 shadow-xl p-6 md:p-8 rounded-[24px] mb-12 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-navy-100 relative z-10">
                <SlidersHorizontal size={20} className="text-brand-gold-600" />
                <h2 className="font-sans text-h2 text-brand-navy-900">Search and filter</h2>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="block mb-2 relative z-10 text-eyebrow text-brand-navy-700">
                    By specialism
                  </label>
                  <select className="w-full bg-cream-50 border border-navy-200 rounded-xl px-4 py-3.5 text-brand-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-gold-400 focus:border-brand-gold-400 transition-all font-body appearance-none relative z-10">
                    <option value="">All Specialisms</option>
                    <option value="Life">Life</option>
                    <option value="Executive">Executive</option>
                    <option value="Business">Business</option>
                    <option value="Wellness">Wellness</option>
                    <option value="Team">Team</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="block mb-2 relative z-10 text-eyebrow text-brand-navy-700">
                    By level
                  </label>
                  <select className="w-full bg-cream-50 border border-navy-200 rounded-xl px-4 py-3.5 text-brand-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-gold-400 focus:border-brand-gold-400 transition-all font-body appearance-none relative z-10">
                    <option value="">All Levels</option>
                    <option value="Catalyst">Catalyst</option>
                    <option value="Architect">Architect</option>
                    <option value="Sage">Sage</option>
                    <option value="Luminary">Luminary</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block mb-2 relative z-10 text-eyebrow text-brand-navy-700">
                    By language
                  </label>
                  <select className="w-full bg-cream-50 border border-navy-200 rounded-xl px-4 py-3.5 text-brand-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-gold-400 focus:border-brand-gold-400 transition-all font-body appearance-none relative z-10">
                    <option value="">All Languages</option>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block mb-2 relative z-10 text-eyebrow text-brand-navy-700">
                    By availability
                  </label>
                  <select className="w-full bg-cream-50 border border-navy-200 rounded-xl px-4 py-3.5 text-brand-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-gold-400 focus:border-brand-gold-400 transition-all font-body appearance-none relative z-10">
                    <option value="">Any Availability</option>
                    <option value="Taking clients">Taking clients</option>
                    <option value="Waitlist">Waitlist</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                  <Search size={18} /> Browse coaches
                </Link>
              </div>
            </div>
            
            {/* Coach Directory Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Note: This page needs a coach directory feature. If it is not ready for launch, point Find a Coach to the programmes or contact page for now. */}
            </div>
          </AnimatedSection>

        </Container>
      </Section>

      {/* ── Why choose an ICI coach ── */}
      <Section spacing="standard" className="bg-cream-50 border-t border-navy-100 relative z-20">
        <Container>
          <AnimatedSection className="max-w-3xl">
            <h2 className="text-h2 text-brand-navy-900 mb-6">Why choose an ICI coach</h2>
            <p className="text-muted mb-12 text-body">
              Every coach in this directory holds a credential that was earned, not bought. They have been trained in coaching craft, psychology, neuroscience and human behaviour, and are held to a professional standard of ethics and practice.
            </p>
          </AnimatedSection>
        </Container>
      </Section>

    </div>
  )
}
