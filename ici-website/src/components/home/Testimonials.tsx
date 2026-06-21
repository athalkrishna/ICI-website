import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

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
];

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  const initials = t.name.split(' ').map(n => n[0]).join('').slice(0, 2);
  return (
    <div className="w-[340px] md:w-[400px] shrink-0 h-[220px]">
      <div className="h-full bg-gradient-to-br from-brand-navy-800 to-brand-navy-900 backdrop-blur-md rounded-2xl border border-white/8 shadow-xl p-6 flex flex-col justify-between">
        <div className="relative">
          <svg className="absolute -top-1 -left-1 w-6 h-6 text-brand-gold-500 opacity-40" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
          <p className="text-navy-100/90 text-sm leading-relaxed pl-5 line-clamp-4 font-sans">
            {t.quote}
          </p>
        </div>
        <div className="flex items-center gap-3 pt-4 border-t border-white/8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-gold-500/30 to-brand-navy-700 border border-brand-gold-500/40 shrink-0 flex items-center justify-center">
            <span className="text-brand-gold-400 font-sans font-bold text-sm">{initials}</span>
          </div>
          <div className="min-w-0">
            <div className="font-sans font-bold text-white text-sm truncate">{t.name}</div>
            <div className="font-sans text-xs text-brand-gold-400/80 truncate">{t.title} · <span className="text-brand-gold-500 font-bold">{t.credential}</span></div>
            <div className="font-sans text-xs text-navy-300 truncate">{t.location}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const row = [...testimonials, ...testimonials];

  return (
    <Section spacing="standard" className="bg-brand-navy-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern opacity-5" aria-hidden />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-brand-gold-500/8 rounded-full blur-[140px] pointer-events-none" aria-hidden />

      <Container className="relative z-10 mb-14">
        <div className="text-center">
          <p className="text-eyebrow flex items-center gap-3 mb-4 justify-center">Alumni Success</p>
          <h2 className="text-h2 text-white">Hear From Our Graduates</h2>
          <p className="text-muted-dark max-w-xl mx-auto mt-4 text-body">Coaches trained one-to-one, in 60+ countries, building practices they are proud of.</p>
        </div>
      </Container>

      <div className="relative z-10 w-full overflow-hidden">
        <div className="absolute top-0 bottom-0 left-0 w-24 md:w-40 bg-gradient-to-r from-brand-navy-900 to-transparent z-20 pointer-events-none" aria-hidden />
        <div className="absolute top-0 bottom-0 right-0 w-24 md:w-40 bg-gradient-to-l from-brand-navy-900 to-transparent z-20 pointer-events-none" aria-hidden />
        <div className="flex w-max animate-marquee-fwd gap-4 px-4 motion-reduce:animate-none">
          {row.map((t, i) => <TestimonialCard key={`r1-${t.name}-${i}`} t={t} />)}
        </div>
      </div>
    </Section>
  )
}
