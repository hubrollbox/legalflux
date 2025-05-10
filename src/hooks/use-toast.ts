
import { Toaster as SonnerToaster } from "sonner";

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

// Default toast function
export function toast(title: string, options?: { description?: string }) {
  if (typeof window !== 'undefined') {
    // Here we would normally call sonner.toast
    console.log(title, options?.description);
  }
}

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
