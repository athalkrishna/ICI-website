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
      <section className="bg-navy-700 text-white pt-32 pb-24 lg:pt-40 lg:pb-32 relative overflow-hidden">
        {/* Diagonal grid texture overlay */}
        <div className="absolute inset-0 bg-hero-pattern opacity-30" aria-hidden />
        {/* Gold gradient line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-80" aria-hidden />

        <div className="absolute inset-0 z-0 opacity-10 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-400 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/2" />
        </div>
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-20">
          <AnimatedSection className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-gold-400"></div>
              <div className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-gold-400">Our People</div>
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-tight">
              Leadership & Faculty
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-16 items-center mb-32">
            <AnimatedSection className="lg:col-span-7 space-y-8">
              <h2 className="font-display text-4xl font-bold text-navy-800 mb-6">Taught by coaches, for coaches.</h2>
              <p className="font-body text-xl text-gray-700 leading-relaxed">
                ICI programmes are delivered live, online and one-to-one, by faculty who still coach. You practise from early on, receive supervision, and are assessed on real coaching, not multiple-choice tests.
              </p>
              <p className="font-body text-xl text-gray-700 leading-relaxed">
                The blend of leadership thinking, applied psychology, neuroscience and reflective practice means you come to understand both the person in front of you and yourself.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 pt-8">
                <Link href="/credentials" className="btn-primary text-base px-8 py-4 text-center">
                  Explore the Mastery Pathway
                </Link>
                <Link href="/admissions/contact" className="btn-secondary text-base px-8 py-4 text-center">
                  Speak to an Advisor
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="lg:col-span-5 relative hidden lg:block">
              <div className="aspect-[4/5] bg-navy-100 rounded-3xl overflow-hidden relative shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center text-navy-300 font-sans tracking-widest uppercase text-sm z-0">
                  [ Faculty Meeting Image ]
                </div>
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-gold-400 rounded-full blur-[80px] -z-10 opacity-50"></div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.3}>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl font-bold text-navy-800 mb-6">Faculty Directory</h2>
              <div className="w-16 h-1 bg-gold-400 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-[3/4] bg-gray-200 rounded-2xl mb-6 overflow-hidden relative">
                    <div className="absolute inset-0 bg-navy-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-sans text-xs uppercase tracking-wider">
                      Portrait {i}
                    </div>
                  </div>
                  <h3 className="font-display text-xl font-bold text-navy-800 mb-1 group-hover:text-gold-600 transition-colors">
                    Faculty Member
                  </h3>
                  <p className="font-sans text-sm text-gold-600 font-semibold tracking-wide uppercase">
                    Master Coach
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
               <button className="btn-secondary px-8 py-3 rounded-full text-sm">View Full Directory</button>
            </div>
          </AnimatedSection>

        </div>
      </section>
    </div>
  )
}
