'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global Error Boundary Caught:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h2 className="text-h2 text-brand-navy-900 mb-4">Something went wrong</h2>
      <p className="text-muted mb-8 max-w-md">
        We encountered an unexpected error while loading this page. Our technical team has been notified.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => reset()}
          className="bg-brand-navy-900 text-white px-6 py-2 rounded hover:bg-brand-navy-800 transition"
        >
          Try again
        </button>
        <Link href="/" className="bg-cream-100 text-brand-navy-900 px-6 py-2 rounded hover:bg-cream-200 transition">
          Return Home
        </Link>
      </div>
    </div>
  );
}
