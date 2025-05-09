
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getUserRoleName(role: string): string {
  const roleMap: Record<string, string> = {
    client: "Cliente",
    lawyer: "Advogado",
    senior_lawyer: "Advogado Sênior",
    assistant: "Assistente",
    ADMIN: "Administrador",
  };

  return roleMap[role] || role;
}

export function getStatusColor(status: string): string {
  const statusMap: Record<string, string> = {
    active: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-gray-100 text-gray-800",
    expired: "bg-red-100 text-red-800",
    draft: "bg-gray-100 text-gray-800",
    review: "bg-yellow-100 text-yellow-800",
    final: "bg-green-100 text-green-800",
    archived: "bg-blue-100 text-blue-800",
    signed: "bg-purple-100 text-purple-800",
    aberto: "bg-green-100 text-green-800",
    fechado: "bg-gray-100 text-gray-800",
    suspenso: "bg-yellow-100 text-yellow-800",
    anulado: "bg-red-100 text-red-800",
  };

  return statusMap[status.toLowerCase()] || "bg-slate-100 text-slate-800";
}
