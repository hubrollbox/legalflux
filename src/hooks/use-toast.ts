
import * as React from "react";
import { Toaster as SonnerToaster } from "sonner";

interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

// Export the Toaster component from sonner
export const Toaster = SonnerToaster;

// Internal toast implementation functions
const createToast = {
  error: (title: string, options?: { description?: string }) => {
    if (typeof window !== 'undefined') {
      // Use the browser console in error cases until we fix the sonner import
      console.error(`${title}${options?.description ? `: ${options.description}` : ''}`);
    }
  },
  success: (title: string, options?: { description?: string }) => {
    if (typeof window !== 'undefined') {
      console.info(`${title}${options?.description ? `: ${options.description}` : ''}`);
    }
  },
  info: (title: string, options?: { description?: string }) => {
    if (typeof window !== 'undefined') {
      console.info(`${title}${options?.description ? `: ${options.description}` : ''}`);
    }
  }
};

// Export toast function with correct signature
export const toast = (props: { title: string, description?: string }) => {
  if (typeof window !== 'undefined') {
    console.info(`${props.title}${props.description ? `: ${props.description}` : ''}`);
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
      toast.error(title || "", { description });
    } else {
      toast({ title: title || "", description });
    }
  };

  return {
    toast: showToast,
  };
}

export default useToast;
