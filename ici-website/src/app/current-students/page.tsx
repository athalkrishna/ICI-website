import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Video, Users, FileCheck, Phone, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Current Students | International Coaching Institute',
  description: 'Your ICI student hub: cohort schedule, session links, materials, supervision and support. Everything you need while you train, in one place.'
}

export default function CurrentStudentsPage() {
  const hubLinks = [
    { label: 'Session schedule and links', icon: Calendar },
    { label: 'Course materials and recordings', icon: Video },
    { label: 'Mentor coaching and supervision booking', icon: Users },
    { label: 'Assessment guidance and submission', icon: FileCheck },
    { label: 'Student support and contacts', icon: Phone },
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
            <div className="section-label mb-8 justify-start text-gold-400">For Current Students</div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-tight">
              Welcome back
            </h1>
            <p className="font-body text-xl text-blue-100/80 leading-relaxed max-w-3xl mb-12">
              You are in the middle of the work, and this is your home base for it. Here you will find your schedule, your materials, your supervision and the people who can help. Coaching is learned by doing, and you are doing it. Use this hub to stay on track and get the most from your one-to-one sessions.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Hub Section ── */}
      <section className="py-24 relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
            
            <AnimatedSection>
              <h2 className="font-display text-4xl font-bold text-white mb-6">Your student hub</h2>
              <p className="font-body text-lg text-blue-100/70 leading-relaxed mb-8">
                Log in to access your complete learning environment, including upcoming sessions and submitted assessments.
              </p>
              <Link href="/login" className="btn-primary inline-flex items-center gap-2">
                Log in to your account <ArrowRight size={18} />
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="grid gap-4">
                {hubLinks.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Link 
                      key={index}
                      href="/login"
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

      {/* ── Need Help Section ── */}
      <section className="py-24 bg-navy-800/30 border-t border-white/5 relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <AnimatedSection className="max-w-4xl text-center mx-auto">
            <h2 className="font-display text-4xl font-bold text-white mb-6">Need help?</h2>
            <p className="font-body text-xl text-blue-100/80 leading-relaxed mb-12">
              If anything is unclear or part of the work feels hard, that is normal, and we are here. Reach out to your coach or the student support team rather than struggling alone.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link href="/contact" className="btn-secondary inline-flex items-center gap-2">
                Contact student support <ArrowRight size={18} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  )
}
