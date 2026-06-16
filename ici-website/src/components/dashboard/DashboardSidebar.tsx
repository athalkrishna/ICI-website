'use client';

import { useSession } from 'next-auth/react';
import {
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  MessageCircle,
  User,
} from 'lucide-react';
import PortalSidebar, { type PortalNavItem } from '@/components/portal/PortalSidebar';

const navItems: PortalNavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, exact: true },
  { label: 'My Materials', href: '/dashboard/materials', icon: BookOpen },
  { label: 'My Profile', href: '/dashboard/profile', icon: User },
  { label: 'My Credential', href: '/dashboard/credential', icon: GraduationCap },
  { label: 'Contact Support', href: '/contact', icon: MessageCircle },
];

export default function DashboardSidebar() {
  const { data: session } = useSession();

  return (
    <PortalSidebar
      portalName="Student Portal"
      homeHref="/dashboard"
      navItems={navItems}
      userName={session?.user?.name}
      userMeta={session?.user?.email ?? undefined}
      logoutCallbackUrl="/login"
    />
  );
}
