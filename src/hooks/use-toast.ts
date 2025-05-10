
import { toast as sonnerToast, Toaster as SonnerToaster } from "sonner";

interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

// Export the Toaster component from sonner
export { Toaster } from "sonner";

// Toast function implementation
const toastImpl = {
  error: (title: string, options?: { description?: string }) => {
    if (typeof window !== 'undefined') {
      sonnerToast.error(title, {
        description: options?.description
      });
    }
  },
  success: (title: string, options?: { description?: string }) => {
    if (typeof window !== 'undefined') {
      sonnerToast.success(title, {
        description: options?.description
      });
    }
  },
  info: (title: string, options?: { description?: string }) => {
    if (typeof window !== 'undefined') {
      sonnerToast.info(title, {
        description: options?.description
      });
    }
  }
};

// Export toast function
export const toast = (title: string, options?: { description?: string }) => {
  if (typeof window !== 'undefined') {
    sonnerToast(title, {
      description: options?.description
    });
  }
};

// Add methods to the toast function
toast.error = toastImpl.error;
toast.success = toastImpl.success;
toast.info = toastImpl.info;

// Hook for using toast in components
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

export default toast;
