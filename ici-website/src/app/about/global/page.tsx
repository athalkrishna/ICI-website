import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Global Presence | International Coaching Institute',
}

export default function GlobalPage() {
  return (
    <div className="bg-cream-50 min-h-screen">
      {/* ── Hero Section ── */}
      <section className="bg-navy-700 text-white pt-32 pb-24 lg:pt-40 lg:pb-32 relative overflow-hidden">
        {/* Diagonal grid texture overlay */}
        <div className="absolute inset-0 bg-hero-pattern opacity-30" aria-hidden />
        {/* Gold gradient line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-80" aria-hidden />

        <div className="absolute inset-0 z-0 opacity-10 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-400 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-20">
          <AnimatedSection className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-gold-400"></div>
              <div className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-gold-400">Global Presence</div>
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-tight">
              Online, and genuinely global
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <AnimatedSection className="space-y-8">
              <p className="font-body text-xl md:text-2xl text-gray-700 leading-relaxed font-light">
                We do not measure our reach in buildings. Because every programme is delivered online and one-to-one, ICI trains coaches wherever they are, across many countries and time zones, without asking anyone to pause their life or relocate.
              </p>
              <p className="font-body text-lg text-gray-700 leading-relaxed">
                Our campus is the community: a working network of coaches who refer, supervise and support one another long after they qualify.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 pt-6">
                <Link href="/admissions" className="btn-primary text-base px-8 py-4 text-center">
                  Join a global community of coaches
                </Link>
                <Link href="/credentials" className="btn-secondary text-base px-8 py-4 text-center">
                  See the pathway
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center hover:shadow-lg transition-shadow">
                  <div className="font-display text-5xl font-bold text-navy-800 mb-2">60+</div>
                  <div className="font-sans text-sm font-bold uppercase tracking-widest text-gold-600">Countries</div>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center hover:shadow-lg transition-shadow">
                  <div className="font-display text-5xl font-bold text-navy-800 mb-2">1,000+</div>
                  <div className="font-sans text-sm font-bold uppercase tracking-widest text-gold-600">Coaches</div>
                </div>
                <div className="bg-navy-800 p-8 rounded-3xl shadow-sm border border-navy-700 flex flex-col justify-center items-center text-center col-span-2 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500 rounded-full blur-[50px] opacity-20"></div>
                   <div className="font-display text-3xl font-bold text-white mb-2">100%</div>
                   <div className="font-sans text-sm font-bold uppercase tracking-widest text-gold-400">Online & One-to-One</div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.3} className="bg-navy-900 rounded-[40px] p-8 md:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
            
            <div className="relative z-20 text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">How global delivery works</h2>
              <div className="w-16 h-1 bg-gold-400 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-20">
              {[
                { title: "Your Time Zone", desc: "Live, one-to-one sessions scheduled around your time zone" },
                { title: "Global Faculty", desc: "Coaches and faculty drawn from multiple countries" },
                { title: "One Network", desc: "A single global community rather than separate regional ones" },
                { title: "Universal Standard", desc: "The same standard and credential wherever you are based" }
              ].map((item, i) => (
                <div key={i} className="bg-navy-800/50 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-navy-800 transition-colors">
                  <div className="text-gold-400 font-display text-3xl mb-4 italic leading-none">0{i+1}</div>
                  <h4 className="font-sans font-bold text-white text-lg mb-3">{item.title}</h4>
                  <p className="font-body text-navy-200 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Glowing Map Component */}
            <div className="mt-24 relative z-20 w-full max-w-5xl mx-auto aspect-[2/1] rounded-3xl overflow-hidden flex items-center justify-center border border-white/5 bg-navy-800/30">
              {/* Abstract decorative map dots */}
              <div className="absolute inset-0 opacity-[0.15]" style={{
                backgroundImage: 'radial-gradient(#C9A84C 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }} />
              
              <div className="absolute inset-0" style={{
                backgroundImage: 'url(/world-map.svg)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: 0.15,
                filter: 'brightness(0) invert(1)'
              }}></div>
              
              {/* Glowing pins */}
              {[
                { top: '30%', left: '20%', delay: '0s' }, { top: '40%', left: '22%', delay: '0.5s' }, 
                { top: '35%', left: '25%', delay: '1s' }, { top: '50%', left: '30%', delay: '0.2s' }, 
                { top: '45%', left: '48%', delay: '0.8s' }, { top: '30%', left: '50%', delay: '1.2s' },
                { top: '25%', left: '52%', delay: '0.3s' }, { top: '35%', left: '55%', delay: '0.7s' }, 
                { top: '60%', left: '55%', delay: '0.1s' }, { top: '70%', left: '60%', delay: '1.5s' }, 
                { top: '45%', left: '70%', delay: '0.9s' }, { top: '55%', left: '75%', delay: '0.4s' },
                { top: '35%', left: '80%', delay: '1.1s' }, { top: '80%', left: '85%', delay: '0.6s' }
              ].map((pos, i) => (
                <div key={i} className="absolute w-2 h-2 bg-gold-400 rounded-full shadow-[0_0_15px_rgba(201,168,76,0.8)]" style={{ top: pos.top, left: pos.left }}>
                  <div className="absolute inset-0 bg-gold-400 rounded-full animate-ping opacity-75" style={{ animationDelay: pos.delay }}></div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
