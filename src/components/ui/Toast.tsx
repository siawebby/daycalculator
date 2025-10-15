'use client';

import React, { useEffect, useState } from 'react';
import { Icon } from './Icon'; 

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

export function Toast({ id, type, title, message, duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose(id);
    }, 300); // Match CSS transition duration
  };

  return (
    <div 
      className={`toast show toast--${type} ${isVisible ? 'toast--visible' : ''} ${isLeaving ? 'toast--leaving' : ''}`}
      role="alert"
      aria-live="polite"
    >
      <div className="toast__content d-flex align-items-start">
        <div className="toast__text flex-grow-1"> 
          <div className="toast__title">{title}</div>
          {message && <div className="toast__message">{message}</div>}
        </div>
        <button 
          className="toast__close d-flex align-items-center justify-content-center"
          onClick={handleClose}
          aria-label="Close notification"
        > 
          <Icon name="close-toast" />
        </button>
      </div>
    </div>
  );
}

// Toast Container Component
export interface ToastContainerProps {
  toasts: ToastProps[];
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container d-flex flex-column">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={onClose}
        />
      ))}
    </div>
  );
}
