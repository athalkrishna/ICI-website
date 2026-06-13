import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import { Download, FileText, Image as ImageIcon, Mail } from 'lucide-react'
import Section from '@/components/layout/Section'
import Container from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Press & Media | International Coaching Institute',
}

export default function PressPage() {
  return (
    <div className="bg-cream-50 min-h-screen">
      {/* ── Hero Section ── */}
      <Section spacing="hero" className="bg-brand-navy-800 relative overflow-hidden border-b border-faint">
        
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />

        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/2" />
        </div>
        <Container className="relative z-20">
          <AnimatedSection className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-brand-gold-400"></div>
              <div className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-brand-gold-400">Press & Media</div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              Information for journalists and editors
            </h1>
            <p className="text-navy-100 text-body max-w-2xl">
              For journalists, editors and event producers: ICI faculty speak and write on coaching, leadership, the inner life of high achievers, and how people actually change. We are glad to provide commentary, contributed articles and interviews on these themes.
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* ── Main Content ── */}
      <Section spacing="standard" className="lg:py-32">
        <Container>
          
          <div className="grid lg:grid-cols-12 gap-16">
            <AnimatedSection className="lg:col-span-6 space-y-12">
              <div>
                <h3 className="text-h3 text-brand-navy-800 mb-6">Media Enquiries</h3>
                <p className="text-navy-700 mb-8 text-body">
                  All enquiries will be answered within 2 working days.
                </p>
                
                <a href="mailto:info@internationalcoachinginstitute.org" className="inline-flex items-center gap-4 p-6 bg-white hover:shadow-md transition-shadow group w-full rounded-2xl shadow-md border border-navy-100">
                  <div className="w-12 h-12 bg-brand-navy-50 rounded-full flex items-center justify-center text-brand-navy-600 group-hover:bg-brand-navy-800 group-hover:text-white transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="mb-1 text-eyebrow">Email us</div>
                    <div className="font-body text-lg text-brand-navy-800 font-medium break-all">info@internationalcoachinginstitute.org</div>
                  </div>
                </a>
              </div>

              <div className="bg-cream-100 p-10 rounded-3xl border border-brand-gold-200/50">
                <h3 className="text-h3 text-brand-navy-800 mb-4">Topics our faculty can speak to</h3>
                <p className="text-navy-700 text-body">
                  Coaching, leadership, the psychology of high achievers, and how people actually change.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="lg:col-span-6">
              <div className="bg-white p-10 md:p-14 h-full rounded-[32px] shadow-2xl border border-navy-100">
                <h3 className="text-h3 text-brand-navy-800 mb-2">Press Kit</h3>
                <p className="text-muted mb-10 text-body">Download official ICI brand assets and background information.</p>
                
                <div className="space-y-4">
                  {[
                    { title: "Logo & Brand Guidelines", type: "ZIP", icon: <ImageIcon size={24} /> },
                    { title: "Institute Fact Sheet", type: "PDF", icon: <FileText size={24} /> },
                    { title: "Approved Descriptions", type: "PDF", icon: <FileText size={24} /> }
                  ].map((asset, i) => (
                    <div key={i} className="flex items-center justify-between p-6 rounded-2xl border border-navy-100 hover:border-brand-gold-300 hover:bg-brand-gold-50/30 transition-all group cursor-pointer">
                      <div className="flex items-center gap-5">
                        <div className="text-navy-400 group-hover:text-brand-gold-600 transition-colors">
                          {asset.icon}
                        </div>
                        <div>
                          <div className="font-body font-bold text-brand-navy-800 text-lg mb-1 group-hover:text-brand-gold-700 transition-colors">{asset.title}</div>
                          <div className="font-sans text-xs uppercase tracking-wider text-navy-400">{asset.type}</div>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-cream-100 flex items-center justify-center text-brand-navy-600 group-hover:bg-brand-gold-500 group-hover:text-white transition-colors shadow-sm">
                        <Download size={18} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.3} className="mt-24 text-center">
             <a href="mailto:info@internationalcoachinginstitute.org" className="btn-primary">
                For an interview or expert comment, contact info@internationalcoachinginstitute.org
             </a>
          </AnimatedSection>

        </Container>
      </Section>
    </div>
  )
}
