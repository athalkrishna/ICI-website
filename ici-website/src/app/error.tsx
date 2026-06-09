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
      <h2 className="text-3xl font-display font-bold text-navy-900 mb-4">Something went wrong</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        We encountered an unexpected error while loading this page. Our technical team has been notified.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => reset()}
          className="bg-navy-900 text-white px-6 py-2 rounded hover:bg-navy-800 transition"
        >
          Try again
        </button>
        <Link href="/" className="bg-gray-100 text-navy-900 px-6 py-2 rounded hover:bg-gray-200 transition">
          Return Home
        </Link>
      </div>
    </div>
  );
}
