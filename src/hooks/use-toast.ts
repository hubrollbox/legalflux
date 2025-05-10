
import { Toaster as SonnerToaster } from "sonner";

interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

// Função para mostrar toast notifications
export function useToast() {
  const showToast = ({ title, description, variant }: ToastProps) => {
    if (variant === "destructive") {
      toast.error(title || "", { description });
    } else {
      toast(title || "", { description });
    }
  };

  return {
    toast: showToast,
  };
}

// Export the Toaster directly
export { Toaster } from "sonner";

// Export toast global functions
export const toast = {
  error: (title: string, options?: { description?: string }) => {
    if (typeof window !== 'undefined') {
      // Here we would normally call sonner.toast.error
      console.error(title, options?.description);
    }
  },
  success: (title: string, options?: { description?: string }) => {
    if (typeof window !== 'undefined') {
      // Here we would normally call sonner.toast.success
      console.log('SUCCESS:', title, options?.description);
    }
  },
  info: (title: string, options?: { description?: string }) => {
    if (typeof window !== 'undefined') {
      // Here we would normally call sonner.toast.info
      console.info(title, options?.description);
    }
  }
};

// Basic implementation to make the default export work
const toast = (title: string, options?: { description?: string }) => {
  if (typeof window !== 'undefined') {
    // Here we would normally call sonner.toast
    console.log(title, options?.description);
  }
};

export default toast;
