import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getSafeServerSession, isAuthConfigured } from '@/lib/auth';
import LoginForm from '@/components/auth/LoginForm';
import AuthConfigNotice from '@/components/auth/AuthConfigNotice';
import PortalLoginShell from '@/components/portal/PortalLoginShell';

export const metadata: Metadata = {
  title: 'Admin Login | International Coaching Institute',
};

export default async function AdminLoginPage() {
  if (!isAuthConfigured()) {
    return (
      <PortalLoginShell
        portalName="Admin Portal"
        portalDescription="Sign in to manage content, students, leads and site settings."
        heroEyebrow="ADMIN"
        heroTitle="Manage your institute"
        heroSubtitle="Access the ICI admin dashboard to edit pages, manage students, review leads, and control everything on the website."
        footerLink={{ href: '/login', label: 'Student login →' }}
      >
        <AuthConfigNotice />
      </PortalLoginShell>
    );
  }

  const session = await getSafeServerSession();
  if (session?.user?.role === 'ADMIN' || session?.user?.role === 'SUPER_ADMIN') {
    redirect('/admin');
  }

  return (
    <PortalLoginShell
      portalName="Admin Portal"
      portalDescription="Sign in to manage content, students, leads and site settings."
      heroEyebrow="ADMIN"
      heroTitle="Manage your institute"
      heroSubtitle="Access the ICI admin dashboard to edit pages, manage students, review leads, and control everything on the website."
      footerLink={{ href: '/login', label: 'Student login →' }}
    >
      <LoginForm redirectTo="/admin" showForgotPassword showApplyLink={false} variant="portal" />
    </PortalLoginShell>
  );
}
