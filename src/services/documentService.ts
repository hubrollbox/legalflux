
import { Document } from "../types";

// Dados de exemplo para documentos
const sampleDocuments: Document[] = [
  {
    id: "1",
    name: "Contrato de Prestação de Serviços",
    type: "contract",
    size: "245 KB",
    updatedAt: new Date(),
    owner: "João Silva",
    folder: "Contratos",
    process: "Processo #123",
    tags: ["importante", "cliente-vip"],
    status: "active"
  },
  {
    id: "2",
    name: "Procuração",
    type: "power_of_attorney",
    size: "125 KB",
    updatedAt: new Date(Date.now() - 86400000), // 1 dia atrás
    owner: "Maria Pereira",
    folder: "Documentos Pessoais",
    process: "Processo #456",
    status: "pending"
  },
  {
    id: "3",
    name: "Petição Inicial",
    type: "petition",
    size: "350 KB",
    updatedAt: new Date(Date.now() - 172800000), // 2 dias atrás
    owner: "Carlos Santos",
    folder: "Processos Judiciais",
    process: "Processo #789",
    tags: ["urgente"],
    status: "pending"
  }
];

export const getDocuments = async (): Promise<Document[]> => {
  // Simulação de uma chamada de API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleDocuments);
    }, 500);
  });
};

export const getDocumentById = async (id: string): Promise<Document | undefined> => {
  // Simulação de uma chamada de API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleDocuments.find(doc => doc.id === id));
    }, 300);
  });
};

export const saveDocument = async (document: Document): Promise<Document> => {
  // Simulação de uma chamada de API para salvar
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...document,
        id: document.id || `${Math.floor(Math.random() * 1000)}`,
        updatedAt: new Date()
      });
    }, 600);
  });
};

export const deleteDocument = async (id: string): Promise<boolean> => {
  // Simulação de uma chamada de API para excluir
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 400);
  });
};
