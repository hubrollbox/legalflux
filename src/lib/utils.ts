
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

// Status color utility for badges
export function getStatusColor(status: string): string {
  switch (status) {
    case 'active':
      return 'bg-green-500 text-white';
    case 'inactive':
      return 'bg-gray-400 text-white';
    case 'pending':
      return 'bg-yellow-500 text-white';
    case 'blocked':
      return 'bg-red-500 text-white';
    default:
      return 'bg-blue-500 text-white';
  }
}
