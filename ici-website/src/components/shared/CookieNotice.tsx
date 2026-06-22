'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem('ici_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('ici_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!mounted || !isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none animate-fade-in">
      <div className="max-w-6xl mx-auto pointer-events-auto">
        <div className="bg-brand-navy-900 border border-subtle shadow-2xl rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold-500 rounded-full blur-[100px] opacity-10 translate-x-1/2 -translate-y-1/2 pointer-events-none" />

          <div className="flex-1 relative z-10">
            <h3 className="text-white font-display font-bold text-lg mb-2">We value your privacy</h3>
            <p className="text-muted-dark text-body">
              We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and support our marketing efforts. By continuing to use our website, you agree to our{' '}
              <Link href="/privacy" className="text-brand-gold-400 hover:text-brand-gold-300 underline underline-offset-2 transition-colors">
                Privacy Policy
              </Link>
              {' '}and our use of cookies.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0 w-full md:w-auto relative z-10">
            <button
              type="button"
              onClick={acceptCookies}
              className="btn-primary w-full md:w-auto text-sm py-3 px-8"
            >
              Accept Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
