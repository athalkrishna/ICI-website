import { getPageContent } from '@/lib/content'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Prospectus | International Coaching Institute',
}

export default async function ProspectusPage() {
  const content = await getPageContent('prospectus')

  return (
    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-brand-gold-500/30">
      
      {/* ── Hero Section ── */}
      <Section spacing="hero" className="bg-brand-navy-800 relative overflow-hidden border-b border-faint">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <Container className="relative z-20">
          <AnimatedSection className="max-w-4xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-[1px] gradient-accent-gold"></div>
              <div className="text-eyebrow text-brand-gold-400">Resources</div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              Request Prospectus
            </h1>
            <p className="text-muted-dark mb-12 text-body">
              {content.body || 'If you would rather read at your own pace, the prospectus brings together the whole picture, from philosophy to practicalities, in a single document.'}
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Form Section ── */}
      <Section spacing="compact" className="lg:py-24 relative z-20">
        <Container>
          <AnimatedSection delay={0.2} className="max-w-4xl mx-auto bg-white p-8 md:p-16 text-center rounded-3xl shadow-xl border border-navy-100">
            <h2 className="text-h3 text-brand-navy-900 mb-6">Download the ICI Prospectus</h2>
            <p className="text-muted mb-8 max-w-xl mx-auto text-body">Enter your email to receive an instant link to download our comprehensive guide to coaching credentials.</p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
               <input type="email" placeholder="Your email address" required className="flex-1 bg-cream-50 border border-navy-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/70" />
               <button type="submit" className="btn-primary justify-center">Download PDF</button>
            </form>
          </AnimatedSection>
        </Container>
      </Section>
    </div>
  )
}
