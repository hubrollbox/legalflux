
import { ReactElement } from "react";

/*
 * Este componente é um wrapper para o toast da biblioteca Sonner.
 * A implementação original estava usando @radix-ui/react-toast que não está instalado,
 * então vamos usar Sonner que já é importado em use-toast.ts
 */

export type ToastProps = {
  id?: string;
  title?: string;
  description?: string;
  action?: ReactElement;
  variant?: "default" | "destructive" | "success";
};

// Componentes vazios apenas para compatibilidade com código existente
export const Toast = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const ToastClose = () => null;
export const ToastDescription = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const ToastProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const ToastTitle = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const ToastViewport = () => null;

// Essa implementação será substituída pela sonner na aplicação real
export const useToast = () => {
  return {
    toasts: [] as ToastProps[],
  };
};
