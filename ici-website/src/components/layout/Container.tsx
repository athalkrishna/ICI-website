import React from 'react';

type ContainerSize = 'default' | 'mid' | 'narrow';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: ContainerSize;
  className?: string;
}

export default function Container({ 
  children, 
  size = 'default', 
  className = '', 
  ...props 
}: ContainerProps) {
  
  const baseClasses = 'mx-auto w-full max-w-full px-4 lg:px-8';
  
  const sizeClasses = {
    default: 'max-w-[1440px]',
    mid: 'max-w-5xl',
    narrow: 'max-w-3xl',
  };

  const combinedClassName = `${sizeClasses[size]} ${baseClasses} ${className}`.trim();

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
}
