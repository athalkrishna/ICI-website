'use client';

import { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

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
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50/10 border border-green-500/20 p-8 rounded-2xl text-center space-y-4">
        <h3 className="text-xl font-display font-bold text-green-400">Message Sent!</h3>
        <p className="text-blue-100 font-body">Thank you. An advisor will be in touch within 2 working days.</p>
      </div>
    );
  }

  return (
    <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
      <input
        type="text"
        name="website"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />
      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col justify-end h-full relative">
          <label htmlFor="name" className="block font-sans text-xs font-bold text-gold-400 uppercase tracking-widest mb-2 relative z-10">
            Name <span className="text-gold-500">*</span>
          </label>
          <input 
            type="text" 
            name="name"
            id="name" 
            required 
            className="w-full bg-navy-800/50 border-0 border-b-2 border-white/10 hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body"
            placeholder="Your name"
          />
        </div>
        
        <div className="flex flex-col justify-end h-full relative">
          <label htmlFor="email" className="block font-sans text-xs font-bold text-gold-400 uppercase tracking-widest mb-2 relative z-10">
            Email <span className="text-gold-500">*</span>
          </label>
          <input 
            type="email" 
            name="email"
            id="email" 
            required 
            className="w-full bg-navy-800/50 border-0 border-b-2 border-white/10 hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col justify-end h-full relative">
          <label htmlFor="phone" className="block font-sans text-xs font-bold text-gold-400 uppercase tracking-widest mb-2 relative z-10">
            Phone <span className="text-blue-100/40 text-xs font-normal lowercase tracking-normal">(Optional)</span>
          </label>
          <input 
            type="tel" 
            name="phone"
            id="phone" 
            className="w-full bg-navy-800/50 border-0 border-b-2 border-white/10 hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div className="flex flex-col justify-end h-full relative">
          <label htmlFor="topic" className="block font-sans text-xs font-bold text-gold-400 uppercase tracking-widest mb-2 relative z-10">
            What can we help with? <span className="text-gold-500">*</span>
          </label>
          <select 
            id="topic" 
            name="topic"
            required
            defaultValue=""
            className="w-full bg-navy-800/50 border-0 border-b-2 border-white/10 hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body appearance-none"
          >
            <option value="" disabled>Select a topic</option>
            <option value="Programmes & admissions">Programmes & admissions</option>
            <option value="Organisational training">Organisational training</option>
            <option value="Alumni & community">Alumni & community</option>
            <option value="Media & press">Media & press</option>
            <option value="Something else">Something else</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col justify-end h-full relative mb-6">
        <label htmlFor="message" className="block font-sans text-xs font-bold text-gold-400 uppercase tracking-widest mb-2 relative z-10">
          Your message <span className="text-gold-500">*</span>
        </label>
        <textarea 
          id="message" 
          name="message"
          rows={5}
          required
          className="w-full bg-navy-800/50 border-0 border-b-2 border-white/10 hover:border-white/30 rounded-t-xl rounded-b-none px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-gold-400 focus:bg-navy-800 transition-all font-body resize-none"
          placeholder="How can we help you?"
        ></textarea>
      </div>

      <div className="space-y-2">
        <div className="flex items-start space-x-3">
          <div className="flex items-center h-5">
            <input
              id="gdprConsent"
              name="gdprConsent"
              type="checkbox"
              required
              className="w-5 h-5 rounded border-white/20 bg-navy-800 text-gold-500 focus:ring-gold-500/50 focus:ring-2 transition-all cursor-pointer mt-0.5"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="gdprConsent" className="font-body text-sm text-blue-100/90 cursor-pointer">
              I consent to the collection and processing of my personal data in accordance with the Privacy Policy for the purpose of handling this inquiry. <span className="text-gold-500">*</span>
            </label>
          </div>
        </div>
      </div>

      {error && (
        <div className="text-red-400 font-sans text-sm p-3 border border-red-500/30 bg-red-500/10 rounded-lg">
          Something went wrong. Please email info@internationalcoachinginstitute.org.
        </div>
      )}

      <div className="pt-4">
        <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-base">
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={18} /> Sending...
            </span>
          ) : (
            'Send message'
          )}
        </button>
      </div>
    </form>
  );
}
