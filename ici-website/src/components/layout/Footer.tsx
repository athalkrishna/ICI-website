import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/layout/Container'
import LazyNewsletterSubscribeForm from '@/components/newsletter/LazyNewsletterSubscribeForm'
import { cmsField } from '@/lib/cms-helpers'
import type { ContentMap } from '@/lib/content'

export default function Footer({ globalContent = {} }: { globalContent?: ContentMap }) {
  return (
    <footer className="bg-brand-navy-900 text-white pt-16 pb-2 border-t-4 border-brand-gold-500 w-full max-w-full overflow-x-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-10">
          
          <div className="md:col-span-2 lg:col-span-2">
             <Link href="/" className="inline-block -mt-4 md:-mt-8 -ml-4 md:-ml-6 mb-0 md:-mb-8">
               <Image src="/logo-white.webp" alt="International Coaching Institute logo" width={480} height={320} loading="lazy" sizes="(max-width: 768px) 180px, 240px" className="w-[180px] md:w-[240px] h-auto object-contain" />
             </Link>
             <p className="text-navy-100/80 text-sm leading-relaxed">
               {cmsField(globalContent, 'footer_tagline', 'The International Coaching Institute trains and certifies coaches one-to-one, online, blending coaching craft with leadership, psychology, neuroscience and human behaviour. Become the coach people trust.')}
             </p>
          </div>

          <div>
             <p className="font-sans font-semibold text-xs uppercase tracking-wider mb-4 text-white min-h-[2rem] flex items-start">{cmsField(globalContent, 'footer_col_1_heading', 'Information For')}</p>
             <ul className="space-y-1 text-sm text-navy-100/80">
              <li><Link href="/future-students" className="hover:text-brand-gold-400 transition-colors inline-flex items-center min-h-[44px] py-2">Future Students</Link></li>
              <li><Link href="/current-students" className="hover:text-brand-gold-400 transition-colors inline-flex items-center min-h-[44px] py-2">Current Students</Link></li>
              <li><Link href="/organisations" className="hover:text-brand-gold-400 transition-colors inline-flex items-center min-h-[44px] py-2">Organisations</Link></li>
              <li><Link href="/alumni" className="hover:text-brand-gold-400 transition-colors inline-flex items-center min-h-[44px] py-2">Alumni</Link></li>
              <li><Link href="/faculty-staff" className="hover:text-brand-gold-400 transition-colors inline-flex items-center min-h-[44px] py-2">Faculty & Staff</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-sans font-semibold text-xs uppercase tracking-wider mb-4 text-white min-h-[2rem] flex items-start">{cmsField(globalContent, 'footer_col_2_heading', 'Programmes & Credentials')}</p>
            <ul className="space-y-1 text-sm text-navy-100/80">
              <li><Link href="/programmes" className="hover:text-brand-gold-400 transition-colors inline-flex items-center min-h-[44px] py-2">Programmes</Link></li>
              <li><Link href="/credentials" className="hover:text-brand-gold-400 transition-colors inline-flex items-center min-h-[44px] py-2">Credentials</Link></li>
              <li><Link href="/admissions" className="hover:text-brand-gold-400 transition-colors inline-flex items-center min-h-[44px] py-2">Assessment</Link></li>
            </ul>
          </div>

          <div>
             <p className="font-sans font-semibold text-xs uppercase tracking-wider mb-4 text-white min-h-[2rem] flex items-start">{cmsField(globalContent, 'footer_col_3_heading', 'About')}</p>
             <ul className="space-y-1 text-sm text-navy-100/80">
              <li><Link href="/faculty" className="hover:text-brand-gold-400 transition-colors inline-flex items-center min-h-[44px] py-2">Faculty</Link></li>
              <li><Link href="/about/global" className="hover:text-brand-gold-400 transition-colors inline-flex items-center min-h-[44px] py-2">Global Network</Link></li>
              <li><Link href="/about/accreditation" className="hover:text-brand-gold-400 transition-colors inline-flex items-center min-h-[44px] py-2">Accreditation</Link></li>
              <li><Link href="/contact" className="hover:text-brand-gold-400 transition-colors inline-flex items-center min-h-[44px] py-2">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-sans font-semibold text-xs uppercase tracking-wider mb-4 text-white min-h-[2rem] flex items-start">{cmsField(globalContent, 'footer_col_4_heading', 'Legal')}</p>
            <ul className="space-y-1 text-sm text-navy-100/80">
              <li><Link href="/terms" className="hover:text-brand-gold-400 transition-colors inline-flex items-center min-h-[44px] py-2">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-brand-gold-400 transition-colors inline-flex items-center min-h-[44px] py-2">Privacy Policy</Link></li>
              <li><Link href="/complaints" className="hover:text-brand-gold-400 transition-colors inline-flex items-center min-h-[44px] py-2">Complaints</Link></li>
            </ul>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-brand-navy-700/80 bg-brand-navy-800/60 mb-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            aria-hidden
            style={{
              backgroundImage:
                'radial-gradient(circle at 100% 0%, #c9a227 0%, transparent 45%), radial-gradient(circle at 0% 100%, #c9a227 0%, transparent 40%)',
            }}
          />
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10 p-6 md:p-8 lg:p-10">
            <div className="lg:max-w-md shrink-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold-500/30 bg-brand-gold-500/10 px-3 py-1 text-[11px] font-sans font-semibold uppercase tracking-[0.14em] text-brand-gold-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                {cmsField(globalContent, 'footer_newsletter_heading', 'Newsletter')}
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-white mb-2 leading-snug">
                {cmsField(globalContent, 'footer_newsletter_title', 'Insights from the institute')}
              </h3>
              <p className="text-navy-100/75 text-sm md:text-base leading-relaxed">
                {cmsField(globalContent, 'footer_newsletter_text', 'Stay updated with institute news, events, and coaching insights delivered to your inbox.')}
              </p>
            </div>
            <div className="w-full lg:max-w-xl lg:shrink-0">
              <LazyNewsletterSubscribeForm variant="footer" />
            </div>
          </div>
        </div>
        
        <div className="border-t border-brand-navy-700 pt-3 flex flex-col md:flex-row justify-between items-center text-xs text-white font-sans gap-4 text-center md:text-left">
          <p>{cmsField(globalContent, 'footer_copyright', `Copyright © ${new Date().getFullYear()} International Coaching Institute. All rights reserved.`)}</p>
          <div className="flex gap-4 md:gap-6 flex-wrap justify-center items-center">
            <a
              href="https://liminiq.com"
              target="_blank"
              rel="noopener noreferrer"
              className="sr-only"
            >
              Website by Liminiq
            </a>
            <a href="https://www.linkedin.com/company/internationalcoachinginstitute" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold-400 transition-colors flex items-center" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <Link href="/privacy" className="hover:text-brand-gold-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-gold-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
