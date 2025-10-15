'use client';

import { create } from 'zustand';
import { ToastProps, ToastType } from '../components/ui/Toast';

type ToastState = {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, 'id' | 'onClose'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
};

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  
  addToast: (toast) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastProps = {
      ...toast,
      id,
      onClose: (id: string) => {
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id)
        }));
      }
    };
    
    set((state) => ({
      toasts: [...state.toasts, newToast]
    }));
  },
  
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id)
    }));
  },
  
  clearToasts: () => {
    set({ toasts: [] });
  }
}));
