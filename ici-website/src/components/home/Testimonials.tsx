'use client'
import AnimatedSection from '@/components/shared/AnimatedSection'
import Image from 'next/image'

// IMPORTANT DEVELOPER NOTE: These are invented sample testimonials for design and layout purposes only. 
// None may be published as real customer testimonials before being replaced with genuine, consented graduate quotes.
const testimonials = [
  {
    name: 'Sarah Jenkins',
    title: 'Alumni',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
    quote: 'The ICI changed my practice...',
    location: ''
  },
  {
    name: 'Dr. James Worthington',
    title: 'Alumni',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
    quote: 'Rigorous, challenging, and exactly what I needed...',
    location: ''
  },
  {
    name: 'Amira Al-Fayed',
    title: 'Alumni',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80',
    quote: 'I finally feel equipped...',
    location: ''
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-navy-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern opacity-5" />
      
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-10 mb-16">
        <AnimatedSection className="text-center">
          <div className="section-label mb-4 text-gold-400 justify-center">Alumni Success</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Hear From Our Graduates</h2>
        </AnimatedSection>
      </div>

      {/* Infinite Auto-Scroller */}
      <div className="relative z-10 w-full overflow-hidden">
        {/* Fade gradients on edges */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-48 bg-gradient-to-r from-navy-900 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-48 bg-gradient-to-l from-navy-900 to-transparent z-20 pointer-events-none" />

        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 50s linear infinite;
            }
          `}} />

          {/* First set of cards */}
          <div className="flex gap-6 px-3">
            {testimonials.map((testimonial, i) => (
              <div 
                key={`first-${i}`} 
                className="w-[320px] md:w-[420px] shrink-0"
              >
                <div className="bg-navy-800/80 backdrop-blur-md p-8 md:p-10 rounded-[32px] border border-white/10 shadow-2xl relative h-full flex flex-col hover:border-gold-500/30 transition-colors duration-300">
                  <div className="text-gold-500 font-display text-6xl absolute top-4 left-6 opacity-20 transition-opacity duration-300">"</div>
                  <p className="font-body text-blue-50 mb-10 relative z-10 italic leading-relaxed flex-1 pt-6 text-lg">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4 border-t border-white/10 pt-6 mt-auto">
                    <div className="w-14 h-14 relative rounded-full overflow-hidden border-2 border-gold-500/30 shrink-0">
                      <Image 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-sans font-bold text-white text-sm">{testimonial.name}</div>
                      <div className="font-sans text-xs text-gold-400 mt-0.5">{testimonial.title}</div>
                      <div className="font-sans text-[10px] text-gray-400 mt-0.5">{testimonial.location}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Duplicate set of cards for seamless infinite scroll */}
          <div className="flex gap-6 px-3">
            {testimonials.map((testimonial, i) => (
              <div 
                key={`second-${i}`} 
                className="w-[320px] md:w-[420px] shrink-0"
              >
                <div className="bg-navy-800/80 backdrop-blur-md p-8 md:p-10 rounded-[32px] border border-white/10 shadow-2xl relative h-full flex flex-col hover:border-gold-500/30 transition-colors duration-300">
                  <div className="text-gold-500 font-display text-6xl absolute top-4 left-6 opacity-20 transition-opacity duration-300">"</div>
                  <p className="font-body text-blue-50 mb-10 relative z-10 italic leading-relaxed flex-1 pt-6 text-lg">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4 border-t border-white/10 pt-6 mt-auto">
                    <div className="w-14 h-14 relative rounded-full overflow-hidden border-2 border-gold-500/30 shrink-0">
                      <Image 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-sans font-bold text-white text-sm">{testimonial.name}</div>
                      <div className="font-sans text-xs text-gold-400 mt-0.5">{testimonial.title}</div>
                      <div className="font-sans text-[10px] text-gray-400 mt-0.5">{testimonial.location}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
