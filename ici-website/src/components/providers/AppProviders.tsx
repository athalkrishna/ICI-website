'use client';

/** SessionProvider lives in dashboard/admin layouts only — keeps public pages lighter. */
export default function AppProviders({ children }: { children: React.ReactNode }) {
  return children;
}
