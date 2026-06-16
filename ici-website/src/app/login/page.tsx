import LoginForm from '@/components/auth/LoginForm';
import { Metadata } from 'next';
import PortalLoginShell from '@/components/portal/PortalLoginShell';

export const metadata: Metadata = {
  title: 'Log In | International Coaching Institute',
  description:
    'Log in to your ICI student portal to access materials, credentials and programme resources.',
};

export default function LoginPage() {
  return (
    <PortalLoginShell
      portalName="Student Portal"
      portalDescription="Sign in to access your programme materials, profile and credentials."
      heroEyebrow="LOG IN"
      heroTitle="Welcome back"
      heroSubtitle="Access your student portal for course materials, your profile, and your ICI credential once issued."
      footerLink={{ href: '/admin/login', label: 'Admin login →' }}
    >
      <LoginForm redirectTo="/dashboard" showForgotPassword showApplyLink variant="portal" />
    </PortalLoginShell>
  );
}
