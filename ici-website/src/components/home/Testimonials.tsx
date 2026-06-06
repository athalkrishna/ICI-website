'use client'
import AnimatedSection from '@/components/shared/AnimatedSection'
import Image from 'next/image'

const testimonials = [
  {
    name: 'Sarah Jenkins',
    title: 'Certified Executive Coach',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
    quote: 'The ICI training completely transformed my approach to leadership and coaching. The faculty are world-class and the curriculum is incredibly rigorous.'
  },
  {
    name: 'David Chen',
    title: 'Organizational Consultant',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
    quote: 'I evaluated several international coaching programs, but ICI stood out for its academic rigor and global reputation. It was the best investment I’ve made in my career.'
  },
  {
    name: 'Elena Rodriguez',
    title: 'Health & Wellness Coach',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80',
    quote: 'The supportive community and master-level faculty gave me the confidence to launch my own successful global coaching practice right after graduation.'
  }
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-navy-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern opacity-5" />
      
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <div className="section-label mb-4 text-gold-400">Alumni Success</div>
          <h2 className="font-display text-4xl font-bold text-white">Hear From Our Graduates</h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="bg-navy-800/80 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl relative h-full flex flex-col">
                <div className="text-gold-500 font-display text-6xl absolute top-4 left-6 opacity-20">"</div>
                <p className="font-body text-blue-50 mb-8 relative z-10 italic leading-relaxed flex-1 pt-4">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4 border-t border-white/10 pt-6 mt-auto">
                  <div className="w-14 h-14 relative rounded-full overflow-hidden border-2 border-gold-500/30">
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
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
