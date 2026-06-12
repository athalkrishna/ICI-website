import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import Section from '@/components/layout/Section'

export const metadata: Metadata = {
  title: {
    absolute: 'Log In | International Coaching Institute',
  },
  description: 'Log in to your ICI account to access your sessions, materials and supervision, or to manage your application and details.'
}

export default function LoginPage() {
  return (
    <div className="bg-cream-50 min-h-screen pb-24 lg:pb-32 font-sans selection:bg-brand-gold-500/30">
      
      {/* ── Hero Section ── */}
      <Section spacing="hero" className="bg-brand-navy-800 relative overflow-hidden border-b border-faint">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-20">
          <AnimatedSection className="max-w-xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-[1px] gradient-accent-gold"></div>
              <div className="text-eyebrow text-brand-gold-400">LOG IN</div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              Welcome back
            </h1>
            <p className="text-muted-dark mb-12 text-body">
              Log in to access your sessions, materials and account.
            </p>
          </AnimatedSection>
        </div>
      </Section>

      {/* ── Login Form ── */}
      <Section spacing="compact" className="lg:py-24 relative z-20">
        <div className="max-w-md mx-auto px-4">
          <AnimatedSection>
            <div className="bg-white p-8 md:p-10 relative overflow-hidden rounded-3xl shadow-xl border border-navy-100">
              <form className="space-y-6">
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block font-sans text-sm font-bold text-brand-navy-900 uppercase tracking-wider">
                    Email
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    className="w-full bg-cream-50 border border-brand-navy-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50 focus:border-brand-gold-500/50 transition-all font-body"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="block font-sans text-sm font-bold text-brand-navy-900 uppercase tracking-wider">
                      Password
                    </label>
                    <Link href="#" className="text-sm font-body text-brand-gold-700 hover:text-brand-gold-800 transition-colors">
                      Forgotten your password?
                    </Link>
                  </div>
                  <input 
                    type="password" 
                    id="password" 
                    required
                    className="w-full bg-cream-50 border border-brand-navy-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50 focus:border-brand-gold-500/50 transition-all font-body"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="pt-4">
                  <button type="submit" className="btn-primary w-full justify-center py-4 text-base">
                    Log in
                  </button>
                </div>

                <div className="text-center pt-4 border-t border-brand-navy-100">
                  <p className="font-body text-muted">
                    New to ICI?{' '}
                    <Link href="/apply" className="font-bold text-brand-gold-700 hover:text-brand-gold-800 transition-colors">
                      Apply here.
                    </Link>
                  </p>
                </div>

              </form>
            </div>
          </AnimatedSection>
        </div>
      </Section>

    </div>
  )
}
