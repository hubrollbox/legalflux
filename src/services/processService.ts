
import type { Process } from "@/types/process";

export const processService = {
  listProcesses: async (): Promise<Process[]> => {
    // Simulated data for now
    return [
      {
        id: '1',
        title: 'Processo Cível #2023-01',
        number: '2023/01/CV',
        type: 'civil',
        status: 'in_progress',
        startDate: new Date().toISOString(),
        clientId: '1',
        description: 'Ação de cobrança'
      },
      {
        id: '2',
        title: 'Processo Criminal #2023-05',
        number: '2023/05/CR',
        type: 'criminal',
        status: 'new',
        startDate: new Date().toISOString(),
        clientId: '2',
        description: 'Defesa criminal'
      }
    ];
  },
  
  getCurrentProcess: async (): Promise<Process | null> => {
    // Simulated data for now
    return {
      id: '1',
      title: 'Processo Cível #2023-01',
      number: '2023/01/CV',
      type: 'civil',
      status: 'in_progress',
      startDate: new Date().toISOString(),
      clientId: '1',
      description: 'Ação de cobrança'
    };
  }
};
