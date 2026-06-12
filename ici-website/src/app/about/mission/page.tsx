import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

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
      <Section spacing="hero" className="bg-brand-navy-800 relative overflow-hidden border-b border-faint">
        
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />

        <div className="absolute inset-0 z-0 opacity-10 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/2" />
        </div>

        <Container className="relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-brand-gold-400"></div>
              <div className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-brand-gold-400">Mission, vision and values</div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              A New Standard for Coaching
            </h1>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Standard Section ── */}
      <Section spacing="compact" className="lg:py-24 relative z-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-32">
            <AnimatedSection>
              <div className="pl-6 border-l-2 border-brand-gold-400 relative">
                <span className="absolute -left-[3px] top-0 text-brand-gold-400 text-6xl leading-none font-display opacity-20">"</span>
                <h2 className="text-h3 text-brand-navy-800 mb-6">Our mission</h2>
                <p className="text-brand-navy-600 text-body">
                  To raise the standard of coaching by training and certifying coaches who combine genuine skill with genuine self-awareness.
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <div className="pl-6 border-l-2 border-brand-navy-200 relative">
                <span className="absolute -left-[3px] top-0 text-brand-navy-200 text-6xl leading-none font-display opacity-20">"</span>
                <h2 className="text-h3 text-brand-navy-800 mb-6">Our vision</h2>
                <p className="text-brand-navy-600 text-body">
                  A world where good coaching is widely available and widely trusted, and where leaders are measured by how well they help others grow.
                </p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.3}>
            <div className="text-center mb-16">
              <h2 className="text-h2 text-brand-navy-800 mb-6">What we value</h2>
              <div className="w-24 h-1 bg-brand-gold-400 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
              {[
                { title: "Depth over performance", desc: "We prize real understanding of people over polished technique.", num: "01" },
                { title: "Evidence with humanity", desc: "We teach what the science supports, in language that respects the person in front of you.", num: "02" },
                { title: "Practice, not theory", desc: "Every concept is tied to what happens in a real session.", num: "03" },
                { title: "Self-mastery first", desc: "A coach can only take a client as far as they have gone themselves.", num: "04" }
              ].map((val, i) => (
                <div key={i} className="group relative bg-white p-10 lg:p-12 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden rounded-3xl shadow-xl border border-navy-100">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cream-50 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
                  <div className="text-brand-gold-200 font-display text-6xl md:text-7xl font-bold italic mb-6 leading-none">{val.num}</div>
                  <h4 className="font-display font-bold text-brand-navy-800 text-h4 mb-4 group-hover:text-brand-gold-600 transition-colors">{val.title}.</h4>
                  <p className="text-muted text-body">{val.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
          
        </Container>
      </Section>
    </div>
  )
}
