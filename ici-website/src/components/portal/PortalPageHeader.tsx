import clsx from 'clsx';
import { ReactNode } from 'react';
import { portalEyebrowClass } from './portal-styles';

type PortalPageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
};

export default function PortalPageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: PortalPageHeaderProps) {
  return (
    <div className={clsx('flex flex-wrap justify-between items-end gap-4 mb-8', className)}>
      <div>
        {eyebrow && <p className={clsx(portalEyebrowClass, 'mb-2')}>{eyebrow}</p>}
        <h1 className="text-h2 text-brand-navy-900 mb-1">{title}</h1>
        {description && (
          <p className="text-muted text-body max-w-3xl leading-relaxed">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-3 shrink-0">{actions}</div>}
    </div>
  );
}
