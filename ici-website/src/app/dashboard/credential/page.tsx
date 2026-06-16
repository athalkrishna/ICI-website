'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import PortalPageHeader from '@/components/portal/PortalPageHeader';
import PortalCard from '@/components/portal/PortalCard';

type Credential = {
  credentialIssued: boolean;
  enrolledLevel?: string | null;
  credentialNumber?: string | null;
  credentialIssueDate?: string | null;
  user?: {
    name: string;
  };
};

const levelCode: Record<string, string> = {
  CATALYST: 'ICI-C',
  ARCHITECT: 'ICI-A',
  SAGE: 'ICI-S',
  LUMINARY: 'ICI-L',
};

function formatLevel(level: string | null | undefined) {
  if (!level) return '—';
  return level.charAt(0) + level.slice(1).toLowerCase();
}

export default function StudentCredential() {
  const [profile, setProfile] = useState<Credential | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/profile')
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setProfile(data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-muted py-12">
        <Loader2 className="w-5 h-5 animate-spin" />
        Loading credential…
      </div>
    );
  }

  if (!profile?.credentialIssued) {
    return (
      <div className="max-w-2xl">
        <PortalPageHeader eyebrow="Certification" title="My Credential" />
        <PortalCard>
          <p className="text-muted leading-relaxed">
            Your credential will appear here once it has been issued by ICI. You will receive an
            email notification when your certification is ready. Contact us at{' '}
            <a
              href="mailto:info@internationalcoachinginstitute.org"
              className="text-brand-gold-700 hover:text-brand-gold-800 font-medium"
            >
              info@internationalcoachinginstitute.org
            </a>{' '}
            if you have questions about your certification status.
          </p>
        </PortalCard>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <PortalPageHeader
        eyebrow="Certification"
        title="My Credential"
        description="Your official ICI certification. You may print this for your records."
      />

      <div className="bg-brand-navy-900 text-white rounded-2xl p-8 md:p-10 max-w-lg text-center shadow-xl border border-brand-gold-500/20">
        <p className="text-brand-gold-400 text-xs uppercase tracking-widest mb-3">
          International Coaching Institute
        </p>
        {profile.user?.name && (
          <p className="text-lg text-white/90 mb-4 font-display">{profile.user.name}</p>
        )}
        <h2 className="text-3xl font-display mb-2">{formatLevel(profile.enrolledLevel)}</h2>
        <p className="text-2xl text-brand-gold-400 mb-8 font-display">
          {levelCode[profile.enrolledLevel || ''] || 'ICI'}
        </p>
        <div className="border-t border-white/10 pt-6">
          <p className="text-xs text-white/60 uppercase tracking-wider mb-1">Credential Number</p>
          <p className="font-mono text-lg mb-4">{profile.credentialNumber}</p>
          <p className="text-sm text-white/70">
            Issued{' '}
            {profile.credentialIssueDate
              ? new Date(profile.credentialIssueDate).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              : '—'}
          </p>
        </div>
      </div>

      <button type="button" onClick={() => window.print()} className="mt-6 btn-primary">
        Print Certificate
      </button>
    </div>
  );
}
