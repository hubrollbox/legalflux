
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "active":
    case "completed":
    case "approved":
    case "paid":
    case "signed":
      return "bg-green-500 text-white";
    case "pending":
    case "in progress":
    case "review":
    case "draft":
      return "bg-yellow-500 text-white";
    case "cancelled":
    case "failed":
    case "rejected":
    case "overdue":
      return "bg-red-500 text-white";
    case "on hold":
    case "waiting":
      return "bg-blue-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
}

export function formatDate(date: Date | string): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "";
  
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

export function getUserRoleName(role: string): string {
  switch (role?.toLowerCase()) {
    case "admin":
      return "Administrador";
    case "lawyer":
      return "Advogado";
    case "senior_lawyer":
      return "Advogado Sênior";
    case "assistant":
      return "Assistente";
    case "client":
      return "Cliente";
    default:
      return "Utilizador";
  }
}
