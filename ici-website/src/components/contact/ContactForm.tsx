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
        <p className="text-blue-100 font-body">Thank you for reaching out. A coaching advisor will be in touch with you shortly.</p>
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
        <div className="space-y-2">
          <label htmlFor="name" className="block font-sans text-sm font-bold text-blue-100/90 uppercase tracking-wider">
            Name <span className="text-gold-500">*</span>
          </label>
          <input 
            type="text" 
            name="name"
            id="name" 
            required 
            className="w-full bg-navy-900/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
            placeholder="Your name"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="block font-sans text-sm font-bold text-blue-100/90 uppercase tracking-wider">
            Email <span className="text-gold-500">*</span>
          </label>
          <input 
            type="email" 
            name="email"
            id="email" 
            required 
            className="w-full bg-navy-900/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="phone" className="block font-sans text-sm font-bold text-blue-100/90 uppercase tracking-wider">
            Phone <span className="text-blue-100/40 text-xs font-normal lowercase tracking-normal">(Optional)</span>
          </label>
          <input 
            type="tel" 
            name="phone"
            id="phone" 
            className="w-full bg-navy-900/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="topic" className="block font-sans text-sm font-bold text-blue-100/90 uppercase tracking-wider">
            What can we help with? <span className="text-gold-500">*</span>
          </label>
          <select 
            id="topic" 
            name="topic"
            required
            defaultValue=""
            className="w-full bg-navy-900/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body appearance-none"
          >
            <option value="" disabled>Select a topic</option>
            <option value="Programmes">Programmes</option>
            <option value="Admissions">Admissions</option>
            <option value="Organisations">Organisations</option>
            <option value="Alumni">Alumni</option>
            <option value="Media">Media</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block font-sans text-sm font-bold text-blue-100/90 uppercase tracking-wider">
          Your message <span className="text-gold-500">*</span>
        </label>
        <textarea 
          id="message" 
          name="message"
          rows={5}
          required
          className="w-full bg-navy-900/80 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-blue-100/30 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all font-body resize-none"
          placeholder="How can we help you?"
        ></textarea>
      </div>

      {error && (
        <div className="text-red-400 font-sans text-sm p-3 border border-red-500/30 bg-red-500/10 rounded-lg">
          There was an error sending your message. Please try again.
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
