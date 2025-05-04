
import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
};

// Wrapper para compatibilidade com shadcn/ui toast
export const toast = ({ title, description, variant }: ToastProps = {}) => {
  if (variant === "destructive") {
    return sonnerToast.error(title, {
      description
    });
  } else if (variant === "success") {
    return sonnerToast.success(title, {
      description
    });
  } else {
    return sonnerToast(title || "", {
      description
    });
  }
};

export const useToast = () => {
  return {
    toast
  };
};
