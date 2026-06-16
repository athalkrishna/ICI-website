import { ReactNode } from 'react';
import clsx from 'clsx';
import { portalCardClass, portalCardPadding } from './portal-styles';

type PortalCardProps = {
  children: ReactNode;
  className?: string;
  padding?: boolean;
};

export default function PortalCard({ children, className, padding = true }: PortalCardProps) {
  return (
    <div className={clsx(portalCardClass, padding && portalCardPadding, className)}>
      {children}
    </div>
  );
}
