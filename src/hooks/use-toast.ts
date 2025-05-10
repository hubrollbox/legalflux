
import { Toaster } from "sonner";

interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

// Function to show toast notifications
export function useToast() {
  const showToast = ({ title, description, variant }: ToastProps) => {
    if (variant === "destructive") {
      console.error(title, description);
    } else {
      console.log(title, description);
    }
  };

  return {
    toast: showToast,
  };
}

// Export Toaster component
export { Toaster };
