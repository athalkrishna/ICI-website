'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface CheckoutFormProps {
  level: string;
}

export default function CheckoutForm({ level }: CheckoutFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
  });

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await loadRazorpayScript();
    if (!res) {
      setError('Razorpay SDK failed to load. Are you online?');
      setLoading(false);
      return;
    }

    try {
      const orderData = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ levelId: level }),
      }).then((t) => t.json());

      if (orderData.error) {
        throw new Error(orderData.error);
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '', // Needs to be set in env
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'International Coaching Institute',
        description: `Enrolment for ${level}`,
        order_id: orderData.id,
        handler: function (response: any) {
          // Verify payment here if needed, then redirect to success
          router.push(`/checkout/success?order_id=${response.razorpay_order_id}&payment_id=${response.razorpay_payment_id}`);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#0A192F', // navy-900
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (err: any) {
      setError(err.message || 'Payment failed to initiate.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePayment} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="name" className="block font-sans text-sm font-bold text-brand-navy-900 uppercase tracking-wider">
          Full Name <span className="text-brand-gold-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-cream-50 border border-navy-200 rounded-xl px-4 py-3.5 text-brand-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/70"
          placeholder="Your full name"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block font-sans text-sm font-bold text-brand-navy-900 uppercase tracking-wider">
          Email <span className="text-brand-gold-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full bg-cream-50 border border-navy-200 rounded-xl px-4 py-3.5 text-brand-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/70"
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="block font-sans text-sm font-bold text-brand-navy-900 uppercase tracking-wider">
          Phone <span className="text-brand-gold-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full bg-cream-50 border border-navy-200 rounded-xl px-4 py-3.5 text-brand-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/70"
          placeholder="+91 00000 00000"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="country" className="block font-sans text-sm font-bold text-brand-navy-900 uppercase tracking-wider">
          Country <span className="text-brand-gold-500">*</span>
        </label>
        <input
          type="text"
          id="country"
          required
          value={formData.country}
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          className="w-full bg-cream-50 border border-navy-200 rounded-xl px-4 py-3.5 text-brand-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-gold-500/70"
          placeholder="Your country"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center py-4 text-base"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="animate-spin" size={20} /> Processing...
          </span>
        ) : (
          'Proceed to Payment'
        )}
      </button>
    </form>
  );
}
