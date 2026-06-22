'use client';

import clsx from 'clsx';
import { Monitor, Smartphone } from 'lucide-react';

type Props = {
  html: string;
  loading?: boolean;
};

export default function NewsletterPreviewPanel({ html, loading }: Props) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-navy-500">
        Preview how your newsletter renders in email clients. Branding footer is injected automatically.
      </p>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <PreviewFrame
          label="Desktop"
          icon={Monitor}
          width={600}
          html={html}
          loading={loading}
        />
        <PreviewFrame
          label="Mobile"
          icon={Smartphone}
          width={375}
          html={html}
          loading={loading}
        />
      </div>
    </div>
  );
}

function PreviewFrame({
  label,
  icon: Icon,
  width,
  html,
  loading,
}: {
  label: string;
  icon: typeof Monitor;
  width: number;
  html: string;
  loading?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2 text-sm font-medium text-navy-700">
        <Icon className="w-4 h-4" />
        {label}
        <span className="text-navy-400 font-normal">({width}px)</span>
      </div>
      <div
        className={clsx(
          'rounded-xl border border-navy-100 bg-cream-50 overflow-hidden',
          loading && 'opacity-60',
        )}
        style={{ maxWidth: width + 32 }}
      >
        {loading ? (
          <p className="p-8 text-center text-navy-400 text-sm">Generating preview…</p>
        ) : html ? (
          <iframe
            title={`${label} newsletter preview`}
            srcDoc={html}
            className="w-full bg-white"
            style={{ height: 520, maxWidth: width + 32 }}
            sandbox=""
          />
        ) : (
          <p className="p-8 text-center text-navy-400 text-sm">
            Add content to see a preview.
          </p>
        )}
      </div>
    </div>
  );
}
