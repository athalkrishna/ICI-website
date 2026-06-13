'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function AnnualReportSubscription() {
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
          times: 'N/A'
        })
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="mt-12 p-8 bg-brand-navy-50 rounded-2xl border border-brand-gold-500/20 relative z-10 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full text-green-600 mb-4">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h4 className="font-display text-xl font-bold text-brand-navy-800 mb-2">Thank you!</h4>
        <p className="text-body text-navy-400">You're now subscribed. We'll email you when our next annual report is published.</p>
      </div>
    );
  }

  return (
    <div className="mt-12 p-8 md:p-10 bg-brand-navy-50 rounded-2xl border border-navy-100 relative z-10">
      <h4 className="font-display text-2xl font-bold text-brand-navy-800 mb-2">Get notified when we publish</h4>
      <p className="text-body text-navy-400 mb-6">Leave your email to receive our annual reports directly in your inbox.</p>
      <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          className="flex-1 px-4 py-3 min-h-[48px] rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-brand-gold-400 font-sans text-sm"
          disabled={status === 'loading'}
        />
        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="btn-primary min-h-[48px] px-8 text-base shrink-0 justify-center flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          {status !== 'loading' && <ArrowRight size={18} />}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-red-500 text-sm mt-3 font-sans">There was an error. Please try again.</p>
      )}
    </div>
  );
}
