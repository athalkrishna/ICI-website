'use client';

import clsx from 'clsx';
import { ImageIcon, X } from 'lucide-react';
import { formatEnumLabel } from '@/lib/admin-utils';

export type EventFormState = {
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  coverImageUrl: string;
  coverImageAlt: string;
  eventType: string;
  startDate: string;
  endDate: string;
  timezone: string;
  locationType: string;
  locationDetail: string;
  registrationLink: string;
  isFree: boolean;
  status: string;
  featured: boolean;
  maxAttendees: string;
  metaTitle: string;
  metaDescription: string;
};

export const EVENT_TYPES = [
  'WEBINAR',
  'SUMMIT',
  'WORKSHOP',
  'MASTERCLASS',
  'COMMUNITY_CALL',
  'OTHER',
] as const;

export const EVENT_STATUSES = ['UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED'] as const;

export const LOCATION_TYPES = ['ONLINE', 'IN_PERSON', 'HYBRID'] as const;

export const emptyEventForm = (): EventFormState => ({
  title: '',
  slug: '',
  description: '',
  fullDescription: '',
  coverImageUrl: '',
  coverImageAlt: '',
  eventType: 'WEBINAR',
  startDate: '',
  endDate: '',
  timezone: 'Asia/Kolkata',
  locationType: 'ONLINE',
  locationDetail: '',
  registrationLink: '',
  isFree: true,
  status: 'UPCOMING',
  featured: false,
  maxAttendees: '',
  metaTitle: '',
  metaDescription: '',
});

const inputClass =
  'w-full p-3 text-sm border border-navy-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold-400/40';
const labelClass = 'block text-xs font-semibold text-brand-navy-900 mb-1.5';

function CharCount({
  value,
  max,
  recommended,
}: {
  value: string;
  max: number;
  recommended?: number;
}) {
  const len = value.length;
  const overRecommended = recommended !== undefined && len > recommended;
  return (
    <span className={clsx('text-xs', overRecommended ? 'text-amber-600' : 'text-muted')}>
      {len}/{max}
      {recommended !== undefined && ` · aim for ${recommended} or fewer`}
    </span>
  );
}

