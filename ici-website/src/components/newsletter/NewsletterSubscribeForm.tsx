'use client';

import { useState } from 'react';

type NewsletterSubscribeFormProps = {
  className?: string;
  variant?: 'footer' | 'inline';
};

export default function NewsletterSubscribeForm({
  className = '',
  variant = 'footer',
}: NewsletterSubscribeFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Subscribed successfully!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div
        className={
          variant === 'footer'
            ? 'flex items-center gap-3 rounded-xl border border-brand-gold-500/30 bg-brand-gold-500/10 px-4 py-3.5'
            : ''
        }
      >
        {variant === 'footer' && (
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gold-500/20 text-brand-gold-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
        )}
        <p className={variant === 'footer' ? 'text-brand-gold-300 text-sm leading-snug' : 'text-brand-gold-700 text-body'}>
          {message}
        </p>
      </div>
    );
  }

  const inputClass =
    variant === 'footer'
      ? 'w-full min-w-0 bg-brand-navy-900/80 border border-brand-navy-600 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-navy-300/70 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/60 focus:border-brand-gold-500/50 transition-shadow'
      : 'flex-1 bg-white border border-navy-200 shadow-sm rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold-500 focus:border-brand-gold-500 transition-all font-body';

  const buttonClass =
    variant === 'footer'
      ? 'shrink-0 w-full sm:w-auto px-6 py-3.5 text-sm font-sans font-semibold bg-brand-gold-500 text-brand-navy-900 rounded-xl hover:bg-brand-gold-400 active:scale-[0.98] transition-all disabled:opacity-60 shadow-sm'
      : 'btn-primary';

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        className={
          variant === 'footer'
            ? 'flex flex-col sm:flex-row gap-3'
            : 'flex flex-col sm:flex-row gap-4'
        }
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email address"
          className={inputClass}
          aria-label="Email address for newsletter"
        />
        <button type="submit" disabled={status === 'loading'} className={buttonClass}>
          {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>
      {variant === 'footer' && status === 'idle' && (
        <p className="text-navy-300/60 text-xs mt-3 font-sans">
          Join our community. Unsubscribe anytime.
        </p>
      )}
      {status === 'error' && (
        <p className="text-red-400 text-xs mt-2">{message}</p>
      )}
    </div>
  );
}
