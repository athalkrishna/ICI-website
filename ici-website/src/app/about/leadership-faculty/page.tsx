import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Leadership & Faculty | International Coaching Institute',
}

export default function LeadershipFacultyPage() {
  return (
    <div className="bg-cream-50 min-h-screen">
      {/* ── Hero Section ── */}
      <section className="bg-brand-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-brand-gold-400"></div>
              <div className="text-eyebrow flex items-center gap-3 mb-8 justify-start">About ICI</div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              Leadership & Faculty
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-16 lg:mb-32">
            <AnimatedSection className="lg:col-span-7 space-y-8">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy-800 mb-6">Taught by coaches, for coaches.</h2>
              <p className="font-body text-lg md:text-xl text-gray-700 leading-relaxed">
                ICI programmes are delivered live, online and one-to-one, by faculty who still coach. You practise from early on, receive supervision, and are assessed on real coaching, not multiple-choice tests.
              </p>
              <p className="font-body text-lg md:text-xl text-gray-700 leading-relaxed">
                The blend of leadership thinking, applied psychology, neuroscience and reflective practice means you come to understand both the person in front of you and yourself.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 pt-8">
                <Link href="/credentials" className="btn-primary text-base px-8 py-4 text-center">
                  Explore the Mastery Pathway
                </Link>
                <Link href="/admissions/contact" className="btn-secondary-light text-base px-8 py-4 text-center">
                  Speak to an Advisor
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="lg:col-span-5 relative hidden lg:block">
              <div className="aspect-[4/5] bg-brand-navy-100 rounded-3xl overflow-hidden relative shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-900/50 to-transparent z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center text-brand-navy-300 font-sans tracking-widest uppercase text-sm z-0">
                  [ Faculty Meeting Image ]
                </div>
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-brand-gold-400 rounded-full blur-[80px] -z-10 opacity-50"></div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.3}>
            <div className="text-center mb-16">
              <h2 className="text-h2 text-brand-navy-800 mb-6">Faculty Directory</h2>
              <div className="w-16 h-1 bg-brand-gold-400 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-[3/4] bg-gray-200 rounded-2xl mb-6 overflow-hidden relative">
                    <div className="absolute inset-0 bg-brand-navy-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-sans text-xs uppercase tracking-wider">
                      Portrait {i}
                    </div>
                  </div>
                  <h3 className="font-display text-xl font-bold text-brand-navy-800 mb-1 group-hover:text-brand-gold-600 transition-colors">
                    Faculty Member
                  </h3>
                  <p className="font-sans text-sm text-brand-gold-600 font-semibold tracking-wide uppercase">
                    Master Coach
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
               <button className="btn-secondary-light px-8 py-3 rounded-full text-sm">View Full Directory</button>
            </div>
          </AnimatedSection>

        </div>
      </section>
    </div>
  )
}
