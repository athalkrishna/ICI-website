'use client';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

export default function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#0f1f3d',
            color: '#fff',
            borderRadius: '12px',
          },
          success: { iconTheme: { primary: '#c9a227', secondary: '#0f1f3d' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />
    </SessionProvider>
  );
}
