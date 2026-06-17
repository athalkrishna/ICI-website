'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ExternalLink, FileText, Loader2 } from 'lucide-react';
import PortalPageHeader from '@/components/portal/PortalPageHeader';
import PortalCard from '@/components/portal/PortalCard';
import { portalSectionTitleClass } from '@/components/portal/portal-styles';

type Material = {
  id: string;
  title: string;
  description: string | null;
  fileType: string;
  moduleNumber: number | null;
  level: string;
  grantedAt: string;
};

function formatLabel(value: string) {
  return value
    .split('_')
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');
}

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [accessingId, setAccessingId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/dashboard/materials')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMaterials(data);
        } else if (data.error) {
          toast.error(data.error);
        }
      })
      .catch(() => toast.error('Failed to load materials'))
      .finally(() => setLoading(false));
  }, []);

  async function handleView(id: string) {
    setAccessingId(id);
    try {
      const res = await fetch(`/api/dashboard/materials/${id}/access`);
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Could not access this material');
        return;
      }

      window.open(data.url, '_blank', 'noopener,noreferrer');
    } catch {
      toast.error('Could not access this material');
    } finally {
      setAccessingId(null);
    }
  }

  return (
    <div className="max-w-4xl">
      <PortalPageHeader
        eyebrow="Resources"
        title="My Materials"
        description="Programme materials you have been granted access to. Links expire after 15 minutes for security."
      />

      {loading ? (
        <div className="flex items-center gap-2 text-muted py-12">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading materials…
        </div>
      ) : materials.length === 0 ? (
        <PortalCard className="text-center">
          <FileText className="w-12 h-12 text-brand-navy-200 mx-auto mb-4" />
          <h2 className={`${portalSectionTitleClass} mb-2`}>No materials yet</h2>
          <p className="text-muted max-w-md mx-auto">
            Published materials for your programme level will appear here. If you expect
            something to be available, contact{' '}
            <a
              href="mailto:info@internationalcoachinginstitute.org"
              className="text-brand-gold-700 hover:text-brand-gold-800"
            >
              info@internationalcoachinginstitute.org
            </a>{' '}
            if you believe this is an error.
          </p>
        </PortalCard>
      ) : (
        <ul className="space-y-4">
          {materials.map((material) => (
            <li key={material.id}>
              <PortalCard className="flex flex-col sm:flex-row sm:items-center gap-4 !p-5 md:!p-6">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    {material.moduleNumber != null && (
                      <span className="text-xs font-semibold uppercase tracking-wider text-brand-gold-700 bg-brand-gold-50 px-2 py-0.5 rounded">
                        Module {material.moduleNumber}
                      </span>
                    )}
                    <span className="text-xs text-muted">{formatLabel(material.level)}</span>
                    <span className="text-xs text-muted">· {material.fileType}</span>
                  </div>
                  <h2 className="font-display text-lg text-brand-navy-900 mb-1">{material.title}</h2>
                  {material.description && (
                    <p className="text-sm text-muted line-clamp-2">{material.description}</p>
                  )}
                  <p className="text-xs text-muted mt-2">
                    Granted{' '}
                    {new Date(material.grantedAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleView(material.id)}
                  disabled={accessingId === material.id}
                  className="btn-primary shrink-0 justify-center disabled:opacity-60"
                >
                  {accessingId === material.id ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Opening…
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4" />
                      View
                    </>
                  )}
                </button>
              </PortalCard>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
