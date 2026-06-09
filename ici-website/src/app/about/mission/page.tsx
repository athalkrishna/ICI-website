import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mission, Vision & Values | International Coaching Institute',
}

export default function MissionPage() {
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
              <div className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-gold-400">Our Mission</div>
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-tight">
              Mission, Vision & Values
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="py-24 lg:py-32 relative">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
            <AnimatedSection>
              <div className="pl-6 border-l-2 border-gold-400 relative">
                <span className="absolute -left-[3px] top-0 text-gold-400 text-6xl leading-none font-display opacity-20">"</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-800 mb-6">Our mission</h2>
                <p className="font-body text-xl md:text-2xl text-navy-600 leading-relaxed font-light">
                  To raise the standard of coaching by training and certifying coaches who combine genuine skill with genuine self-awareness.
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <div className="pl-6 border-l-2 border-navy-200 relative">
                <span className="absolute -left-[3px] top-0 text-navy-200 text-6xl leading-none font-display opacity-20">"</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-800 mb-6">Our vision</h2>
                <p className="font-body text-xl md:text-2xl text-navy-600 leading-relaxed font-light">
                  A world where good coaching is widely available and widely trusted, and where leaders are measured by how well they help others grow.
                </p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.3}>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-800 mb-6">What we value</h2>
              <div className="w-24 h-1 bg-gold-400 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
              {[
                { title: "Depth over performance", desc: "We prize real understanding of people over polished technique.", num: "01" },
                { title: "Evidence with humanity", desc: "We teach what the science supports, in language that respects the person in front of you.", num: "02" },
                { title: "Practice, not theory", desc: "Every concept is tied to what happens in a real session.", num: "03" },
                { title: "Self-mastery first", desc: "A coach can only take a client as far as they have gone themselves.", num: "04" }
              ].map((val, i) => (
                <div key={i} className="group relative bg-white rounded-3xl p-10 lg:p-12 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cream-50 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
                  <div className="text-gold-200 font-display text-6xl md:text-7xl font-bold italic mb-6 leading-none">{val.num}</div>
                  <h4 className="font-display font-bold text-navy-800 text-2xl mb-4 group-hover:text-gold-600 transition-colors">{val.title}.</h4>
                  <p className="font-body text-lg text-gray-600 leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
          
        </div>
      </section>
    </div>
  )
}
