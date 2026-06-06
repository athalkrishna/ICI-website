import Image from 'next/image'
import AnimatedSection from '@/components/shared/AnimatedSection'

export default function GlobalReachMap() {
  return (
    <section className="py-32 bg-navy-900 relative overflow-hidden text-white">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/global-network-bg.png"
          alt="Global Network Visualization"
          fill
          className="object-cover opacity-40 object-center mix-blend-screen"
          priority
        />
        {/* Soft vignette gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-navy-900/50" />
      </div>
      
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Content */}
        <AnimatedSection className="max-w-3xl">
          <div className="section-label mb-4 text-gold-400">Global Network</div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-[1.1]">
            Connecting Coaches Worldwide
          </h2>
          <p className="font-body text-navy-200 text-lg md:text-xl mb-12 leading-relaxed max-w-2xl">
            With graduates in over 60 countries, the ICI community is a diverse, dynamic network of professionals advancing the field of coaching. Connect, learn, and grow with the best in the industry.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 max-w-4xl">
            {[
              { label: 'Countries', value: '60+' },
              { label: 'Alumni', value: '10k+' },
              { label: 'Campuses', value: '5' },
              { label: 'Partners', value: '200+' },
            ].map((stat) => (
              <div key={stat.label} className="bg-navy-800/50 backdrop-blur-md border border-navy-700/50 rounded-2xl p-6 shadow-xl transition-transform hover:-translate-y-1">
                <div className="text-3xl lg:text-4xl font-display font-bold text-gold-400 mb-2">{stat.value}</div>
                <div className="text-[11px] lg:text-xs font-sans font-bold text-navy-200 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-sans font-bold uppercase tracking-widest text-navy-300">
            <span className="hover:text-gold-400 transition-colors cursor-pointer flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" /> New York
            </span>
            <span className="hover:text-gold-400 transition-colors cursor-pointer flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" style={{ animationDelay: '200ms' }} /> London
            </span>
            <span className="hover:text-gold-400 transition-colors cursor-pointer flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" style={{ animationDelay: '400ms' }} /> Dubai
            </span>
            <span className="hover:text-gold-400 transition-colors cursor-pointer flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" style={{ animationDelay: '600ms' }} /> Singapore
            </span>
            <span className="hover:text-gold-400 transition-colors cursor-pointer flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" style={{ animationDelay: '800ms' }} /> Sydney
            </span>
          </div>
        </AnimatedSection>
        
      </div>
    </section>
  )
}
