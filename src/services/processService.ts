
import { Process } from '../types';

// Dados mock para processos
const mockProcesses: Process[] = [
  {
    id: '1',
    title: 'Processo Civil 123/2023',
    clientId: '1',
    lawyerId: '1',
    status: 'active',
    type: 'civil',
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2023-05-20T14:45:00Z',
    description: 'Ação de indemnização por danos materiais',
    priority: 'high',
    deadline: '2023-12-31T23:59:59Z',
    reference: 'REF-123-2023'
  },
  {
    id: '2',
    title: 'Processo Laboral 456/2023',
    clientId: '2',
    lawyerId: '1',
    status: 'pending',
    type: 'labor',
    createdAt: '2023-03-10T09:15:00Z',
    updatedAt: '2023-05-15T11:30:00Z',
    description: 'Despedimento sem justa causa',
    priority: 'medium',
    deadline: '2023-09-30T23:59:59Z',
    reference: 'REF-456-2023'
  },
  {
    id: '3',
    title: 'Processo Família 789/2022',
    clientId: '3',
    lawyerId: '2',
    status: 'closed',
    type: 'family',
    createdAt: '2022-11-05T14:20:00Z',
    updatedAt: '2023-04-28T16:40:00Z',
    description: 'Regulação das responsabilidades parentais',
    priority: 'low',
    reference: 'REF-789-2022'
  }
];

export const getProcesses = async (): Promise<Process[]> => {
  // Simular uma chamada API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProcesses);
    }, 500);
  });
};

export const getProcessById = async (id: string): Promise<Process | undefined> => {
  // Simular uma chamada API
  return new Promise((resolve) => {
    setTimeout(() => {
      const process = mockProcesses.find(p => p.id === id);
      resolve(process);
    }, 300);
  });
};

export const createProcess = async (process: Omit<Process, 'id' | 'createdAt' | 'updatedAt'>): Promise<Process> => {
  // Simular uma chamada API
  return new Promise((resolve) => {
    setTimeout(() => {
      const newProcess: Process = {
        ...process,
        id: `${mockProcesses.length + 1}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      resolve(newProcess);
    }, 600);
  });
};
