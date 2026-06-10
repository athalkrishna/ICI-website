import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white pt-16 pb-8 border-t-4 border-gold-500">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-16 mb-16">
          
          <div className="md:col-span-1">
             <Link href="/" className="inline-block -mt-4 md:-mt-8 -ml-4 md:-ml-6 mb-2 md:-mb-6">
               <Image src="/logo.png" alt="International Coaching Institute logo" width={300} height={90} className="w-[200px] md:w-[260px] h-auto object-contain" />
             </Link>
             <p className="font-body text-sm text-gray-400 leading-relaxed">
               The International Coaching Institute trains and certifies coaches one-to-one, online, blending coaching craft with leadership, psychology, neuroscience and human behaviour. Become the coach people trust.
             </p>
          </div>

          <div>
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-6 text-white">Programmes & Credentials</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/programmes" className="hover:text-gold-400 transition-colors">Programmes</Link></li>
              <li><Link href="/credentials" className="hover:text-gold-400 transition-colors">Credentials</Link></li>
              <li><Link href="/admissions" className="hover:text-gold-400 transition-colors">Assessment</Link></li>
            </ul>
          </div>

          <div>
             <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-6 text-white">About</h4>
             <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/faculty" className="hover:text-gold-400 transition-colors">Faculty</Link></li>
              <li><Link href="/about/global" className="hover:text-gold-400 transition-colors">Global Network</Link></li>
              <li><Link href="/about/accreditation" className="hover:text-gold-400 transition-colors">Accreditation</Link></li>
              <li><Link href="/contact" className="hover:text-gold-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-6 text-white">Legal</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/terms" className="hover:text-gold-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/complaints" className="hover:text-gold-400 transition-colors">Complaints</Link></li>
              <li><Link href="/pricing" className="hover:text-gold-400 transition-colors">Refunds</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-navy-700 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-sans gap-4 text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} International Coaching Institute. All rights reserved.</p>
          <div className="flex gap-4 md:gap-6 flex-wrap justify-center">
            <Link href="/privacy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
