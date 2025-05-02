
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "active":
    case "ativo":
    case "aprovado":
    case "concluído":
      return "bg-green-100 text-green-800";
    case "pending":
    case "pendente":
    case "em análise":
      return "bg-yellow-100 text-yellow-800";
    case "failed":
    case "falha":
    case "rejected":
    case "rejeitado":
      return "bg-red-100 text-red-800";
    case "processing":
    case "em processamento":
    case "em progresso":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export function getColorByPriority(priority: string): string {
  switch (priority.toLowerCase()) {
    case "high":
    case "alta":
    case "urgente":
      return "bg-red-100 text-red-800";
    case "medium":
    case "média":
      return "bg-yellow-100 text-yellow-800";
    case "low":
    case "baixa":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR'
  }).format(value);
};

export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-PT').format(dateObj);
};

export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-PT', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(dateObj);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 8 && 
    /[A-Z]/.test(password) && 
    /[0-9]/.test(password) && 
    /[^A-Za-z0-9]/.test(password);
};
