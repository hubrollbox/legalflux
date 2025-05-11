
import * as React from "react";
import { toast as sonnerToast, Toaster as SonnerToaster } from "sonner";

interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

// Export the Toaster component from sonner
export const Toaster: React.FC = (props) => React.createElement(SonnerToaster, props);

// Internal toast implementation functions
const createToast = {
  error: (title: string, options?: { description?: string }) => {
    if (typeof window !== 'undefined') {
      sonnerToast.error(title, { description: options?.description });
    }
  },
  success: (title: string, options?: { description?: string }) => {
    if (typeof window !== 'undefined') {
      sonnerToast.success(title, { description: options?.description });
    }
  },
  info: (title: string, options?: { description?: string }) => {
    if (typeof window !== 'undefined') {
      sonnerToast.info(title, { description: options?.description });
    }
  }
};

// Export toast function with correct signature
export const toast = (props: { title: string, description?: string, variant?: "default" | "destructive" }) => {
  if (typeof window !== 'undefined') {
    if (props.variant === "destructive") {
      sonnerToast.error(props.title, { description: props.description });
    } else {
      sonnerToast(props.title, { description: props.description });
    }
  }
  return null; // Return null to avoid type errors
};

// Add methods to the toast function
toast.error = createToast.error;
toast.success = createToast.success;
toast.info = createToast.info;

// Hook for using toast in components
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

export default useToast;
