'use client'
import AnimatedSection from '@/components/shared/AnimatedSection'
import Image from 'next/image'

export default function GlobalReachMap() {
  return (
    <section className="py-32 bg-navy-50 relative overflow-hidden">
      {/* Subtle decorative background circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border-[40px] border-white rounded-full opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        <AnimatedSection>
          <div className="section-label mb-4">Global Network</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-700 mb-6">Connecting Coaches Worldwide</h2>
          <p className="font-body text-gray-600 max-w-2xl mx-auto mb-16 text-lg">
            With graduates in over 60 countries, the ICI community is a diverse, dynamic network of professionals advancing the field of coaching.
          </p>
          
          <div className="relative w-full aspect-[2/1] max-h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-100">
            <Image 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80" 
              alt="Global network map" 
              fill 
              className="object-cover opacity-90"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-navy-900/20 mix-blend-multiply" />
            
            {/* Animated pins for locations */}
            <div className="absolute top-[30%] left-[20%] w-3 h-3 bg-gold-400 rounded-full shadow-[0_0_15px_rgba(201,168,76,0.8)] animate-pulse" />
            <div className="absolute top-[40%] left-[50%] w-4 h-4 bg-gold-400 rounded-full shadow-[0_0_15px_rgba(201,168,76,0.8)] animate-pulse delay-75" />
            <div className="absolute top-[60%] left-[70%] w-3 h-3 bg-gold-400 rounded-full shadow-[0_0_15px_rgba(201,168,76,0.8)] animate-pulse delay-150" />
            <div className="absolute top-[70%] left-[30%] w-2.5 h-2.5 bg-gold-400 rounded-full shadow-[0_0_15px_rgba(201,168,76,0.8)] animate-pulse delay-300" />
            <div className="absolute top-[50%] left-[80%] w-3.5 h-3.5 bg-gold-400 rounded-full shadow-[0_0_15px_rgba(201,168,76,0.8)] animate-pulse delay-500" />
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-navy-700 font-sans font-bold uppercase tracking-widest text-sm">
            <span>New York</span>
            <span className="text-gold-500">•</span>
            <span>London</span>
            <span className="text-gold-500">•</span>
            <span>Dubai</span>
            <span className="text-gold-500">•</span>
            <span>Singapore</span>
            <span className="text-gold-500">•</span>
            <span>Sydney</span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
