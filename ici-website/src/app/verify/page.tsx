import type { Metadata } from 'next'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import HeroDecor from '@/components/layout/HeroDecor'
import AnimatedSection from '@/components/shared/AnimatedSection'
import VerifyForm from '@/components/verify/VerifyForm'
import { ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Verify Credential | International Coaching Institute',
  description: 'Verify the authenticity of an ICI Coach Credential by entering the reference number.',
  robots: {
    index: false,
    follow: false
  }
}

export default function VerifyPage() {
  return (
    <div className="bg-cream-50 min-h-screen w-full max-w-full overflow-x-hidden font-sans selection:bg-brand-gold-500/30">
      
      {/* ── Hero Section ── */}
      <Section spacing="hero" className="bg-brand-navy-800 overflow-hidden border-b border-faint relative min-h-[50vh] flex items-center">
        <HeroDecor />

        <Container className="relative z-20 w-full text-center">
          <AnimatedSection className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-brand-navy-900/50 border border-brand-gold-600/30 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-brand-gold-400" />
              </div>
            </div>
            <h1 className="text-h1 text-white mb-6">
              Verify a Credential
            </h1>
            <p className="text-navy-100 text-lg max-w-xl mx-auto font-body">
              Enter the unique reference number found on the coach's certificate to verify their active standing and credential level with the International Coaching Institute.
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Verification Form Section ── */}
      <Section spacing="standard" className="relative z-20 -mt-16 sm:-mt-24 pb-24">
        <Container>
          <AnimatedSection delay={0.1}>
            <VerifyForm />
          </AnimatedSection>
        </Container>
      </Section>

    </div>
  )
}
