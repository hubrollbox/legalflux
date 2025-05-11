
import { toast, Toaster as SonnerToaster } from "sonner";

export type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
};

export function useToast() {
  return {
    toast: ({ title, description, variant }: ToastProps) => {
      if (typeof window !== "undefined") {
        if (variant === "destructive") {
          sonnerToast.error(title || "", { description });
        } else if (variant === "success") {
          sonnerToast.success(title || "", { description });
        } else {
          sonnerToast(title || "", { description });
        }
      }
    },
  };
}

export const Toaster = SonnerToaster;
