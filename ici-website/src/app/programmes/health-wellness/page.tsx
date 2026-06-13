import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import { FlaskConical, Moon, HeartPulse, Stethoscope, CheckCircle2, UserPlus, Compass } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Health & Wellness Coaching | ICI',
  description: 'Become a health and wellness coach with ICI. Guide sustainable change in body and mind, one-to-one and online, within the Mastery Pathway.'
}

export default function HealthWellnessPage() {
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
          H
        </div>

        <Container className="relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-[1px] gradient-accent-gold"></div>
              <div className="text-eyebrow text-brand-gold-400">Specialisation | Health & Wellness</div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              Health & Wellness Coaching
            </h1>
            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
              Most people already know what they should do for their health. What they lack is not information but the ability to change, and to keep changing when motivation fades. Health and wellness coaching is the skill of supporting that change so it lasts. As a focus within the Pathway, it pairs behavioural science with the coaching craft.
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
              <h2 className="text-h3 text-brand-navy-900 mb-10 flex items-center gap-4">
                What you will learn to do
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { text: "Apply the behavioural science of lasting habit change", icon: <FlaskConical size={24} /> },
                  { text: "Coach around stress, sleep, movement and the nervous system", icon: <Moon size={24} /> },
                  { text: "Work with shame, relapse and the all-or-nothing trap", icon: <HeartPulse size={24} /> },
                  { text: "Hold scope and know when to refer to clinical care", icon: <Stethoscope size={24} /> }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-8 hover:shadow-2xl hover:border-brand-gold-200 transition-all duration-300 group rounded-3xl shadow-xl border border-navy-100">
                    <div className="w-14 h-14 bg-cream-50 border-brand-gold-100 flex items-center justify-center text-brand-gold-700 mb-6 group-hover:bg-brand-gold-500 group-hover:text-white transition-colors rounded-2xl shadow-md border border-navy-100">
                      {item.icon}
                    </div>
                    <p className="text-navy-700 text-body">{item.text}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32 space-y-8">
              
              <AnimatedSection delay={0.2}>
                <div className="bg-white p-10 relative overflow-hidden rounded-[32px] shadow-2xl border border-navy-100">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-cream-50 rounded-full blur-[40px] opacity-50"></div>
                  <h2 className="text-h2 text-brand-navy-800 mb-8 relative z-10 flex items-center gap-3">
                    <UserPlus size={24} className="text-brand-gold-700" />
                    Who this suits
                  </h2>
                  <ul className="space-y-6 relative z-10">
                    {[
                      "Coaches specialising in health, fitness and wellbeing",
                      "Health and fitness professionals adding coaching",
                      "Helpers supporting change in body and mind"
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
                <div className="bg-cream-100 p-10 border-brand-gold-200/50 rounded-[32px] shadow-2xl border border-navy-100">
                  <h2 className="text-h2 text-brand-navy-800 mb-8 flex items-center gap-3">
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
                        <div className="text-brand-navy-400 mb-1 text-eyebrow">{item.label}</div>
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
            <div className="bg-brand-navy-900 p-10 md:p-16 lg:p-20 border-brand-gold-500/20 relative overflow-hidden rounded-[32px] shadow-2xl border border-navy-100">
              <div className="absolute inset-0 bg-hero-pattern opacity-[0.05] mix-blend-overlay"></div>
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold-500 rounded-full blur-[120px] opacity-20 translate-x-1/3 -translate-y-1/3" />
              <Container size="narrow" className="relative z-10">
                <h2 className="text-h3 text-white mb-6">How it fits the Mastery Pathway</h2>
                <p className="text-navy-100/90 mb-12 text-body">
                  A wellness focus can begin at Catalyst and deepen through the Pathway. Your credential and investment follow the level.
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
                  <Link href="/checkout/catalyst" className="btn-primary w-full md:w-auto justify-center">
                    Apply for Catalyst
                  </Link>
                  <Link href="/admissions/contact" className="btn-secondary w-full md:w-auto justify-center border-white/20 hover:border-white text-white">
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
