

// Serviço para operações relacionadas a processos

export const processService = {
  // Função para listar todos os processos
  getProcesses: async () => {
    // Em uma implementação real, seria uma chamada API
    return [
      { id: "proc1", title: "Processo Trabalhista - João Silva" },
      { id: "proc2", title: "Ação de Despejo - Maria Oliveira" },
      { id: "proc3", title: "Cobrança - Empresa XYZ" }
    ];
  },

  // Função para obter detalhes de um processo específico
  getProcessById: async (id: string) => {
    // Em uma implementação real, seria uma chamada API com o ID
    const allProcesses = await processService.getProcesses();
    return allProcesses.find(p => p.id === id);
  }
};

// Exportar funções individuais para uso direto
export const getProcesses = processService.getProcesses;
export const getProcessById = processService.getProcessById;

