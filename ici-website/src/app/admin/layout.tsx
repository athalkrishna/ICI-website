import { ReactNode } from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      <aside className="w-64 bg-navy-900 text-white flex-shrink-0">
        <div className="p-6">
          <h1 className="text-xl font-bold font-display tracking-wide text-gold-400">ICI Admin</h1>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2 px-4">
            <li><Link href="/admin" className="block py-2 px-3 rounded hover:bg-navy-800 transition">Dashboard</Link></li>
            <li><Link href="/admin/pages/home" className="block py-2 px-3 rounded hover:bg-navy-800 transition">Pages Content</Link></li>
            <li><Link href="/admin/leads" className="block py-2 px-3 rounded hover:bg-navy-800 transition">Leads & Enquiries</Link></li>
            <li><Link href="/admin/media" className="block py-2 px-3 rounded hover:bg-navy-800 transition">Media Library</Link></li>
            <li><Link href="/admin/settings" className="block py-2 px-3 rounded hover:bg-navy-800 transition">Site Settings</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
