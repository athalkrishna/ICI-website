import AnimatedSection from '@/components/shared/AnimatedSection'
import Link from 'next/link'
import { Award, ChevronRight, CheckCircle2 } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ICI Architect Coach (Level 2) | Professional Certification',
  description: 'Build a thriving, ethical coaching practice. The ICI Architect Coach certification is 60 hours, one-to-one and online: 20 hours coaching plus 40 hours self-work.',
}

export default function ArchitectPage() {
  const syllabus = [
    {
      title: 'Module 1: Advanced presence and use of self',
      desc: 'Coaching from a settled, non-anxious presence. Using your own reactions as information rather than being driven by them. Holding steadier as the material gets heavier.'
    },
    {
      title: 'Module 2: Working with emotion, defence and resistance',
      desc: 'How people protect themselves from change. Defence mechanisms, projection and the basics of transference, handled with compassion and within the boundaries of coaching.'
    },
    {
      title: 'Module 3: Trauma-aware coaching and the nervous system',
      desc: 'Recognising nervous-system patterns and trauma responses, coaching safely around them, and the clear lines that tell you when a client needs clinical support instead.'
    },
    {
      title: 'Module 4: Frameworks and models in depth',
      desc: 'A broader toolkit of coaching models, and the judgement to choose the right approach rather than forcing everyone through one method.'
    },
    {
      title: 'Module 5: Working with patterns and narratives',
      desc: 'Beliefs, life stories and the self-sabotage that quietly runs the show. Helping clients see the pattern and write a different one.'
    },
    {
      title: 'Module 6: The business of coaching',
      desc: 'Choosing a niche, pricing your work, attracting clients ethically, contracting clearly, and building a practice that supports your life rather than consuming it.'
    },
    {
      title: 'Module 7: Supervision and reflective practice',
      desc: 'Being supervised, supervising your own work, and building the reflective habits that keep a professional coach safe and improving for a whole career.'
    }
  ]

  const forWho = [
    'Catalyst coaches ready to deepen their practice',
    'Working coaches who want their skill recognised at a higher level',
    'Experienced professionals moving seriously into coaching'
  ]

  const outcomes = [
    'Work skilfully with emotion, defences and resistance, within scope',
    'Recognise patterns such as projection and self-sabotage and coach around them',
    'Stay grounded and trauma-aware, and know exactly when to refer',
    'Draw on a wider range of models and match your approach to the client',
    'Build, price and sustain a real coaching practice'
  ]

  const graduateWith = [
    'The ICI Architect Coach credential and the ICI-A post-nominal',
    'The standing to charge professional fees',
    'A wider, tested toolkit and clearer professional judgement',
    'Ongoing supervision and the ICI community'
  ]

  return (
    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-gold-500/30">
      
      {/* ── Hero Section ── */}
      <section className="bg-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="section-label mb-8 justify-start text-gold-400">Level 2 | Professional</div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight">
              Architect
            </h1>
            <p className="font-mono text-gold-300 text-lg mb-8 uppercase tracking-widest border-l-4 border-gold-500 pl-4">
              Credential awarded: ICI Architect Coach, post-nominal ICI-A
            </p>
            <p className="font-body text-xl text-blue-100/80 leading-relaxed max-w-3xl mb-12">
              Competence gets you started. Becoming an architect makes you a professional. An architect does not just react to what appears; they design and build. Over 60 hours of one-to-one work with a senior coach, you learn to work with the harder parts of real practice, emotion, resistance and complexity, and to build a coaching practice that lasts. You leave able to take on clients other coaches refer elsewhere.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4 w-full">
              <Link href="/admissions" className="btn-primary w-full md:w-auto justify-center">
                Advance to Architect <ChevronRight size={18} />
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
                <h2 className="font-display text-3xl font-bold text-navy-900 mb-6 lg:mb-8">Who this level is for</h2>
                <ul className="space-y-4">
                  {forWho.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-gray-600 font-body text-lg">
                      <CheckCircle2 className="text-gold-500 shrink-0 mt-1" size={20} />
                      {item}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">Entry requirements</h2>
                <p className="font-body text-gray-600 text-lg leading-relaxed">
                  Hold the ICI Catalyst credential, or demonstrate equivalent training and coaching experience confirmed at interview.
                </p>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">Format and hours</h2>
                <p className="font-body text-gray-600 text-lg leading-relaxed mb-6">
                  Delivered entirely online and one-to-one with a senior coach. Your 60 hours are structured as:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4 text-gray-600 font-body text-lg">
                    <div className="w-1.5 h-1.5 bg-gold-500 rounded-full shrink-0 mt-2.5" />
                    20 hours of one-to-one online coaching and supervision with a senior coach
                  </li>
                  <li className="flex items-start gap-4 text-gray-600 font-body text-lg">
                    <div className="w-1.5 h-1.5 bg-gold-500 rounded-full shrink-0 mt-2.5" />
                    40 hours of guided self-work and research, including supervised practice and reflective assignments
                  </li>
                  <li className="flex items-start gap-4 text-gray-600 font-body text-lg font-bold">
                    <div className="w-1.5 h-1.5 bg-gold-500 rounded-full shrink-0 mt-2.5" />
                    Total: 60 hours
                  </li>
                </ul>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="font-display text-3xl font-bold text-navy-900 mb-8">What you will be able to do</h2>
                <ul className="space-y-4">
                  {outcomes.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-gray-600 font-body text-lg">
                      <CheckCircle2 className="text-gold-500 shrink-0 mt-1" size={20} />
                      {item}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="font-display text-3xl font-bold text-navy-900 mb-8">Syllabus</h2>
                <p className="font-body text-gray-600 text-lg leading-relaxed mb-8">
                  The syllabus deepens your craft and adds the professional and psychological range that distinguishes an advanced coach.
                </p>
                <div className="space-y-6">
                  {syllabus.map((mod, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl hover:border-gold-300 transition-colors">
                      <h4 className="font-sans font-bold text-navy-900 text-lg mb-3">{mod.title}</h4>
                      <p className="font-body text-gray-600 leading-relaxed">{mod.desc}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="font-display text-3xl font-bold text-navy-900 mb-6">Assessment</h2>
                <p className="font-body text-gray-600 text-lg leading-relaxed">
                  Assessment is based on coaching across a range of clients, supervised practice logs, and a short, practical plan for your professional practice. You demonstrate not just competence but consistency.
                </p>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="font-display text-3xl font-bold text-navy-900 mb-8">What you graduate with</h2>
                <ul className="space-y-4">
                  {graduateWith.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-gray-600 font-body text-lg">
                      <CheckCircle2 className="text-gold-500 shrink-0 mt-1" size={20} />
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
                  <div className="bg-navy-800 p-8 lg:p-10 rounded-[32px] border border-white/10 shadow-2xl">
                    <h3 className="font-display text-2xl font-bold text-white mb-8 pb-6 border-b border-white/10">
                      Details at a glance
                    </h3>
                    <ul className="space-y-6">
                      <li>
                        <div className="text-xs font-sans font-bold tracking-widest text-gold-400 uppercase mb-1">Level</div>
                        <div className="text-blue-50 font-sans">2 of 4 (Professional)</div>
                      </li>
                      <li>
                        <div className="text-xs font-sans font-bold tracking-widest text-gold-400 uppercase mb-1">Format</div>
                        <div className="text-blue-50 font-sans">online, one-to-one with a senior coach</div>
                      </li>
                      <li>
                        <div className="text-xs font-sans font-bold tracking-widest text-gold-400 uppercase mb-1">Hours</div>
                        <div className="text-blue-50 font-sans">60 total (20 coaching, 40 self-work)</div>
                      </li>
                      <li>
                        <div className="text-xs font-sans font-bold tracking-widest text-gold-400 uppercase mb-1">Suggested duration</div>
                        <div className="text-blue-50 font-sans">up to 4 months</div>
                      </li>
                      <li>
                        <div className="text-xs font-sans font-bold tracking-widest text-gold-400 uppercase mb-1">Investment</div>
                        <div className="text-blue-50 font-sans">INR 3,45,000, exclusive of GST</div>
                      </li>
                    </ul>

                    <div className="mt-10 pt-8 border-t border-white/10 flex flex-col gap-4">
                      <Link href="/admissions" className="btn-primary w-full justify-center">
                        Advance to Architect <ChevronRight size={18} />
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
