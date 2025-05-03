
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidPassword(password: string): boolean {
  // Pelo menos 8 caracteres
  if (password.length < 8) return false;
  
  // Pelo menos uma letra maiúscula
  if (!/[A-Z]/.test(password)) return false;
  
  // Pelo menos um número
  if (!/\d/.test(password)) return false;
  
  // Pelo menos um caractere especial
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;
  
  return true;
}
