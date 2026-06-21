import AnimatedSection from '@/components/shared/AnimatedSection'
import type { Metadata } from 'next'
import ApplyForm from '@/components/admissions/ApplyForm'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import PageHero from '@/components/layout/PageHero'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, cmsHtml, stripHtml } from '@/lib/cms-helpers'

export const metadata: Metadata = {
  title: {
    absolute: 'Apply to the International Coaching Institute',
  },
  description: 'Apply to ICI in minutes. Tell us your goals, choose your level, and an advisor will help you take the next step. Free to apply, no commitment.'
}

export default async function ApplyPage() {
  const content = await getPublishedPageContent('/apply')

  return (
    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-brand-gold-500/30">
      
      <PageHero
        eyebrow={cmsField(content, 'hero_eyebrow', 'APPLY')}
        title={cmsField(content, 'hero_heading', 'Take the first step')}
        body={stripHtml(cmsHtml(content, 'hero_body', 'This is where intention becomes action. The application is short, free and carries no obligation. Tell us a little about you and where you want to go, and we will make sure you land on the right level with someone to guide you. Most people say the hardest part was deciding to begin. You are already here.'))}
      />

      {/* ── Form Section ── */}
      <Section spacing="compact" className="lg:py-24 relative z-20">
        <div className="max-w-2xl mx-auto px-4 lg:px-8">
          <AnimatedSection>
            <div className="bg-white p-8 md:p-12 relative overflow-hidden rounded-3xl shadow-xl border border-navy-100">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold-100 rounded-full blur-[100px] opacity-50 translate-x-1/3 -translate-y-1/3" />
              
              <ApplyForm
                successHeading={cmsField(content, 'success_heading', 'Application received')}
                successBody={cmsField(content, 'success_body', 'Thank you for applying to the International Coaching Institute. We will review your application and an advisor will be in touch within 2 working days.')}
              />
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2} className="mt-16 text-center">
            <h2 className="text-h2 text-brand-navy-900 mb-4">
              {cmsField(content, 'after_apply_heading', 'After you apply')}
            </h2>
            <p className="text-muted max-w-lg mx-auto text-body">
              {cmsField(content, 'after_apply_body', 'We review your application and arrange a short conversation to confirm the right level and answer your questions. Then, if it is a fit, we help you enrol and begin.')}
            </p>
          </AnimatedSection>

        </div>
      </Section>

    </div>
  )
}
