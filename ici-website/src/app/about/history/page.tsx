import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'History & Heritage | International Coaching Institute',
}

export default function HistoryPage() {
  const paragraphs = [
    "The International Coaching Institute is young, and we say so plainly. Our heritage is not measured in decades of our own, but in the far older traditions we draw upon and bring together.",
    "Coaching, at its best, sits at a meeting point. From the behavioural sciences, psychology and neuroscience, we inherit a clear understanding of how people actually change. From the world's contemplative and reflective traditions, we inherit something quieter and just as vital: the practice of self-mastery, and the conviction that no one can guide another further than they have travelled themselves.",
    "We also inherit a way of teaching. Craft has always been passed from one person to another, closely and personally, and that is why we train one-to-one rather than in crowded rooms. It is the oldest method there is, and still the best.",
    "So when we speak of heritage, we mean a lineage of ideas about human growth that long predates us, and which we are proud to carry forward with rigour and care."
  ];

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* ── Hero Section ── */}
      <Section spacing="hero" className="bg-brand-navy-800 relative overflow-hidden border-b border-faint">
        
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />

        <div className="absolute inset-0 z-0 opacity-10 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/2" />
        </div>
        <Container className="relative z-20">
          <AnimatedSection className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-brand-gold-400"></div>
              <div className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-brand-gold-400">Our Story</div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              History & Heritage
            </h1>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Main Content ── */}
      <Section spacing="standard" className="lg:py-32">
        <Container>
          <div className="max-w-4xl mx-auto relative">
            
            {/* Timeline Track */}
            <div className="absolute left-4 md:left-8 top-8 bottom-8 w-[2px] bg-brand-navy-100 hidden md:block"></div>

            <div className="space-y-16">
              {paragraphs.map((text, i) => (
                <AnimatedSection key={i} delay={i * 0.1} className="relative flex flex-col md:flex-row gap-6 md:gap-12 items-start">
                  <div className="hidden md:flex flex-col items-center mt-2 relative z-10 shrink-0 w-16">
                    <div className="w-4 h-4 rounded-full bg-brand-gold-400 border-[4px] border-cream-50 shadow-sm"></div>
                  </div>
                  <div className="bg-white p-8 md:p-10 relative rounded-3xl shadow-xl border border-navy-100">
                    <p className="text-navy-700 text-body">
                      {text}
                    </p>
                  </div>
                </AnimatedSection>
              ))}

              <AnimatedSection delay={0.4} className="relative flex flex-col md:flex-row gap-6 md:gap-12 items-start pt-8">
                <div className="hidden md:flex flex-col items-center mt-2 relative z-10 shrink-0 w-16">
                  <div className="w-6 h-6 rounded-full bg-brand-navy-800 border-[4px] border-cream-50 shadow-sm flex items-center justify-center">
                    <div className="w-2 h-2 bg-brand-gold-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="bg-brand-navy-800 text-white p-8 md:p-12 relative overflow-hidden rounded-3xl shadow-xl border border-navy-100">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-gold-500 rounded-full blur-[60px] opacity-20"></div>
                  <h3 className="text-h3 text-white mb-4">The Next Chapter</h3>
                  <p className="text-brand-navy-100 text-body">
                    The institute's own history begins now. Every coach we train, and everyone they go on to help, adds to a history we are only beginning to write.
                  </p>
                </div>
              </AnimatedSection>
            </div>

          </div>
        </Container>
      </Section>
    </div>
  )
}
