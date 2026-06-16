import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';
import { portalCardClass } from './portal-styles';

type PortalStatCardProps = {
  label: string;
  value: string | number;
  sub?: string;
  icon: LucideIcon;
  className?: string;
};

export default function PortalStatCard({
  label,
  value,
  sub,
  icon: Icon,
  className,
}: PortalStatCardProps) {
  return (
    <div className={clsx(portalCardClass, 'p-6', className)}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-muted font-medium text-sm">{label}</h3>
        <Icon size={20} className="text-brand-gold-500 shrink-0" />
      </div>
      <p className="text-4xl font-bold font-display text-brand-navy-900 mb-1">{value}</p>
      {sub && <p className="text-xs text-muted">{sub}</p>}
    </div>
  );
}
