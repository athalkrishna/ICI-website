import Image from 'next/image'
import Section from '@/components/layout/Section'
import { cmsField, cmsPlainBody } from '@/lib/cms-helpers'
import type { ContentMap } from '@/lib/content'

interface AudienceCardsProps {
  content?: ContentMap;
}

export default function AudienceCards({ content = {} }: AudienceCardsProps) {
  const audiences = [
    {
      title: cmsField(content, 'path_1_heading', 'Aspiring coaches'),
      desc: cmsPlainBody(
        content,
        'path_1_body',
        'Begin a new career on solid ground. Foundational certification and real one-to-one coaching, so you graduate ready to take your first paying clients.',
      ),
      image: '/aspiring-coaches.webp',
      altText: 'Aspiring coaches collaborating in a modern classroom setting',
    },
    {
      title: cmsField(content, 'path_2_heading', 'Experienced practitioners'),
      desc: cmsPlainBody(
        content,
        'path_2_body',
        'Deepen a practice that already works. Advanced credentialing and supervision that sharpen your judgement and raise your standing.',
      ),
      image: '/experienced-practitioners.webp',
      altText: 'Two professionals in a focused one-on-one coaching conversation',
    },
    {
      title: cmsField(content, 'path_3_heading', 'Organisations and leaders'),
      desc: cmsPlainBody(
        content,
        'path_3_body',
        'Build a coaching culture from the inside, so feedback, accountability and growth become part of how your people work.',
      ),
      image: '/organisations-leaders.webp',
      altText: 'Corporate leadership team in a modern boardroom',
    },
  ];
  return (
    <Section spacing="standard" className="bg-cream-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-eyebrow flex items-center gap-3 justify-center mb-4">Discover Your Path</p>
          <h2 className="text-h2 text-brand-navy-700">{cmsField(content, 'paths_section_heading', 'Coaching for Everyone')}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {audiences.map((aud, i) => (
            <div key={aud.title}>
              <div className="relative group rounded-2xl overflow-hidden h-[400px] shadow-lg">
                <Image 
                  src={aud.image} 
                  alt={aud.altText} 
                  fill 
                  loading="lazy"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-900 via-brand-navy-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <p className="text-brand-gold-400 font-display italic text-lg mb-2">
                    Path 0{i + 1}
                  </p>
                  <h3 className="text-h3 text-white mb-3">{aud.title}</h3>
                  <p className="font-body text-sm text-navy-100 leading-relaxed text-left">
                    {aud.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
