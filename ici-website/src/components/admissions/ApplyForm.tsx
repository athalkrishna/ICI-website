'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Turnstile } from '@marsidev/react-turnstile';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(5, 'WhatsApp number is required'),
  country: z.string().min(2, 'Country is required'),
  level: z.string().min(2, 'Level of interest is required'),
  specialism: z.string().optional(),
  experience: z.string().min(10, 'Please describe your experience'),
  goals: z.string().min(10, 'Please describe your goals'),
  source: z.string().optional(),
  honeypot: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ApplyForm() {
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
      const res = await fetch('/api/apply', {
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
        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <h3 className="font-display text-2xl font-bold text-brand-navy-900 mb-4">Application received</h3>
        <p className="text-muted mb-8 text-body">
          Thank you for applying to the International Coaching Institute. We will review your application and an advisor will be in touch within 2 working days.
        </p>
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
        <div className="space-y-2">
          <label htmlFor="name" className="block font-sans text-sm font-bold text-brand-navy-900 uppercase tracking-wider">
            Full name <span className="text-brand-gold-500">*</span>
          </label>
          <input 
            type="text" 
            id="name" 
            {...register('name')}
            className="w-full bg-cream-50 border border-navy-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/70 focus:border-brand-gold-500/50 transition-all font-body min-h-[44px]"
            placeholder="Your full name"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="block font-sans text-sm font-bold text-brand-navy-900 uppercase tracking-wider">
            Email <span className="text-brand-gold-500">*</span>
          </label>
          <input 
            type="email" 
            id="email" 
            {...register('email')}
            className="w-full bg-cream-50 border border-navy-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/70 focus:border-brand-gold-500/50 transition-all font-body min-h-[44px]"
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="phone" className="block font-sans text-sm font-bold text-brand-navy-900 uppercase tracking-wider">
            WhatsApp Number <span className="text-brand-gold-500">*</span>
          </label>
          <input 
            type="tel" 
            id="phone" 
            {...register('phone')}
            className="w-full bg-cream-50 border border-navy-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/70 focus:border-brand-gold-500/50 transition-all font-body min-h-[44px]"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="country" className="block font-sans text-sm font-bold text-brand-navy-900 uppercase tracking-wider">
            Country <span className="text-brand-gold-500">*</span>
          </label>
          <select 
            id="country" 
            defaultValue=""
            {...register('country')}
            className="w-full bg-cream-50 border border-navy-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/70 focus:border-brand-gold-500/50 transition-all font-body appearance-none min-h-[44px]"
          >
            <option value="" disabled>Select your country</option>
            <option value="UK">United Kingdom</option>
            <option value="US">United States</option>
            <option value="IN">India</option>
            <option value="AU">Australia</option>
            <option value="Other">Other</option>
          </select>
          {errors.country && <p className="text-red-600 text-sm">{errors.country.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="level" className="block font-sans text-sm font-bold text-brand-navy-900 uppercase tracking-wider">
          Level of interest <span className="text-brand-gold-500">*</span>
        </label>
        <select 
          id="level" 
          defaultValue=""
          {...register('level')}
          className="w-full bg-cream-50 border border-navy-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/70 focus:border-brand-gold-500/50 transition-all font-body appearance-none min-h-[44px]"
        >
          <option value="" disabled>Select a level</option>
          {['Catalyst', 'Architect', 'Sage', 'Luminary'].map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
        {errors.level && <p className="text-red-600 text-sm">{errors.level.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="specialism" className="block font-sans text-sm font-bold text-brand-navy-900 uppercase tracking-wider">
          Specialism of interest <span className="text-muted text-xs font-normal lowercase tracking-normal">(Optional)</span>
        </label>
        <input 
          type="text" 
          id="specialism" 
          {...register('specialism')}
          className="w-full bg-cream-50 border border-navy-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/70 focus:border-brand-gold-500/50 transition-all font-body min-h-[44px]"
          placeholder="e.g. Executive Coaching, Health & Wellness"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="experience" className="block font-sans text-sm font-bold text-brand-navy-900 uppercase tracking-wider">
          Your current experience with coaching <span className="text-brand-gold-500">*</span>
        </label>
        <textarea 
          id="experience" 
          rows={3}
          {...register('experience')}
          className="w-full bg-cream-50 border border-navy-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/70 focus:border-brand-gold-500/50 transition-all font-body resize-none"
          placeholder="Briefly describe your background..."
        ></textarea>
        {errors.experience && <p className="text-red-600 text-sm">{errors.experience.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="goals" className="block font-sans text-sm font-bold text-brand-navy-900 uppercase tracking-wider">
          What you hope to achieve <span className="text-brand-gold-500">*</span>
        </label>
        <textarea 
          id="goals" 
          rows={3}
          {...register('goals')}
          className="w-full bg-cream-50 border border-navy-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/70 focus:border-brand-gold-500/50 transition-all font-body resize-none"
          placeholder="What are your goals for taking this programme?"
        ></textarea>
        {errors.goals && <p className="text-red-600 text-sm">{errors.goals.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="source" className="block font-sans text-sm font-bold text-brand-navy-900 uppercase tracking-wider">
          How did you hear about us? <span className="text-muted text-xs font-normal lowercase tracking-normal">(Optional)</span>
        </label>
        <input 
          type="text" 
          id="source" 
          {...register('source')}
          className="w-full bg-cream-50 border border-navy-200 rounded-xl px-4 py-3.5 text-brand-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/70 focus:border-brand-gold-500/50 transition-all font-body min-h-[44px]"
          placeholder="e.g. LinkedIn, a colleague, Google search"
        />
      </div>

      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
        <div className="pt-2">
          <Turnstile 
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} 
            onSuccess={(token) => setTurnstileToken(token)}
            options={{ theme: 'light' }}
          />
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm">
          There was an error submitting your application. Please try again later.
        </div>
      )}

      <div className="pt-6 text-center">
        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className="btn-primary w-full justify-center py-4 text-base mb-4 disabled:opacity-50 min-h-[44px]"
        >
          {status === 'submitting' ? 'Submitting...' : 'Submit application'}
        </button>
        <p className="text-muted text-body">
          Free to apply. No commitment. An advisor will be in touch within 2 working days.
        </p>
      </div>
    </form>
  );
}
