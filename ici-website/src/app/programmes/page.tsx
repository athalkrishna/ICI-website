import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Sparkles, BookOpen, Layers, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Coaching Programmes & Specialisations | ICI',
  description: 'Explore ICI coaching programmes: the four-level Mastery Pathway plus specialisations in life, executive, business, wellness and team coaching. One-to-one and online.'
}

export default function ProgrammesOverviewPage() {
  return (
    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-gold-500/30">
      
      {/* ── Hero Section ── */}
      <section className="bg-navy-700 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden">
        {/* Diagonal grid texture overlay */}
        <div className="absolute inset-0 bg-hero-pattern opacity-30" aria-hidden />
        {/* Gold gradient line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-80" aria-hidden />

        {/* Ambient Lights */}
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[150px] -translate-x-1/3 translate-y-1/3" />
        </div>

        {/* Abstract typography watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[400px] font-display font-bold text-white/[0.03] select-none pointer-events-none leading-none tracking-tighter mix-blend-overlay">
          ICI
        </div>

        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-[1px] bg-gradient-to-r from-gold-500 to-transparent"></div>
              <div className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-gold-400">Programmes</div>
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-10 text-white leading-[1.1] tracking-tight drop-shadow-2xl">
              One pathway, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-200">many ways to serve</span>
            </h1>
            <p className="font-body text-xl md:text-2xl text-blue-50 leading-relaxed font-light max-w-3xl opacity-90">
              Everything we teach is built around the same promise: you will leave able to coach well, not just talk about coaching. The core of ICI is the Mastery Pathway, a four-level certification journey taught one-to-one and online. Within it, you can focus on the kind of coaching that calls you, from life and executive work to business, wellness and teams. Here is how the two fit together.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── The Core: Mastery Pathway ── */}
      <section className="py-24 relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <AnimatedSection className="mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-800 mb-6 flex items-center gap-4">
              <Sparkles className="text-gold-500" size={40} />
              The core: the ICI Mastery Pathway
            </h2>
            <p className="font-body text-xl text-gray-600 leading-relaxed max-w-3xl">
              Your certification is earned through four progressive levels. Each is a complete credential in its own right, and each builds on the one before.
            </p>
          </AnimatedSection>

          {/* Stepped Timeline */}
          <div className="relative mt-24">
            {/* The horizontal connecting line */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-gray-200 via-gold-400 to-gray-200 hidden lg:block -translate-y-1/2"></div>
            
            <div className="grid lg:grid-cols-4 gap-8 lg:gap-12 relative z-10">
              {[
                { level: "Level 1", title: "Catalyst", desc: "The foundation. Become a competent, confident coach.", icon: <BookOpen /> },
                { level: "Level 2", title: "Architect", desc: "The professional. Build a thriving practice and work with complexity.", icon: <Layers /> },
                { level: "Level 3", title: "Sage", desc: "The senior coach. Coach with depth, range and presence.", icon: <Award /> },
                { level: "Level 4", title: "Luminary", desc: "The highest distinction. Master the craft and develop others.", icon: <Sparkles /> }
              ].map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.15} className={`relative ${i % 2 === 0 ? 'lg:mt-0' : 'lg:mt-24'}`}>
                  <div className="bg-white p-8 md:p-10 rounded-[32px] border border-gray-100 hover:border-gold-300 transition-all duration-500 group shadow-xl hover:shadow-2xl relative overflow-hidden">
                    <div className="absolute -top-20 -right-20 text-[150px] font-display font-bold text-gray-50 select-none transition-colors">
                      0{i+1}
                    </div>
                    <div className="w-14 h-14 bg-cream-50 rounded-2xl border border-gold-100 flex items-center justify-center text-gold-500 mb-8 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-white transition-all duration-500 shadow-sm">
                      {item.icon}
                    </div>
                    <div className="font-sans text-xs font-bold uppercase tracking-widest text-gold-500 mb-3">{item.level}</div>
                    <h3 className="font-display text-3xl font-bold text-navy-900 mb-4">{item.title}</h3>
                    <p className="font-body text-gray-600 text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          <div className="pt-24 lg:pt-32 pb-10 text-center relative z-20">
            <AnimatedSection delay={0.6}>
              <Link href="/credentials" className="btn-primary inline-flex items-center gap-3 px-10 py-5 rounded-full font-sans font-bold text-sm uppercase tracking-widest transition-colors shadow-lg">
                Explore credentials and pricing
                <ArrowRight size={18} />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Specialisations ── */}
      <section className="py-24 bg-navy-900 text-white relative overflow-hidden border-y border-navy-800">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            <AnimatedSection className="lg:col-span-5">
              <div className="sticky top-32">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                  Specialisations:<br/>
                  <span className="text-gold-500">where you focus</span>
                </h2>
                <p className="font-body text-xl text-blue-100/80 leading-relaxed mb-10">
                  As you progress, you can shape your training around a specialism. These are not separate courses with separate fees; they are the focus you bring to your pathway, supported by faculty experienced in that area. Your investment follows the Pathway, set out on the Pricing page.
                </p>
              </div>
            </AnimatedSection>

            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { name: "Life Coaching", href: "/programmes/certified-life-coach" },
                  { name: "Executive & Leadership Coaching", href: "/programmes/executive-coaching" },
                  { name: "Business Coaching", href: "/programmes/business-coach" },
                  { name: "Health & Wellness Coaching", href: "/programmes/health-wellness" },
                  { name: "Team & Organisational Coaching", href: "/programmes/team-coaching", full: true }
                ].map((spec, i) => (
                  <AnimatedSection key={i} delay={i * 0.1} className={spec.full ? "sm:col-span-2" : ""}>
                    <Link href={spec.href} className="block group">
                      <div className="bg-navy-800 p-8 md:p-10 rounded-[32px] border border-white/5 hover:border-gold-500/50 transition-all duration-300 relative overflow-hidden h-full flex flex-col justify-between min-h-[200px]">
                        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 via-gold-500/0 to-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <h3 className="font-display text-2xl font-bold text-white group-hover:text-gold-400 transition-colors relative z-10 pr-12">{spec.name}</h3>
                        <div className="mt-8 flex justify-end relative z-10">
                          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:bg-gold-500 group-hover:text-navy-900 group-hover:border-gold-500 transition-all duration-300 transform group-hover:translate-x-2">
                            <ArrowRight size={20} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-32 relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-900">How our programmes work</h2>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-24">
            {[
              { title: "One-to-one.", desc: "You are coached and developed individually." },
              { title: "Online, worldwide.", desc: "Train from any country, around your schedule." },
              { title: "Coaching hours plus real self-work.", desc: "Live coaching paired with guided study." },
              { title: "Assessed on real coaching.", desc: "Your credential reflects what you can actually do." }
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-white p-10 md:p-14 rounded-[40px] border border-gray-100 shadow-xl relative overflow-hidden group hover:border-gold-200 transition-colors duration-500 h-full">
                  <div className="absolute -right-8 -bottom-16 text-[180px] font-display font-bold text-gray-50 select-none transition-colors leading-none pointer-events-none">
                    0{i+1}
                  </div>
                  <div className="relative z-10">
                    <span className="text-gold-500 font-display text-2xl mb-6 block italic">0{i+1}</span>
                    <h3 className="font-sans font-bold text-navy-800 text-2xl mb-4">{item.title}</h3>
                    <p className="font-body text-gray-600 text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.4}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Link href="/credentials" className="btn-primary w-full sm:w-auto justify-center px-10 py-5 text-sm tracking-widest">
                Find your level
              </Link>
              <Link href="/pricing" className="btn-secondary w-full sm:w-auto justify-center px-10 py-5 text-sm tracking-widest border-navy-200 hover:border-navy-900 text-navy-700 hover:text-navy-900 hover:bg-navy-50">
                See pricing
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  )
}
