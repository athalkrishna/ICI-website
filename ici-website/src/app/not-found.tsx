import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-display font-bold text-navy-900 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Page not found</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="bg-navy-900 text-white px-8 py-3 rounded hover:bg-navy-800 transition">
        Return Home
      </Link>
    </div>
  );
}
