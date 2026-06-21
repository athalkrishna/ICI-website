'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const HeroLeadForm = dynamic(() => import('@/components/home/HeroLeadForm'), { ssr: false });

const placeholder = (
  <div
    className="bg-white/90 rounded-2xl shadow-2xl p-7 min-h-[380px] border-l-4 border-brand-gold-500"
    aria-hidden
  />
);

export default function DeferredHeroLeadForm() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      if (!cancelled) setReady(true);
    };

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(load, { timeout: 2500 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const timer = window.setTimeout(load, 1500);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  if (!ready) return placeholder;
  return <HeroLeadForm />;
}
