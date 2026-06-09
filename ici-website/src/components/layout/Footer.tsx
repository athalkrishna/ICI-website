import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white pt-16 pb-8 border-t-4 border-gold-500">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-16 mb-16">
          
          <div className="md:col-span-1">
             <div className="font-display font-bold text-3xl tracking-tight mb-2">ICI</div>
             <p className="font-body text-sm text-gray-400 leading-relaxed">
               The International Coaching Institute trains and certifies coaches one-to-one, online, blending coaching craft with leadership, psychology, neuroscience and human behaviour. Become the coach people trust.
             </p>
          </div>

          <div>
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-6 text-white">Programmes</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/credentials" className="hover:text-gold-400 transition-colors">The Mastery Pathway</Link></li>
              <li><Link href="/programmes" className="hover:text-gold-400 transition-colors">Specialisations</Link></li>
              <li><Link href="/pricing" className="hover:text-gold-400 transition-colors">Pricing</Link></li>
              <li><Link href="/find-a-coach" className="hover:text-gold-400 transition-colors">Find a Coach</Link></li>
            </ul>
          </div>

          <div>
             <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-6 text-white">Institute</h4>
             <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/about/mission" className="hover:text-gold-400 transition-colors">About ICI</Link></li>
              <li><Link href="/faculty" className="hover:text-gold-400 transition-colors">Faculty & Research</Link></li>
              <li><Link href="/admissions" className="hover:text-gold-400 transition-colors">Admissions</Link></li>
              <li><Link href="/community" className="hover:text-gold-400 transition-colors">Community</Link></li>
              <li><Link href="/contact" className="hover:text-gold-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-6 text-white">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>(+91) 98199 84575</li>
              <li>info@internationalcoachinginstitute.org</li>
              <li>Registered office: Mumbai – 400051</li>
              <li className="pt-2">
                <Link href="/apply" className="btn-primary inline-flex text-sm px-6 py-2.5">Apply Now</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-navy-700 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-sans gap-4">
          <p>Copyright [2026] International Coaching Institute. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
