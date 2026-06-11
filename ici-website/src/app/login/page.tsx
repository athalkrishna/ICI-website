import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import { mockLogin } from '@/app/actions/auth'

export const metadata: Metadata = {
  title: 'Log In | International Coaching Institute',
  description: 'Log in to your ICI account to access your sessions, materials and supervision, or to manage your application and details.'
}

export default function LoginPage() {
  return (
    <div className="bg-brand-navy-900 min-h-screen font-sans text-blue-50 selection:bg-brand-gold-500/30 selection:text-brand-gold-200">
      
      {/* ── Background Effects ── */}
      <div className="absolute inset-0 bg-hero-pattern opacity-10 pointer-events-none" aria-hidden />
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
      </div>

      <div className="min-h-screen flex items-center justify-center py-24 px-4 relative z-20">
        <AnimatedSection className="w-full max-w-md">
          
          <div className="text-center mb-10">
            <div className="text-eyebrow flex items-center gap-3 mb-6 justify-center">Log In</div>
            <h1 className="text-h1 text-white mb-4">Welcome back</h1>
            <p className="font-body text-blue-100/70">
              Log in to access your sessions, materials and account.
            </p>
          </div>

          <div className="bg-brand-navy-800/50 backdrop-blur-sm border border-subtle p-8 sm:p-10 rounded-[32px] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold-500 rounded-full blur-[100px] opacity-10 translate-x-1/3 -translate-y-1/3" />
            
            <form className="space-y-6 relative z-10" action={mockLogin}>
              <div className="space-y-2">
                <label htmlFor="email" className="block font-sans text-sm font-bold text-blue-100/90 uppercase tracking-wider">
                  Email
                </label>
                <input 
                  type="email" 
                  id="email" 
                  required 
                  className="w-full bg-brand-navy-900/80 border border-subtle rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50 focus:border-brand-gold-500/50 transition-all font-body"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <label htmlFor="password" className="block font-sans text-sm font-bold text-blue-100/90 uppercase tracking-wider">
                    Password
                  </label>
                  <Link href="#" className="text-sm font-body text-brand-gold-400 hover:text-brand-gold-300 transition-colors">
                    Forgotten your password?
                  </Link>
                </div>
                <input 
                  type="password" 
                  id="password" 
                  required 
                  className="w-full bg-brand-navy-900/80 border border-subtle rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/50 focus:border-brand-gold-500/50 transition-all font-body"
                  placeholder="••••••••"
                />
              </div>

              <div className="pt-4">
                <button type="submit" className="btn-primary w-full justify-center py-4 text-base">
                  Log in
                </button>
              </div>
            </form>

            <div className="mt-8 text-center relative z-10">
              <p className="font-body text-sm text-blue-100/60">
                New to ICI? <Link href="/apply" className="text-brand-gold-400 hover:text-brand-gold-300 transition-colors font-medium">Apply here.</Link>
              </p>
            </div>
          </div>

        </AnimatedSection>
      </div>

    </div>
  )
}
