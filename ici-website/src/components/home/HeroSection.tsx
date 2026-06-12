'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Download, ChevronDown } from 'lucide-react'
import CountUpNumber from '@/components/shared/CountUpNumber'

interface HeroSectionProps {
  content?: Record<string, string>;
}

export default function HeroSection({ content = {} }: HeroSectionProps) {
  const stats = [
    { isText: false, value: 4, suffix: '', label: content.stat_1_label || 'Credential Levels' },
    { isText: false, value: 306, suffix: '', label: content.stat_2_label || 'Hours Across the Full Pathway' },
    { isText: true, text: '1:1', label: content.stat_3_label || 'Every Session, One-to-One' },
  ]

  return (
    <section className="relative min-h-screen flex items-center bg-brand-navy-700 overflow-hidden">

      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1920&q=85"
        alt=""
        fill
        priority
        className="object-cover opacity-25"
        sizes="100vw"
      />

      {/* Diagonal grid texture overlay */}
      <div className="absolute inset-0 bg-hero-pattern" aria-hidden />

      {/* Animated gold gradient line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-gold-500 to-transparent"
        animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-28 w-full">
        <div className="grid lg:grid-cols-5 gap-16 items-center">

          {/* ── Left content (3/5) ── */}
          <div className="lg:col-span-3">

            {/* Section label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-eyebrow flex items-center gap-3 justify-center mb-6"
            >
              {content.hero_eyebrow || 'Globally Accredited Coaching Education'}
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 whitespace-pre-line"
            >
              {content.hero_heading || 'Where Great Coaches Are Made.'}
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-body-lg text-navy-100 mb-8 max-w-xl"
            >
              {content.hero_body || 'The International Coaching Institute is the world\'s leading provider of professional coaching education, certification, and continuing development, trusted by coaches in over 60 countries.'}
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap md:flex-nowrap items-center gap-y-6 mb-10"
            >
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center w-1/2 md:w-auto">
                  <div className="pr-6 md:px-6 md:first:pl-0">
                    <div className="font-mono text-3xl font-bold text-brand-gold-400">
                      {stat.isText ? (
                        stat.text
                      ) : (
                        <CountUpNumber end={stat.value as number} suffix={stat.suffix as string} />
                      )}
                    </div>
                    <div className="font-sans text-xs text-navy-200 tracking-wide mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                  {i < stats.length - 1 && (
                    <div className="hidden md:block h-10 w-px bg-brand-gold-600/40" aria-hidden />
                  )}
                </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-4"
            >
              <Link href={content.hero_btn_primary_url || '/credentials'} className="btn-primary text-base px-8 py-4">
                {content.hero_btn_primary || 'Explore Programmes'}
                <ArrowRight size={18} />
              </Link>
              <Link href={content.hero_btn_secondary_url || '/resources/brochure'} className="btn-secondary text-base px-8 py-4">
                <Download size={18} />
                {content.hero_btn_secondary || 'Download Brochure'}
              </Link>
            </motion.div>

          </div>

          {/* ── Right: Application Card (2/5) ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-7 border-l-4 border-brand-gold-500">
              <h2 className="font-display text-xl font-bold text-brand-navy-700 mb-1">
                {content.lead_form_heading || 'Start Your Coaching Journey'}
              </h2>
              <p className="text-muted mb-5 text-body">
                {content.lead_form_subtext || 'Free application · No commitment'}
              </p>

              <form className="space-y-3" onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                
                try {
                  const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
                  const originalText = submitBtn.innerHTML;
                  submitBtn.innerHTML = 'Sending...';
                  submitBtn.disabled = true;

                  const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                  });
                  
                  if (res.ok) {
                    if (typeof window !== 'undefined') {
                      if ((window as any).gtag) (window as any).gtag('event', 'form_submit', { form_name: 'lead_form' })
                      if ((window as any).fbq) (window as any).fbq('track', 'Lead', { content_name: 'lead_form' })
                    }
                    form.innerHTML = '<div class="text-green-600 font-sans font-bold text-center py-4 bg-green-50 rounded-lg">Thank you. We will be in touch shortly.</div>';
                  } else {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    alert('There was an error sending your message. Please try again.');
                  }
                } catch (err) {
                  alert('There was an error sending your message. Please try again.');
                }
              }}>
                <input
                  type="text"
                  name="website"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Full Name"
                  className="w-full px-4 py-3 min-h-[44px] rounded-lg border border-navy-200 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-gold-400"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  className="w-full px-4 py-3 min-h-[44px] rounded-lg border border-navy-200 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-gold-400"
                />
                <select name="programme" required className="w-full px-4 py-3 min-h-[44px] rounded-lg border border-navy-200 text-sm font-sans text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold-400">
                  <option value="">Programme Interest</option>
                  <option value="catalyst">Catalyst (Level 1)</option>
                  <option value="architect">Architect (Level 2)</option>
                  <option value="sage">Sage (Level 3)</option>
                  <option value="luminary">Luminary (Level 4)</option>
                </select>
                <button type="submit" className="w-full btn-primary justify-center py-3.5 text-base">
                  {content.lead_form_btn || 'Get Started'}
                  <ArrowRight size={18} />
                </button>
              </form>

              {/* Trust badges */}
              <div className="mt-5 pt-5 border-t border-navy-100 flex items-center justify-between gap-2 flex-wrap">
                {['One-to-one, never group classes', 'Online, delivered worldwide', 'Assessed on real coaching'].map((badge) => (
                  <div key={badge} className="flex items-center gap-1.5 text-xs font-sans text-green-600 font-medium whitespace-nowrap">
                    <span className="text-green-600">✓</span>
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-1"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        aria-hidden
      >
        <span className="text-xs font-sans tracking-widest uppercase">Scroll</span>
        <ChevronDown size={18} />
      </motion.div>

    </section>
  )
}
