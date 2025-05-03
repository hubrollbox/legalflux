
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidPassword(password: string): boolean {
  // Pelo menos 8 caracteres
  if (password.length < 8) return false;
  
  // Pelo menos uma letra maiúscula
  if (!/[A-Z]/.test(password)) return false;
  
  // Pelo menos um número
  if (!/\d/.test(password)) return false;
  
  // Pelo menos um caractere especial
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;
  
  return true;
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'active':
    case 'ativo':
    case 'aprovado':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'pending':
    case 'pendente':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'closed':
    case 'fechado':
    case 'concluído':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'rejected':
    case 'rejeitado':
    case 'cancelado':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

export function getColorByPriority(priority: string): string {
  switch (priority) {
    case 'high':
      return 'text-red-600 bg-red-100 border-red-200';
    case 'medium':
      return 'text-amber-600 bg-amber-100 border-amber-200';
    case 'low':
      return 'text-green-600 bg-green-100 border-green-200';
    default:
      return 'text-gray-600 bg-gray-100 border-gray-200';
  }
}

export function getUserRoleName(role: string): string {
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

export interface PlanDetail {
  name: string;
  price: number;
  description: string;
  features: string[];
  maxUsers: number;
  recommended?: boolean;
}

export function getPlanDetails(): PlanDetail[] {
  return [
    {
      name: 'Basic',
      price: 49,
      description: 'Para advogados individuais',
      features: [
        'Gestão de processos básica',
        'Calendário integrado',
        'Armazenamento de documentos (5GB)',
        'Suporte por email'
      ],
      maxUsers: 1
    },
    {
      name: 'Solo',
      price: 99,
      description: 'Para advogados independentes',
      features: [
        'Todas as funcionalidades do Basic',
        'Gestão de processos avançada',
        'Faturação integrada',
        'Armazenamento de documentos (20GB)',
        'Suporte prioritário'
      ],
      maxUsers: 3,
      recommended: true
    },
    {
      name: 'Enterprise',
      price: 199,
      description: 'Para escritórios com equipas',
      features: [
        'Todas as funcionalidades do Solo',
        'Gestão de equipas',
        'Relatórios personalizados',
        'Armazenamento ilimitado',
        'Suporte dedicado',
        'API para integrações'
      ],
      maxUsers: 10
    },
    {
      name: 'Personalizado',
      price: 0,
      description: 'Para grandes escritórios',
      features: [
        'Plano completamente personalizado',
        'Funcionalidades adaptadas às suas necessidades',
        'Integrações personalizadas',
        'Utilizadores ilimitados',
        'Gerente de conta dedicado'
      ],
      maxUsers: 999
    }
  ];
}
