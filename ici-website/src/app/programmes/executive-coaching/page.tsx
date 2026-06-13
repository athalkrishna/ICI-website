import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import { Scale, Shield, TrendingUp, BarChart, CheckCircle2, UserPlus, Compass } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Executive & Leadership Coaching | ICI',
  description: 'Train to coach senior leaders with ICI. An executive and leadership focus within the four-level Mastery Pathway, taught one-to-one and online.'
}

export default function ExecutiveCoachingPage() {
  return (
    <div className="bg-cream-50 min-h-screen font-sans selection:bg-brand-gold-500/30">
      
      {/* ── Hero Section ── */}
      <Section spacing="hero" className="bg-brand-navy-800 relative overflow-hidden border-b border-faint">
        
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />

        {/* Ambient Lights */}
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        {/* Abstract typography watermark */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 text-9xl font-display font-bold text-white/[0.03] select-none pointer-events-none leading-none tracking-tighter mix-blend-overlay">
          E
        </div>

        <Container className="relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-[1px] gradient-accent-gold"></div>
              <div className="text-eyebrow text-brand-gold-400">Specialisation | Executive & Leadership</div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              Executive & Leadership Coaching
            </h1>
            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
              Coaching a senior leader is a different discipline. The stakes are higher, the defences are subtler, and the room can feel lonely at the top. As an executive and leadership focus within the Pathway, this prepares you to coach leaders through pressure, difficult decisions and growth, grounded in how leaders actually think and behave.
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Split Layout Content ── */}
      <Section spacing="standard" className="max-w-[1440px] mx-auto px-4 lg:px-8 lg:py-20 mt-4 relative z-20">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: What you will learn */}
          <div className="lg:col-span-7 space-y-12">
            <AnimatedSection>
              <h2 className="text-h3 text-brand-navy-900 mb-10 flex items-center gap-4">
                What you will learn to do
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { text: "Coach for judgement, not just behaviour change", icon: <Scale size={24} /> },
                  { text: "Work with power, ego, fear and isolation at senior levels", icon: <Shield size={24} /> },
                  { text: "Coach through high-stakes decisions and organisational pressure", icon: <TrendingUp size={24} /> },
                  { text: "Measure impact in terms an organisation respects", icon: <BarChart size={24} /> }
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
                      "Coaches ready for senior and executive clients",
                      "Experienced leaders and HR professionals moving into coaching",
                      "Consultants adding credible coaching to their offer"
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
                      { label: "Entry", value: "Suggested from Architect (Level 2)" },
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

      <Section spacing="none" className="mt-12 lg:mt-16">
        <AnimatedSection>
          <Container>
            <div className="bg-brand-navy-900 p-10 md:p-16 lg:p-20 border-brand-gold-500/20 relative overflow-hidden rounded-[32px] shadow-2xl border border-navy-100">
              <div className="absolute inset-0 bg-hero-pattern opacity-[0.05] mix-blend-overlay"></div>
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold-500 rounded-full blur-[120px] opacity-20 translate-x-1/3 -translate-y-1/3" />
              <Container size="narrow" className="relative z-10">
                <h2 className="text-h3 text-white mb-6">How it fits the Mastery Pathway</h2>
                <p className="text-navy-100/90 mb-12 text-body">
                  An executive focus suits coaches at the Architect level and above, where you work with greater complexity. Your credential and investment follow the level.
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
                  <Link href="/checkout/architect" className="btn-primary w-full md:w-auto justify-center">
                    Apply for Architect
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
