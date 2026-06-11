'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('ici_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('ici_cookie_consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none"
        >
          <div className="max-w-6xl mx-auto pointer-events-auto">
            <div className="bg-navy-900 border border-white/10 shadow-2xl rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500 rounded-full blur-[100px] opacity-10 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              
              <div className="flex-1 relative z-10">
                <h3 className="text-white font-display font-bold text-lg mb-2">We value your privacy</h3>
                <p className="text-blue-100/80 font-body text-sm leading-relaxed">
                  We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and support our marketing efforts. By continuing to use our website, you agree to our{' '}
                  <Link href="/privacy-policy" className="text-gold-400 hover:text-gold-300 underline underline-offset-2 transition-colors">
                    Privacy Policy
                  </Link>
                  {' '}and our use of cookies.
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0 w-full md:w-auto relative z-10">
                <button 
                  onClick={acceptCookies}
                  className="btn-primary w-full md:w-auto text-sm py-3 px-8"
                >
                  Accept Cookies
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
