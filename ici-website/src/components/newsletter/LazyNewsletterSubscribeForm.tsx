'use client';

import dynamic from 'next/dynamic';

const NewsletterSubscribeForm = dynamic(
  () => import('@/components/newsletter/NewsletterSubscribeForm'),
  {
    ssr: false,
    loading: () => <div className="h-12 rounded-lg bg-brand-navy-800/50 animate-pulse" aria-hidden />,
  },
);

type Props = {
  variant?: 'footer' | 'inline';
  className?: string;
};

export default function LazyNewsletterSubscribeForm(props: Props) {
  return <NewsletterSubscribeForm {...props} />;
}
