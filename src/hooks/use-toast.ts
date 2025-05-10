
import { toast as sonnerToast } from "sonner";
import { Toaster } from "sonner";

interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

export function useToast() {
  const showToast = ({ title, description, variant }: ToastProps) => {
    if (variant === "destructive") {
      sonnerToast.error(title, {
        description,
      });
    } else {
      sonnerToast(title, {
        description,
      });
    }
  };

  return {
    toast: showToast,
  };
}

export { sonnerToast as toast, Toaster };
