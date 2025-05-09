
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
