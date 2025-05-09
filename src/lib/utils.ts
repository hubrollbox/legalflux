
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'active':
    case 'online':
    case 'approved':
    case 'completed':
    case 'success':
    case 'paid':
    case 'verde':
      return 'bg-green-100 text-green-800';
    
    case 'pending':
    case 'waiting':
    case 'amarelo':
    case 'em análise':
    case 'em processamento':
      return 'bg-yellow-100 text-yellow-800';
    
    case 'failed':
    case 'error':
    case 'rejected':
    case 'cancelled':
    case 'inactive':
    case 'vermelho':
    case 'offline':
      return 'bg-red-100 text-red-800';
    
    case 'draft':
    case 'azul':
    case 'info':
      return 'bg-blue-100 text-blue-800';
      
    case 'archived':
    case 'cinza':
      return 'bg-gray-100 text-gray-800';
      
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export const formatDate = (date: Date | string) => {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d);
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
};

export const getUserRoleName = (role: string) => {
  switch (role) {
    case 'client':
      return 'Cliente';
    case 'lawyer':
      return 'Advogado';
    case 'senior_lawyer':
      return 'Advogado Sênior';
    case 'assistant':
      return 'Assistente';
    case 'ADMIN':
      return 'Administrador';
    default:
      return role;
  }
};
