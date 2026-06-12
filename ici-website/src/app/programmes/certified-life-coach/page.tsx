import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import { Heart, Ear, BrainCircuit, Target, CheckCircle2, UserPlus, Compass } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Life Coaching Specialisation | ICI',
  description: 'Train as a life coach with ICI. Learn to guide clients through real change, one-to-one and online, within the four-level Mastery Pathway.'
}

export default function LifeCoachingPage() {
  return (
    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-brand-gold-500/30">
      
      {/* ── Hero Section ── */}
      <Section spacing="hero" className="bg-brand-navy-800 relative overflow-hidden border-b border-faint">
        
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />

        {/* Ambient Lights */}
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        {/* Abstract typography watermark */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 text-9xl font-display font-bold text-white/[0.03] select-none pointer-events-none leading-none tracking-tighter mix-blend-overlay">
          L
        </div>

        <Container className="relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-[1px] gradient-accent-gold"></div>
              <div className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-brand-gold-400">Specialisation | Life Coaching</div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              Life Coaching
            </h1>
            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
              Life coaching done well is not advice with enthusiasm. It is the skilled, patient work of helping a person see themselves clearly and move towards the life they actually want. As a life coaching focus within the Mastery Pathway, this is where most coaches begin, learning the craft that everything else builds on.
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Split Layout Content ── */}
      <Section spacing="large" className="max-w-[1440px] mx-auto px-4 lg:px-8 lg:py-48 mt-8 relative z-20">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: What you will learn */}
          <div className="lg:col-span-7 space-y-12">
            <AnimatedSection>
              <h2 className="font-display text-h3 font-bold text-brand-navy-900 mb-10 flex items-center gap-4">
                What you will learn to do
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { text: "Build trust and emotional safety quickly", icon: <Heart size={24} /> },
                  { text: "Listen beneath the words and ask the question that matters", icon: <Ear size={24} /> },
                  { text: "Work with limiting beliefs and self-sabotage with compassion", icon: <BrainCircuit size={24} /> },
                  { text: "Set goals that hold and support change that lasts", icon: <Target size={24} /> }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-8 rounded-[32px] border border-navy-100 shadow-xl hover:shadow-2xl hover:border-brand-gold-200 transition-all duration-300 group">
                    <div className="w-14 h-14 bg-cream-50 rounded-2xl border border-brand-gold-100 flex items-center justify-center text-brand-gold-700 mb-6 group-hover:bg-brand-gold-500 group-hover:text-white transition-colors shadow-sm">
                      {item.icon}
                    </div>
                    <p className="font-body text-navy-700 text-lg leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32 space-y-8">
              
              <AnimatedSection delay={0.2}>
                <div className="bg-white p-10 rounded-[40px] border border-navy-100 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-cream-50 rounded-full blur-[40px] opacity-50"></div>
                  <h2 className="font-display text-2xl font-bold text-brand-navy-800 mb-8 relative z-10 flex items-center gap-3">
                    <UserPlus size={24} className="text-brand-gold-700" />
                    Who this suits
                  </h2>
                  <ul className="space-y-6 relative z-10">
                    {[
                      "People starting a coaching career",
                      "Helpers, mentors and managers formalising their skills",
                      "Professionals moving towards more meaningful work"
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4 items-start group">
                        <CheckCircle2 className="text-brand-gold-500 shrink-0 mt-0.5" size={20} />
                        <span className="font-body text-muted leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="bg-cream-100 p-10 rounded-[40px] border border-brand-gold-200/50 shadow-xl">
                  <h2 className="font-display text-2xl font-bold text-brand-navy-800 mb-8 flex items-center gap-3">
                    <Compass size={24} className="text-brand-gold-700" />
                    At a glance
                  </h2>
                  <ul className="space-y-6">
                    {[
                      { label: "Role", value: "Focus area within the Mastery Pathway" },
                      { label: "Format", value: "Online, one-to-one" },
                      { label: "Entry", value: "Best at Catalyst (Level 1)" },
                      { label: "Cost", value: "Follows the Pathway, see Pricing" }
                    ].map((item, i) => (
                      <li key={i} className="border-b border-brand-navy-200/30 pb-4 last:border-0 last:pb-0">
                        <div className="font-sans text-xs font-bold uppercase tracking-widest text-brand-navy-400 mb-1">{item.label}</div>
                        <div className="font-body text-brand-navy-900">{item.value}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

            </div>
          </div>
          
        </div>
      </Section>

      <Section spacing="none" className="mt-24 lg:mt-32">
        <AnimatedSection>
          <Container>
            <div className="bg-brand-navy-900 p-10 md:p-16 lg:p-20 rounded-[40px] border border-brand-gold-500/20 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-hero-pattern opacity-[0.05] mix-blend-overlay"></div>
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold-500 rounded-full blur-[120px] opacity-20 translate-x-1/3 -translate-y-1/3" />
              <Container size="narrow" className="relative z-10">
                <h2 className="font-display text-3xl text-h3 font-bold text-white mb-6">How it fits the Mastery Pathway</h2>
                <p className="font-body text-xl md:text-2xl text-navy-100/90 leading-relaxed font-light mb-12">
                  You can begin a life coaching focus at the Catalyst level and carry it through the Pathway. Your credential and investment follow the level you are working towards, not the specialism.
                </p>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                  <Link href="/credentials/catalyst" className="btn-primary w-full md:w-auto justify-center px-8 py-4 text-sm tracking-widest">
                    Start at Catalyst
                  </Link>
                  <Link href="/admissions/contact" className="btn-secondary w-full md:w-auto justify-center px-8 py-4 text-sm tracking-widest border-white/20 hover:border-white text-white">
                    Speak to an Advisor
                  </Link>
                </div>
              </Container>
            </div>
          </Container>
        </AnimatedSection>
      </Section>

    </div>
  )
}
