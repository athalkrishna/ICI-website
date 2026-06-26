'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import ObfuscatedEmail from '@/components/shared/ObfuscatedEmail';
import {
  defaultContactFormCopy,
  splitContactEmail,
  type ContactFormCopy,
} from '@/lib/contact-defaults';

type ContactFormProps = {
  copy?: ContactFormCopy;
};

export default function ContactForm({ copy = defaultContactFormCopy() }: ContactFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { user: emailUser, domain: emailDomain } = splitContactEmail(copy.contactEmail);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSuccess(true);
        if (typeof window !== 'undefined') {
          if ((window as any).gtag) (window as any).gtag('event', 'form_submit', { form_name: 'contact_form' })
          if ((window as any).fbq) (window as any).fbq('track', 'Lead', { content_name: 'contact_form' })
        }
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 p-8 rounded-2xl text-center space-y-4">
        <h3 className="text-xl font-display font-bold text-green-700">{copy.successHeading}</h3>
        <p className="text-brand-navy-900 text-body">{copy.successMessage}</p>
      </div>
    );
  }

  return (
    <form className="space-y-8 relative z-10" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-end h-full relative">
          <label htmlFor="name" className="block font-sans text-sm font-bold text-navy-700 uppercase tracking-wider mb-2 relative z-10">
            {copy.labels.name} <span className="text-brand-gold-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="w-full bg-white border border-navy-200 shadow-sm rounded-xl px-4 py-4 text-brand-navy-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold-500 focus:border-brand-gold-500 transition-all font-body"
            placeholder={copy.placeholders.name}
          />
        </div>

        <div className="flex flex-col justify-end h-full relative">
          <label htmlFor="email" className="block font-sans text-sm font-bold text-navy-700 uppercase tracking-wider mb-2 relative z-10">
            {copy.labels.email} <span className="text-brand-gold-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="w-full bg-white border border-navy-200 shadow-sm rounded-xl px-4 py-4 text-brand-navy-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold-500 focus:border-brand-gold-500 transition-all font-body"
            placeholder={copy.placeholders.email}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-end h-full relative">
          <label htmlFor="phone" className="block font-sans text-sm font-bold text-navy-700 uppercase tracking-wider mb-2 relative z-10">
            {copy.labels.phone} <span className="text-brand-gold-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            required
            className="w-full bg-white border border-navy-200 shadow-sm rounded-xl px-4 py-4 text-brand-navy-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold-500 focus:border-brand-gold-500 transition-all font-body"
            placeholder={copy.placeholders.phone}
          />
        </div>

        <div className="flex flex-col justify-end h-full relative">
          <label htmlFor="topic" className="block font-sans text-sm font-bold text-navy-700 uppercase tracking-wider mb-2 relative z-10">
            {copy.labels.topic} <span className="text-brand-gold-500">*</span>
          </label>
          <select
            id="topic"
            name="topic"
            required
            defaultValue=""
            className="w-full bg-white border border-navy-200 shadow-sm rounded-xl px-4 py-4 text-brand-navy-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold-500 focus:border-brand-gold-500 transition-all font-body appearance-none"
          >
            <option value="" disabled>{copy.placeholders.topic}</option>
            <option value="Programmes & admissions">{copy.topicOptions.programmes}</option>
            <option value="Organisational training">{copy.topicOptions.organisational}</option>
            <option value="Alumni & community">{copy.topicOptions.alumni}</option>
            <option value="Media & press">{copy.topicOptions.media}</option>
            <option value="Something else">{copy.topicOptions.other}</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col justify-end h-full relative mb-6">
        <label htmlFor="message" className="block font-sans text-sm font-bold text-navy-700 uppercase tracking-wider mb-2 relative z-10">
          {copy.labels.message} <span className="text-brand-gold-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full bg-white border border-navy-200 shadow-sm rounded-xl px-4 py-4 text-brand-navy-900 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold-500 focus:border-brand-gold-500 transition-all font-body resize-none"
          placeholder={copy.placeholders.message}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-start space-x-3">
          <div className="flex items-center h-5">
            <input
              id="gdprConsent"
              name="gdprConsent"
              type="checkbox"
              required
              className="w-5 h-5 rounded border-navy-200 bg-white shadow-sm text-brand-gold-600 focus:ring-brand-gold-500 focus:ring-2 transition-all cursor-pointer mt-0.5"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="gdprConsent" className="font-body text-sm text-navy-700 cursor-pointer">
              {copy.gdpr.prefix}{' '}
              <Link href="/privacy" className="text-brand-gold-600 hover:underline">
                {copy.gdpr.linkText}
              </Link>{' '}
              {copy.gdpr.suffix} <span className="text-brand-gold-500">*</span>
            </label>
          </div>
        </div>
      </div>

      {error && (
        <div className="text-red-600 font-sans text-sm p-3 border border-red-200 bg-red-50 rounded-lg">
          {copy.errorPrefix}{' '}
          <ObfuscatedEmail user={emailUser} domain={emailDomain} className="underline font-semibold" />
          {copy.errorSuffix}
        </div>
      )}

      <div className="pt-4">
        <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-base">
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={18} /> {copy.submittingText}
            </span>
          ) : (
            copy.submitText
          )}
        </button>
      </div>
    </form>
  );
}
