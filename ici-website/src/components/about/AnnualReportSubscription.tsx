'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { ANNUAL_REPORTS_DEFAULTS } from '@/lib/annual-reports-defaults'

type AnnualReportSubscriptionProps = {
  heading?: string
  body?: string
  placeholder?: string
  buttonText?: string
  loadingText?: string
  successTitle?: string
  successBody?: string
  errorMessage?: string
}

export default function AnnualReportSubscription({
  heading = ANNUAL_REPORTS_DEFAULTS.subscribe_heading,
  body = ANNUAL_REPORTS_DEFAULTS.subscribe_body,
  placeholder = ANNUAL_REPORTS_DEFAULTS.subscribe_placeholder,
  buttonText = ANNUAL_REPORTS_DEFAULTS.subscribe_button_text,
  loadingText = ANNUAL_REPORTS_DEFAULTS.subscribe_loading_text,
  successTitle = ANNUAL_REPORTS_DEFAULTS.subscribe_success_title,
  successBody = ANNUAL_REPORTS_DEFAULTS.subscribe_success_body,
  errorMessage = ANNUAL_REPORTS_DEFAULTS.subscribe_error_message,
}: AnnualReportSubscriptionProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Subscriber',
          email: data.email,
          discuss: 'Annual Report Subscription',
          times: 'N/A',
        }),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="mt-12 p-8 bg-brand-navy-50 rounded-2xl border border-brand-gold-500/20 relative z-10 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full text-green-600 mb-4">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h4 className="font-display text-xl font-bold text-brand-navy-800 mb-2">{successTitle}</h4>
        <p className="text-body text-navy-400">{successBody}</p>
      </div>
    );
  }

  return (
    <div className="mt-12 p-8 md:p-10 bg-brand-navy-50 rounded-2xl border border-navy-100 relative z-10">
      <h4 className="font-display text-2xl font-bold text-brand-navy-800 mb-2">{heading}</h4>
      <p className="text-body text-navy-400 mb-6">{body}</p>
      <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder={placeholder}
          required
          className="flex-1 px-4 py-3 min-h-[48px] rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-brand-gold-400 font-sans text-sm"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary min-h-[48px] px-8 text-base shrink-0 justify-center flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? loadingText : buttonText}
          {status !== 'loading' && <ArrowRight size={18} />}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-red-500 text-sm mt-3 font-sans">{errorMessage}</p>
      )}
    </div>
  );
}
