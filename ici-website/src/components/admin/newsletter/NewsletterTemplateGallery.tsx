'use client';

import clsx from 'clsx';
import {
  LayoutTemplate,
  Calendar,
  Newspaper,
  GraduationCap,
  FileText,
  Sparkles,
} from 'lucide-react';

export type TemplateSummary = {
  id: string;
  name: string;
  description: string | null;
  thumbnailKey: string | null;
  blocks: unknown;
  isSystemDefault: boolean;
};

const THUMBNAIL_STYLES: Record<
  string,
  { icon: typeof LayoutTemplate; gradient: string }
> = {
  'institute-update': {
    icon: LayoutTemplate,
    gradient: 'from-brand-navy-900 to-navy-700',
  },
  'event-webinar': {
    icon: Calendar,
    gradient: 'from-navy-800 to-brand-gold-700',
  },
  'blog-digest': {
    icon: Newspaper,
    gradient: 'from-navy-700 to-navy-500',
  },
  'cohort-enrolment': {
    icon: GraduationCap,
    gradient: 'from-brand-navy-900 to-brand-gold-800',
  },
  blank: {
    icon: FileText,
    gradient: 'from-navy-100 to-cream-100',
  },
};

type Props = {
  templates: TemplateSummary[];
  loading?: boolean;
  onSelect: (template: TemplateSummary) => void;
  onClose: () => void;
  onRetry?: () => void;
};

export default function NewsletterTemplateGallery({
  templates,
  loading,
  onSelect,
  onClose,
  onRetry,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="p-6 border-b border-navy-100 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-brand-navy-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-gold-700" />
              Choose a template
            </h2>
            <p className="text-sm text-navy-500 mt-1">
              Start from a layout, then edit blocks in place. Plain / Blank keeps the original single editor.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-navy-500 hover:text-navy-800 shrink-0"
          >
            Cancel
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <p className="text-center text-navy-400 py-12">Loading templates…</p>
          ) : templates.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <p className="text-navy-600">No templates available yet.</p>
              <p className="text-sm text-navy-400">
                System templates are created automatically on first load. Try again, or use Plain / Blank
                after refresh.
              </p>
              {onRetry && (
                <button
                  type="button"
                  onClick={onRetry}
                  className="text-sm text-brand-gold-700 hover:underline"
                >
                  Retry loading templates
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => {
                const key = template.thumbnailKey ?? 'blank';
                const style = THUMBNAIL_STYLES[key] ?? THUMBNAIL_STYLES.blank;
                const Icon = style.icon;
                const isBlank = key === 'blank';

                return (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => onSelect(template)}
                    className="text-left group rounded-2xl border border-navy-100 overflow-hidden hover:border-brand-gold-500 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-brand-gold-500"
                  >
                    <div
                      className={clsx(
                        'h-28 flex items-center justify-center bg-gradient-to-br',
                        style.gradient,
                        isBlank && 'border-b border-navy-100',
                      )}
                    >
                      <Icon
                        className={clsx(
                          'w-10 h-10',
                          isBlank ? 'text-navy-400' : 'text-white/90',
                        )}
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-brand-navy-900 group-hover:text-brand-gold-800">
                          {template.name}
                        </h3>
                        {!template.isSystemDefault && (
                          <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-cream-100 text-navy-500">
                            Custom
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-navy-500 line-clamp-2">
                        {template.description ?? 'Custom newsletter layout'}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
