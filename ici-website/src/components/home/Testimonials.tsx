'use client'
import AnimatedSection from '@/components/shared/AnimatedSection'
import Image from 'next/image'

// IMPORTANT DEVELOPER NOTE: These are invented sample testimonials for design and layout purposes only. 
// None may be published as real customer testimonials before being replaced with genuine, consented graduate quotes.
const testimonials = [
  {
    name: 'Priya Menon',
    title: 'People and Culture leader turned coach, ICI-C',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
    quote: 'I spent fifteen years telling people I was a good listener. My first one-to-one sessions quietly showed me how much I had been missing. The Catalyst work rebuilt the way I pay attention, and my clients can feel the difference.',
    location: 'Bengaluru, India'
  },
  {
    name: 'Rohan Iyer',
    title: 'Engineering manager and executive coach, ICI-A',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
    quote: 'What sold me was that it was genuinely one-to-one. There was nowhere to hide and nothing to coast through. By the end I was coaching senior people with a steadiness I simply did not have before.',
    location: 'Mumbai, India'
  },
  {
    name: 'Sarah Whitfield',
    title: 'Executive coach, ICI-S',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80',
    quote: 'I have an alphabet of letters after my name from other bodies. The ICI work was the most demanding and the most useful. The Sage level changed how I work with power and ego in the room.',
    location: 'London, United Kingdom'
  },
  {
    name: 'Marcus Chen',
    title: 'Founder & CEO, ICI-A',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    quote: 'As a founder, I thought coaching was about giving advice. The ICI methodology taught me how to guide my team to their own solutions. It fundamentally shifted how I lead my company.',
    location: 'Singapore'
  },
  {
    name: 'Elena Rodriguez',
    title: 'Independent Life Coach, ICI-C',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80',
    quote: 'The rigorous assessment meant I couldn\'t just rely on charm or intuition. I had to prove I could actually coach. Earning my Catalyst credential gave me the deep confidence I needed to launch my practice.',
    location: 'Madrid, Spain'
  },
  {
    name: 'David Okafor',
    title: 'Senior HR Partner, ICI-S',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    quote: 'The faculty don\'t just teach coaching, they model it constantly. Being coached by master practitioners while you learn is what makes this pathway so transformative. The depth of the Sage curriculum is unmatched.',
    location: 'Lagos, Nigeria'
  }
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
