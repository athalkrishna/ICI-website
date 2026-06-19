import React from 'react';

type SectionSpacing = 'standard' | 'large' | 'hero' | 'compact' | 'none';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  spacing?: SectionSpacing;
  className?: string;
}

export default function Section({ 
  children, 
  spacing = 'standard', 
  className = '', 
  ...props 
}: SectionProps) {
  
  const spacingClasses = {
    standard: 'py-24',
    large: 'py-32',
    hero: 'pt-48 pb-32',
    compact: 'py-16',
    none: 'py-0',
  };

  const combinedClassName = `relative w-full max-w-full overflow-x-hidden ${spacingClasses[spacing]} ${className}`.trim();

  return (
    <section className={combinedClassName} {...props}>
      {children}
    </section>
  );
}
