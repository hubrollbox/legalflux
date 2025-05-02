
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Plan } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPlanDetails(planId: string): Plan {
  const plans: Record<string, Plan> = {
    basic: {
      id: "basic",
      name: "Basic",
      price: 49,
      description: "Para advogados individuais",
      features: [
        "Gestão de processos",
        "Calendário de prazos",
        "Uploads de documentos (limite 1GB)",
        "Suporte por email"
      ],
      maxUsers: 1,
      maxStorage: 1,
      maxCases: 50
    },
    solo: {
      id: "solo",
      name: "Solo",
      price: 99,
      description: "Para advogados independentes",
      features: [
        "Tudo do plano Basic",
        "Até 3 utilizadores",
        "Modelos de documentos",
        "Integração com email",
        "Armazenamento de 5GB",
        "Suporte telefónico"
      ],
      maxUsers: 3,
      maxStorage: 5,
      maxCases: 100
    },
    enterprise: {
      id: "enterprise",
      name: "Enterprise",
      price: 199,
      description: "Para escritórios com equipas",
      features: [
        "Tudo do plano Solo",
        "Até 10 utilizadores",
        "Relatórios avançados",
        "Gestão de equipas",
        "Armazenamento de 20GB",
        "Suporte prioritário"
      ],
      maxUsers: 10,
      maxStorage: 20,
      maxCases: 500
    },
    custom: {
      id: "custom",
      name: "Personalizado",
      price: null,
      description: "Para grandes escritórios",
      features: [
        "Utilizadores ilimitados",
        "Armazenamento ilimitado",
        "Processos ilimitados",
        "Integrações personalizadas",
        "Consultoria dedicada",
        "Suporte VIP 24/7"
      ]
    }
  };

  return plans[planId] || plans.basic;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR'
  }).format(value);
}

// Função para validar uma password
export function isValidPassword(password: string): boolean {
  // Pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial
  return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}

// Função para obter a cor com base no status
export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    "Em andamento": "bg-blue-100 text-blue-800",
    "Concluído": "bg-green-100 text-green-800",
    "Pendente": "bg-yellow-100 text-yellow-800",
    "Atrasado": "bg-red-100 text-red-800",
    "Arquivado": "bg-gray-100 text-gray-800",
    "Aguardando": "bg-purple-100 text-purple-800",
    "Cancelado": "bg-red-100 text-red-800",
    "Suspenso": "bg-orange-100 text-orange-800",
    
    // Status específicos de processos
    "Andamento": "bg-blue-100 text-blue-800",
    "Julgamento": "bg-purple-100 text-purple-800",
    "Recurso": "bg-amber-100 text-amber-800",
    "Execução": "bg-cyan-100 text-cyan-800",
    "Encerrado": "bg-green-100 text-green-800",
    
    // Status específicos de pagamento
    "Pago": "bg-green-100 text-green-800",
    "Parcial": "bg-amber-100 text-amber-800"
  };
  
  return statusColors[status] || "bg-gray-100 text-gray-800"; // Default color
}
