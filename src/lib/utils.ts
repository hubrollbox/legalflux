
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { UserRole } from "@/types/permissions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString("pt-PT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatCurrency = (amount: number, currency: string = "EUR"): string => {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency,
  }).format(amount);
};

export const getUserRoleName = (role: UserRole): string => {
  const roleNames: Record<UserRole, string> = {
    [UserRole.CLIENT]: "Cliente",
    [UserRole.LAWYER]: "Advogado",
    [UserRole.SENIOR_LAWYER]: "Advogado Sênior",
    [UserRole.ASSISTANT]: "Assistente",
    [UserRole.ADMIN]: "Administrador",
  };
  
  return roleNames[role] || role;
};

export const getColorByPriority = (priority: 'low' | 'medium' | 'high'): string => {
  switch (priority) {
    case 'low': return 'bg-blue-100 text-blue-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'high': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const validateUUID = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'completed':
    case 'done':
      return 'bg-green-100 text-green-800';
    case 'pending':
    case 'in_progress':
      return 'bg-blue-100 text-blue-800';
    case 'failed':
    case 'past_due':
      return 'bg-red-100 text-red-800';
    case 'canceled':
    case 'closed':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, containing at least one number, one uppercase letter, and one special character
  const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

export function getPlanDetails(plan: string) {
  const plans = {
    basic: {
      name: "Básico",
      price: 49,
      description: "Para advogados individuais com funcionalidades básicas",
      features: [
        "1 usuário",
        "Gestão de processos básica",
        "Portal do cliente",
        "Armazenamento de documentos (5GB)",
      ],
      usersLimit: 1,
    },
    solo: {
      name: "Solo",
      price: 99,
      description: "Para advogados independentes com funcionalidades adicionais",
      features: [
        "Até 3 usuários",
        "Gestão de processos avançada",
        "Portal do cliente",
        "Armazenamento de documentos (15GB)",
        "Gestão de tarefas",
        "Agendamento online",
      ],
      usersLimit: 3,
    },
    enterprise: {
      name: "Enterprise",
      price: 199,
      description: "Para escritórios com equipas e funcionalidades avançadas",
      features: [
        "Até 10 usuários",
        "Gestão de processos avançada",
        "Portal do cliente personalizado",
        "Armazenamento de documentos (50GB)",
        "Gestão de tarefas avançada",
        "Agendamento online",
        "Automatização de documentos",
        "Relatórios avançados",
        "API de integração",
      ],
      usersLimit: 10,
    },
    custom: {
      name: "Personalizado",
      price: 0,
      description: "Para grandes escritórios com customizações especiais",
      features: [
        "Utilizadores ilimitados",
        "Funcionalidades personalizadas",
        "Integrações personalizadas",
        "Suporte dedicado",
        "Treinamento personalizado",
      ],
      usersLimit: 9999,
    },
  };

  return plans[plan as keyof typeof plans];
}
