
// Se este arquivo não existir, estamos criando-o
import type { Process } from '@/types/process';

// Mock data para desenvolvimento
const mockProcesses = [
  {
    id: '1',
    title: 'Processo Cível 123/2023',
    number: '123/2023',
    type: 'civil',
    status: 'in_progress',
    clientId: '1',
    description: 'Processo de danos morais',
    startDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Processo Criminal 456/2023',
    number: '456/2023',
    type: 'criminal',
    status: 'new',
    clientId: '2',
    description: 'Defesa em processo criminal',
    startDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
];

export const processService = {
  // Método para listar todos os processos
  getProcesses: async (): Promise<{ id: string; title: string; }[]> => {
    // Simulação de uma chamada API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProcesses.map(p => ({ id: p.id, title: p.title })));
      }, 500);
    });
  },

  // Método para obter um processo por ID
  getProcessById: async (id: string): Promise<{ id: string; title: string; } | undefined> => {
    // Simulação de uma chamada API
    return new Promise((resolve) => {
      setTimeout(() => {
        const process = mockProcesses.find(p => p.id === id);
        resolve(process ? { id: process.id, title: process.title } : undefined);
      }, 300);
    });
  },

  // Método para obter o processo atual (novo método)
  getCurrentProcess: async (): Promise<{ id: string; title: string; number?: string } | undefined> => {
    // Simulação de uma chamada API
    return new Promise((resolve) => {
      setTimeout(() => {
        // Retorna o primeiro processo como atual
        const currentProcess = mockProcesses[0];
        resolve(currentProcess ? { 
          id: currentProcess.id, 
          title: currentProcess.title,
          number: currentProcess.number
        } : undefined);
      }, 300);
    });
  },

  // Método para listar processos (alias para getProcesses)
  listProcesses: async (): Promise<any[]> => {
    return processService.getProcesses();
  }
};
