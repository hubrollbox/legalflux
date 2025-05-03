
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

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'active':
    case 'ativo':
    case 'aprovado':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'pending':
    case 'pendente':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'closed':
    case 'fechado':
    case 'concluído':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'rejected':
    case 'rejeitado':
    case 'cancelado':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

export function getColorByPriority(priority: string): string {
  switch (priority) {
    case 'high':
      return 'text-red-600 bg-red-100 border-red-200';
    case 'medium':
      return 'text-amber-600 bg-amber-100 border-amber-200';
    case 'low':
      return 'text-green-600 bg-green-100 border-green-200';
    default:
      return 'text-gray-600 bg-gray-100 border-gray-200';
  }
}
