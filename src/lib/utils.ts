
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
    // Status gerais
    "Em andamento": "bg-blue-100 text-blue-800",
    "Concluído": "bg-green-100 text-green-800",
    "Pago": "bg-green-100 text-green-800",
    "Pendente": "bg-yellow-100 text-yellow-800",
    "Arquivado": "bg-gray-100 text-gray-800",
    "Aguardando": "bg-purple-100 text-purple-800",
    "Julgamento": "bg-purple-100 text-purple-800",
    "Cancelado": "bg-red-100 text-red-800",
    "Atrasado": "bg-red-100 text-red-800",
    "Suspenso": "bg-orange-100 text-orange-800",
    "Recurso": "bg-amber-100 text-amber-800",
    "Execução": "bg-cyan-100 text-cyan-800",
    "Parcial": "bg-amber-100 text-amber-800"
  };
  
  return statusColors[status] || "bg-gray-100 text-gray-800"; // Default color
}

// Função para obter a cor com base na prioridade
export function getColorByPriority(priority: string): string {
  const priorityColors: Record<string, string> = {
    "Alta": "bg-red-100 text-red-800",
    "Média": "bg-yellow-100 text-yellow-800",
    "Baixa": "bg-green-100 text-green-800"
  };
  return priorityColors[priority] || "bg-gray-100 text-gray-800";
}
