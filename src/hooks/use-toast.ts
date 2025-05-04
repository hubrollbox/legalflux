
// Re-export the sonner toast
import { toast } from "sonner";

export { toast };

// Typed interface for our toast
export type ToastProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive" | "success";
};

// Custom hook for toast
export const useToast = () => {
  const showToast = ({
    title,
    description,
    variant = "default",
    action,
  }: ToastProps) => {
    if (variant === "destructive") {
      return toast.error(title, { description, action });
    }
    
    if (variant === "success") {
      return toast.success(title, { description, action });
    }
    
    return toast(title, { description, action });
  };

  return {
    toast: showToast,
  };
};

export default useToast;
