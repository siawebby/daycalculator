'use client';

import React from 'react';

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ 
  id, 
  checked, 
  onChange, 
  label, 
  className = '' 
}) => {
  return (
    <label htmlFor={id} className={`checkbox-label ${className}`}>
      <input 
        type="checkbox" 
        id={id} 
        className="checkbox-hidden"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="checkbox-custom"></div>
      {label && <span className="checkbox-text">{label}</span>}
    </label>
  );
};
