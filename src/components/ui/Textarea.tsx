'use client';

import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'upload';
}

export const Textarea: React.FC<TextareaProps> = ({ 
  variant = 'default', 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'textarea-base';
  const variantClasses = {
    default: 'textarea-default',
    upload: 'textarea-upload'
  };
  
  return (
    <textarea 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
};