function toDatetimeLocalValue(iso: string) {
  if (!iso) return '';
  const date = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

type EventEditorProps = {
  form: EventFormState;
  onChange: (form: EventFormState) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  onPickCoverImage: () => void;
  saving: boolean;
  mode: 'create' | 'edit';
};

export default function EventEditor({
  form,
  onChange,
  onSubmit,
  onCancel,
  onPickCoverImage,
  saving,
  mode,
}: EventEditorProps) {
  const set = (patch: Partial<EventFormState>) => onChange({ ...form, ...patch });

  return (
    <form
      onSubmit={onSubmit}
      className="relative bg-white rounded-2xl shadow-xl border border-navy-100 w-full max-w-3xl p-6 space-y-6 max-h-[90vh] overflow-y-auto"
    >
      <div>
        <h2 className="text-h3 text-brand-navy-900">
          {mode === 'create' ? 'New Event' : 'Edit Event'}
        </h2>
        <p className="text-sm text-muted mt-1">Event details, cover image, and SEO settings.</p>
      </div>

      <section className="space-y-4 rounded-2xl border-2 border-brand-gold-400/30 bg-gradient-to-b from-cream-50 to-white p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-brand-navy-900">Cover image</h3>
            <p className="text-xs text-muted mt-0.5">Used on event cards, hero, and social sharing.</p>
          </div>
          {form.coverImageUrl && (
            <button
              type="button"
              onClick={() => set({ coverImageUrl: '', coverImageAlt: '' })}
              className="inline-flex items-center gap-1 text-xs text-red-600 hover:underline"
            >
              <X size={14} />
              Remove
            </button>
          )}
        </div>

        {form.coverImageUrl ? (
          <div className="relative rounded-xl overflow-hidden border border-navy-100 bg-navy-900/5 aspect-[16/9] max-h-64">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={form.coverImageUrl}
              alt={form.coverImageAlt || form.title || 'Event cover preview'}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={onPickCoverImage}
            className="w-full aspect-[16/9] max-h-52 rounded-xl border-2 border-dashed border-brand-gold-400/50 bg-white flex flex-col items-center justify-center gap-2 text-brand-navy-900 hover:bg-cream-50 transition"
          >
            <ImageIcon size={32} className="text-brand-gold-600" />
            <span className="text-sm font-medium">Select cover image</span>
          </button>
        )}

        <button
          type="button"
          onClick={onPickCoverImage}
          className="px-4 py-2 text-sm font-medium border border-navy-100 rounded-xl hover:bg-white"
        >
          {form.coverImageUrl ? 'Change image' : 'Open media library'}
        </button>

        <div>
          <label className={labelClass}>Image URL</label>
          <input
            type="url"
            value={form.coverImageUrl}
            onChange={(e) => set({ coverImageUrl: e.target.value })}
            className={inputClass}
            placeholder="https://…"
          />
        </div>
        <div>
          <label className={labelClass}>Alt text</label>
          <input
            value={form.coverImageAlt}
            onChange={(e) => set({ coverImageAlt: e.target.value })}
            className={inputClass}
            placeholder="Describe the image for accessibility and SEO"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-bold text-brand-navy-900 border-b border-navy-100 pb-2">
          Event details
        </h3>
        <div>
          <label className={labelClass}>Title</label>
          <input
            required
            value={form.title}
            onChange={(e) => set({ title: e.target.value })}
            className={inputClass}
            placeholder="Event title"
          />
        </div>
        <div>
          <label className={labelClass}>URL slug</label>
          <input
            value={form.slug}
            onChange={(e) =>
              set({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })
            }
            className={inputClass}
            placeholder="auto-generated-from-title if left blank"
            pattern="^[a-z0-9-]*$"
          />
          <p className="text-xs text-muted mt-1">Used in the URL: /events/your-slug-here</p>
        </div>
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className={labelClass}>Short description</label>
            <CharCount value={form.description} max={500} recommended={160} />
          </div>
          <textarea
            required
            value={form.description}
            onChange={(e) => set({ description: e.target.value })}
            className={inputClass}
            rows={2}
            placeholder="Shown on cards and used as fallback meta description"
          />
        </div>
        <div>
          <label className={labelClass}>Full description (HTML)</label>
          <textarea
            required
            value={form.fullDescription}
            onChange={(e) => set({ fullDescription: e.target.value })}
            className={inputClass}
            rows={5}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Type</label>
            <select
              value={form.eventType}
              onChange={(e) => set({ eventType: e.target.value })}
              className={inputClass}
            >
              {EVENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {formatEnumLabel(t)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select
              value={form.status}
              onChange={(e) => set({ status: e.target.value })}
              className={inputClass}
            >
              {EVENT_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {formatEnumLabel(s)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Location type</label>
            <select
              value={form.locationType}
              onChange={(e) => set({ locationType: e.target.value })}
              className={inputClass}
            >
              {LOCATION_TYPES.map((t) => (
                <option key={t} value={t}>
                  {formatEnumLabel(t)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Timezone</label>
            <input
              value={form.timezone}
              onChange={(e) => set({ timezone: e.target.value })}
              className={inputClass}
              placeholder="Asia/Kolkata"
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Location detail</label>
          <input
            value={form.locationDetail}
            onChange={(e) => set({ locationDetail: e.target.value })}
            className={inputClass}
            placeholder="Zoom link, venue name, or address"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Start</label>
            <input
              required
              type="datetime-local"
              value={form.startDate}
              onChange={(e) => set({ startDate: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>End</label>
            <input
              required
              type="datetime-local"
              value={form.endDate}
              onChange={(e) => set({ endDate: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Registration link</label>
          <input
            type="url"
            value={form.registrationLink}
            onChange={(e) => set({ registrationLink: e.target.value })}
            className={inputClass}
            placeholder="https://…"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Max attendees</label>
            <input
              type="number"
              min={1}
              value={form.maxAttendees}
              onChange={(e) => set({ maxAttendees: e.target.value })}
              className={inputClass}
              placeholder="Optional"
            />
          </div>
          <div className="flex flex-col justify-end gap-3 pb-1">
            <label className="flex items-center gap-2 text-sm text-brand-navy-900 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isFree}
                onChange={(e) => set({ isFree: e.target.checked })}
                className="rounded border-navy-200"
              />
              Free event
            </label>
            <label className="flex items-center gap-2 text-sm text-brand-navy-900 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => set({ featured: e.target.checked })}
                className="rounded border-navy-200"
              />
              Featured event
            </label>
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-xl bg-cream-50 border border-navy-100 p-4">
        <div>
          <h3 className="text-sm font-bold text-brand-navy-900">SEO</h3>
          <p className="text-xs text-muted mt-1">
            Custom search title and description. Leave blank to use the event title and short
            description.
          </p>
        </div>
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className={labelClass}>Meta title</label>
            <CharCount value={form.metaTitle} max={70} recommended={60} />
          </div>
          <input
            value={form.metaTitle}
            onChange={(e) => set({ metaTitle: e.target.value })}
            className={inputClass}
            placeholder={form.title || 'Defaults to event title'}
            maxLength={70}
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className={labelClass}>Meta description</label>
            <CharCount value={form.metaDescription} max={320} recommended={160} />
          </div>
          <textarea
            value={form.metaDescription}
            onChange={(e) => set({ metaDescription: e.target.value })}
            className={inputClass}
            rows={3}
            maxLength={320}
            placeholder={form.description || 'Defaults to short description'}
          />
        </div>
        <div>
          <p className="text-xs font-semibold text-brand-navy-900 mb-2">Search preview</p>
          <div className="rounded-lg border border-navy-100 bg-white p-4 space-y-1.5">
            <p className="text-[#1a0dab] text-lg font-normal leading-snug line-clamp-1">
              {form.metaTitle.trim() || form.title || 'Event title'}
            </p>
            <p className="text-[#006621] text-sm line-clamp-1">
              internationalcoachinginstitute.org › events › {form.slug || 'your-slug'}
            </p>
            <p className="text-sm text-[#545454] leading-relaxed line-clamp-2">
              {form.metaDescription.trim() ||
                form.description ||
                'Your short description will appear here as the search result description.'}
            </p>
          </div>
        </div>
      </section>

      <div className="flex justify-end gap-3 pt-2 border-t border-navy-100">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm border border-navy-100 rounded-xl">
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 text-sm text-white bg-brand-navy-900 rounded-xl disabled:opacity-50"
        >
          {saving ? 'Saving…' : mode === 'create' ? 'Create event' : 'Save changes'}
        </button>
      </div>
    </form>
  );
}

export function eventToForm(event: Record<string, unknown>): EventFormState {
  return {
    title: String(event.title ?? ''),
    slug: String(event.slug ?? ''),
    description: String(event.description ?? ''),
    fullDescription: String(event.fullDescription ?? ''),
    coverImageUrl: String(event.coverImageUrl ?? ''),
    coverImageAlt: String(event.coverImageAlt ?? ''),
    eventType: String(event.eventType ?? 'WEBINAR'),
    startDate: toDatetimeLocalValue(String(event.startDate ?? '')),
    endDate: toDatetimeLocalValue(String(event.endDate ?? '')),
    timezone: String(event.timezone ?? 'Asia/Kolkata'),
    locationType: String(event.locationType ?? 'ONLINE'),
    locationDetail: String(event.locationDetail ?? ''),
    registrationLink: String(event.registrationLink ?? ''),
    isFree: event.isFree !== false,
    status: String(event.status ?? 'UPCOMING'),
    featured: Boolean(event.featured),
    maxAttendees: event.maxAttendees != null ? String(event.maxAttendees) : '',
    metaTitle: String(event.metaTitle ?? ''),
    metaDescription: String(event.metaDescription ?? ''),
  };
}

export function formToEventPayload(form: EventFormState) {
  return {
    title: form.title.trim(),
    ...(form.slug.trim() ? { slug: form.slug.trim() } : {}),
    description: form.description.trim(),
    fullDescription: form.fullDescription,
    coverImageUrl: form.coverImageUrl.trim() || null,
    coverImageAlt: form.coverImageAlt.trim() || null,
    eventType: form.eventType,
    startDate: new Date(form.startDate).toISOString(),
    endDate: new Date(form.endDate).toISOString(),
    timezone: form.timezone.trim() || 'Asia/Kolkata',
    locationType: form.locationType,
    locationDetail: form.locationDetail.trim() || null,
    registrationLink: form.registrationLink.trim() || null,
    isFree: form.isFree,
    status: form.status,
    featured: form.featured,
    maxAttendees: form.maxAttendees.trim() ? Number(form.maxAttendees) : null,
    metaTitle: form.metaTitle.trim() || null,
    metaDescription: form.metaDescription.trim() || null,
  };
}

export function eventSeoComplete(
  event: Pick<EventFormState, 'title' | 'description' | 'metaTitle' | 'metaDescription'>,
) {
  const title = event.metaTitle.trim() || event.title.trim();
  const description = event.metaDescription.trim() || event.description.trim();
  return Boolean(title && description);
}
