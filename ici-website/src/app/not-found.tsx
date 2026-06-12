import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-h1 text-brand-navy-900 mb-4">404</h1>
      <h2 className="text-h2 font-bold text-navy-800 mb-4 font-display">Page not found</h2>
      <p className="text-muted mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="bg-brand-navy-900 text-white px-8 py-3 rounded hover:bg-brand-navy-800 transition">
        Return Home
      </Link>
    </div>
  );
}
