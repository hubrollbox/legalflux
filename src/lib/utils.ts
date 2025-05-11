
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidPassword(password: string): boolean {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    password.length >= minLength &&
    hasUppercase &&
    hasNumber &&
    hasSpecialChar
  );
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'active':
    case 'open':
    case 'approved':
      return 'bg-green-100 text-green-800';
    case 'pending':
    case 'review':
      return 'bg-yellow-100 text-yellow-800';
    case 'closed':
    case 'completed':
    case 'finished':
      return 'bg-blue-100 text-blue-800';
    case 'cancelled':
    case 'rejected':
      return 'bg-red-100 text-red-800';
    case 'archived':
    case 'inactive':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function getUserRoleName(role?: string): string {
  switch (role) {
    case 'ADMIN':
    case 'admin':
      return 'Administrador';
    case 'LAWYER':
    case 'lawyer':
      return 'Advogado';
    case 'SENIOR_LAWYER':
    case 'senior_lawyer':
      return 'Advogado Sénior';
    case 'ASSISTANT':
    case 'assistant':
      return 'Assistente';
    case 'CLIENT':
    case 'client':
      return 'Cliente';
    default:
      return 'Utilizador';
  }
}

// Função para adicionar mock data de transações para testes
export const getPlanDetails = (planId: string) => {
  const plans = {
    basic: {
      name: "Basic",
      price: "49€",
      features: [
        "Acesso ao portal do cliente",
        "Processos ilimitados",
        "Suporte por email"
      ]
    },
    solo: {
      name: "Solo",
      price: "99€",
      features: [
        "Tudo no plano Basic",
        "Até 3 utilizadores",
        "Suporte prioritário",
        "Assinatura de documentos"
      ]
    },
    enterprise: {
      name: "Enterprise",
      price: "199€",
      features: [
        "Tudo no plano Solo",
        "Até 10 utilizadores",
        "Suporte 24/7",
        "Automação de fluxos de trabalho",
        "Integrações personalizadas"
      ]
    },
    custom: {
      name: "Personalizado",
      price: "Consulte-nos",
      features: [
        "Utilizadores ilimitados",
        "Suporte dedicado",
        "Customizações avançadas",
        "Implementação personalizada",
        "API acesso completo"
      ]
    }
  };
  
  return plans[planId as keyof typeof plans] || plans.basic;
};
