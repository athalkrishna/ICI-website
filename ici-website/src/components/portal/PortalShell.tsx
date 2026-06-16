import { ReactNode } from 'react';
import clsx from 'clsx';
import { portalShellClass, portalMainClass } from './portal-styles';

type PortalShellProps = {
  sidebar: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function PortalShell({ sidebar, children, className }: PortalShellProps) {
  return (
    <div className={clsx(portalShellClass, className)}>
      {sidebar}
      <main className={portalMainClass}>{children}</main>
    </div>
  );
}
