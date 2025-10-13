'use client';

import React from 'react';

interface SwitcherProps {
  options: { value: string; label: string }[];
  activeValue: string;
  onChange: (value: string) => void;
  variant?: 'default' | 'since';
  className?: string;
}

export const Switcher: React.FC<SwitcherProps> = ({ 
  options, 
  activeValue, 
  onChange, 
  variant = 'default',
  className = '' 
}) => {
  return (
    <div className={`switcher switcher--${variant} ${className} d-flex`}>
      {options.map((option) => (
        <button
          key={option.value}
          className={activeValue === option.value ? 'active' : ''}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}; 
