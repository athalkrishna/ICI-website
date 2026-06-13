'use client'
import AnimatedSection from '@/components/shared/AnimatedSection'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

// IMPORTANT DEVELOPER NOTE: These are invented sample testimonials for design and layout purposes only. 
// None may be published as real customer testimonials before being replaced with genuine, consented graduate quotes.
const testimonials = [
  {
    name: 'Priya Menon',
    title: 'People & Culture Leader turned Coach',
    credential: 'ICI-C',
    location: 'Bengaluru, India',
    quote: 'My first one-to-one sessions quietly showed me how much I had been missing. The Catalyst work rebuilt the way I pay attention, and my clients can feel the difference.'
  },
  {
    name: 'Rohan Iyer',
    title: 'Engineering Manager & Executive Coach',
    credential: 'ICI-A',
    location: 'Mumbai, India',
    quote: 'There was nowhere to hide and nothing to coast through. By the end I was coaching senior people with a steadiness I simply did not have before.'
  },
  {
    name: 'Ananya Reddy',
    title: 'Health & Wellness Coach',
    credential: 'ICI-C',
    location: 'Hyderabad, India',
    quote: 'The self-work hours were harder than the live ones, and that was the point. I had to face my own patterns before I could help anyone with theirs.'
  },
  {
    name: 'Vikram Singh',
    title: 'Leadership Coach & Former Army Officer',
    credential: 'ICI-S',
    location: 'Pune, India',
    quote: 'This was the first training that changed how I am, not just what I know. The work on presence stayed with me long after the certificate did.'
  },
  {
    name: 'Arjun Nair',
    title: 'Business Coach',
    credential: 'ICI-A',
    location: 'Kochi, India',
    quote: 'I coach founders and they can smell anything shallow. The depth of the psychology and behavioural work here is what lets me sit in the room with them as an equal.'
  },
  {
    name: 'Dr Kavita Desai',
    title: 'Physician & Wellness Coach',
    credential: 'ICI-C',
    location: 'Ahmedabad, India',
    quote: 'Coaching taught me to stop fixing and start listening. The two skills could not be more different, and I needed both.'
  },
  {
    name: 'Imran Sheikh',
    title: 'NGO Leader & Leadership Coach',
    credential: 'ICI-A',
    location: 'New Delhi, India',
    quote: 'I came to learn coaching and ended up rebuilding myself in the process. I now lead and coach from a much steadier place.'
  },
  {
    name: 'Sarah Whitfield',
    title: 'Executive Coach',
    credential: 'ICI-S',
    location: 'London, United Kingdom',
    quote: 'The ICI work was the most demanding and the most useful. The Sage level changed how I work with power and ego in the room.'
  },
  {
    name: 'Aisha Al-Mansoori',
    title: 'Leadership Coach',
    credential: 'ICI-A',
    location: 'Dubai, UAE',
    quote: 'Being coached one-to-one while learning to coach is a rare and clever design. You experience everything you are taught from the client\'s side first.'
  },
  {
    name: 'Daniel Tan',
    title: 'Corporate Coach',
    credential: 'ICI-A',
    location: 'Singapore',
    quote: 'Practical without being shallow, deep without being vague. That balance is hard to find in coach training, and it is exactly what I got here.'
  },
  {
    name: 'Grace Wanjiru',
    title: 'Life & Leadership Coach',
    credential: 'ICI-C',
    location: 'Nairobi, Kenya',
    quote: 'The faculty treated coaching as a serious craft and treated me as a serious professional. I have carried that respect into every client relationship since.'
  },
  {
    name: 'Michael Roberts',
    title: 'Executive Coach',
    credential: 'ICI-S',
    location: 'Toronto, Canada',
    quote: 'I came for a credential and left with a craft. One-to-one mentoring meant every weakness I had was seen, named and worked on, not glossed over in a group.'
  },
  {
    name: 'Fatima Bello',
    title: 'Coach & Trainer',
    credential: 'ICI-A',
    location: 'Lagos, Nigeria',
    quote: 'Studying entirely online from Lagos, I never once felt at a distance. The attention was personal, the standard was high, and the credential travels.'
  },
  {
    name: 'Hiroshi Tanaka',
    title: 'Coach',
    credential: 'ICI-C',
    location: 'Tokyo, Japan',
    quote: 'I expected frameworks. I did not expect to be asked to do so much honest work on myself. That self-work is now the thing I value most about the whole programme.'
  },
  {
    name: 'Emma Schneider',
    title: 'Coach',
    credential: 'ICI-A',
    location: 'Berlin, Germany',
    quote: 'The neuroscience and psychology were taught in plain language I could use with clients the next day, not theory I would forget by the weekend.'
  },
  {
    name: 'Olivia Bennett',
    title: 'Wellness Coach',
    credential: 'ICI-C',
    location: 'Sydney, Australia',
    quote: 'Nothing here is rushed or formulaic. My clients benefit from the patience it taught me. The programme respects that change is slow and deeply personal.'
  },
]

