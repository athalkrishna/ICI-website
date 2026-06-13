import { getPageContent } from '@/lib/content'
import AnimatedSection from '@/components/shared/AnimatedSection'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Award } from 'lucide-react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

export const revalidate = 60;

const validLevels = ['catalyst', 'architect', 'sage', 'luminary']

export async function generateMetadata({ params }: { params: Promise<{ level: string }> }): Promise<Metadata> {
  const { level } = await params;
  if (!validLevels.includes(level)) return { title: 'Not Found' }
  const titleStr = level.charAt(0).toUpperCase() + level.slice(1)
  return { title: `${titleStr} | Coaching Credential | International Coaching Institute` }
}

export default async function CredentialLevelPage({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;

  if (!validLevels.includes(level)) {
    notFound()
  }

  const content = await getPageContent(`cred-${level}`)

  return (
    <div className="bg-white min-h-screen pt-20">
      
      {/* ── Hero Section ── */}
      <Section spacing="standard" className="bg-brand-navy-900 text-white lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80" 
            alt="" 
            fill 
            className="object-cover mix-blend-overlay" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-900 via-brand-navy-900/95 to-brand-navy-900/40 z-10" />
        
        <Container className="relative z-20">
          <AnimatedSection className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-brand-gold-500/20 text-brand-gold-400 text-sm font-sans font-bold px-4 py-2 rounded-xl tracking-wider uppercase mb-8">
              <Award size={16} /> {content.label || 'Level'}
            </div>
            <h1 className="text-h1 text-white mb-6">
              {content.heading || 'Credential'}
            </h1>
            <p className="font-mono text-brand-gold-300 text-lg mb-8 uppercase tracking-widest border-l-4 border-brand-gold-500 pl-4">
              {content.credential || 'ICI Coach'}
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Details ── */}
      <Section spacing="standard">
        <Container>
          <AnimatedSection className="max-w-3xl">
            <p className="text-navy-700 mb-10 text-body">
              {content.body || 'Details about this coaching credential level.'}
            </p>
            <Link href={`/checkout/${level}`} className="btn-primary inline-flex">
              Apply for {level.charAt(0).toUpperCase() + level.slice(1)}
              <ChevronRight size={18} />
            </Link>
          </AnimatedSection>
        </Container>
      </Section>

    </div>
  )
}
