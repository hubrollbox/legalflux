
import React from 'react';
import { toast } from 'sonner';  // Usando sonner que está disponível no projeto

export type ToastProps = {
  id?: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive" | "success";
};

// Componente Toaster simplificado
export function Toaster() {
  // Componente vazio que será melhorado quando o toast real for implementado
  return null;
}

// Hook useToast simplificado
export const useToast = () => {
  return {
    toast: (props?: ToastProps) => {
      if (props) {
        return toast(props.title, {
          description: props.description,
        });
      }
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
