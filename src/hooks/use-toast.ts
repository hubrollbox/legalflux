
import { Toaster } from "sonner";

interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

// Função para mostrar toast notifications
export function useToast() {
  const showToast = ({ title, description, variant }: ToastProps) => {
    if (variant === "destructive") {
      // Usando a API correta do Toaster
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('toast', {
          detail: {
            type: 'error',
            title,
            description
          }
        }));
      }
    } else {
      // Toast padrão
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('toast', {
          detail: {
            type: 'default',
            title,
            description
          }
        }));
      }
    }
  };

  return {
    toast: showToast,
  };
}

// Export the Toaster directly
export { Toaster };

// Export uma função toast global compatível
export const toast = {
  error: (title: string, options?: { description?: string }) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('toast', {
        detail: {
          type: 'error',
          title,
          description: options?.description
        }
      }));
    }
  },
  success: (title: string, options?: { description?: string }) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('toast', {
        detail: {
          type: 'success',
          title,
          description: options?.description
        }
      }));
    }
  },
  info: (title: string, options?: { description?: string }) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('toast', {
        detail: {
          type: 'info',
          title,
          description: options?.description
        }
      }));
    }
  }
};
