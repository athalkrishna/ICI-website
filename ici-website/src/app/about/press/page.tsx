import AnimatedSection from '@/components/shared/AnimatedSection'
import { Metadata } from 'next'
import { Download, FileText, Image as ImageIcon, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Press & Media | International Coaching Institute',
}

export default function PressPage() {
  return (
    <div className="bg-cream-50 min-h-screen">
      {/* ── Hero Section ── */}
      <section className="bg-brand-navy-700 text-white pt-32 pb-24 lg:pt-40 lg:pb-32 relative overflow-hidden">
        {/* Diagonal grid texture overlay */}
        <div className="absolute inset-0 bg-hero-pattern opacity-30" aria-hidden />
        {/* Gold gradient line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-80" aria-hidden />

        <div className="absolute inset-0 z-0 opacity-10 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/2" />
        </div>
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-20">
          <AnimatedSection className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-brand-gold-400"></div>
              <div className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-brand-gold-400">Press & Media</div>
            </div>
            <h1 className="text-h1 text-white mb-8">
              Information for journalists and editors
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          
          <AnimatedSection className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="text-h2 text-brand-navy-800 mb-8">Press & Media</h2>
            <p className="font-body text-xl md:text-2xl text-gray-700 leading-relaxed font-light">
              For journalists, editors and event producers: ICI faculty speak and write on coaching, leadership, the inner life of high achievers, and how people actually change. We are glad to provide commentary, contributed articles and interviews on these themes.
            </p>
          </AnimatedSection>
          
          <div className="grid lg:grid-cols-12 gap-16">
            <AnimatedSection className="lg:col-span-6 space-y-12">
              <div>
                <h3 className="font-display text-3xl font-bold text-brand-navy-800 mb-6">Media Enquiries</h3>
                <p className="font-body text-xl text-gray-700 leading-relaxed font-light mb-8">
                  All enquiries will be answered within 2 working days.
                </p>
                
                <a href="mailto:info@internationalcoachinginstitute.org" className="inline-flex items-center gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group w-full">
                  <div className="w-12 h-12 bg-brand-navy-50 rounded-full flex items-center justify-center text-brand-navy-600 group-hover:bg-brand-navy-800 group-hover:text-white transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="font-sans text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Email us</div>
                    <div className="font-body text-lg text-brand-navy-800 font-medium break-all">info@internationalcoachinginstitute.org</div>
                  </div>
                </a>
              </div>

              <div className="bg-cream-100 p-10 rounded-3xl border border-brand-gold-200/50">
                <h3 className="font-display text-2xl font-bold text-brand-navy-800 mb-4">Topics our faculty can speak to</h3>
                <p className="font-body text-lg text-gray-700 leading-relaxed">
                  Coaching, leadership, the psychology of high achievers, and how people actually change.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="lg:col-span-6">
              <div className="bg-white p-10 md:p-14 rounded-[40px] border border-gray-100 shadow-xl shadow-brand-navy-900/5 h-full">
                <h3 className="font-display text-3xl font-bold text-brand-navy-800 mb-2">Press Kit</h3>
                <p className="font-body text-lg text-muted mb-10">Download official ICI brand assets and background information.</p>
                
                <div className="space-y-4">
                  {[
                    { title: "Logo & Brand Guidelines", type: "ZIP", icon: <ImageIcon size={24} /> },
                    { title: "Institute Fact Sheet", type: "PDF", icon: <FileText size={24} /> },
                    { title: "Approved Descriptions", type: "PDF", icon: <FileText size={24} /> }
                  ].map((asset, i) => (
                    <div key={i} className="flex items-center justify-between p-6 rounded-2xl border border-gray-100 hover:border-brand-gold-300 hover:bg-brand-gold-50/30 transition-all group cursor-pointer">
                      <div className="flex items-center gap-5">
                        <div className="text-gray-400 group-hover:text-brand-gold-600 transition-colors">
                          {asset.icon}
                        </div>
                        <div>
                          <div className="font-body font-bold text-brand-navy-800 text-lg mb-1 group-hover:text-brand-gold-700 transition-colors">{asset.title}</div>
                          <div className="font-sans text-xs uppercase tracking-wider text-gray-400">{asset.type}</div>
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

        </div>
      </section>
    </div>
  )
}
