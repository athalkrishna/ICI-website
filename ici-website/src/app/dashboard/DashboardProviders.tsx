'use client';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

export default function DashboardProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'font-sans text-sm',
          style: {
            background: '#0A1F44',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#C9A84C',
              secondary: '#0A1F44',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#0A1F44',
            },
          },
        }}
      />
    </SessionProvider>
  );
}
