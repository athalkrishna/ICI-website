import AnimatedSection from '@/components/shared/AnimatedSection'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'
import { Calendar, Video, Users, FileCheck, Phone, ArrowRight } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import PageHero from '@/components/layout/PageHero'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, cmsHtml, stripHtml, cmsIndexedWithFallbacks } from '@/lib/cms-helpers'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/current-students');
}

export default async function CurrentStudentsPage() {
  const content = await getPublishedPageContent('/current-students')

  const hubLinkLabels = cmsIndexedWithFallbacks(content, 'hub_link_', [
    'Session schedule and links',
    'Course materials and recordings',
    'Mentor coaching and supervision booking',
    'Assessment guidance and submission',
    'Student support and contacts',
  ])

  const hubLinks = [
    { icon: Calendar },
    { icon: Video },
    { icon: Users },
    { icon: FileCheck },
    { icon: Phone },
  ]

  return (
    <div className="bg-cream-50 min-h-screen font-sans selection:bg-brand-gold-500/30">
      
      <PageHero
        eyebrow={cmsField(content, 'hero_eyebrow', 'For Current Students')}
        title={cmsField(content, 'hero_heading', 'Welcome back')}
        body={stripHtml(cmsHtml(content, 'hero_body', 'You are in the middle of the work, and this is your home base for it. Here you will find your schedule, your materials, your supervision and the people who can help. Coaching is learned by doing, and you are doing it. Use this hub to stay on track and get the most from your one-to-one sessions.'))}
      />

      {/* ── Hub Section ── */}
      <Section spacing="standard" className="relative z-20">
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
            
            <AnimatedSection>
              <h2 className="text-h2 text-brand-navy-900 mb-6">
                {cmsField(content, 'hub_heading', 'Your student hub')}
              </h2>
              <p className="text-muted mb-8 text-body">
                {cmsField(content, 'hub_intro', 'Log in to access your complete learning environment, including upcoming sessions and submitted assessments.')}
              </p>
              <Link href={cmsField(content, 'portal_link_url', '/login')} className="btn-primary inline-flex items-center gap-2">
                {cmsField(content, 'portal_link_text', 'Log in to your account')} <ArrowRight size={18} />
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="grid gap-4">
                {hubLinks.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Link 
                      key={index}
                      href="/login"
                      className="group flex items-center justify-between p-6 bg-white border border-navy-100 shadow-sm hover:border-brand-gold-500 hover:shadow-md rounded-2xl transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-cream-50 border border-navy-100 flex items-center justify-center text-brand-gold-600 group-hover:bg-brand-gold-50 group-hover:scale-110 transition-all duration-300">
                          <Icon size={20} />
                        </div>
                        <span className="font-sans font-medium text-lg text-brand-navy-900 group-hover:text-brand-gold-700 transition-colors">
                          {hubLinkLabels[index]}
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

      {/* ── Need Help Section ── */}
      <Section spacing="standard" className="bg-cream-50 border-t border-navy-100 relative z-20">
        <Container>
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <h2 className="text-h2 text-brand-navy-900 mb-6">
              {cmsField(content, 'help_heading', 'Need help?')}
            </h2>
            <p className="text-muted mb-12 text-body">
              {cmsField(content, 'help_body', 'If anything is unclear or part of the work feels hard, that is normal, and we are here. Reach out to your coach or the student support team rather than struggling alone.')}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link href="/contact" className="btn-secondary-light">
                {cmsField(content, 'help_cta_text', 'Contact student support')} <ArrowRight size={18} />
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

    </div>
  )
}
