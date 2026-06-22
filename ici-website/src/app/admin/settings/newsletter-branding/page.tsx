'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Save, Plus, Trash2, ArrowLeft } from 'lucide-react';
import PortalPageHeader from '@/components/portal/PortalPageHeader';
import { portalInputClass, portalPrimaryBtnClass } from '@/components/portal/portal-styles';
import type { NewsletterBranding } from '@/lib/newsletter-blocks';

type SocialLink = { label: string; url: string };

export default function NewsletterBrandingPage() {
  const [branding, setBranding] = useState<NewsletterBranding | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/newsletter/branding')
      .then((res) => res.json())
      .then(setBranding)
      .catch(() => toast.error('Failed to load branding settings'))
      .finally(() => setLoading(false));
  }, []);

  const update = <K extends keyof NewsletterBranding>(key: K, value: NewsletterBranding[K]) => {
    setBranding((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const updateSocial = (index: number, field: keyof SocialLink, value: string) => {
    setBranding((prev) => {
      if (!prev) return prev;
      const links = [...prev.socialLinks];
      links[index] = { ...links[index], [field]: value };
      return { ...prev, socialLinks: links };
    });
  };

  const addSocial = () => {
    setBranding((prev) =>
      prev ? { ...prev, socialLinks: [...prev.socialLinks, { label: '', url: '' }] } : prev,
    );
  };

  const removeSocial = (index: number) => {
    setBranding((prev) =>
      prev
        ? { ...prev, socialLinks: prev.socialLinks.filter((_, i) => i !== index) }
        : prev,
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!branding) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/newsletter/branding', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(branding),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');
      toast.success('Newsletter branding saved');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !branding) {
    return <p className="text-muted">Loading branding settings…</p>;
  }

  return (
    <div>
      <Link
        href="/admin/settings"
        className="inline-flex items-center gap-1 text-sm text-navy-500 hover:text-brand-gold-700 mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to site settings
      </Link>

      <PortalPageHeader
        title="Newsletter Branding"
        description="Logo, colours, footer, and sender details injected into every newsletter automatically."
      />

      <form onSubmit={handleSave} className="max-w-2xl space-y-8">
        <section className="bg-white rounded-2xl shadow-md border border-navy-100 p-6 space-y-4">
          <h2 className="text-h3 text-brand-navy-900">Header & colours</h2>
          <div>
            <label className="text-sm font-medium text-navy-700 block mb-1">Logo URL</label>
            <input
              type="url"
              value={branding.logoUrl}
              onChange={(e) => update('logoUrl', e.target.value)}
              className={`w-full ${portalInputClass}`}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-navy-700 block mb-1">Primary colour</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={branding.primaryColor}
                  onChange={(e) => update('primaryColor', e.target.value)}
                  className="w-12 h-10 rounded border border-navy-100"
                />
                <input
                  value={branding.primaryColor}
                  onChange={(e) => update('primaryColor', e.target.value)}
                  className={`flex-1 ${portalInputClass}`}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-navy-700 block mb-1">Accent colour</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={branding.accentColor}
                  onChange={(e) => update('accentColor', e.target.value)}
                  className="w-12 h-10 rounded border border-navy-100"
                />
                <input
                  value={branding.accentColor}
                  onChange={(e) => update('accentColor', e.target.value)}
                  className={`flex-1 ${portalInputClass}`}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-md border border-navy-100 p-6 space-y-4">
          <h2 className="text-h3 text-brand-navy-900">Footer</h2>
          <div>
            <label className="text-sm font-medium text-navy-700 block mb-1">Tagline</label>
            <textarea
              rows={2}
              value={branding.footerTagline}
              onChange={(e) => update('footerTagline', e.target.value)}
              className={`w-full ${portalInputClass}`}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-navy-700 block mb-1">Address</label>
            <input
              value={branding.footerAddress}
              onChange={(e) => update('footerAddress', e.target.value)}
              className={`w-full ${portalInputClass}`}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-navy-700 block mb-1">Unsubscribe text</label>
            <textarea
              rows={2}
              value={branding.unsubscribeText}
              onChange={(e) => update('unsubscribeText', e.target.value)}
              className={`w-full ${portalInputClass}`}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-navy-700">Social links</label>
              <button
                type="button"
                onClick={addSocial}
                className="inline-flex items-center gap-1 text-sm text-brand-gold-700"
              >
                <Plus className="w-4 h-4" />
                Add link
              </button>
            </div>
            <div className="space-y-3">
              {branding.socialLinks.map((link, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <input
                    placeholder="Label"
                    value={link.label}
                    onChange={(e) => updateSocial(index, 'label', e.target.value)}
                    className={`flex-1 ${portalInputClass}`}
                  />
                  <input
                    placeholder="https://…"
                    type="url"
                    value={link.url}
                    onChange={(e) => updateSocial(index, 'url', e.target.value)}
                    className={`flex-[2] ${portalInputClass}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeSocial(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-md border border-navy-100 p-6 space-y-4">
          <h2 className="text-h3 text-brand-navy-900">Sender</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-navy-700 block mb-1">Sender name</label>
              <input
                value={branding.senderName}
                onChange={(e) => update('senderName', e.target.value)}
                className={`w-full ${portalInputClass}`}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-navy-700 block mb-1">Sender email</label>
              <input
                type="email"
                value={branding.senderEmail}
                onChange={(e) => update('senderEmail', e.target.value)}
                className={`w-full ${portalInputClass}`}
              />
            </div>
          </div>
          <p className="text-xs text-navy-400">
            SMTP must allow sending from this address. Falls back to server SMTP settings if unset.
          </p>
        </section>

        <button type="submit" disabled={saving} className={`${portalPrimaryBtnClass} px-6 py-3`}>
          <Save size={16} />
          {saving ? 'Saving…' : 'Save Branding'}
        </button>
      </form>
    </div>
  );
}
