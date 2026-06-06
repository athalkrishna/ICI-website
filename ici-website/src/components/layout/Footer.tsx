import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white pt-16 pb-8 border-t-4 border-gold-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
             <div className="font-display font-bold text-2xl tracking-tight mb-2">ICI</div>
             <div className="font-sans text-xs tracking-[0.18em] uppercase text-gold-400 mb-6">
                International Coaching Institute
             </div>
             <p className="font-body text-sm text-gray-400 mb-6">
               The world's leading provider of professional coaching education, certification, and continuing development.
             </p>
          </div>
          <div>
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-4 text-white">Programs</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/programs/life-coach" className="hover:text-gold-400">Certified Life Coach</Link></li>
              <li><Link href="/programs/executive" className="hover:text-gold-400">Executive & Leadership</Link></li>
              <li><Link href="/programs/business-coach" className="hover:text-gold-400">Business Coaching</Link></li>
              <li><Link href="/credentials/iac" className="hover:text-gold-400">Credentials Pathway</Link></li>
            </ul>
          </div>
          <div>
             <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-4 text-white">Institute</h4>
             <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-gold-400">About ICI</Link></li>
              <li><Link href="/faculty" className="hover:text-gold-400">Faculty & Research</Link></li>
              <li><Link href="/admissions" className="hover:text-gold-400">Admissions</Link></li>
              <li><Link href="/contact" className="hover:text-gold-400">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-4 text-white">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>1 (800) ICI-COACH</li>
              <li>info@internationalcoachinginstitute.org</li>
              <li className="pt-4">
                <Link href="/apply" className="btn-primary inline-flex text-xs px-4 py-2">Apply Now</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-navy-700 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-sans">
          <p>© {new Date().getFullYear()} International Coaching Institute. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-gold-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold-400">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
