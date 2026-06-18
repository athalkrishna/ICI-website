import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Compass, Target, ClipboardCheck, CreditCard, MessageSquare } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, cmsHtml, stripHtml, cmsIndexedWithFallbacks } from '@/lib/cms-helpers'

export const metadata: Metadata = {
  title: 'Future Students | International Coaching Institute',
  description: 'Thinking about becoming a coach? Everything a prospective ICI student needs: the Mastery Pathway, specialisations, pricing and a free assessment to find your level.'
}

export default async function FutureStudentsPage() {
  const content = await getPublishedPageContent('/future-students')

  const startLinkLabels = cmsIndexedWithFallbacks(content, 'start_link_', [
    'Explore the Mastery Pathway and find your level',
    'Understand the specialisations you can pursue',
    'Not sure where to start?',
    'See pricing and how enrolment works',
    'Speak to an advisor with your questions',
  ])

  const startLinkHrefs = [
    '/credentials',
    '/programmes',
    '/admissions/contact',
    '/pricing',
    '/contact',
  ]

  const startLinks = [
    { icon: Compass },
    { icon: Target },
    { icon: ClipboardCheck },
    { icon: CreditCard },
    { icon: MessageSquare },
  ]

  return (
    <div className="bg-cream-50 min-h-screen font-sans selection:bg-brand-gold-500/30">
      
      {/* ── Hero Section ── */}
      <Section spacing="hero" className="bg-brand-navy-800 lg:relative overflow-hidden border-b border-faint">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <Container className="relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-[1px] gradient-accent-gold"></div>
              <div className="text-eyebrow text-brand-gold-400">
                {cmsField(content, 'hero_eyebrow', 'For Future Students')}
              </div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              {cmsField(content, 'hero_heading', 'Thinking about becoming a coach?')}
            </h1>
            <p className="text-navy-100 text-base max-w-3xl mb-12">
              {stripHtml(cmsHtml(content, 'hero_body', 'If you have ever been the person others come to, and wondered whether you could do it properly, this is where to start. Becoming a coach is a serious decision and a deeply rewarding one. This page brings together everything you need to decide: what we teach, what you will hold at the end, and how to begin.'))}
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Start Here Section ── */}
      <Section spacing="standard" className="relative z-20">
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
            
            <AnimatedSection>
              <h2 className="text-h2 text-brand-navy-900 mb-6">
                {cmsField(content, 'start_here_heading', 'Start here')}
              </h2>
              <p className="text-muted mb-8 text-body">
                {cmsField(content, 'start_here_body', 'Your journey to becoming an ICI credentialed coach begins with understanding the path ahead. Explore these resources to find where you fit.')}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="grid gap-4">
                {startLinks.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Link 
                      key={index}
                      href={startLinkHrefs[index]}
                      className="group flex items-center justify-between p-6 bg-white border border-navy-100 shadow-sm hover:border-brand-gold-500 hover:shadow-md rounded-2xl transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-cream-50 border border-navy-100 flex items-center justify-center text-brand-gold-600 group-hover:bg-brand-gold-50 group-hover:scale-110 transition-all duration-300">
                          <Icon size={20} />
                        </div>
                        <span className="font-sans font-medium text-lg text-brand-navy-900 group-hover:text-brand-gold-700 transition-colors">
                          {startLinkLabels[index]}
                        </span>
                      </div>
                      <ArrowRight size={20} className="text-muted group-hover:text-brand-gold-500 group-hover:translate-x-1 transition-all" />
                    </Link>
                  )
                })}
              </div>
            </AnimatedSection>
            
          </div>
        </Container>
      </Section>

      {/* ── What Kind of Coach Section ── */}
      <Section spacing="standard" className="bg-cream-50 border-t border-navy-100 relative z-20">
        <Container>
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <h2 className="text-h2 text-brand-navy-900 mb-6">
              {cmsField(content, 'coach_type_heading', 'What kind of coach could you become?')}
            </h2>
            <p className="text-muted mb-12 text-body">
              {cmsField(content, 'coach_type_body', 'Life coach, executive coach, business coach, wellness coach, or a coach inside an organisation. Whatever draws you, there is a path here that starts where you are and takes you somewhere real.')}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link href="/admissions" className="btn-primary w-full md:w-auto justify-center">
                {cmsField(content, 'cta_button_1_text', 'Take the free assessment')}
              </Link>
              <Link href="/credentials" className="btn-secondary-light">
                {cmsField(content, 'cta_button_2_text', 'Explore the pathway')} <ArrowRight size={18} />
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

    </div>
  )
}
