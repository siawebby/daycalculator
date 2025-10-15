'use client';

import React, { useEffect } from 'react';
import { Icon, Button } from './';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = '',
  showCloseButton = true
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop d-flex align-items-center justify-content-center">
      <div className={`modal-container d-flex flex-column ${className}`}>
        {(title || showCloseButton) && (
          <div className="modal-header d-flex justify-content-between align-items-center">
            {title && <h2 className="modal-title">{title}</h2>}
            {showCloseButton && (
              <Button 
                onClick={onClose}
                aria-label="Закрыть"
              >
                <Icon name="close" size='xl' />
              </Button>
            )}
          </div>
        )}
        <div className="modal-content d-flex flex-column">
          {children}
        </div>
      </div>
    </div>
  );
};
