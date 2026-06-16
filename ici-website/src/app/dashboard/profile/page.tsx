'use client';

import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import PortalPageHeader from '@/components/portal/PortalPageHeader';
import PortalCard from '@/components/portal/PortalCard';
import {
  portalFieldLabelClass,
  portalInputClass,
  portalSectionTitleClass,
} from '@/components/portal/portal-styles';

type Profile = {
  phone: string | null;
  country: string | null;
  city: string | null;
  directoryOptIn: boolean;
  user: {
    name: string;
    email: string;
  };
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [directoryOptIn, setDirectoryOptIn] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    fetch('/api/dashboard/profile')
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
          return;
        }
        setProfile(data);
        setName(data.user.name ?? '');
        setPhone(data.phone ?? '');
        setCountry(data.country ?? '');
        setCity(data.city ?? '');
        setDirectoryOptIn(data.directoryOptIn ?? false);
      })
      .catch(() => toast.error('Failed to load profile'))
      .finally(() => setLoading(false));
  }, []);

  async function handleProfileSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/dashboard/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone: phone || null,
          country: country || null,
          city: city || null,
          directoryOptIn,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Failed to update profile');
        return;
      }

      setProfile(data);
      toast.success('Profile updated');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  }

  async function handlePasswordSubmit(e: FormEvent) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setChangingPassword(true);

    try {
      const res = await fetch('/api/dashboard/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Failed to change password');
        return;
      }

      toast.success('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch {
      toast.error('Failed to change password');
    } finally {
      setChangingPassword(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-muted py-12">
        <Loader2 className="w-5 h-5 animate-spin" />
        Loading profile…
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <PortalPageHeader
        eyebrow="Account"
        title="My Profile"
        description="Update your personal details and account password."
      />

      <form onSubmit={handleProfileSubmit} className="mb-8">
        <PortalCard className="space-y-5">
          <h2 className={`${portalSectionTitleClass} mb-2`}>Personal Details</h2>

          <div className="space-y-2">
            <label htmlFor="email" className={portalFieldLabelClass}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={profile?.user.email ?? ''}
              disabled
              className={`${portalInputClass} opacity-60 cursor-not-allowed`}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="name" className={portalFieldLabelClass}>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={portalInputClass}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label htmlFor="phone" className={portalFieldLabelClass}>
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={portalInputClass}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="country" className={portalFieldLabelClass}>
                Country
              </label>
              <input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className={portalInputClass}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="city" className={portalFieldLabelClass}>
              City
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={portalInputClass}
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={directoryOptIn}
              onChange={(e) => setDirectoryOptIn(e.target.checked)}
              className="mt-1 rounded border-navy-100 text-brand-gold-500 focus:ring-brand-gold-500/50"
            />
            <span className="text-sm text-muted">
              Include me in the ICI coach directory (optional). Your contact details may be visible to
              prospective clients.
            </span>
          </label>

          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </PortalCard>
      </form>

      <form onSubmit={handlePasswordSubmit}>
        <PortalCard className="space-y-5">
          <h2 className={`${portalSectionTitleClass} mb-2`}>Change Password</h2>
          <p className="text-sm text-muted -mt-2 mb-4">
            Choose a strong password of at least 8 characters.
          </p>

          <div className="space-y-2">
            <label htmlFor="currentPassword" className={portalFieldLabelClass}>
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              required
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={portalInputClass}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="newPassword" className={portalFieldLabelClass}>
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              required
              minLength={8}
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={portalInputClass}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className={portalFieldLabelClass}>
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              required
              minLength={8}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={portalInputClass}
            />
          </div>

          <button
            type="submit"
            disabled={changingPassword}
            className="btn-secondary-light disabled:opacity-60"
          >
            {changingPassword ? 'Updating…' : 'Update Password'}
          </button>
        </PortalCard>
      </form>
    </div>
  );
}
