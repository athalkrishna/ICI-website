'use client';

import type { UserRole } from '@prisma/client';
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  Calendar,
  Users,
  GraduationCap,
  BookOpen,
  MessageSquareQuote,
  ImageIcon,
  Mail,
  Settings,
  UserCog,
  Megaphone,
} from 'lucide-react';
import PortalSidebar, { type PortalNavItem } from '@/components/portal/PortalSidebar';
import { formatEnumLabel } from '@/lib/admin-utils';

const navItems: (PortalNavItem & { superAdminOnly?: boolean })[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
  { label: 'Pages Content', href: '/admin/pages', icon: FileText },
  { label: 'Blog Posts', href: '/admin/blog', icon: Newspaper },
  { label: 'Events', href: '/admin/events', icon: Calendar },
  { label: 'Leads', href: '/admin/leads', icon: Users },
  { label: 'Students', href: '/admin/students', icon: GraduationCap },
  { label: 'Course Materials', href: '/admin/materials', icon: BookOpen },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquareQuote },
  { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
  { label: 'Newsletter', href: '/admin/newsletter', icon: Megaphone },
  { label: 'Email Logs', href: '/admin/email-logs', icon: Mail },
  { label: 'Site Settings', href: '/admin/settings', icon: Settings },
  { label: 'Users', href: '/admin/users', icon: UserCog, superAdminOnly: true },
];

type AdminSidebarProps = {
  userName: string;
  userRole: UserRole;
};

export default function AdminSidebar({ userName, userRole }: AdminSidebarProps) {
  const visibleItems = navItems.filter(
    (item) => !item.superAdminOnly || userRole === 'SUPER_ADMIN'
  );

  return (
    <PortalSidebar
      portalName="Admin Portal"
      homeHref="/admin"
      navItems={visibleItems}
      userName={userName}
      userMeta={formatEnumLabel(userRole)}
      logoutCallbackUrl="/admin/login"
    />
  );
}
