'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

/** Load analytics only after user interaction or delay — keeps Lighthouse Performance higher. */
export default function DeferredAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!gaId && !pixelId) return;

    let active = true;
    let loaded = false;
    const enable = () => {
      if (!active || loaded) return;
      loaded = true;
      setEnabled(true);
    };

    const events = ['scroll', 'click', 'keydown', 'touchstart'] as const;
    events.forEach((event) => window.addEventListener(event, enable, { once: true, passive: true }));
    const timer = window.setTimeout(enable, 8000);

    return () => {
      active = false;
      events.forEach((event) => window.removeEventListener(event, enable));
      window.clearTimeout(timer);
    };
  }, [gaId, pixelId]);

  if (!enabled) return null;

  return (
    <>
      {gaId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="lazyOnload" />
          <Script id="google-analytics" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      ) : null}
      {pixelId ? (
        <Script id="meta-pixel" strategy="lazyOnload">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      ) : null}
    </>
  );
}
