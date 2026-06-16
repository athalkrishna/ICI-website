import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import LoginForm from '@/components/auth/LoginForm';
import PortalLoginShell from '@/components/portal/PortalLoginShell';

export const metadata: Metadata = {
  title: 'Admin Login | International Coaching Institute',
};

export default async function AdminLoginPage() {
  const session = await getServerSession(authOptions);
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
