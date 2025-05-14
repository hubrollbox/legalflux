
import { Toaster as sonnerToast } from "sonner";

export function useToast() {
  return {
    toast: sonnerToast
  };
}

export { sonnerToast as Toaster };
