import AnimatedSection from '@/components/shared/AnimatedSection'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'
import { Calendar, BookOpen, Users, Monitor, Phone, ArrowRight } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import PageHero from '@/components/layout/PageHero'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, cmsHtml, stripHtml, cmsIndexedWithFallbacks } from '@/lib/cms-helpers'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/faculty-staff');
}

export default async function FacultyStaffPage() {
  const content = await getPublishedPageContent('/faculty-staff')

  const accessLinkLabels = cmsIndexedWithFallbacks(content, 'access_link_', [
    'Teaching schedules and student information',
    'Faculty resources and materials',
    'Supervision and faculty development',
    'Internal systems and tools',
    'Operations and support contacts',
  ])

  const accessLinks = [
    { icon: Calendar },
    { icon: BookOpen },
    { icon: Users },
    { icon: Monitor },
    { icon: Phone },
  ]

  return (
    <div className="bg-cream-50 min-h-screen font-sans selection:bg-brand-gold-500/30">
      
      <PageHero
        eyebrow={cmsField(content, 'hero_eyebrow', 'For Faculty & Staff')}
        title={cmsField(content, 'hero_heading', 'For the people who make ICI work')}
        body={stripHtml(cmsHtml(content, 'hero_body', 'Teaching coaching well is demanding, and so is running the institute behind it. This area gives faculty and staff quick access to what they need: schedules, systems, materials and support. If you teach or work with us, start here.'))}
      />

      {/* ── Quick Access Section ── */}
      <Section spacing="standard" className="relative z-20">
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
            
            <AnimatedSection>
              <h2 className="text-h2 text-brand-navy-900 mb-6">
                {cmsField(content, 'quick_access_heading', 'Quick access')}
              </h2>
              <p className="text-muted mb-8 text-body">
                {cmsField(content, 'quick_access_body', 'Log in to access your dashboard, secure documents, and scheduling systems.')}
              </p>
              <Link href={cmsField(content, 'portal_link_url', '/login')} className="btn-primary inline-flex items-center gap-2">
                {cmsField(content, 'portal_link_text', 'Log in to your account')} <ArrowRight size={18} />
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="grid gap-4">
                {accessLinks.map((item, index) => {
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
                          {accessLinkLabels[index]}
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

      {/* ── Join the faculty Section ── */}
      <Section spacing="standard" className="bg-cream-50 border-t border-navy-100 relative z-20">
        <Container>
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <h2 className="text-h2 text-brand-navy-900 mb-6">
              {cmsField(content, 'join_faculty_heading', 'Join the faculty')}
            </h2>
            <p className="text-muted mb-12 text-body">
              {cmsField(content, 'join_faculty_body', 'We are always interested in practising coaches who can teach with rigour and humanity. If that is you, we would like to hear from you.')}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link href="/contact" className="btn-secondary-light">
                {cmsField(content, 'join_faculty_cta_text', 'Express interest in teaching')} <ArrowRight size={18} />
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

    </div>
  )
}
