import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: {
    absolute: 'Faculty & Research | International Coaching Institute',
  },
  description: 'Meet the ICI faculty: practising coaches who teach what they do. Explore our thinking on coaching, leadership and behavioural change.'
}

export default function FacultyPage() {
  return (
    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-brand-gold-500/30 selection:text-brand-gold-200">
      
      {/* ── Hero Section ── */}
      <section className="bg-brand-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-faint">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <Container className="relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="text-eyebrow flex items-center gap-3 mb-8 justify-start">Faculty & Research</div>
            <h1 className="text-h1 text-white mb-8">
              Taught by people who still do the work
            </h1>
            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
              A coaching school is only as good as the people who teach in it. At ICI you learn from practising coaches, not career lecturers: people who carry real client work into the room with them. Alongside our teaching, we share thinking on coaching, leadership and the psychology of change, because the field only advances when practitioners keep questioning it.
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* ── Our Faculty ── */}
      <Section spacing="standard" className="relative z-20">
        <Container>
          <AnimatedSection>
            <h2 className="text-h2 text-white mb-6">Our faculty</h2>
            <p className="text-body-hero text-muted-dark max-w-3xl mb-12">
              ICI faculty combine deep coaching experience with grounding in leadership, psychology, neuroscience and human behaviour. Many continue to coach senior leaders while they teach, so what you learn reflects how coaching actually works today. Because we teach one-to-one, you work closely with a coach matched to your level and focus.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* <!-- Add faculty profiles here when supplied: name, photo, role, expertise. Present as faculty, not as founders or owners. --> */}
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Research and Thinking ── */}
      <Section spacing="standard" className="bg-brand-navy-800/30 border-t border-y border-faint relative z-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            
            <AnimatedSection>
              <h2 className="text-h2 text-white mb-6">Our approach to research and thinking</h2>
              <p className="font-body text-lg text-muted-dark leading-relaxed mb-8">
                Coaching deserves rigour. We draw on coaching psychology, behavioural science and neuroscience, test ideas against real practice, and share what we learn through articles and teaching. The aim is not theory for its own sake, but better coaching for the people our graduates serve.
              </p>
              <Link href="/resources" className="btn-primary inline-flex items-center gap-2">
                Read our latest insights <ChevronRight size={18} />
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h3 className="text-h3 text-white mb-8 pb-4 border-b border-subtle">Themes we explore</h3>
              <ul className="space-y-6">
                {[
                  'The inner life of high achievers, including the loneliness of success',
                  'How change really happens in the brain and the nervous system',
                  'Leadership as a practice of self-mastery',
                  'Defence mechanisms, projection and the patterns that shape behaviour',
                  'Contemplative traditions and modern behavioural science in dialogue'
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 text-blue-100/90 font-body text-lg items-start">
                    <div className="w-1.5 h-1.5 bg-brand-gold-500 rounded-full shrink-0 mt-2.5" />
                    <div>{item}</div>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

          </div>
        </Container>
      </Section>

    </div>
  )
}
