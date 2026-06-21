import AnimatedSection from '@/components/shared/AnimatedSection'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'
import { Users, GraduationCap, Network, HeartHandshake, BookOpen, ArrowRight } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import PageHero from '@/components/layout/PageHero'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, cmsHtml, stripHtml, cmsIndexedWithFallbacks } from '@/lib/cms-helpers'

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata('/alumni');
}

export default async function AlumniPage() {
  const content = await getPublishedPageContent('/alumni')

  const benefitsLabels = cmsIndexedWithFallbacks(content, 'benefit_', [
    'Peer supervision and reflective practice groups',
    'Access to masterclasses and events',
    'A referral network of practising coaches',
    'Opportunities to teach, mentor and contribute',
    'Continued professional development',
  ])

  const benefitsLinks = [
    { icon: Users },
    { icon: GraduationCap },
    { icon: Network },
    { icon: HeartHandshake },
    { icon: BookOpen },
  ]

  return (
    <div className="bg-cream-50 min-h-screen font-sans selection:bg-brand-gold-500/30">
      
      <PageHero
        eyebrow={cmsField(content, 'hero_eyebrow', 'For Alumni')}
        title={cmsField(content, 'hero_heading', 'Once an ICI coach, always part of ICI')}
        body={stripHtml(cmsHtml(content, 'hero_body', 'The credential was a milestone, not an exit. Our alumni stay connected for the things that make a long coaching career sustainable: supervision, referrals, continued learning and the company of people who understand the work. The longer you practise, the more this matters. Welcome back, whenever you need us.'))}
      />

      {/* ── Benefits Section ── */}
      <Section spacing="standard" className="relative z-20">
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
            
            <AnimatedSection>
              <h2 className="text-h2 text-brand-navy-900 mb-6">
                {cmsField(content, 'benefits_heading', 'Your alumni benefits')}
              </h2>
              <p className="text-muted mb-8 text-body">
                {cmsField(content, 'benefits_intro', 'As a credentialed member of the ICI network, you have ongoing access to resources designed to support and elevate your practice.')}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="grid gap-4">
                {benefitsLinks.map((item, index) => {
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
                          {benefitsLabels[index]}
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

      {/* ── Stay Involved Section ── */}
      <Section spacing="standard" className="bg-cream-50 border-t border-navy-100 relative z-20">
        <Container>
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <h2 className="text-h2 text-brand-navy-900 mb-6">
              {cmsField(content, 'stay_involved_heading', 'Stay involved')}
            </h2>
            <p className="text-muted mb-12 text-body">
              {cmsField(content, 'stay_involved_body', 'Keep your details current, join the next event, and tell us when something good happens in your practice. Your story may be exactly what a future student needs to read.')}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link href="/account" className="btn-primary">
                {cmsField(content, 'cta_button_1_text', 'Update your details')}
              </Link>
              <Link href="/events" className="btn-secondary-light">
                {cmsField(content, 'cta_button_2_text', 'See upcoming events')} <ArrowRight size={18} />
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

    </div>
  )
}
