import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import { Briefcase, Building, Users, Target, BarChart, ArrowRight } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, cmsHtml, stripHtml, cmsIndexedWithFallbacks } from '@/lib/cms-helpers'

export const metadata: Metadata = {
  title: 'Coaching for Organisations | ICI',
  description: 'Build a coaching culture with ICI. Train managers and internal coaches one-to-one, develop leaders, and make feedback and accountability part of how people work.'
}

export default async function OrganizationsPage() {
  const content = await getPublishedPageContent('/organisations')

  const workLinkLabels = cmsIndexedWithFallbacks(content, 'work_link_', [
    'Train managers and leaders to coach in the flow of work',
    'Develop internal coaches your organisation owns',
    'Executive coaching for senior leaders',
    'Tailored programmes built around your context',
    'Measurement that speaks the language of the business',
  ])

  const workLinks = [
    { icon: Users },
    { icon: Building },
    { icon: Briefcase },
    { icon: Target },
    { icon: BarChart },
  ]

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
              <div className="text-eyebrow text-brand-gold-400">
                {cmsField(content, 'hero_eyebrow', 'For Organisations')}
              </div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              {cmsField(content, 'hero_heading', 'Build a coaching culture, not just send people on a course')}
            </h1>
            <p className="text-navy-100 text-base max-w-3xl mb-12">
              {stripHtml(cmsHtml(content, 'hero_body', 'Most leadership training is forgotten within a month because it teaches ideas, not habits. Coaching is different. When managers learn to coach, the change shows up in everyday conversations: clearer feedback, real accountability, people who grow instead of stall. ICI helps organisations build that capability from the inside, one-to-one, and own it.'))}
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── How we work Section ── */}
      <Section spacing="standard" className="relative z-20">
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
            
            <AnimatedSection>
              <h2 className="text-h2 text-brand-navy-900 mb-6">
                {cmsField(content, 'how_we_work_heading', 'How we work with organisations')}
              </h2>
              <p className="text-muted mb-8 text-body">
                {cmsField(content, 'how_we_work_body', 'We do not do off-the-shelf theory. We partner with you to embed coaching behaviours directly into your operational rhythm.')}
              </p>
              <Link href={cmsField(content, 'cta_button_link', '/contact')} className="btn-primary inline-flex items-center gap-2">
                {cmsField(content, 'cta_proposal_text', 'Request a proposal')} <ArrowRight size={18} />
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="grid gap-4">
                {workLinks.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div 
                      key={index}
                      className="group flex items-center justify-between p-6 bg-white border border-navy-100 shadow-sm hover:border-brand-gold-500 hover:shadow-md rounded-2xl transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-cream-50 border border-navy-100 flex items-center justify-center text-brand-gold-600 group-hover:bg-brand-gold-50 group-hover:scale-110 transition-all duration-300">
                          <Icon size={20} />
                        </div>
                        <span className="font-sans font-medium text-lg text-brand-navy-900 group-hover:text-brand-gold-700 transition-colors">
                          {workLinkLabels[index]}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </AnimatedSection>
            
          </div>
        </Container>
      </Section>

      {/* ── Why it works Section ── */}
      <Section spacing="standard" className="bg-cream-50 border-t border-navy-100 relative z-20">
        <Container>
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <h2 className="text-h2 text-brand-navy-900 mb-6">
              {cmsField(content, 'why_it_works_heading', 'Why it works')}
            </h2>
            <p className="text-muted mb-12 text-body">
              {cmsField(content, 'why_it_works_body', 'Because it changes habits, not just knowledge. Our programmes are live, one-to-one and grounded in how leaders actually behave under pressure, drawing on deep experience inside demanding organisations.')}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link href="/contact" className="btn-secondary-light">
                {cmsField(content, 'cta_team_text', 'Speak to our team')} <ArrowRight size={18} />
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

    </div>
  )
}
