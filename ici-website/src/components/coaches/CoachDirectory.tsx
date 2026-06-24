'use client';

import { useMemo, useState } from 'react';
import type { CoachListing } from '@/lib/coaches';
import {
  COACH_AVAILABILITY_OPTIONS,
  COACH_LEVEL_OPTIONS,
  COACH_SPECIALISATION_OPTIONS,
} from '@/lib/coach-labels';
import CoachCard from '@/components/coaches/CoachCard';

type CoachDirectoryProps = {
  coaches: CoachListing[];
  labels: {
    specialism: string;
    specialismAll: string;
    level: string;
    levelAll: string;
    language: string;
    languageAll: string;
    availability: string;
    availabilityAll: string;
    empty: string;
  };
};

export default function CoachDirectory({ coaches, labels }: CoachDirectoryProps) {
  const [specialism, setSpecialism] = useState('');
  const [level, setLevel] = useState('');
  const [language, setLanguage] = useState('');
  const [availability, setAvailability] = useState('');

  const languageOptions = useMemo(() => {
    const set = new Set<string>();
    coaches.forEach((c) => c.languages.forEach((lang) => set.add(lang)));
    return Array.from(set).sort();
  }, [coaches]);

  const filtered = useMemo(() => {
    return coaches.filter((coach) => {
      if (specialism && coach.specialisation !== specialism) return false;
      if (level && coach.credentialLevel !== level) return false;
      if (language && !coach.languages.some((l) => l.toLowerCase() === language.toLowerCase())) return false;
      if (availability && coach.availability !== availability) return false;
      return true;
    });
  }, [coaches, specialism, level, language, availability]);

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          <label className="block mb-2 relative z-10 text-eyebrow text-brand-navy-700">{labels.specialism}</label>
          <select
            value={specialism}
            onChange={(e) => setSpecialism(e.target.value)}
            className="w-full bg-cream-50 border border-navy-200 rounded-xl px-4 py-3.5 text-brand-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-gold-400 font-body appearance-none"
          >
            <option value="">{labels.specialismAll}</option>
            {COACH_SPECIALISATION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block mb-2 relative z-10 text-eyebrow text-brand-navy-700">{labels.level}</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full bg-cream-50 border border-navy-200 rounded-xl px-4 py-3.5 text-brand-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-gold-400 font-body appearance-none"
          >
            <option value="">{labels.levelAll}</option>
            {COACH_LEVEL_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block mb-2 relative z-10 text-eyebrow text-brand-navy-700">{labels.language}</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-cream-50 border border-navy-200 rounded-xl px-4 py-3.5 text-brand-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-gold-400 font-body appearance-none"
          >
            <option value="">{labels.languageAll}</option>
            {languageOptions.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block mb-2 relative z-10 text-eyebrow text-brand-navy-700">{labels.availability}</label>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="w-full bg-cream-50 border border-navy-200 rounded-xl px-4 py-3.5 text-brand-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-gold-400 font-body appearance-none"
          >
            <option value="">{labels.availabilityAll}</option>
            {COACH_AVAILABILITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-sm text-muted mt-6 mb-8">
        {filtered.length} coach{filtered.length === 1 ? '' : 'es'}
        {(specialism || level || language || availability) && ` matching your filters`}
      </p>

      {filtered.length === 0 ? (
        <p className="text-center text-muted py-12 bg-white border border-navy-100 rounded-2xl">{labels.empty}</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((coach) => (
            <CoachCard key={coach.id} coach={coach} />
          ))}
        </div>
      )}
    </>
  );
}
