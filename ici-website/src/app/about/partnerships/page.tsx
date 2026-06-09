import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import { Users, GraduationCap, Building2, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Partnerships & Alliances | International Coaching Institute',
}

export default function PartnershipsPage() {
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
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-20">
          <AnimatedSection className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-gold-400"></div>
              <div className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-gold-400">Collaborate with us</div>
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-tight">
              Partnerships & Alliances
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          
          <AnimatedSection className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="font-display text-4xl font-bold text-navy-800 mb-8">We work with organisations that share our view of what good coaching is.</h2>
            <p className="font-body text-xl md:text-2xl text-gray-700 leading-relaxed font-light">
              We build partnerships with academic institutions, professional bodies, and corporate learning teams to raise the standard of coaching across sectors.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="mb-32">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  icon: <GraduationCap className="w-8 h-8" />, 
                  title: "Academic Integration", 
                  desc: "Providing rigorous practical coaching training alongside university degree programmes." 
                },
                { 
                  icon: <Building2 className="w-8 h-8" />, 
                  title: "In-House Training", 
                  desc: "Training internal HR and leadership teams to coaching mastery standard." 
                },
                { 
                  icon: <Users className="w-8 h-8" />, 
                  title: "Research Alliances", 
                  desc: "Collaborating on the study of coaching efficacy and behavioural outcomes." 
                }
              ].map((card, i) => (
                <div key={i} className="bg-white rounded-3xl p-10 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-cream-50 rounded-2xl flex items-center justify-center text-gold-500 mb-8 group-hover:bg-gold-500 group-hover:text-white transition-colors">
                    {card.icon}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-navy-800 mb-4">{card.title}</h3>
                  <p className="font-body text-gray-600 leading-relaxed text-lg">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* ── CTA Card ── */}
          <AnimatedSection delay={0.3}>
            <div className="max-w-4xl mx-auto bg-navy-800 rounded-[40px] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500 rounded-full blur-[80px] opacity-20 translate-x-1/3 -translate-y-1/3"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[80px] opacity-20 -translate-x-1/3 translate-y-1/3"></div>
              
              <div className="relative z-10">
                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">Discuss a partnership</h3>
                <p className="font-body text-xl text-navy-100 mb-10 max-w-2xl mx-auto font-light">
                  If your organisation is looking to integrate world-class coaching standards, we would be glad to speak with you.
                </p>
                <Link href="/admissions/contact" className="inline-flex items-center gap-3 bg-white text-navy-900 px-8 py-4 rounded-full font-sans font-bold text-sm tracking-wide uppercase hover:bg-gold-50 transition-colors">
                  Contact our Partnerships Team
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </section>
    </div>
  )
}
