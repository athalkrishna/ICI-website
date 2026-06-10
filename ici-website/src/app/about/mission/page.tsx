import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Our Mission | International Coaching Institute',
  },
  description: 'The International Coaching Institute exists to produce coaches who create real, lasting change. Read our mission and the principles that guide us.'
}

export default function MissionPage() {
  return (
    <div className="bg-cream-50 min-h-screen">
      {/* ── Hero Section ── */}
      <section className="bg-navy-800 pt-28 pb-16 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-gold-400"></div>
              <div className="section-label mb-8 justify-start text-gold-400">About ICI</div>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-8 text-white leading-tight">
              A New Standard for Coaching
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Standard Section ── */}
      <section className="py-16 lg:py-24 relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-32">
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
