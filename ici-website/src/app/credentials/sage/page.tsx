import AnimatedSection from '@/components/shared/AnimatedSection'
import Link from 'next/link'
import { Award, ChevronRight, CheckCircle2 } from 'lucide-react'
import { Metadata } from 'next'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'ICI Sage Coach (Level 3) | Senior Coach Certification',
  description: 'Coach with depth, range and presence. The ICI Sage Coach certification is 90 hours, one-to-one and online: 30 hours with a master coach plus 60 hours self-work.',
}

export default function SagePage() {
  const syllabus = [
    {
      title: 'Module 1: Mastery of presence',
      desc: 'Coaching from being, not doing. The quality of attention that lets a client say the thing they have never said aloud. Practised, not just discussed.'
    },
    {
      title: 'Module 2: The deeper psychology',
      desc: 'Shadow, projection, transference and counter-transference as they actually show up in coaching. Working with them ethically and to the client\'s benefit, while staying firmly within scope.'
    },
    {
      title: 'Module 3: Executive and leadership coaching at depth',
      desc: 'Coaching power without being captured by it. Ego, fear, isolation at senior levels, and high-stakes decisions.'
    },
    {
      title: 'Module 4: Systems and relational coaching',
      desc: 'Seeing the client inside their web of relationships and systems. Coaching teams, stakeholders and dynamics rather than isolated individuals.'
    },
    {
      title: 'Module 5: Contemplative practice and behavioural science',
      desc: 'Bringing reflective and contemplative traditions into dialogue with modern behavioural science, so depth and rigour reinforce each other.'
    },
    {
      title: 'Module 6: Coaching the whole person',
      desc: 'Meaning, identity, values and life transitions. Working with the questions clients bring when surface goals turn out to be about something larger.'
    },
    {
      title: 'Module 7: Advanced ethics and complex cases',
      desc: 'The grey areas. Dual relationships, confidentiality under pressure, and the judgement to navigate situations no checklist covers.'
    },
    {
      title: 'Module 8: Building authority',
      desc: 'Mentoring, thought leadership and contribution. Beginning to give back to the field, which is the bridge to Luminary.'
    }
  ]

  const forWho = [
    'Architect coaches seeking genuine mastery',
    'Senior and executive coaches working with demanding clients',
    'Coaches ready to specialise and build real authority'
  ]

  const outcomes = [
    'Coach from presence rather than process',
    'Work with shadow, projection and counter-transference in the room',
    'Coach senior leaders through power, ego and the loneliness of the role',
    'Work within systems and relationships, not just with individuals',
    'Hold complex and ethically difficult cases with maturity'
  ]

  const graduateWith = [
    'The ICI Sage Coach credential and the ICI-S post-nominal',
    'Recognised seniority and the fees that come with it',
    'A defined specialism and a portfolio that proves it',
    'Eligibility to begin the Luminary pathway'
  ]

  return (
    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-brand-gold-500/30">
      
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
              <div className="text-eyebrow text-brand-gold-400">Level 3 | Senior Professional</div>
            </div>
            <h1 className="text-h1 text-white mb-6">
              Sage
            </h1>

            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
              A sage is not someone with all the answers, but someone whose presence helps others find their own. At this level, technique is no longer the point. Depth is. Over 90 hours of one-to-one work with a master coach, you move from doing coaching to being a coach: able to sit with the most complex clients, to work with power and the inner life, and to bring a presence that cannot be faked. This is the level that marks you out among your peers.
            </p>

          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Content ── */}
      <Section spacing="compact" className="lg:py-24 relative z-20">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-16 lg:space-y-24">
              
              <AnimatedSection>
                <h2 className="text-h3 text-brand-navy-900 mb-6 lg:mb-8">Who this level is for</h2>
                <ul className="space-y-4">
                  {forWho.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-muted font-body text-lg">
                      <CheckCircle2 className="text-brand-gold-500 shrink-0 mt-1" size={20} />
                      {item}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="text-h3 text-brand-navy-900 mb-6">Entry requirements</h2>
                <p className="text-muted text-body">
                  Hold the ICI Architect credential and demonstrate a substantial body of coaching practice.
                </p>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="text-h3 text-brand-navy-900 mb-6">Format and hours</h2>
                <p className="text-muted mb-6 text-body">
                  Delivered entirely online and one-to-one with a master coach. Your 90 hours are structured as:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4 text-muted font-body text-lg">
                    <div className="w-1.5 h-1.5 bg-brand-gold-500 rounded-full shrink-0 mt-2.5" />
                    30 hours of one-to-one online coaching and advanced supervision with a master coach
                  </li>
                  <li className="flex items-start gap-4 text-muted font-body text-lg">
                    <div className="w-1.5 h-1.5 bg-brand-gold-500 rounded-full shrink-0 mt-2.5" />
                    60 hours of guided self-work and research, including case work and a specialism portfolio
                  </li>
                  <li className="flex items-start gap-4 text-muted font-body text-lg font-bold">
                    <div className="w-1.5 h-1.5 bg-brand-gold-500 rounded-full shrink-0 mt-2.5" />
                    Total: 90 hours
                  </li>
                </ul>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="text-h3 text-brand-navy-900 mb-8">What you will be able to do</h2>
                <ul className="space-y-4">
                  {outcomes.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-muted font-body text-lg">
                      <CheckCircle2 className="text-brand-gold-500 shrink-0 mt-1" size={20} />
                      {item}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="text-h3 text-brand-navy-900 mb-8">Syllabus</h2>
                <p className="text-muted mb-8 text-body">
                  The syllabus integrates the deeper psychology, leadership application and contemplative grounding that distinguish a senior coach.
                </p>
                <div className="space-y-6">
                  {syllabus.map((mod, i) => (
                    <div key={i} className="bg-white p-8 hover:border-brand-gold-300 transition-colors rounded-2xl shadow-md border border-navy-100">
                      <h4 className="font-sans font-bold text-brand-navy-900 text-h4 mb-3">{mod.title}</h4>
                      <p className="text-muted text-body">{mod.desc}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="text-h3 text-brand-navy-900 mb-6">Assessment</h2>
                <p className="text-muted text-body">
                  Assessment combines advanced coaching demonstrations, written case studies, and a specialism portfolio that shows depth in a chosen area of practice.
                </p>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="text-h3 text-brand-navy-900 mb-8">What you graduate with</h2>
                <ul className="space-y-4">
                  {graduateWith.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-muted font-body text-lg">
                      <CheckCircle2 className="text-brand-gold-500 shrink-0 mt-1" size={20} />
                      {item}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

            </div>

            {/* Right Column: Sticky Sidebar */}
            <div className="lg:col-span-4 relative">
              <div className="sticky top-32">
                <AnimatedSection delay={0.2}>
                  <div className="bg-brand-navy-800 p-8 lg:p-10 border-subtle rounded-3xl shadow-xl border border-navy-100">
                    <h3 className="text-h3 text-white mb-8 pb-6 border-b border-subtle">
                      Details at a glance
                    </h3>
                    <ul className="space-y-6">
                      <li>
                        <div className="mb-1 text-eyebrow text-brand-gold-400">Level</div>
                        <div className="text-navy-50 font-sans">3 of 4 (Senior)</div>
                      </li>
                      <li>
                        <div className="mb-1 text-eyebrow text-brand-gold-400">Format</div>
                        <div className="text-navy-50 font-sans">online, one-to-one with a master coach</div>
                      </li>
                      <li>
                        <div className="mb-1 text-eyebrow text-brand-gold-400">Hours</div>
                        <div className="text-navy-50 font-sans">90 total (30 coaching, 60 self-work)</div>
                      </li>
                      <li>
                        <div className="mb-1 text-eyebrow text-brand-gold-400">Suggested duration</div>
                        <div className="text-navy-50 font-sans">up to 6 months</div>
                      </li>
                      <li>
                        <div className="mb-1 text-eyebrow text-brand-gold-400">Investment</div>
                        <div className="text-navy-50 font-sans">INR 4,95,000, exclusive of GST</div>
                      </li>
                    </ul>

                    <div className="mt-10 pt-8 border-t border-subtle flex flex-col gap-4">
                      <Link href="/checkout/sage" className="btn-primary w-full justify-center">
                        Apply for Sage <ChevronRight size={18} />
                      </Link>
                      <Link href="/admissions/contact" className="btn-secondary w-full justify-center text-center">
                        Speak to an Advisor
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>

          </div>
        </Container>
      </Section>

    </div>
  )
}
