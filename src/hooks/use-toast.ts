
import { toast as sonnerToast, Toaster } from "sonner";

interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

// Função para mostrar toast notifications
export function useToast() {
  const showToast = ({ title, description, variant }: ToastProps) => {
    if (variant === "destructive") {
      sonnerToast.error(title || "", { description });
    } else {
      sonnerToast(title || "", { description });
    }
  };

  return {
    toast: showToast,
  };
}

// Export the Toaster directly
export { Toaster };

// Export toast global functions
export const toast = {
  error: (title: string, options?: { description?: string }) => {
    sonnerToast.error(title, { description: options?.description });
  },
  success: (title: string, options?: { description?: string }) => {
    sonnerToast.success(title, { description: options?.description });
  },
  info: (title: string, options?: { description?: string }) => {
    sonnerToast.info(title, { description: options?.description });
  }
};
