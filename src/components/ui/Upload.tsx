'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from './Button';
import { useToastStore } from '../../store/toastStore';

interface UploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number;
  className?: string;
  onImageSelect?: (file: File) => void;
}

export const Upload: React.FC<UploadProps> = ({ 
  onFileSelect,  
  accept = "image/jpeg,image/png",
  maxSize = 50 * 1024 * 1024, // 50MB
  className = '',
  onImageSelect
}) => { 
  const t = useTranslations('upload');
  const { addToast } = useToastStore();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Проверка расширения файла (разрешены только jpg, jpeg, png)
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        addToast({
          type: 'error',  
          title: t('errorFileType'),
          duration: 5000
        });
        return;
      }
      if (file.size > maxSize) {
        addToast({
          type: 'error',
          title: t('errorFileSize', { maxSize: maxSize / (1024 * 1024) }),
          duration: 5000
        });
        return;
      }
      
      // Если это изображение и есть обработчик для изображений, используем его
      if (file.type.startsWith('image/') && onImageSelect) {
        onImageSelect(file);
      } else {
        onFileSelect(file);
      }
    }
  };

  return (  
    <div className={`upload-container ${className}`}>
      <label htmlFor="upload-input" className="upload-dropzone d-flex align-items-center justify-content-center">
        <div className="upload-content">
          <div className="upload-title">{t('title')}</div>  
          <div className="upload-subtitle">{t('subtitle')}</div>
          <Button variant="secondary" type="button" className="btn-browse">
            {t('browseFile')}
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
