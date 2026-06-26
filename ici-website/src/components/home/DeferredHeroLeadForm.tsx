'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import type { ContentMap } from '@/lib/content';

const HeroLeadForm = dynamic(() => import('@/components/home/HeroLeadForm'), { ssr: false });

const placeholder = (
  <div
    className="bg-white/90 rounded-2xl shadow-2xl p-7 min-h-[280px] lg:min-h-[380px] border-l-4 border-brand-gold-500"
    aria-hidden
  />
);

export default function DeferredHeroLeadForm({ content = {} }: { content?: ContentMap }) {
  const [ready, setReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    const load = () => {
      if (active) setReady(true);
    };

    const el = containerRef.current;
    if (el && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            load();
            observer.disconnect();
          }
        },
        { rootMargin: '200px 0px' },
      );
      observer.observe(el);
      return () => {
        active = false;
        observer.disconnect();
      };
    }

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(load, { timeout: 3000 });
      return () => {
        active = false;
        window.cancelIdleCallback(id);
      };
    }

    const timer = window.setTimeout(load, 2000);
    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={containerRef}>
      {ready ? <HeroLeadForm content={content} /> : placeholder}
    </div>
  );
}
