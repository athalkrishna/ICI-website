import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Compass, Target, ClipboardCheck, CreditCard, MessageSquare } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Future Students | International Coaching Institute',
  description: 'Thinking about becoming a coach? Everything a prospective ICI student needs: the Mastery Pathway, specialisations, pricing and a free assessment to find your level.'
}

export default function FutureStudentsPage() {
  const startLinks = [
    { label: 'Explore the Mastery Pathway and find your level', icon: Compass, href: '/credentials' },
    { label: 'Understand the specialisations you can pursue', icon: Target, href: '/programmes' },
    { label: 'Not sure where to start?', icon: ClipboardCheck, href: '/admissions/contact' },
    { label: 'See pricing and how enrolment works', icon: CreditCard, href: '/pricing' },
    { label: 'Speak to an advisor with your questions', icon: MessageSquare, href: '/contact' },
  ]

  return (
    <div className="bg-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
      
      {/* ── Hero Section ── */}
      <section className="bg-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="section-label mb-8 justify-start text-gold-400">For Future Students</div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-[1.1] tracking-tight">
              Thinking about becoming a coach?
            </h1>
            <p className="font-body text-xl md:text-2xl text-blue-100/80 leading-relaxed font-light max-w-3xl mb-12">
              If you have ever been the person others come to, and wondered whether you could do it properly, this is where to start. Becoming a coach is a serious decision and a deeply rewarding one. This page brings together everything you need to decide: what we teach, what you will hold at the end, and how to begin.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Start Here Section ── */}
      <section className="py-24 relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
            
            <AnimatedSection>
              <h2 className="font-display text-4xl font-bold text-white mb-6">Start here</h2>
              <p className="font-body text-lg text-blue-100/70 leading-relaxed mb-8">
                Your journey to becoming an ICI credentialed coach begins with understanding the path ahead. Explore these resources to find where you fit.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="grid gap-4">
                {startLinks.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Link 
                      key={index}
                      href={item.href}
                      className="group flex items-center justify-between p-6 bg-navy-800/50 backdrop-blur-sm border border-white/5 hover:border-gold-500/30 rounded-2xl transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-navy-900 border border-white/5 flex items-center justify-center text-gold-400 group-hover:bg-gold-500/10 group-hover:scale-110 transition-all duration-300">
                          <Icon size={20} />
                        </div>
                        <span className="font-sans font-medium text-lg text-white group-hover:text-gold-200 transition-colors">
                          {item.label}
                        </span>
                      </div>
                      <ArrowRight size={20} className="text-blue-100/30 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
                    </Link>
                  )
                })}
              </div>
            </AnimatedSection>
            
          </div>
        </div>
      </section>

      {/* ── What Kind of Coach Section ── */}
      <section className="py-24 bg-navy-800/30 border-t border-white/5 relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <AnimatedSection className="max-w-4xl text-center mx-auto">
            <h2 className="font-display text-4xl font-bold text-white mb-6">What kind of coach could you become?</h2>
            <p className="font-body text-xl text-blue-100/80 leading-relaxed mb-12">
              Life coach, executive coach, business coach, wellness coach, or a coach inside an organisation. Whatever draws you, there is a path here that starts where you are and takes you somewhere real.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link href="/admissions/contact" className="btn-secondary w-full md:w-auto justify-center">
                Not sure where to start? Speak to an advisor
              </Link>
              <Link href="/credentials" className="btn-secondary inline-flex items-center gap-2">
                Explore the pathway <ArrowRight size={18} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  )
}
