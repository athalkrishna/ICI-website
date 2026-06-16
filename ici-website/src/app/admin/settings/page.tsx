'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';
import PortalPageHeader from '@/components/portal/PortalPageHeader';
import { portalInputClass, portalPrimaryBtnClass } from '@/components/portal/portal-styles';

type SiteSettings = {
  siteName: string;
  siteEmail: string;
  sitePhone: string;
  linkedinUrl: string | null;
  footerTagline: string | null;
  copyrightText: string | null;
  defaultMetaDescription: string | null;
  defaultOgImageUrl: string | null;
  googleAnalyticsId: string | null;
  facebookPixelId: string | null;
  headCode: string | null;
  bodyCode: string | null;
  maintenanceMode: boolean;
  findCoachPageEnabled: boolean;
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then(setSettings)
      .catch(() => toast.error('Failed to load settings'))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error('Save failed');
      const data = await res.json();
      setSettings(data);
      toast.success('Settings saved');
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const update = (key: keyof SiteSettings, value: string | boolean | null) => {
    setSettings((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  if (loading || !settings) {
    return <p className="text-muted">Loading settings…</p>;
  }

  return (
    <div>
      <PortalPageHeader
        title="Site Settings"
        description="Configure global site options and integrations."
      />

      <form onSubmit={handleSave} className="max-w-2xl space-y-8">
        <section className="bg-white rounded-2xl shadow-md border border-navy-100 p-6 space-y-4">
          <h2 className="text-h3 text-brand-navy-900">General</h2>
          <div>
            <label className="text-sm font-medium text-navy-700 block mb-1">Site Name</label>
            <input required value={settings.siteName} onChange={(e) => update('siteName', e.target.value)} className={`w-full ${portalInputClass}`} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-navy-700 block mb-1">Site Email</label>
              <input required type="email" value={settings.siteEmail} onChange={(e) => update('siteEmail', e.target.value)} className={`w-full ${portalInputClass}`} />
            </div>
            <div>
              <label className="text-sm font-medium text-navy-700 block mb-1">Site Phone</label>
              <input required value={settings.sitePhone} onChange={(e) => update('sitePhone', e.target.value)} className={`w-full ${portalInputClass}`} />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-navy-700 block mb-1">LinkedIn URL</label>
            <input type="url" value={settings.linkedinUrl ?? ''} onChange={(e) => update('linkedinUrl', e.target.value || null)} className={`w-full ${portalInputClass}`} />
          </div>
          <div>
            <label className="text-sm font-medium text-navy-700 block mb-1">Footer Tagline</label>
            <input value={settings.footerTagline ?? ''} onChange={(e) => update('footerTagline', e.target.value || null)} className={`w-full ${portalInputClass}`} />
          </div>
          <div>
            <label className="text-sm font-medium text-navy-700 block mb-1">Copyright Text</label>
            <input value={settings.copyrightText ?? ''} onChange={(e) => update('copyrightText', e.target.value || null)} className={`w-full ${portalInputClass}`} />
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-md border border-navy-100 p-6 space-y-4">
          <h2 className="text-h3 text-brand-navy-900">SEO & Analytics</h2>
          <div>
            <label className="text-sm font-medium text-navy-700 block mb-1">Default Meta Description</label>
            <textarea value={settings.defaultMetaDescription ?? ''} onChange={(e) => update('defaultMetaDescription', e.target.value || null)} rows={3} className={`w-full ${portalInputClass}`} />
          </div>
          <div>
            <label className="text-sm font-medium text-navy-700 block mb-1">Default OG Image URL</label>
            <input type="url" value={settings.defaultOgImageUrl ?? ''} onChange={(e) => update('defaultOgImageUrl', e.target.value || null)} className={`w-full ${portalInputClass}`} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-navy-700 block mb-1">Google Analytics ID</label>
              <input value={settings.googleAnalyticsId ?? ''} onChange={(e) => update('googleAnalyticsId', e.target.value || null)} className={`w-full ${portalInputClass}`} placeholder="G-XXXXXXXXXX" />
            </div>
            <div>
              <label className="text-sm font-medium text-navy-700 block mb-1">Facebook Pixel ID</label>
              <input value={settings.facebookPixelId ?? ''} onChange={(e) => update('facebookPixelId', e.target.value || null)} className={`w-full ${portalInputClass}`} />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-md border border-navy-100 p-6 space-y-4">
          <h2 className="text-h3 text-brand-navy-900">Custom Code</h2>
          <div>
            <label className="text-sm font-medium text-navy-700 block mb-1">Head Code</label>
            <textarea value={settings.headCode ?? ''} onChange={(e) => update('headCode', e.target.value || null)} rows={4} className="w-full p-3 text-sm font-mono border border-navy-100 rounded-xl" placeholder="<!-- scripts in <head> -->" />
          </div>
          <div>
            <label className="text-sm font-medium text-navy-700 block mb-1">Body Code</label>
            <textarea value={settings.bodyCode ?? ''} onChange={(e) => update('bodyCode', e.target.value || null)} rows={4} className="w-full p-3 text-sm font-mono border border-navy-100 rounded-xl" placeholder="<!-- scripts before </body> -->" />
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-md border border-navy-100 p-6 space-y-4">
          <h2 className="text-h3 text-brand-navy-900">Features</h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={settings.maintenanceMode} onChange={(e) => update('maintenanceMode', e.target.checked)} className="w-5 h-5 rounded" />
            <span className="text-sm text-navy-700">Maintenance mode</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={settings.findCoachPageEnabled} onChange={(e) => update('findCoachPageEnabled', e.target.checked)} className="w-5 h-5 rounded" />
            <span className="text-sm text-navy-700">Find a Coach page enabled</span>
          </label>
        </section>

        <button type="submit" disabled={saving} className={`${portalPrimaryBtnClass} px-6 py-3`}>
          <Save size={16} />
          {saving ? 'Saving…' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}
