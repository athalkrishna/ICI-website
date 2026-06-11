import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import { Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Coaching Insights & Articles | ICI Blog',
  description: 'Read the latest thinking from ICI on coaching, leadership, psychology and human change. Practical insights for coaches and the people they lead.'
}

export default function BlogPage() {
  return (
    <div className="bg-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
      
      {/* ── Hero Section ── */}
      <section className="bg-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-20">
          <AnimatedSection className="max-w-4xl">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-[1.1] tracking-tight">
              Insights from the field
            </h1>
            <p className="font-body text-xl md:text-2xl text-blue-100/80 leading-relaxed font-light max-w-3xl mb-12">
              Coaching changes when practitioners keep questioning it. This is where ICI faculty share their thinking: on leadership, the psychology of high achievers, how change really happens, and the craft of coaching itself. Come back often. The best ideas tend to arrive slowly.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Empty State / Coming Soon ── */}
      <section className="py-24 relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center py-16">
              <div className="w-16 h-16 bg-navy-800 border border-white/10 rounded-full flex items-center justify-center text-gold-400 mx-auto mb-8">
                <Mail size={24} />
              </div>
              
              <h2 className="font-display text-3xl font-bold text-white mb-6">
                The first articles are on their way
              </h2>
              <p className="font-body text-lg text-blue-100/70 leading-relaxed mb-12">
                We are currently writing and editing our first collection of insights. Subscribe below to be notified when they arrive.
              </p>
              
              <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4" action="#">
                <input 
                  type="email" 
                  required 
                  className="flex-1 bg-navy-900/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
                  placeholder="Enter your email address"
                />
                <button type="submit" className="btn-primary py-3.5">
                  Notify me
                </button>
              </form>
            </div>
          </AnimatedSection>
          
          {/* Blog posts to be pulled from CMS/feed when published. Do not add dummy content. */}

        </div>
      </section>

    </div>
  )
}
