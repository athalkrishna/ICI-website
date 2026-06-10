import AnimatedSection from '@/components/shared/AnimatedSection'
import ContactForm from '@/components/contact/ContactForm'
import { Metadata } from 'next'
import { Phone, Mail, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: {
    absolute: 'Contact ICI | Speak to a Coaching Advisor',
  },
  description: 'Get in touch with the International Coaching Institute. Ask about programmes, credentials or organisational training, and speak to a human who can help.'
}

export default function ContactPage() {
  return (
    <div className="bg-navy-900 min-h-screen font-sans text-blue-50 selection:bg-gold-500/30 selection:text-gold-200">
      
      {/* ── Hero Section ── */}
      <section className="bg-navy-800 pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-hero-pattern opacity-10" aria-hidden />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 relative z-20">
          <AnimatedSection className="max-w-4xl text-center mx-auto">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-tight">
              Talk to a human
            </h1>
            <p className="font-body text-xl text-blue-100/80 leading-relaxed mb-12">
              Whatever brought you here, there is a person at ICI happy to help. Ask about programmes, credentials, timing, cost, or training a team. No script and no pressure, just a straight conversation.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Form Section ── */}
      <section className="py-24 relative z-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 lg:gap-16">
            
            {/* Form */}
            <AnimatedSection>
              <div className="bg-navy-800/50 backdrop-blur-sm border border-white/10 p-8 md:p-10 rounded-[32px] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500 rounded-full blur-[100px] opacity-10 translate-x-1/3 -translate-y-1/3" />
                
                <ContactForm />
              </div>
            </AnimatedSection>

            {/* Info Block */}
            <AnimatedSection delay={0.1}>
              <div className="sticky top-32 space-y-8">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white mb-6">Other ways to reach us</h3>
                  {/* Confirm phone, email, hours and time zone, and registered entity name for footer/legal */}
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-navy-800 border border-white/5 flex items-center justify-center shrink-0 text-gold-400">
                        <Phone size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-blue-100/50 uppercase tracking-wider mb-1">Phone</div>
                        <div className="font-body text-white">+91 98199 84575</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-navy-800 border border-white/5 flex items-center justify-center shrink-0 text-gold-400">
                        <Mail size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-blue-100/50 uppercase tracking-wider mb-1">Email</div>
                        <div className="font-body text-white">info@internationalcoachinginstitute.org</div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-navy-800 border border-white/5 flex items-center justify-center shrink-0 text-gold-400">
                        <Clock size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-blue-100/50 uppercase tracking-wider mb-1">Hours</div>
                        <div className="font-body text-white text-sm leading-relaxed">
                          Mon-Fri, 9:00 AM - 6:00 PM (IST)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

          </div>

        </div>
      </section>

    </div>
  )
}
