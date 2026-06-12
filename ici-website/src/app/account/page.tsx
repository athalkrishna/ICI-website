import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import { Book, Calendar, Video, Users, User, CreditCard, LogOut, ArrowRight } from 'lucide-react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { mockLogout } from '@/app/actions/auth'

export const metadata: Metadata = {
  title: 'My Account | International Coaching Institute',
  description: 'Manage your ICI account: your programme, schedule, materials, supervision, profile and billing.'
}

export default async function AccountPage() {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('ici_mock_auth')
  if (authCookie?.value !== 'true') {
    redirect('/login')
  }

  const tabs = [
    { label: 'My programme', icon: Book, active: true },
    { label: 'Schedule', icon: Calendar, active: false },
    { label: 'Materials', icon: Video, active: false },
    { label: 'Supervision', icon: Users, active: false },
    { label: 'Profile & details', icon: User, active: false },
    { label: 'Billing', icon: CreditCard, active: false },
  ]

  return (
    <div className="bg-brand-navy-900 min-h-screen font-sans text-navy-50 selection:bg-brand-gold-500/30 selection:text-brand-gold-200">
      
      {/* ── Background Effects ── */}
      <div className="absolute inset-0 bg-hero-pattern opacity-5 pointer-events-none" aria-hidden />

      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 pt-32 pb-24 relative z-20">
        
        <AnimatedSection>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-eyebrow text-brand-gold-400 flex items-center gap-3 mb-6 justify-start">My Account</div>
              <h1 className="text-h1 text-white">
                Your account
              </h1>
            </div>
            <form action={mockLogout}>
              <button type="submit" className="inline-flex items-center gap-2 text-sm font-bold font-sans text-navy-100/50 hover:text-white uppercase tracking-wider transition-colors cursor-pointer">
                <LogOut size={16} /> Log out
              </button>
            </form>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-[280px_1fr] gap-12 items-start">
          
          {/* Sidebar Tabs */}
          <AnimatedSection delay={0.1}>
            <div className="bg-brand-navy-800/50 backdrop-blur-sm border border-subtle rounded-[24px] p-4 flex flex-col gap-2">
              {tabs.map((tab, idx) => {
                const Icon = tab.icon
                return (
                  <button 
                    key={idx}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-sans font-medium text-sm transition-all text-left ${tab.active ? 'bg-brand-gold-500/10 text-brand-gold-400 border border-brand-gold-500/20' : 'text-navy-100/70 hover:text-white hover:bg-white/5 border border-transparent' }`}
                  >
                    <Icon size={18} className={tab.active ? 'text-brand-gold-700' : 'text-navy-100/40'} />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </AnimatedSection>

          {/* Main Content Area */}
          <AnimatedSection delay={0.2}>
            <div className="bg-brand-navy-800/30 backdrop-blur-sm border border-faint rounded-[32px] p-8 md:p-16 min-h-[500px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold-400 rounded-full blur-[150px] opacity-10 translate-x-1/2 -translate-y-1/2" />
              
              <div className="text-center relative z-10 max-w-lg">
                <div className="w-16 h-16 rounded-full bg-brand-navy-800 border border-subtle flex items-center justify-center text-brand-gold-400 mx-auto mb-6">
                  <Book size={24} />
                </div>
                <h2 className="text-h3 text-white mb-4">No active enrolment</h2>
                <p className="text-navy-100/70 mb-8 text-body">
                  You have not enrolled on a level yet. Explore the Mastery Pathway or speak to an advisor to begin your journey.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link href="/credentials" className="btn-primary">
                    Explore the Mastery Pathway
                  </Link>
                  <Link href="/admissions/contact" className="btn-secondary inline-flex items-center justify-center gap-2">
                    Speak to an advisor <ArrowRight size={18} />
                  </Link>
                </div>
              </div>

            </div>
          </AnimatedSection>

        </div>

      </div>
    </div>
  )
}
