'use client'
import AnimatedSection from '@/components/shared/AnimatedSection'
import Image from 'next/image'
import Section from '@/components/layout/Section'

interface AudienceCardsProps {
  content?: Record<string, string>;
}

export default function AudienceCards({ content = {} }: AudienceCardsProps) {
  const audiences = [
    {
      title: content.path1_title || 'Aspiring coaches',
      desc: content.path1_body || 'Begin a new career on solid ground. Foundational certification and real one-to-one coaching, so you graduate ready to take your first paying clients.',
      image: '/aspiring-coaches.png',
      altText: 'Aspiring coaches collaborating in a modern classroom setting'
    },
    {
      title: content.path2_title || 'Experienced practitioners',
      desc: content.path2_body || 'Deepen a practice that already works. Advanced credentialing and supervision that sharpen your judgement and raise your standing.',
      image: '/experienced-practitioners.png',
      altText: 'Two professionals in a focused one-on-one coaching conversation'
    },
    {
      title: content.path3_title || 'Organisations and leaders',
      desc: content.path3_body || 'Build a coaching culture from the inside, so feedback, accountability and growth become part of how your people work.',
      image: '/organisations-leaders.png',
      altText: 'Corporate leadership team in a modern boardroom'
    }
  ]
  return (
    <Section spacing="standard" className="bg-cream-100">
      <div className="max-w-7xl mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <div className="text-eyebrow flex items-center gap-3 justify-center mb-4">Discover Your Path</div>
          <h2 className="text-h2 text-brand-navy-700">{content.coaching_for_everyone_heading || 'Coaching for Everyone'}</h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 gap-8">
          {audiences.map((aud, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="relative group rounded-2xl overflow-hidden h-[400px] shadow-lg cursor-pointer">
                <Image 
                  src={aud.image} 
                  alt={aud.altText} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-900 via-brand-navy-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="text-brand-gold-400 font-display italic text-lg mb-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    Path 0{i + 1}
                  </div>
                  <h3 className="text-h3 text-white mb-3">{aud.title}</h3>
                  <p className="font-body text-sm text-navy-100 leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75">
                    {aud.desc}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </Section>
  )
}
