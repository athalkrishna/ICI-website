import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import { Users, Search, BookOpen, Heart, Globe } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import { getPublishedPageContent } from '@/lib/content'
import { cmsField, cmsHtml, stripHtml, cmsIndexedWithFallbacks } from '@/lib/cms-helpers'

export const metadata: Metadata = {
  title: 'The ICI Coaching Community',
  description: 'Coaching can be solitary work. The ICI community connects coaches worldwide for supervision, referrals and real support, long after they qualify.'
}

export default async function CommunityPage() {
  const content = await getPublishedPageContent('/community')

  const offerTitles = cmsIndexedWithFallbacks(content, 'offer_title_', [
    'Peer supervision and reflective practice groups',
    'A referral network among practising coaches',
    'Continued learning through masterclasses and events',
    'Honest support for the parts of coaching no one warns you about',
    'Connection across many countries and one shared standard',
  ])

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
                {cmsField(content, 'hero_eyebrow', 'Community')}
              </div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              {cmsField(content, 'hero_heading', 'You will not be coaching alone')}
            </h1>
            <p className="text-navy-100 text-base max-w-3xl mb-12">
              {stripHtml(cmsHtml(content, 'hero_body', "Coaching can be quietly isolating. You hold other people's struggles all day, then close the call and sit with them by yourself. The ICI community exists so that you do not have to. When you train with us you join a working network of coaches who supervise one another, refer clients, share what is hard, and keep each other sharp. The credential gets you started. The community keeps you going."))}
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── What the community offers ── */}
      <Section spacing="standard" className="relative z-20">
        <Container>
          <AnimatedSection>
            <h2 className="text-h2 text-brand-navy-900 mb-12">
              {cmsField(content, 'what_we_offer_heading', 'What the community offers')}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <Users size={24} /> },
                { icon: <Search size={24} /> },
                { icon: <BookOpen size={24} /> },
                { icon: <Heart size={24} /> },
                { icon: <Globe size={24} /> },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-navy-100 shadow-sm p-8 rounded-[24px] hover:border-brand-gold-500 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-cream-50 border border-navy-100 rounded-xl flex items-center justify-center text-brand-gold-600 mb-6">
                    {item.icon}
                  </div>
                  <h3 className="font-sans font-medium text-lg text-brand-navy-900">{offerTitles[i]}</h3>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Alumni & Membership ── */}
      <Section spacing="standard" className="bg-cream-50 border-t border-navy-100 relative z-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            
            <AnimatedSection>
              <h2 className="text-h2 text-brand-navy-900 mb-6">
                {cmsField(content, 'alumni_heading', 'Alumni network')}
              </h2>
              <p className="text-muted mb-8 text-body">
                {cmsField(content, 'alumni_body', 'Qualifying is a beginning. ICI coaches stay connected for supervision, collaboration and friendship, and have access to ongoing learning. The longer you are in the field, the more this network is worth.')}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="text-h2 text-brand-navy-900 mb-6">
                {cmsField(content, 'membership_heading', 'Membership and continuing development')}
              </h2>
              <p className="text-muted mb-8 text-body">
                {cmsField(content, 'membership_body', 'Coaching is a practice, which means it is never finished.')}
              </p>
            </AnimatedSection>

          </div>

          <AnimatedSection delay={0.2} className="mt-16 text-center">
            <Link href={cmsField(content, 'cta_button_link', '/apply')} className="btn-primary">
              {cmsField(content, 'cta_button_text', 'Join the community')}
            </Link>
          </AnimatedSection>
        </Container>
      </Section>

    </div>
  )
}
