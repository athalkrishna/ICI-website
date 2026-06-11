'use client'
import AnimatedSection from '@/components/shared/AnimatedSection'
import Image from 'next/image'

// IMPORTANT DEVELOPER NOTE: These are invented sample testimonials for design and layout purposes only. 
// None may be published as real customer testimonials before being replaced with genuine, consented graduate quotes.
const testimonials = [
  {
    name: 'Priya Menon',
    title: 'People and Culture leader turned coach, ICI-C',
    location: 'Bengaluru, India',
    quote: 'I spent fifteen years telling people I was a good listener. My first one-to-one sessions quietly showed me how much I had been missing. The Catalyst work rebuilt the way I pay attention, and my clients can feel the difference.'
  },
  {
    name: 'Rohan Iyer',
    title: 'Engineering manager and executive coach, ICI-A',
    location: 'Mumbai, India',
    quote: 'What sold me was that it was genuinely one-to-one. There was nowhere to hide and nothing to coast through. By the end I was coaching senior people with a steadiness I simply did not have before.'
  },
  {
    name: 'Ananya Reddy',
    title: 'Health and wellness coach, ICI-C',
    location: 'Hyderabad, India',
    quote: 'The self-work hours were harder than the live ones, and that was the point. I had to face my own patterns before I could help anyone with theirs.'
  },
  {
    name: 'Vikram Singh',
    title: 'Leadership coach and former Army officer, ICI-S',
    location: 'Pune, India',
    quote: 'I have sat through plenty of training in my life. This was the first that changed how I am, not just what I know. The work on presence stayed with me long after the certificate did.'
  },
  {
    name: 'Sneha Kulkarni',
    title: 'Life coach, ICI-A',
    location: 'Pune, India',
    quote: 'I left a corporate career with more fear than confidence. The Architect level gave me the craft and the proof I needed to build a practice I am proud of.'
  },
  {
    name: 'Arjun Nair',
    title: 'Business coach, ICI-A',
    location: 'Kochi, India',
    quote: 'I coach founders, and they can smell anything shallow. The depth of the psychology and behavioural work here is what lets me sit in the room with them as an equal.'
  },
  {
    name: 'Dr Kavita Desai',
    title: 'Physician and wellness coach, ICI-C',
    location: 'Ahmedabad, India',
    quote: 'As a doctor I thought I understood people. Coaching taught me to stop fixing and start listening. The two skills could not be more different, and I needed both.'
  },
  {
    name: 'Imran Sheikh',
    title: 'NGO leader and leadership coach, ICI-A',
    location: 'New Delhi, India',
    quote: 'Running an organisation had drained me. I came to learn coaching and ended up rebuilding myself in the process. I now lead and coach from a much steadier place.'
  },
  {
    name: 'Meera Pillai',
    title: 'Coach, ICI-C',
    location: 'Chennai, India',
    quote: 'I returned to work after a long break, certain it was too late to start something new. My coach met me exactly where I was. That is the whole philosophy here, and it works.'
  },
  {
    name: 'Aditya Bansal',
    title: 'Coach, ICI-C',
    location: 'Jaipur, India',
    quote: 'This is my first career, not my second. Learning one-to-one from an experienced coach meant I started years ahead of where I would have on my own.'
  },
  {
    name: 'Sarah Whitfield',
    title: 'Executive coach, ICI-S',
    location: 'London, United Kingdom',
    quote: 'I have an alphabet of letters after my name from other bodies. The ICI work was the most demanding and the most useful. The Sage level changed how I work with power and ego in the room.'
  },
  {
    name: 'Aisha Al-Mansoori',
    title: 'Leadership coach, ICI-A',
    location: 'Dubai, United Arab Emirates',
    quote: 'Being coached one-to-one while learning to coach is a rare and clever design. You experience everything you are being taught from the client\'s side first.'
  },
  {
    name: 'Daniel Tan',
    title: 'Corporate coach, ICI-A',
    location: 'Singapore',
    quote: 'Practical without being shallow, deep without being vague. That balance is hard to find in coach training, and it is exactly what I got here.'
  },
  {
    name: 'Grace Wanjiru',
    title: 'Life and leadership coach, ICI-C',
    location: 'Nairobi, Kenya',
    quote: 'The faculty treated coaching as a serious craft and treated me as a serious professional. I have carried that respect into every client relationship since.'
  },
  {
    name: 'Hiroshi Tanaka',
    title: 'Coach, ICI-C',
    location: 'Tokyo, Japan',
    quote: 'I expected frameworks. I did not expect to be asked to do so much honest work on myself. That self-work is now the thing I value most about the whole programme.'
  },
  {
    name: 'Emma Schneider',
    title: 'Coach, ICI-A',
    location: 'Berlin, Germany',
    quote: 'The neuroscience and psychology were taught in plain language I could use with clients the next day, not theory I would forget by the weekend.'
  },
  {
    name: 'Michael Roberts',
    title: 'Executive coach, ICI-S',
    location: 'Toronto, Canada',
    quote: 'I came for a credential and left with a craft. The one-to-one mentoring meant every weakness I had was seen, named and worked on, rather than glossed over in a group.'
  },
  {
    name: 'Fatima Bello',
    title: 'Coach and trainer, ICI-A',
    location: 'Lagos, Nigeria',
    quote: 'Studying entirely online from Lagos, I never once felt at a distance. The attention was personal, the standard was high, and the credential travels.'
  },
  {
    name: 'Jean-Pierre Laurent',
    title: 'Coach, ICI-C',
    location: 'Port Louis, Mauritius',
    quote: 'Training one-to-one and entirely online, I expected to feel like a number. Instead I felt known. The standard was high and the support was real from the first session.'
  },
  {
    name: 'Olivia Bennett',
    title: 'Wellness coach, ICI-C',
    location: 'Sydney, Australia',
    quote: 'The programme respects that change is slow and personal. Nothing here is rushed or formulaic, and my clients benefit from the patience it taught me.'
  }
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-brand-navy-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern opacity-5" />
      
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-gold-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-10 mb-16">
        <AnimatedSection className="text-center">
          <div className="text-eyebrow flex items-center gap-3 mb-4 justify-center">Alumni Success</div>
          <h2 className="text-h2 text-white">Hear From Our Graduates</h2>
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
              animation: marquee 300s linear infinite;
            }
          `}} />

          {/* First set of cards */}
          <div className="flex gap-6 px-3">
            {testimonials.map((testimonial, i) => (
              <div 
                key={`first-${i}`} 
                className="w-[320px] md:w-[420px] shrink-0"
              >
                <div className="bg-brand-navy-800/80 backdrop-blur-md p-8 md:p-10 rounded-[32px] border border-subtle shadow-2xl relative h-full flex flex-col hover:border-brand-gold-500/30 transition-colors duration-300">
                  <div className="text-brand-gold-500 font-display text-6xl absolute top-4 left-6 opacity-20 transition-opacity duration-300">"</div>
                  <p className="font-body text-blue-50 mb-10 relative z-10 italic leading-relaxed flex-1 pt-6 text-lg">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4 border-t border-subtle pt-6 mt-auto">
                    {/* @ts-ignore */}
                    {testimonial.image ? (
                      <div className="w-14 h-14 relative rounded-full overflow-hidden border-2 border-brand-gold-500/30 shrink-0">
                        <Image 
                          // @ts-ignore
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 relative rounded-full bg-brand-navy-700/50 border-2 border-brand-gold-500/30 shrink-0 flex items-center justify-center shadow-inner">
                        <span className="text-brand-gold-400 font-display font-bold text-xl">{testimonial.name.charAt(0)}</span>
                      </div>
                    )}
                    <div>
                      <div className="font-sans font-bold text-white text-sm">{testimonial.name}</div>
                      <div className="font-sans text-xs text-brand-gold-400 mt-0.5">{testimonial.title}</div>
                      {testimonial.location && (
                        <div className="font-sans text-[10px] text-gray-400 mt-0.5">{testimonial.location}</div>
                      )}
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
                <div className="bg-brand-navy-800/80 backdrop-blur-md p-8 md:p-10 rounded-[32px] border border-subtle shadow-2xl relative h-full flex flex-col hover:border-brand-gold-500/30 transition-colors duration-300">
                  <div className="text-brand-gold-500 font-display text-6xl absolute top-4 left-6 opacity-20 transition-opacity duration-300">"</div>
                  <p className="font-body text-blue-50 mb-10 relative z-10 italic leading-relaxed flex-1 pt-6 text-lg">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4 border-t border-subtle pt-6 mt-auto">
                    {/* @ts-ignore */}
                    {testimonial.image ? (
                      <div className="w-14 h-14 relative rounded-full overflow-hidden border-2 border-brand-gold-500/30 shrink-0">
                        <Image 
                          // @ts-ignore
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 relative rounded-full bg-brand-navy-700/50 border-2 border-brand-gold-500/30 shrink-0 flex items-center justify-center shadow-inner">
                        <span className="text-brand-gold-400 font-display font-bold text-xl">{testimonial.name.charAt(0)}</span>
                      </div>
                    )}
                    <div>
                      <div className="font-sans font-bold text-white text-sm">{testimonial.name}</div>
                      <div className="font-sans text-xs text-brand-gold-400 mt-0.5">{testimonial.title}</div>
                      {testimonial.location && (
                        <div className="font-sans text-[10px] text-gray-400 mt-0.5">{testimonial.location}</div>
                      )}
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
