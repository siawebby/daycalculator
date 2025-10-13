'use client';

import React from 'react';
import { Button } from './Button';

interface UploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number;
  className?: string;
}

export const Upload: React.FC<UploadProps> = ({ 
  onFileSelect, 
  accept = "image/*,video/*,.pdf,.mp4",
  maxSize = 50 * 1024 * 1024, // 50MB
  className = '' 
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > maxSize) {
        alert(`Файл слишком большой. Максимальный размер: ${maxSize / (1024 * 1024)}MB`);
        return;
      }
      onFileSelect(file);
    }
  };

  return (  
    <div className={`upload-container ${className}`}>
      <label htmlFor="upload-input" className="upload-dropzone d-flex align-items-center justify-content-center">
        <div className="upload-content">
          <div className="upload-title">Choose a file or drag & drop it here</div>
          <div className="upload-subtitle">JPEG, PNG, PDF, and MP4 formats, up to 50MB</div>
          <Button variant="secondary" type="button" className="btn-browse">
            Browse File
          </Button>
        </div>
      </label>
      <input 
        id="upload-input"
        type="file" 
        className="upload-input"
        accept={accept}
        onChange={handleFileChange}
      />
    </div>
  );
};
