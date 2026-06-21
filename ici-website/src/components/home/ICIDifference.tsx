import Image from 'next/image'
import Section from '@/components/layout/Section'
import { cmsField, cmsPlainBody } from '@/lib/cms-helpers'
import type { ContentMap } from '@/lib/content'

interface ICIDifferenceProps {
  content?: ContentMap;
}

export default function ICIDifference({ content = {} }: ICIDifferenceProps) {
  return (
    <Section spacing="standard" className="bg-white">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 w-full">
          <div className="w-full aspect-square md:aspect-[4/3] bg-brand-navy-50 rounded-2xl relative overflow-hidden shadow-2xl">
            <Image 
              src="/ici-difference-coaching.webp" 
              alt="Professional one-on-one coaching session" 
              fill 
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy-900/40 to-transparent mix-blend-multiply" />
          </div>
        </div>
        <div className="flex-1">
          <p className="text-eyebrow flex items-center gap-3 justify-center !justify-start mb-4">
            {cmsField(content, 'difference_label', 'Why ICI')}
          </p>
          <h2 className="text-h2 text-brand-navy-700 mb-6">{cmsField(content, 'difference_heading', 'The ICI Difference')}</h2>
          <p className="text-brand-navy-600 mb-8 text-body">
            {cmsPlainBody(
              content,
              'difference_body_intro',
              'Our evidence-based curriculum, world-class faculty, and supportive community provide an unmatched environment for aspiring and established coaches to thrive.',
            )}
          </p>
          <ul className="space-y-6 font-sans text-brand-navy-600">
            <li className="flex gap-4">
              <span className="text-brand-gold-500 font-bold text-xl shrink-0">01</span>
              <div>
                <strong className="block text-brand-navy-800 mb-1">{cmsField(content, 'difference_point_1_title', 'Evidence with humanity')}</strong>
                <span className="text-sm text-brand-navy-600">{cmsPlainBody(content, 'difference_point_1_body', 'Coaching psychology, neuroscience and behavioural science, taught in plain language and tied to what happens in a real session.')}</span>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-brand-gold-500 font-bold text-xl shrink-0">02</span>
              <div>
                <strong className="block text-brand-navy-800 mb-1">{cmsField(content, 'difference_point_2_title', 'One-to-one mastery')}</strong>
                <span className="text-sm text-brand-navy-600">{cmsPlainBody(content, 'difference_point_2_body', 'You are coached and developed individually, so nothing is glossed over and no one hides at the back of a room.')}</span>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-brand-gold-500 font-bold text-xl shrink-0">03</span>
              <div>
                <strong className="block text-brand-navy-800 mb-1">{cmsField(content, 'difference_point_3_title', 'Practising faculty')}</strong>
                <span className="text-sm text-brand-navy-600">{cmsPlainBody(content, 'difference_point_3_body', 'Learn from working coaches who carry real client experience into every session.')}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Section>
  )
}
