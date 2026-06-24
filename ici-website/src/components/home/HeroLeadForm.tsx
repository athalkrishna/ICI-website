'use client';

import { ArrowRight } from 'lucide-react';
import { HOME_HERO_DEFAULTS } from '@/lib/home-hero-defaults';

const trustBadges = [
  HOME_HERO_DEFAULTS.trust_point_1,
  HOME_HERO_DEFAULTS.trust_point_2,
  HOME_HERO_DEFAULTS.trust_point_3,
];

export default function HeroLeadForm() {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-7 border-l-4 border-brand-gold-500">
      <h2 className="font-display text-xl font-bold text-brand-navy-700 mb-1">
        {HOME_HERO_DEFAULTS.hero_form_heading}
      </h2>
      <p className="text-brand-navy-600 mb-5 text-body">
        {HOME_HERO_DEFAULTS.hero_form_subheading}
      </p>

      <form
        className="space-y-3"
        onSubmit={async (e) => {
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
              body: JSON.stringify(data),
            });

            if (res.ok) {
              if (typeof window !== 'undefined') {
                if ((window as Window & { gtag?: (...args: unknown[]) => void }).gtag) {
                  (window as Window & { gtag: (...args: unknown[]) => void }).gtag('event', 'form_submit', {
                    form_name: 'lead_form',
                  });
                }
                if ((window as Window & { fbq?: (...args: unknown[]) => void }).fbq) {
                  (window as Window & { fbq: (...args: unknown[]) => void }).fbq('track', 'Lead', {
                    content_name: 'lead_form',
                  });
                }
              }
              form.innerHTML =
                '<div class="text-green-800 font-sans font-bold text-center py-4 bg-green-50 rounded-lg">Thank you. We will be in touch shortly.</div>';
            } else {
              submitBtn.innerHTML = originalText;
              submitBtn.disabled = false;
              alert('There was an error sending your message. Please try again.');
            }
          } catch {
            alert('There was an error sending your message. Please try again.');
          }
        }}
      >
        <label htmlFor="hero-lead-name" className="sr-only">
          Full name
        </label>
        <input
          id="hero-lead-name"
          type="text"
          name="name"
          required
          autoComplete="name"
          placeholder="Full Name"
          className="w-full px-4 py-3 min-h-[44px] rounded-lg border border-navy-200 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-gold-400"
        />
        <label htmlFor="hero-lead-email" className="sr-only">
          Email address
        </label>
        <input
          id="hero-lead-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="Email Address"
          className="w-full px-4 py-3 min-h-[44px] rounded-lg border border-navy-200 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-gold-400"
        />
        <label htmlFor="hero-lead-programme" className="sr-only">
          Programme interest
        </label>
        <select
          id="hero-lead-programme"
          name="programme"
          required
          className="w-full px-4 py-3 min-h-[44px] rounded-lg border border-navy-200 text-sm font-sans text-brand-navy-600 focus:outline-none focus:ring-2 focus:ring-brand-gold-400"
        >
          <option value="">Programme Interest</option>
          <option value="life-coaching">Life Coaching</option>
          <option value="executive-leadership">Executive & Leadership</option>
          <option value="business-coaching">Business Coaching</option>
          <option value="health-wellness">Health & Wellness</option>
          <option value="team-organisational">Team & Organisational</option>
        </select>
        <button type="submit" className="w-full btn-primary justify-center py-3.5 text-base min-h-[44px]">
          {HOME_HERO_DEFAULTS.hero_form_button_text}
          <ArrowRight size={18} aria-hidden />
        </button>
      </form>

      <div className="mt-5 pt-5 border-t border-navy-100 flex items-center justify-between gap-2 flex-wrap">
        {trustBadges.map((badge) => (
          <div
            key={badge}
            className="flex items-center gap-1.5 text-xs font-sans text-green-800 font-semibold whitespace-nowrap"
          >
            <span className="text-green-800" aria-hidden>
              ✓
            </span>
            {badge}
          </div>
        ))}
      </div>
    </div>
  );
}
