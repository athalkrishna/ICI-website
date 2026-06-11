import AnimatedSection from '@/components/shared/AnimatedSection'
import Link from 'next/link'
import { Award, ChevronRight, CheckCircle2 } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ICI Catalyst Coach (Level 1) | One-to-One Coach Training',
  description: 'Become an ICI Catalyst Coach. A one-to-one, online foundation certification: 12 hours of coaching with a professional coach plus 24 hours of guided self-work.',
}

export default function CatalystPage() {
  const syllabus = [
    {
      title: 'Module 1: Foundations of professional coaching',
      desc: 'What coaching is, and what it is not. The difference between coaching, advice, mentoring and therapy. The coaching relationship, scope, and the professional standards you will hold yourself to.'
    },
    {
      title: 'Module 2: Presence and the inner work of the coach',
      desc: 'Why a coach can only take a client as far as they have gone themselves. Managing your own reactions, judgements and the urge to fix, so you can stay genuinely present.'
    },
    {
      title: 'Module 3: The core skills',
      desc: 'Deep listening across its levels, powerful and clean questioning, reflecting, summarising and the disciplined use of silence. The everyday craft that makes coaching work.'
    },
    {
      title: 'Module 4: The architecture of a session',
      desc: 'Contracting and agreeing goals, structuring a session from open to close, and a simple, reliable coaching framework you can use from day one.'
    },
    {
      title: 'Module 5: The psychology and neuroscience of change',
      desc: 'In plain language: how habits form, why willpower fails, how beliefs shape behaviour, and the basics of the nervous system, so you understand why your interventions work.'
    },
    {
      title: 'Module 6: From training to practice',
      desc: 'Working with limiting beliefs and self-sabotage compassionately, plus the practical first steps of coaching real people: agreements, ethics, confidentiality and getting started.'
    }
  ]

  const forWho = [
    'People beginning a coaching career from scratch',
    'Managers, mentors and helpers formalising their skills',
    'Professionals changing direction towards work that means more'
  ]

  const outcomes = [
    'Hold a coaching session with structure, presence and confidence',
    'Build trust and emotional safety quickly',
    'Listen beneath the words and ask the question that matters',
    'Work with limiting beliefs and self-talk without giving advice',
    'Coach ethically, within clear boundaries'
  ]

  const graduateWith = [
    'The ICI Catalyst Coach credential and the ICI-C post-nominal',
    'A working coaching framework you can use immediately',
    'The confidence and competence to take paying clients',
    'Membership of the ICI coaching community'
  ]

  return (
    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-brand-gold-500/30">
      
      {/* ── Hero Section ── */}
      <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="text-eyebrow flex items-center gap-3 mb-8 justify-start">Level 1 | Foundation</div>
            <h1 className="text-h1 text-white mb-6">
              Catalyst
            </h1>
            <p className="font-mono text-brand-gold-300 text-lg mb-8 uppercase tracking-widest border-l-4 border-brand-gold-500 pl-4">
              Credential awarded: ICI Catalyst Coach, post-nominal ICI-C
            </p>
            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
              A catalyst is what makes change happen in others without being consumed by it. That is the work of a coach, and it is where your career begins. Over 36 hours of one-to-one work, you stop being someone who gives good advice and become someone who can genuinely coach: present, trusted, and skilled enough to hold another person's growth. You are coached individually throughout, so the learning is shaped around you. You finish ready to take your first clients with confidence rather than hope.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4 w-full">
              <Link href="/admissions" className="btn-primary w-full md:w-auto justify-center">
                Enrol at Catalyst <ChevronRight size={18} />
              </Link>
              <Link href="/admissions/contact" className="btn-secondary w-full md:w-auto justify-center">
                Speak to an Advisor
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-16 lg:py-24 relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
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
                <p className="font-body text-muted text-lg leading-relaxed">
                  Open to anyone serious about learning to coach. No prior coaching qualification is required, only commitment and a genuine interest in people.
                </p>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="text-h3 text-brand-navy-900 mb-6">Format and hours</h2>
                <p className="font-body text-muted text-lg leading-relaxed mb-6">
                  Delivered entirely online and one-to-one. Your 36 hours are structured as:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4 text-muted font-body text-lg">
                    <div className="w-1.5 h-1.5 bg-brand-gold-500 rounded-full shrink-0 mt-2.5" />
                    12 hours of one-to-one online coaching and training with a professional coach
                  </li>
                  <li className="flex items-start gap-4 text-muted font-body text-lg">
                    <div className="w-1.5 h-1.5 bg-brand-gold-500 rounded-full shrink-0 mt-2.5" />
                    24 hours of guided self-work and research, including reflection, reading, practice and assignments
                  </li>
                  <li className="flex items-start gap-4 text-muted font-body text-lg font-bold">
                    <div className="w-1.5 h-1.5 bg-brand-gold-500 rounded-full shrink-0 mt-2.5" />
                    Total: 36 hours
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
                <p className="font-body text-muted text-lg leading-relaxed mb-8">
                  Delivered across your one-to-one sessions and guided self-work. Each module pairs live coaching with reflection and practice.
                </p>
                <div className="space-y-6">
                  {syllabus.map((mod, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl hover:border-brand-gold-300 transition-colors">
                      <h4 className="font-sans font-bold text-brand-navy-900 text-lg mb-3">{mod.title}</h4>
                      <p className="font-body text-muted leading-relaxed">{mod.desc}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="text-h3 text-brand-navy-900 mb-6">Assessment</h2>
                <p className="font-body text-muted text-lg leading-relaxed">
                  Assessment is based on your actual coaching. You demonstrate a coaching session and complete reflective assignments. There is no multiple-choice exam, because coaching is a craft, not a quiz.
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
                  <div className="bg-brand-navy-800 p-8 lg:p-10 rounded-[32px] border border-subtle shadow-2xl">
                    <h3 className="text-h3 text-white mb-8 pb-6 border-b border-subtle">
                      Details at a glance
                    </h3>
                    <ul className="space-y-6">
                      <li>
                        <div className="text-xs font-sans font-bold tracking-widest text-brand-gold-400 uppercase mb-1">Level</div>
                        <div className="text-blue-50 font-sans">1 of 4 (Foundation)</div>
                      </li>
                      <li>
                        <div className="text-xs font-sans font-bold tracking-widest text-brand-gold-400 uppercase mb-1">Format</div>
                        <div className="text-blue-50 font-sans">online, one-to-one</div>
                      </li>
                      <li>
                        <div className="text-xs font-sans font-bold tracking-widest text-brand-gold-400 uppercase mb-1">Hours</div>
                        <div className="text-blue-50 font-sans">36 total (12 coaching, 24 self-work)</div>
                      </li>
                      <li>
                        <div className="text-xs font-sans font-bold tracking-widest text-brand-gold-400 uppercase mb-1">Suggested duration</div>
                        <div className="text-blue-50 font-sans">up to 3 months</div>
                      </li>
                      <li>
                        <div className="text-xs font-sans font-bold tracking-widest text-brand-gold-400 uppercase mb-1">Investment</div>
                        <div className="text-blue-50 font-sans">INR 2,15,000, exclusive of GST</div>
                      </li>
                    </ul>

                    <div className="mt-10 pt-8 border-t border-subtle flex flex-col gap-4">
                      <Link href="/admissions" className="btn-primary w-full justify-center">
                        Enrol at Catalyst <ChevronRight size={18} />
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
        </div>
      </section>

    </div>
  )
}
