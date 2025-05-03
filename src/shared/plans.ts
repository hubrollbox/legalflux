import { Plan } from "@/types";

export const plans: Record<string, Plan> = {
  basic: {
    id: "basic",
    name: "Basic",
    price: 49,
    description: "Para advogados individuais",
    features: [
      { name: "Gestão de processos", included: true },
      { name: "Calendário de prazos", included: true },
      { name: "Uploads de documentos (limite 1GB)", included: true },
      { name: "Suporte por email", included: true }
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
      { name: "Tudo do plano Basic", included: true },
      { name: "Até 3 utilizadores", included: true },
      { name: "Modelos de documentos", included: true },
      { name: "Integração com email", included: true },
      { name: "Armazenamento de 5GB", included: true },
      { name: "Suporte telefónico", included: true }
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
      { name: "Tudo do plano Solo", included: true },
      { name: "Até 10 utilizadores", included: true },
      { name: "Relatórios avançados", included: true },
      { name: "Gestão de equipas", included: true },
      { name: "Armazenamento de 20GB", included: true },
      { name: "Suporte prioritário", included: true }
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
      { name: "Utilizadores ilimitados", included: true },
      { name: "Armazenamento ilimitado", included: true },
      { name: "Processos ilimitados", included: true },
      { name: "Integrações personalizadas", included: true },
      { name: "Consultoria dedicada", included: true },
      { name: "Suporte VIP 24/7", included: true }
    ]
  }
};

export function getPlanDetails(planId: string): Plan {
  return plans[planId] || plans.basic;
}