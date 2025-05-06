
import { Process } from "../types";

// Dados de exemplo para processos
const sampleProcesses: Process[] = [
  {
    id: "1",
    title: "Ação de Despejo",
    clientName: "Empresa A",
    type: "Civil",
    deadline: new Date(Date.now() + 15 * 86400000), // 15 dias a partir de agora
    status: "active",
    progress: 35,
    responsible: "Dr. João Silva",
    priority: "high"
  },
  {
    id: "2",
    title: "Processo Trabalhista",
    clientName: "Maria Pereira",
    type: "Trabalhista",
    deadline: new Date(Date.now() + 30 * 86400000), // 30 dias a partir de agora
    status: "active",
    progress: 65,
    responsible: "Dra. Ana Costa",
    priority: "medium"
  },
  {
    id: "3",
    title: "Recurso Administrativo",
    clientName: "Empresa B",
    type: "Administrativo",
    deadline: new Date(Date.now() - 5 * 86400000), // 5 dias atrás (vencido)
    status: "closed",
    progress: 100,
    responsible: "Dr. Carlos Santos",
    priority: "low"
  }
];

export const getProcesses = async (): Promise<Process[]> => {
  // Simulação de uma chamada de API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleProcesses);
    }, 500);
  });
};

export const getProcessById = async (id: string): Promise<Process | undefined> => {
  // Simulação de uma chamada de API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleProcesses.find(proc => proc.id === id));
    }, 300);
  });
};

export const saveProcess = async (process: Process): Promise<Process> => {
  // Simulação de uma chamada de API para salvar
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...process,
        id: process.id || `${Math.floor(Math.random() * 1000)}`,
      });
    }, 600);
  });
};

export const deleteProcess = async (id: string): Promise<boolean> => {
  // Simulação de uma chamada de API para excluir
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 400);
  });
};
