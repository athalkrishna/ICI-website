import AnimatedSection from '@/components/shared/AnimatedSection'
import Link from 'next/link'
import { Award, ChevronRight, CheckCircle2 } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ICI Luminary (Level 4) | The Highest Coaching Distinction',
  description: 'The ICI Luminary is our highest distinction. 120 hours, one-to-one, for master coaches who shape the field, mentor others and make an original contribution to coaching.',
}

export default function LuminaryPage() {
  const syllabus = [
    {
      title: 'Module 1: Defining your signature',
      desc: 'Drawing your years of practice into a coherent model, philosophy and voice. What you uniquely bring, articulated clearly enough to teach.'
    },
    {
      title: 'Module 2: Coaching at the edge',
      desc: 'The most demanding clients and situations. Sustaining mastery, presence and ethics where there are no easy answers.'
    },
    {
      title: 'Module 3: Mentoring and supervising coaches',
      desc: 'Developing other coaches with the same care you bring to clients. The distinct skill of supervision and mentoring.'
    },
    {
      title: 'Module 4: Teaching and developing others',
      desc: 'Designing and delivering learning for coaches. How to pass on a craft without flattening it into a formula.'
    },
    {
      title: 'Module 5: Research, writing and thought leadership',
      desc: 'Contributing original thinking through writing, speaking and teaching. Advancing the field rather than only practising within it.'
    },
    {
      title: 'Module 6: Ethics, legacy and stewardship',
      desc: 'What it means to hold the standard for others. The responsibilities a Luminary carries to clients, to coaches and to the profession.'
    },
    {
      title: 'Module 7: Capstone',
      desc: 'A substantial original contribution: a model, a body of written work, or a programme, submitted and reviewed for the conferral of the Luminary distinction.'
    }
  ]

  const forWho = [
    'Sage coaches with a substantial body of work',
    'Master coaches ready to mentor, teach and shape the profession',
    'Senior practitioners seeking the highest standing in the field'
  ]

  const outcomes = [
    'Articulate and teach your own signature coaching model',
    'Coach at the edge: the most complex, high-stakes work',
    'Mentor and supervise other coaches well',
    'Make an original, credible contribution to the field',
    'Carry the ethical responsibility of a Luminary'
  ]

  const graduateWith = [
    'The ICI Luminary distinction and the ICI-L post-nominal',
    'Recognition as a master coach and steward of the craft',
    'A defined, teachable signature model',
    'A standing invitation to teach and mentor within ICI'
  ]

  return (
    <div className="bg-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
      
      {/* ── Hero Section ── */}
      <section className="bg-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="section-label mb-8 justify-start text-gold-400">Level 4 | Highest Distinction</div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
              Luminary
            </h1>
            <p className="font-mono text-gold-300 text-lg mb-8 uppercase tracking-widest border-l-4 border-gold-500 pl-4">
              Credential awarded: ICI Luminary, post-nominal ICI-L
            </p>
            <p className="font-body text-xl text-blue-100/80 leading-relaxed max-w-3xl mb-12">
              A luminary does not only practise the craft; they light the way for others in it. This is the highest recognition ICI offers, and it is rare on purpose. Over 120 hours of one-to-one work with our most senior faculty, you define your own coaching model, contribute something original to the field, and learn to develop other coaches. A Luminary is not just an excellent coach but a steward of the craft. This is the work of a coaching career at its summit.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/admissions" className="btn-primary">
                Apply for Luminary <ChevronRight size={18} />
              </Link>
              <Link href="/admissions/contact" className="btn-secondary">
                Speak to an Advisor
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-24 relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-24">
              
              <AnimatedSection>
                <h2 className="font-display text-3xl font-bold text-white mb-8">Who this level is for</h2>
                <ul className="space-y-4">
                  {forWho.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-blue-100/80 font-body text-lg">
                      <CheckCircle2 className="text-gold-500 shrink-0 mt-1" size={20} />
                      {item}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="font-display text-3xl font-bold text-white mb-6">Entry requirements</h2>
                <p className="font-body text-blue-100/80 text-lg leading-relaxed">
                  Hold the ICI Sage credential and demonstrate extensive, sustained coaching experience. Admission is by application and review.
                </p>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="font-display text-3xl font-bold text-white mb-6">Format and hours</h2>
                <p className="font-body text-blue-100/80 text-lg leading-relaxed mb-6">
                  Delivered entirely online and one-to-one with our most senior faculty. Your 120 hours are structured as:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4 text-blue-100/80 font-body text-lg">
                    <div className="w-1.5 h-1.5 bg-gold-500 rounded-full shrink-0 mt-2.5" />
                    40 hours of one-to-one work and mentoring with senior faculty
                  </li>
                  <li className="flex items-start gap-4 text-blue-100/80 font-body text-lg">
                    <div className="w-1.5 h-1.5 bg-gold-500 rounded-full shrink-0 mt-2.5" />
                    80 hours of guided self-work, research and an original capstone contribution
                  </li>
                  <li className="flex items-start gap-4 text-blue-100/80 font-body text-lg font-bold">
                    <div className="w-1.5 h-1.5 bg-gold-500 rounded-full shrink-0 mt-2.5" />
                    Total: 120 hours
                  </li>
                </ul>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="font-display text-3xl font-bold text-white mb-8">What you will be able to do</h2>
                <ul className="space-y-4">
                  {outcomes.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-blue-100/80 font-body text-lg">
                      <CheckCircle2 className="text-gold-500 shrink-0 mt-1" size={20} />
                      {item}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="font-display text-3xl font-bold text-white mb-8">Syllabus</h2>
                <p className="font-body text-blue-100/80 text-lg leading-relaxed mb-8">
                  Part mastery, part contribution. The syllabus is a structured journey towards an original body of work conferred as the Luminary distinction.
                </p>
                <div className="space-y-6">
                  {syllabus.map((mod, i) => (
                    <div key={i} className="bg-navy-800/50 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-gold-500/30 transition-colors">
                      <h4 className="font-sans font-bold text-gold-400 text-lg mb-3">{mod.title}</h4>
                      <p className="font-body text-blue-100/70 leading-relaxed">{mod.desc}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="font-display text-3xl font-bold text-white mb-6">Assessment</h2>
                <p className="font-body text-blue-100/80 text-lg leading-relaxed">
                  Conferral is by review of a substantial original body of work, a demonstration of mentoring or teaching, and evidence of contribution to the field. The distinction is awarded, not simply completed.
                </p>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="font-display text-3xl font-bold text-white mb-8">What you graduate with</h2>
                <ul className="space-y-4">
                  {graduateWith.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-blue-100/80 font-body text-lg">
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
                        <div className="text-blue-50 font-sans">4 of 4 (Highest distinction)</div>
                      </li>
                      <li>
                        <div className="text-xs font-sans font-bold tracking-widest text-gold-400 uppercase mb-1">Format</div>
                        <div className="text-blue-50 font-sans">online, one-to-one with senior faculty</div>
                      </li>
                      <li>
                        <div className="text-xs font-sans font-bold tracking-widest text-gold-400 uppercase mb-1">Hours</div>
                        <div className="text-blue-50 font-sans">120 total (40 live, 80 self-work and capstone)</div>
                      </li>
                      <li>
                        <div className="text-xs font-sans font-bold tracking-widest text-gold-400 uppercase mb-1">Suggested duration</div>
                        <div className="text-blue-50 font-sans">up to 12 months</div>
                      </li>
                      <li>
                        <div className="text-xs font-sans font-bold tracking-widest text-gold-400 uppercase mb-1">Investment</div>
                        <div className="text-blue-50 font-sans">INR 6,95,000, exclusive of GST</div>
                      </li>
                    </ul>

                    <div className="mt-10 pt-8 border-t border-white/10 flex flex-col gap-4">
                      <Link href="/admissions" className="btn-primary w-full justify-center">
                        Apply for Luminary <ChevronRight size={18} />
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