// Split into two rows for staggered effect
const row1 = testimonials.slice(0, Math.ceil(testimonials.length / 2))
const row2 = testimonials.slice(Math.ceil(testimonials.length / 2))

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  const initials = t.name.split(' ').map(n => n[0]).join('').slice(0, 2)
  return (
    <div className="w-[340px] md:w-[400px] shrink-0 h-[220px]">
      <div className="h-full bg-gradient-to-br from-brand-navy-800 to-brand-navy-900 backdrop-blur-md rounded-2xl border border-white/8 shadow-xl hover:border-brand-gold-500/30 hover:shadow-brand-gold-500/10 transition-all duration-300 p-6 flex flex-col justify-between group">
        {/* Quote */}
        <div className="relative">
          <svg className="absolute -top-1 -left-1 w-6 h-6 text-brand-gold-500 opacity-40" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
          <p className="text-navy-100/90 text-sm leading-relaxed pl-5 line-clamp-4 font-sans">
            {t.quote}
          </p>
        </div>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-gold-500/30 to-brand-navy-700 border border-brand-gold-500/40 shrink-0 flex items-center justify-center">
            <span className="text-brand-gold-400 font-sans font-bold text-sm">{initials}</span>
          </div>
          <div className="min-w-0">
            <div className="font-sans font-bold text-white text-sm truncate">{t.name}</div>
            <div className="font-sans text-xs text-brand-gold-400/80 truncate">{t.title} · <span className="text-brand-gold-500 font-bold">{t.credential}</span></div>
            <div className="font-sans text-xs text-navy-400 truncate">{t.location}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <Section spacing="standard" className="bg-brand-navy-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern opacity-5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-brand-gold-500/8 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10 mb-14">
        <AnimatedSection className="text-center">
          <div className="text-eyebrow flex items-center gap-3 mb-4 justify-center">Alumni Success</div>
          <h2 className="text-h2 text-white">Hear From Our Graduates</h2>
          <p className="text-muted-dark max-w-xl mx-auto mt-4 text-body">Coaches trained one-to-one, in 60+ countries, building practices they are proud of.</p>
        </AnimatedSection>
      </Container>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-fwd {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-rev {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-fwd { animation: marquee-fwd 120s linear infinite; }
        .animate-marquee-rev { animation: marquee-rev 60s linear infinite; }
        .animate-marquee-fwd:hover,
        .animate-marquee-rev:hover { animation-play-state: paused; }
      `}} />

      {/* Single row — scrolls left */}
      <div className="relative z-10 w-full overflow-hidden">
        <div className="absolute top-0 bottom-0 left-0 w-24 md:w-40 bg-gradient-to-r from-brand-navy-900 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 md:w-40 bg-gradient-to-l from-brand-navy-900 to-transparent z-20 pointer-events-none" />
        <div className="flex w-max animate-marquee-fwd gap-4 px-4">
          {[...testimonials, ...testimonials].map((t, i) => <TestimonialCard key={`r1-${i}`} t={t} />)}
        </div>
      </div>
    </Section>
  )
}
