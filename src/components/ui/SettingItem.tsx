'use client';

import React from 'react';
import { Icon } from './Icon';

interface SettingItemProps {
  label: string;
  icon?: string;
  children: React.ReactNode;
  className?: string;
}

export const SettingItem: React.FC<SettingItemProps> = ({ 
  label, 
  icon, 
  children, 
  className = '' 
}) => {
  return (
    <div className={`setting-item d-flex justify-content-between align-items-center ${className}`}>
      <div className="setting-label d-flex align-items-center">
        {icon && <Icon name={icon} />}
        {label}
      </div>
      <div className="setting-input d-flex">
        {children}
      </div>
    </div>
  );
};
