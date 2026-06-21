import Link from 'next/link';
import { getSafeServerSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getAdminStats } from '@/lib/data';
import { getRecentActivity } from '@/lib/activity';
import {
  Users,
  GraduationCap,
  Newspaper,
  TrendingUp,
  FileText,
  UserPlus,
  Calendar,
  Settings,
} from 'lucide-react';
import { formatDate, formatDateTime, formatEnumLabel } from '@/lib/admin-utils';
import PortalPageHeader from '@/components/portal/PortalPageHeader';
import PortalStatCard from '@/components/portal/PortalStatCard';
import PortalCard from '@/components/portal/PortalCard';
import { portalQuickLinkClass, portalSectionTitleClass } from '@/components/portal/portal-styles';

export default async function AdminDashboard() {
  const session = await getSafeServerSession();
  if (!session) redirect('/admin/login');

  const stats = await getAdminStats();
  const activity = await getRecentActivity(10);

  const statCards = [
    {
      label: 'Leads This Month',
      value: stats.leadsThisMonth,
      sub: `${stats.leadsPctChange >= 0 ? '+' : ''}${stats.leadsPctChange}% vs last month`,
      icon: Users,
    },
    {
      label: 'Leads Today',
      value: stats.leadsToday,
      sub: 'New enquiries today',
      icon: TrendingUp,
    },
    {
      label: 'Active Students',
      value: stats.activeStudents,
      sub: 'Enrolled or active',
      icon: GraduationCap,
    },
    {
      label: 'Published Posts',
      value: stats.publishedPosts,
      sub: 'Live blog articles',
      icon: Newspaper,
    },
  ];

  const chartDays = Object.keys(stats.leadsChart).sort().slice(-14);
  const maxDaily = Math.max(
    1,
    ...chartDays.map((day) =>
      Object.values(stats.leadsChart[day] ?? {}).reduce((a, b) => a + b, 0)
    )
  );

  const quickActions = [
    { label: 'Manage Pages', href: '/admin/pages', icon: FileText },
    { label: 'View Leads', href: '/admin/leads', icon: UserPlus },
    { label: 'Add Event', href: '/admin/events', icon: Calendar },
    { label: 'Site Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div>
      <PortalPageHeader
        title="Dashboard"
        description={`Welcome back, ${session.user.name}. Here is an overview of your site.`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => (
          <PortalStatCard key={card.label} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <PortalCard className="xl:col-span-2">
          <h2 className={`${portalSectionTitleClass} mb-6`}>Leads (Last 14 Days)</h2>
          {chartDays.length === 0 ? (
            <p className="text-muted text-sm py-8 text-center">No lead data yet.</p>
          ) : (
            <div className="flex items-end gap-2 h-40">
              {chartDays.map((day) => {
                const total = Object.values(stats.leadsChart[day] ?? {}).reduce(
                  (a, b) => a + b,
                  0
                );
                const height = Math.max(4, (total / maxDaily) * 100);
                return (
                  <div key={day} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-xs text-muted">{total}</span>
                    <div
                      className="w-full bg-brand-gold-400/80 rounded-t-md transition-all"
                      style={{ height: `${height}%` }}
                      title={`${day}: ${total} leads`}
                    />
                    <span className="text-[10px] text-muted truncate w-full text-center">
                      {day.slice(5)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </PortalCard>

        <PortalCard>
          <h2 className={`${portalSectionTitleClass} mb-4`}>Quick Actions</h2>
          <div className="space-y-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.href} href={action.href} className={portalQuickLinkClass}>
                  <Icon size={18} className="text-brand-gold-600" />
                  <span className="text-sm font-medium text-brand-navy-900">{action.label}</span>
                </Link>
              );
            })}
          </div>
        </PortalCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <PortalCard padding={false} className="overflow-hidden">
          <div className="p-6 border-b border-navy-100">
            <h2 className={portalSectionTitleClass}>Recent Activity</h2>
          </div>
          <div className="divide-y divide-navy-50 max-h-80 overflow-y-auto">
            {activity.length === 0 ? (
              <p className="p-6 text-muted text-sm text-center">No activity recorded yet.</p>
            ) : (
              activity.map((item) => (
                <div key={item.id} className="px-6 py-4">
                  <p className="text-sm text-brand-navy-900">
                    <span className="font-medium">{item.userName ?? 'System'}</span>{' '}
                    <span className="text-muted">{formatEnumLabel(item.action)}</span>
                    {item.details && (
                      <span className="text-navy-600"> — {item.details}</span>
                    )}
                  </p>
                  <p className="text-xs text-muted mt-1">{formatDateTime(item.createdAt)}</p>
                </div>
              ))
            )}
          </div>
        </PortalCard>

        <PortalCard padding={false} className="overflow-hidden">
          <div className="p-6 border-b border-navy-100 flex justify-between items-center">
            <h2 className={portalSectionTitleClass}>Upcoming Events</h2>
            <Link href="/admin/events" className="text-sm text-brand-gold-700 hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-navy-50">
            {stats.upcomingEvents.length === 0 ? (
              <p className="p-6 text-muted text-sm text-center">No upcoming events.</p>
            ) : (
              stats.upcomingEvents.map((event) => (
                <div key={event.slug} className="px-6 py-4">
                  <p className="font-medium text-brand-navy-900">{event.title}</p>
                  <p className="text-sm text-muted mt-1">
                    {formatDate(event.startDate, {
                      weekday: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  <Link
                    href={`/events/${event.slug}`}
                    target="_blank"
                    className="text-xs text-brand-gold-700 hover:underline mt-1 inline-block"
                  >
                    Preview
                  </Link>
                </div>
              ))
            )}
          </div>
        </PortalCard>
      </div>
    </div>
  );
}
