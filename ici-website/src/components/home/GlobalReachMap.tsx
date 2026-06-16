import Image from 'next/image'
import AnimatedSection from '@/components/shared/AnimatedSection'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'
import { cmsField, cmsPlainBody } from '@/lib/cms-helpers'
import type { ContentMap } from '@/lib/content'

interface GlobalReachMapProps {
  content?: ContentMap;
}

export default function GlobalReachMap({ content = {} }: GlobalReachMapProps) {
  return (
    <Section spacing="large" className="bg-brand-navy-900 relative overflow-hidden text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/global-network-bg.png"
          alt="Global Network Visualization"
          fill
          className="object-cover opacity-40 object-center mix-blend-screen"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-900 via-brand-navy-900/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-900 via-transparent to-brand-navy-900/50" />
      </div>
      
      <Container className="relative z-10">
        <AnimatedSection className="max-w-3xl">
          <div className="text-eyebrow flex items-center gap-3 justify-center mb-4">
            {cmsField(content, 'global_section_label', 'Global Network')}
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-[1.1]">
            {cmsField(content, 'global_section_heading', 'Connecting Coaches Worldwide')}
          </h2>
          <p className="text-brand-navy-200 mb-12 max-w-2xl text-body">
            {cmsPlainBody(
              content,
              'global_section_body',
              'With graduates in over 60 countries, the ICI community is a diverse, dynamic network of professionals advancing the field of coaching. Connect, learn, and grow with the best in the industry.',
            )}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 max-w-4xl">
            {[
              { label: 'Countries', value: '60+' },
              { label: 'Alumni', value: '25,000+' },
              { label: 'Campuses', value: '5' },
              { label: 'Partners', value: '200+' },
            ].map((stat) => (
              <div key={stat.label} className="bg-brand-navy-800/50 backdrop-blur-md border border-brand-navy-700/50 rounded-2xl p-6 shadow-xl transition-transform hover:-translate-y-1">
                <div className="text-3xl lg:text-4xl font-display font-bold text-brand-gold-400 mb-2">{stat.value}</div>
                <div className="text-brand-navy-200 text-eyebrow">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-sans font-bold uppercase tracking-widest text-brand-navy-300">
            <span className="hover:text-brand-gold-400 transition-colors cursor-pointer flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold-400 animate-pulse" /> New York
            </span>
            <span className="hover:text-brand-gold-400 transition-colors cursor-pointer flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold-400 animate-pulse" style={{ animationDelay: '200ms' }} /> London
            </span>
            <span className="hover:text-brand-gold-400 transition-colors cursor-pointer flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold-400 animate-pulse" style={{ animationDelay: '400ms' }} /> Dubai
            </span>
            <span className="hover:text-brand-gold-400 transition-colors cursor-pointer flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold-400 animate-pulse" style={{ animationDelay: '600ms' }} /> Singapore
            </span>
            <span className="hover:text-brand-gold-400 transition-colors cursor-pointer flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold-400 animate-pulse" style={{ animationDelay: '800ms' }} /> Sydney
            </span>
          </div>
        </AnimatedSection>
        
      </Container>
    </Section>
  )
}
