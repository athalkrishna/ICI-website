import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Faculty & Research | International Coaching Institute',
  description: 'Meet the ICI faculty: practising coaches who teach what they do. Explore our thinking on coaching, leadership and behavioural change.'
}

export default function FacultyResearchPage() {
  return (
    <div className="bg-cream-50 min-h-screen font-sans selection:bg-brand-gold-500/30">
      
      {/* ── Hero Section ── */}
      <Section spacing="hero" className="bg-brand-navy-800 lg: lg: relative overflow-hidden border-b border-faint">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <Container className="relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-[1px] gradient-accent-gold"></div>
              <div className="text-eyebrow text-brand-gold-400">Faculty & Research</div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              Taught by people who still do the work
            </h1>
            <p className="text-navy-100 text-base max-w-2xl mb-12">
              A coaching school is only as good as the people who teach in it. At ICI you learn from practising coaches, not career lecturers, people who carry real client work into the room with them. Alongside our teaching, we share thinking on coaching, leadership and the psychology of change, because the field only advances when practitioners keep questioning it.
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Our Faculty ── */}
      <Section spacing="standard" className="relative z-20">
        <Container>
          <AnimatedSection className="max-w-3xl">
            <h2 className="text-h2 text-brand-navy-900 mb-6">Our faculty</h2>
            <p className="text-muted text-lg mb-12">
              ICI faculty combine deep coaching experience with grounding in leadership, psychology, neuroscience and human behaviour. Many continue to coach senior leaders while they teach, so what you learn reflects how coaching actually works today. Because we teach one-to-one, you work closely with a coach matched to your level and focus.
            </p>
          </AnimatedSection>
          
          {/* Faculty Profiles will be injected here once supplied */}
        </Container>
      </Section>

      {/* ── Research & Thinking ── */}
      <Section spacing="standard" className="bg-cream-50 border-t border-navy-100 relative z-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <AnimatedSection>
              <h2 className="text-h2 text-brand-navy-900 mb-6">Our approach to research and thinking</h2>
              <p className="text-muted mb-8 text-body">
                Coaching deserves rigour. We draw on coaching psychology, behavioural science and neuroscience, test ideas against real practice, and share what we learn through articles and teaching. The aim is not theory for its own sake, but better coaching for the people our graduates serve.
              </p>
              <div className="mt-8">
                <Link href="/resources" className="btn-primary">
                  Read our latest insights
                </Link>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2} className="bg-white p-8 md:p-10 rounded-3xl border border-navy-100 shadow-xl">
              <h3 className="text-h3 text-brand-navy-900 mb-6">Themes we explore</h3>
              <ul className="space-y-4 text-muted text-body">
                <li className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold-400 mt-2 shrink-0"></div>
                  <span>The inner life of high achievers, including the loneliness of success</span>
                </li>
                <li className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold-400 mt-2 shrink-0"></div>
                  <span>How change really happens in the brain and the nervous system</span>
                </li>
                <li className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold-400 mt-2 shrink-0"></div>
                  <span>Leadership as a practice of self-mastery</span>
                </li>
                <li className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold-400 mt-2 shrink-0"></div>
                  <span>Defence mechanisms, projection and the patterns that shape behaviour</span>
                </li>
                <li className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold-400 mt-2 shrink-0"></div>
                  <span>Contemplative traditions and modern behavioural science in dialogue</span>
                </li>
              </ul>
            </AnimatedSection>
          </div>
        </Container>
      </Section>

    </div>
  )
}
