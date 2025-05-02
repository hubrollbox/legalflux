
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

// Add getPlanDetails function
export const getPlanDetails = (planId: string) => {
  const plans = {
    basic: {
      name: "Básico",
      price: 49,
      description: "Para advogados individuais com necessidades básicas de gestão.",
      features: [
        "Gestão de processos básica",
        "Calendário de prazos",
        "Portal do cliente básico",
        "Até 50 processos",
        "Armazenamento de 5GB"
      ]
    },
    solo: {
      name: "Solo",
      price: 99,
      description: "Para advogados independentes que precisam de mais recursos.",
      features: [
        "Tudo no plano Básico",
        "Até 3 utilizadores",
        "Gestão financeira",
        "Modelos de documentos",
        "Até 200 processos",
        "Armazenamento de 15GB"
      ]
    },
    enterprise: {
      name: "Empresarial",
      price: 199,
      description: "Para escritórios com equipas e necessidades avançadas.",
      features: [
        "Tudo no plano Solo",
        "Até 10 utilizadores",
        "Relatórios avançados",
        "Integrações com tribunais",
        "Casos ilimitados",
        "Armazenamento de 50GB"
      ]
    },
    custom: {
      name: "Personalizado",
      price: null,
      description: "Para grandes escritórios com necessidades específicas.",
      features: [
        "Soluções personalizadas",
        "Utilizadores ilimitados",
        "API dedicada e integrações personalizadas",
        "Treinamento e suporte VIP",
        "Armazenamento ilimitado",
        "Implantação on-premises disponível"
      ]
    }
  };

  return plans[planId as keyof typeof plans] || plans.basic;
};
