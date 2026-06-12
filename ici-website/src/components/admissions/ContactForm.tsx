'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Turnstile } from '@marsidev/react-turnstile';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  country: z.string().min(2, 'Country and time zone are required'),
  discuss: z.string().min(10, 'Please tell us what you would like to discuss'),
  times: z.string().min(2, 'Please let us know your preferred times'),
  honeypot: z.string().optional(),
  gdprConsent: z.boolean().refine(val => val === true, 'You must agree to the privacy policy'),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [turnstileToken, setTurnstileToken] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken) {
      alert('Please complete the CAPTCHA');
      return;
    }

    setStatus('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, turnstileToken }),
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
      <div className="text-center py-12 relative z-10">
        <div className="w-16 h-16 bg-brand-gold-500/10 text-brand-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <h3 className="text-h3 text-white mb-4">Request received</h3>
        <p className="text-muted-dark mb-8 text-body">
          Thank you. An advisor will review your request and get back to you shortly to confirm a time for your conversation.
        </p>
        <button onClick={() => setStatus('idle')} className="btn-outline text-white border-white hover:bg-white hover:text-brand-navy-900">
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-6 relative z-10" onSubmit={handleSubmit(onSubmit)}>
      {/* Honeypot field - invisible to real users */}
      <div className="absolute left-[-9999px] top-[-9999px]">
        <input type="text" {...register('honeypot')} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col justify-end h-full relative">
          <label htmlFor="name" className="block text-brand-gold-400 mb-2 relative z-10 text-eyebrow">
            Name <span className="text-brand-gold-500">*</span>
          </label>
          <input 
            type="text" 
            id="name" 
            {...register('name')}
            className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-brand-gold-400 focus:bg-brand-navy-800 transition-all font-body"
            placeholder="Your full name"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
        </div>
        
        <div className="flex flex-col justify-end h-full relative">
          <label htmlFor="email" className="block text-brand-gold-400 mb-2 relative z-10 text-eyebrow">
            Email <span className="text-brand-gold-500">*</span>
          </label>
          <input 
            type="email" 
            id="email" 
            {...register('email')}
            className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-brand-gold-400 focus:bg-brand-navy-800 transition-all font-body"
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col justify-end h-full relative">
          <label htmlFor="phone" className="block text-brand-gold-400 mb-2 relative z-10 text-eyebrow">
            Phone <span className="text-navy-100/40 text-xs font-normal lowercase tracking-normal">(Optional)</span>
          </label>
          <input 
            type="tel" 
            id="phone" 
            {...register('phone')}
            className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-brand-gold-400 focus:bg-brand-navy-800 transition-all font-body"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div className="flex flex-col justify-end h-full relative">
          <label htmlFor="country" className="block text-brand-gold-400 mb-2 relative z-10 text-eyebrow">
            Country and time zone <span className="text-brand-gold-500">*</span>
          </label>
          <input 
            type="text" 
            id="country" 
            {...register('country')}
            className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-brand-gold-400 focus:bg-brand-navy-800 transition-all font-body"
            placeholder="e.g. India (IST)"
          />
          {errors.country && <p className="text-red-600 text-sm">{errors.country.message}</p>}
        </div>
      </div>

      <div className="flex flex-col justify-end h-full relative">
        <label htmlFor="discuss" className="block text-brand-gold-400 mb-2 relative z-10 text-eyebrow">
          What would you like to discuss? <span className="text-brand-gold-500">*</span>
        </label>
        <textarea 
          id="discuss" 
          rows={4}
          {...register('discuss')}
          className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-brand-gold-400 focus:bg-brand-navy-800 transition-all font-body resize-none"
          placeholder="Tell us a bit about your background and what you're looking for..."
        ></textarea>
        {errors.discuss && <p className="text-red-600 text-sm">{errors.discuss.message}</p>}
      </div>

      <div className="flex flex-col justify-end h-full relative">
        <label htmlFor="times" className="block text-brand-gold-400 mb-2 relative z-10 text-eyebrow">
          Preferred times <span className="text-brand-gold-500">*</span>
        </label>
        <input 
          type="text" 
          id="times" 
          {...register('times')}
          className="w-full bg-brand-navy-800/50 border-0 border-b-2 border-subtle hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-brand-gold-400 focus:bg-brand-navy-800 transition-all font-body"
          placeholder="e.g. Wednesday afternoons, or tomorrow morning"
        />
        {errors.times && <p className="text-red-600 text-sm">{errors.times.message}</p>}
      </div>

      <div className="space-y-2">
        <div className="flex items-start space-x-3">
          <div className="flex items-center h-5">
            <input
              id="gdprConsent"
              type="checkbox"
              {...register('gdprConsent')}
              className="w-5 h-5 rounded border-white/20 bg-brand-navy-800 text-brand-gold-500 focus:ring-brand-gold-500/70 focus:ring-2 transition-all cursor-pointer mt-0.5"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="gdprConsent" className="font-body text-sm text-navy-100/90 cursor-pointer">
              I consent to the collection and processing of my personal data in accordance with the <Link href="/privacy" className="text-brand-gold-400 hover:underline">Privacy Policy</Link> for the purpose of handling this inquiry. <span className="text-brand-gold-500">*</span>
            </label>
            {errors.gdprConsent && <p className="text-red-600 text-sm mt-1">{errors.gdprConsent.message}</p>}
          </div>
        </div>
      </div>

      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
        <div className="pt-2">
          <Turnstile 
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} 
            onSuccess={(token) => setTurnstileToken(token)}
            options={{ theme: 'dark' }}
          />
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-600/10 text-red-600 p-4 rounded-xl text-sm">
          There was an error submitting your request. Please try again later.
        </div>
      )}

      <div className="pt-4">
        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className="btn-primary w-full justify-center py-4 text-base disabled:opacity-50 min-h-[44px]"
        >
          {status === 'submitting' ? 'Submitting...' : 'Request a call'}
        </button>
      </div>
    </form>
  );
}
