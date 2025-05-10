
import { toast as sonnerToast, Toaster } from "sonner";

interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

// Function to show toast notifications
export function useToast() {
  const showToast = ({ title, description, variant }: ToastProps) => {
    if (variant === "destructive") {
      sonnerToast.error(title, {
        description: description
      });
    } else {
      sonnerToast(title, {
        description: description
      });
    }
  };

  return {
    toast: showToast,
  };
}

// Export the Toaster directly
export { Toaster };
// Export the sonnerToast as toast for direct usage
export const toast = sonnerToast;
