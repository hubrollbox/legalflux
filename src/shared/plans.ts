import { Plan } from "@/types";

export const plans: Record<string, Plan> = {
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

export function getPlanDetails(planId: string): Plan {
  return plans[planId] || plans.basic;
}