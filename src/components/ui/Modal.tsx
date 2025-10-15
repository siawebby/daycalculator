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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop d-flex align-items-center justify-content-center" onClick={handleBackdropClick}>
      <div className={`modal-container d-flex flex-column ${className}`}>
        {(title || showCloseButton) && (
          <div className="modal-header d-flex justify-content-between align-items-center">
            {title && <h2 className="modal-title">{title}</h2>}
            {showCloseButton && (
              <Button 
                className="modal-close-btn d-flex align-items-center justify-content-center"
                onClick={onClose}
                aria-label="Закрыть"
              >
                <Icon name="check" />
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
