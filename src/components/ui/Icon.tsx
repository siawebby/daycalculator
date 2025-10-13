'use client';

import React from 'react';

interface IconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5', 
    lg: 'w-6 h-6',
    xl: 'w-7 h-7' 
  }; 
  
  return (
    <img 
      src={`/assets/icons/${name}.svg`} 
      alt={name}
      className={`${sizeClasses[size]} ${className}`}
    />
  );
};
