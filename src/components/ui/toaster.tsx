
import React from 'react';
import { Toaster as SonnerToaster } from 'sonner';  // Usando sonner que está disponível no projeto

export type ToastProps = {
  id?: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive" | "success";
};

// Componente Toaster simplificado que usa o Sonner
export function Toaster() {
  return <SonnerToaster position="bottom-right" />;
}

// Hook useToast simplificado
export const useToast = () => {
  return {
    toast: (props?: ToastProps) => {
      // Simulate a toast function
      console.log('Toast:', props?.title, props?.description);
      return null;
    }
  };
};

// Componentes de compatibilidade
export const Toast: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
export const ToastClose: React.FC = () => null;
export const ToastDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
export const ToastTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
export const ToastViewport: React.FC = () => null;
