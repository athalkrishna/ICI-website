'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { markAdminBrowserSession } from '@/components/auth/AdminBrowserSessionGuard';
import { portalFieldLabelClass, portalInputClass } from '@/components/portal/portal-styles';

type LoginFormProps = {
  redirectTo?: string;
  showForgotPassword?: boolean;
  showApplyLink?: boolean;
  variant?: 'public' | 'admin' | 'portal';
};

function getErrorMessage(error: string | undefined): string {
  switch (error) {
    case 'CredentialsSignin':
      return 'Invalid email or password. Please check your details and try again.';
    case 'AccessDenied':
      return 'Your account is inactive or you do not have permission to sign in.';
    case 'Configuration':
      return 'Sign-in is temporarily unavailable. Please try again later.';
    default:
      return 'Unable to sign in. Please try again or contact support.';
  }
}

export default function LoginForm({
  redirectTo = '/admin',
  showForgotPassword = true,
  showApplyLink = false,
  variant = 'admin',
}: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const inputClass = portalInputClass;

  const labelClass = portalFieldLabelClass;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const sessionMode = redirectTo.startsWith('/admin') ? 'browser' : 'persistent';

      const result = await signIn('credentials', {
        email: email.toLowerCase().trim(),
        password,
        sessionMode,
        redirect: false,
      });

      if (result?.error) {
        setError(getErrorMessage(result.error));
        return;
      }

      if (result?.ok) {
        if (sessionMode === 'browser') {
          markAdminBrowserSession();
        }
        router.push(redirectTo);
        router.refresh();
      }
    } catch {
      setError('Too many login attempts. Please wait 15 minutes and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="login-email" className={labelClass}>
          Email
        </label>
        <input
          type="email"
          id="login-email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder="Enter your email"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="login-password" className={labelClass}>
            Password
          </label>
          {showForgotPassword && (
            <Link
              href="/forgot-password"
              className="text-sm font-body text-brand-gold-700 hover:text-brand-gold-800 transition-colors"
            >
              Forgotten your password?
            </Link>
          )}
        </div>
        <input
          type="password"
          id="login-password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
          placeholder="Enter your password"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full justify-center py-3.5"
        >
          {loading ? 'Signing in…' : 'Log in'}
        </button>
      </div>

      {showApplyLink && variant === 'portal' && (
        <div className="text-center pt-4 border-t border-navy-100">
          <p className="font-body text-sm text-muted">
            New to ICI?{' '}
            <Link
              href="/apply"
              className="font-semibold text-brand-gold-700 hover:text-brand-gold-800 transition-colors"
            >
              Apply here
            </Link>
          </p>
        </div>
      )}
    </form>
  );
}
