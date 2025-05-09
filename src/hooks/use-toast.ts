
import { toast } from "sonner";
import { Toaster } from "sonner";

interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

export function useToast() {
  const showToast = ({ title, description, variant }: ToastProps) => {
    if (variant === "destructive") {
      toast.error(title, {
        description,
      });
    } else {
      toast(title, {
        description,
      });
    }
  };

  return {
    toast: showToast,
  };
}

export { toast, Toaster };
