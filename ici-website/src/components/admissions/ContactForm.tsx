'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Turnstile } from '@marsidev/react-turnstile';
import { isBotFieldValue, submitLeadRequest } from '@/lib/lead-utils';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(5, 'WhatsApp number is required'),
  country: z.string().min(2, 'Country and time zone are required'),
  discuss: z.string().min(10, 'Please tell us what you would like to discuss'),
  times: z.string().min(2, 'Please let us know your preferred times'),
  honeypot: z.string().optional(),
  gdprConsent: z.boolean().refine(val => val === true, 'You must agree to the privacy policy'),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      honeypot: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    if (isBotFieldValue(data.honeypot)) {
      setStatus('success');
      return;
    }

    if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken) {
      setErrorMessage('Please complete the CAPTCHA');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const { honeypot: _honeypot, gdprConsent: _gdprConsent, ...fields } = data;

    try {
      await submitLeadRequest({
        fullName: fields.name,
        email: fields.email,
        phone: fields.phone,
        country: fields.country,
        programmeInterest: 'NOT_SURE',
        source: 'CONTACT_FORM',
        message: `Discuss: ${fields.discuss}\n\nPreferred times: ${fields.times}`,
        turnstileToken: turnstileToken || undefined,
      });

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'There was an error submitting your request.');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12 relative z-10">
        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <h3 className="text-h3 text-brand-navy-900 mb-4">Request received</h3>
        <p className="text-muted mb-8 text-body">
          Thank you. An advisor will review your request and get back to you shortly to confirm a time for your conversation.
        </p>
        <button onClick={() => setStatus('idle')} className="btn-outline">
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-6 relative z-10" onSubmit={handleSubmit(onSubmit)}>
      {/* Honeypot field - invisible to real users */}
      <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden>
        <input
          type="text"
          {...register('honeypot')}
          tabIndex={-1}
          autoComplete="off"
          data-lpignore="true"
          data-1p-ignore
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col justify-end h-full relative">
          <label htmlFor="name" className="block font-sans text-sm font-bold text-navy-700 uppercase tracking-wider mb-2 relative z-10">
            Name <span className="text-brand-gold-500">*</span>
          </label>
          <input 
            type="text" 
            id="name" 
            {...register('name')}
            className="w-full bg-white border border-navy-200 shadow-sm rounded-xl px-4 py-4 text-brand-navy-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold-500 focus:border-brand-gold-500 transition-all font-body"
            placeholder="Your full name"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
        </div>
        
        <div className="flex flex-col justify-end h-full relative">
          <label htmlFor="email" className="block font-sans text-sm font-bold text-navy-700 uppercase tracking-wider mb-2 relative z-10">
            Email <span className="text-brand-gold-500">*</span>
          </label>
          <input 
            type="email" 
            id="email" 
            {...register('email')}
            className="w-full bg-white border border-navy-200 shadow-sm rounded-xl px-4 py-4 text-brand-navy-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold-500 focus:border-brand-gold-500 transition-all font-body"
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col justify-end h-full relative">
          <label htmlFor="phone" className="block font-sans text-sm font-bold text-navy-700 uppercase tracking-wider mb-2 relative z-10">
            WhatsApp Number <span className="text-brand-gold-500">*</span>
          </label>
          <input 
            type="tel" 
            id="phone" 
            {...register('phone')}
            className="w-full bg-white border border-navy-200 shadow-sm rounded-xl px-4 py-4 text-brand-navy-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold-500 focus:border-brand-gold-500 transition-all font-body"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div className="flex flex-col justify-end h-full relative">
          <label htmlFor="country" className="block font-sans text-sm font-bold text-navy-700 uppercase tracking-wider mb-2 relative z-10">
            Country and time zone <span className="text-brand-gold-500">*</span>
          </label>
          <input 
            type="text" 
            id="country" 
            {...register('country')}
            className="w-full bg-white border border-navy-200 shadow-sm rounded-xl px-4 py-4 text-brand-navy-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold-500 focus:border-brand-gold-500 transition-all font-body"
            placeholder="e.g. India (IST)"
          />
          {errors.country && <p className="text-red-600 text-sm">{errors.country.message}</p>}
        </div>
      </div>

      <div className="flex flex-col justify-end h-full relative">
        <label htmlFor="discuss" className="block font-sans text-sm font-bold text-navy-700 uppercase tracking-wider mb-2 relative z-10">
          What would you like to discuss? <span className="text-brand-gold-500">*</span>
        </label>
        <textarea 
          id="discuss" 
          rows={4}
          {...register('discuss')}
          className="w-full bg-white border border-navy-200 shadow-sm rounded-xl px-4 py-4 text-brand-navy-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold-500 focus:border-brand-gold-500 transition-all font-body resize-none"
          placeholder="Tell us a bit about your background and what you're looking for..."
        ></textarea>
        {errors.discuss && <p className="text-red-600 text-sm">{errors.discuss.message}</p>}
      </div>

      <div className="flex flex-col justify-end h-full relative">
        <label htmlFor="times" className="block font-sans text-sm font-bold text-navy-700 uppercase tracking-wider mb-2 relative z-10">
          Preferred times <span className="text-brand-gold-500">*</span>
        </label>
        <input 
          type="text" 
          id="times" 
          {...register('times')}
          className="w-full bg-white border border-navy-200 shadow-sm rounded-xl px-4 py-4 text-brand-navy-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold-500 focus:border-brand-gold-500 transition-all font-body"
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
              className="w-5 h-5 rounded border-navy-200 bg-white shadow-sm text-brand-gold-600 focus:ring-brand-gold-500 focus:ring-2 transition-all cursor-pointer mt-0.5"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="gdprConsent" className="font-body text-sm text-navy-700 cursor-pointer">
              I consent to the collection and processing of my personal data in accordance with the <Link href="/privacy" className="text-brand-gold-600 hover:underline">Privacy Policy</Link> for the purpose of handling this inquiry. <span className="text-brand-gold-500">*</span>
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
          />
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-50 text-red-600 p-4 border border-red-200 rounded-xl text-sm">
          {errorMessage || 'There was an error submitting your request. Please try again later.'}
        </div>
      )}

      <div className="pt-4 flex flex-col sm:flex-row gap-4">
        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className="btn-primary flex-1 justify-center py-4 text-base disabled:opacity-50 min-h-[44px]"
        >
          {status === 'submitting' ? 'Submitting...' : 'Request a call'}
        </button>
        <Link href="/admissions" className="btn-secondary-light flex-1 justify-center py-4 text-base text-center flex items-center">
          Take the free assessment
        </Link>
      </div>
    </form>
  );
}
