import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Função para obter o nome da função do utilizador
export function getUserRoleName(role?: string): string {
  switch (role) {
    case 'admin':
      return 'Administrador';
    case 'lawyer':
      return 'Advogado';
    case 'senior_lawyer':
      return 'Advogado Sénior';
    case 'assistant':
      return 'Assistente';
    case 'client':
      return 'Cliente';
    default:
      return 'Utilizador';
  }
}
