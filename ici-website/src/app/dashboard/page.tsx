'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, GraduationCap, User, ArrowRight } from 'lucide-react';
import PortalPageHeader from '@/components/portal/PortalPageHeader';
import PortalCard from '@/components/portal/PortalCard';
import { portalLabelClass, portalSectionTitleClass } from '@/components/portal/portal-styles';

type Profile = {
  enrolledLevel: string | null;
  enrolledSpecialisation: string | null;
  studentStatus: string;
  enrolmentDate: string | null;
  user: {
    name: string;
    email: string;
  };
};

function formatLabel(value: string | null | undefined) {
  if (!value) return '—';
  return value
    .split('_')
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');
}

export default function DashboardHome() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/profile')
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setProfile(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const firstName = profile?.user.name?.split(' ')[0] ?? 'Student';

  const quickLinks = [
    {
      href: '/dashboard/materials',
      label: 'My Materials',
      description: 'Access your programme resources and module content.',
      icon: BookOpen,
    },
    {
      href: '/dashboard/profile',
      label: 'My Profile',
      description: 'Update your contact details and account settings.',
      icon: User,
    },
    {
      href: '/dashboard/credential',
      label: 'My Credential',
      description: 'View your ICI credential once it has been issued.',
      icon: GraduationCap,
    },
  ];

  return (
    <div className="max-w-5xl">
      <PortalPageHeader
        eyebrow="Welcome back"
        title={loading ? 'Loading…' : `Hello, ${firstName}`}
        description="Your student portal for programme materials, profile and credentials."
      />

      <PortalCard className="mb-8">
        <h2 className={`${portalSectionTitleClass} mb-6`}>Enrolled Programme</h2>
        {loading ? (
          <p className="text-muted">Loading programme details…</p>
        ) : profile ? (
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <dt className={portalLabelClass}>Level</dt>
              <dd className="text-lg font-display text-brand-navy-900">
                {formatLabel(profile.enrolledLevel)}
              </dd>
            </div>
            <div>
              <dt className={portalLabelClass}>Specialisation</dt>
              <dd className="text-lg font-display text-brand-navy-900">
                {formatLabel(profile.enrolledSpecialisation)}
              </dd>
            </div>
            <div>
              <dt className={portalLabelClass}>Status</dt>
              <dd className="text-lg font-display text-brand-navy-900">
                {formatLabel(profile.studentStatus)}
              </dd>
            </div>
            <div>
              <dt className={portalLabelClass}>Enrolment Date</dt>
              <dd className="text-lg font-display text-brand-navy-900">
                {profile.enrolmentDate
                  ? new Date(profile.enrolmentDate).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : '—'}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="text-muted">
            Your programme details are not yet available. Please contact{' '}
            <a
              href="mailto:info@internationalcoachinginstitute.org"
              className="text-brand-gold-700 hover:text-brand-gold-800"
            >
              info@internationalcoachinginstitute.org
            </a>{' '}
            if you need assistance.
          </p>
        )}
      </PortalCard>

      <h2 className={`${portalSectionTitleClass} mb-4`}>Quick Links</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickLinks.map(({ href, label, description, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group bg-white rounded-2xl border border-navy-100 p-5 shadow-md hover:shadow-lg hover:border-brand-gold-500/40 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-brand-navy-900 flex items-center justify-center">
                <Icon className="w-5 h-5 text-brand-gold-400" />
              </div>
              <ArrowRight className="w-4 h-4 text-brand-gold-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="font-display text-brand-navy-900 mb-1">{label}</h3>
            <p className="text-sm text-muted leading-relaxed">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
