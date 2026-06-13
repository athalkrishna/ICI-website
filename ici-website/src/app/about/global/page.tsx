import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import Link from 'next/link'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Global Presence | International Coaching Institute',
  description: 'Delivered entirely online, ICI trains coaches across many countries and time zones. Our campus is the community, not a building.',
}

export default function GlobalPage() {
  return (
    <div className="bg-cream-50 min-h-screen">
      {/* ── Hero Section ── */}
      <Section spacing="hero" className="bg-brand-navy-800 relative overflow-hidden border-b border-faint">
        
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />

        <div className="absolute inset-0 z-0 opacity-10 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-navy-500 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
        </div>
        <Container className="relative z-20">
          <AnimatedSection className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-brand-gold-400"></div>
              <div className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-brand-gold-400">Global Presence</div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              Online, and genuinely global
            </h1>
            <div className="space-y-4 mb-8">
              <p className="text-navy-100 text-base max-w-2xl">
                We do not measure our reach in buildings. Because every programme is delivered online and one-to-one, ICI trains coaches wherever they are, across many countries and time zones, without asking anyone to pause their life or relocate.
              </p>
              <p className="text-navy-100 text-base max-w-2xl">
                Our campus is the community: a working network of coaches who refer, supervise and support one another long after they qualify.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/community" className="btn-primary text-center">
                Join a global community of coaches
              </Link>
              <Link href="/credentials" className="btn-secondary-light text-center">
                See the pathway
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Main Content ── */}
      <Section spacing="standard">
        <Container>
          
          <div className="max-w-3xl mx-auto mb-24">
            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-8 flex flex-col justify-center items-center text-center hover:shadow-lg transition-shadow rounded-3xl shadow-xl border border-navy-100">
                  <div className="font-display text-h2 font-bold text-brand-navy-800 mb-2">60+</div>
                  <div className="text-eyebrow">Countries</div>
                </div>
                <div className="bg-white p-8 flex flex-col justify-center items-center text-center hover:shadow-lg transition-shadow rounded-3xl shadow-xl border border-navy-100">
                  <div className="font-display text-h2 font-bold text-brand-navy-800 mb-2">1,000+</div>
                  <div className="text-eyebrow">Coaches</div>
                </div>
                <div className="bg-brand-navy-800 p-8 border-brand-navy-700 flex flex-col justify-center items-center text-center col-span-2 relative overflow-hidden rounded-3xl shadow-xl border border-navy-100">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold-500 rounded-full blur-[50px] opacity-20"></div>
                   <div className="text-h3 text-white mb-2">100%</div>
                   <div className="text-eyebrow">Online & One-to-One</div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.3} className="bg-brand-navy-900 p-8 md:p-16 relative overflow-hidden rounded-[32px] shadow-2xl border border-navy-100">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
            
            <div className="relative z-20 text-center mb-16">
              <h2 className="text-h3 text-white mb-6">How global delivery works</h2>
              <div className="w-16 h-1 bg-brand-gold-400 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-20">
              {[
                { title: "Your Time Zone", desc: "Live, one-to-one sessions scheduled around your time zone" },
                { title: "Global Faculty", desc: "Coaches and faculty drawn from multiple countries" },
                { title: "One Network", desc: "A single global community rather than separate regional ones" },
                { title: "Universal Standard", desc: "The same standard and credential wherever you are based" }
              ].map((item, i) => (
                <div key={i} className="bg-brand-navy-800/50 backdrop-blur-sm p-8 rounded-3xl border border-subtle hover:bg-brand-navy-800 transition-colors">
                  <div className="text-brand-gold-400 font-display text-3xl mb-4 italic leading-none">0{i+1}</div>
                  <h4 className="font-sans font-bold text-white text-h4 mb-3">{item.title}</h4>
                  <p className="text-brand-navy-200 text-body">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Glowing Map Component */}
            <div className="mt-24 text-center">
              <h2 className="text-h3 text-white mb-6">Where our coaches are</h2>
              <p className="text-brand-navy-200 mb-10 text-body">Our coaches train from 60+ countries and counting.</p>
            </div>
            
            <Container size="mid" className="relative z-20 w-full aspect-[2/1] rounded-3xl overflow-hidden flex items-center justify-center border border-faint bg-brand-navy-800/30">
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
                <div key={i} className="absolute w-2 h-2 bg-brand-gold-400 rounded-full shadow-[0_0_15px_rgba(201,168,76,0.8)]" style={{ top: pos.top, left: pos.left }}>
                  <div className="absolute inset-0 bg-brand-gold-400 rounded-full animate-ping opacity-75" style={{ animationDelay: pos.delay }}></div>
                </div>
              ))}
            </Container>
          </AnimatedSection>
        </Container>
      </Section>
    </div>
  )
}
