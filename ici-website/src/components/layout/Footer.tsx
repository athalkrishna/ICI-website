import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/layout/Container'

export default function Footer() {
  return (
    <footer className="bg-brand-navy-900 text-white pt-16 pb-2 border-t-4 border-brand-gold-500">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-16">
          
          <div className="md:col-span-2 lg:col-span-2">
             <Link href="/" className="inline-block -mt-4 md:-mt-8 -ml-4 md:-ml-6 mb-0 md:-mb-8">
               <Image src="/logo-white.png" alt="International Coaching Institute logo" width={300} height={90} className="w-[180px] md:w-[240px] h-auto object-contain" />
             </Link>
             <p className="text-navy-100/80 text-body">
               The International Coaching Institute trains and certifies coaches one-to-one, online, blending coaching craft with leadership, psychology, neuroscience and human behaviour. Become the coach people trust.
             </p>
          </div>

          <div>
             <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-6 text-white min-h-[2.5rem] flex items-start">Information For</h4>
             <ul className="space-y-2 text-base text-navy-100/80">
              <li><Link href="/future-students" className="hover:text-brand-gold-400 transition-colors">Future Students</Link></li>
              <li><Link href="/current-students" className="hover:text-brand-gold-400 transition-colors">Current Students</Link></li>
              <li><Link href="/organisations" className="hover:text-brand-gold-400 transition-colors">Organisations</Link></li>
              <li><Link href="/alumni" className="hover:text-brand-gold-400 transition-colors">Alumni</Link></li>
              <li><Link href="/faculty-staff" className="hover:text-brand-gold-400 transition-colors">Faculty & Staff</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-6 text-white min-h-[2.5rem] flex items-start">Programmes & Credentials</h4>
            <ul className="space-y-2 text-base text-navy-100/80">
              <li><Link href="/programmes" className="hover:text-brand-gold-400 transition-colors">Programmes</Link></li>
              <li><Link href="/credentials" className="hover:text-brand-gold-400 transition-colors">Credentials</Link></li>
              <li><Link href="/admissions" className="hover:text-brand-gold-400 transition-colors">Assessment</Link></li>
            </ul>
          </div>

          <div>
             <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-6 text-white min-h-[2.5rem] flex items-start">About</h4>
             <ul className="space-y-2 text-base text-navy-100/80">
              <li><Link href="/faculty" className="hover:text-brand-gold-400 transition-colors">Faculty</Link></li>
              <li><Link href="/about/global" className="hover:text-brand-gold-400 transition-colors">Global Network</Link></li>
              <li><Link href="/about/accreditation" className="hover:text-brand-gold-400 transition-colors">Accreditation</Link></li>
              <li><Link href="/contact" className="hover:text-brand-gold-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-6 text-white min-h-[2.5rem] flex items-start">Legal</h4>
            <ul className="space-y-2 text-base text-navy-100/80">
              <li><Link href="/terms" className="hover:text-brand-gold-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-brand-gold-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/complaints" className="hover:text-brand-gold-400 transition-colors">Complaints</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-brand-navy-700 pt-3 flex flex-col md:flex-row justify-between items-center text-sm text-white font-sans gap-4 text-center md:text-left">
          <p>Copyright © {new Date().getFullYear()} International Coaching Institute. All rights reserved.</p>
          <div className="flex gap-4 md:gap-6 flex-wrap justify-center items-center">
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
