
import { Document } from '../types';

// Dados mock para documentos
const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Petição Inicial',
    processId: '1',
    clientId: '1',
    lawyerId: '1',
    status: 'final',
    type: 'petition',
    createdAt: '2023-01-16T09:30:00Z',
    updatedAt: '2023-01-18T15:20:00Z',
    fileUrl: 'https://example.com/files/peticao_inicial.pdf',
    fileSize: 2500000,
    version: 3,
    tags: ['civil', 'inicial']
  },
  {
    id: '2',
    title: 'Contrato de Prestação de Serviços',
    processId: '2',
    clientId: '2',
    lawyerId: '1',
    status: 'draft',
    type: 'contract',
    createdAt: '2023-03-11T10:45:00Z',
    updatedAt: '2023-03-12T14:30:00Z',
    fileUrl: 'https://example.com/files/contrato.pdf',
    fileSize: 1200000,
    version: 1,
    tags: ['laboral', 'contrato']
  },
  {
    id: '3',
    title: 'Acordo Parental',
    processId: '3',
    clientId: '3',
    lawyerId: '2',
    status: 'review',
    type: 'agreement',
    createdAt: '2022-11-10T11:15:00Z',
    updatedAt: '2023-04-25T09:40:00Z',
    fileUrl: 'https://example.com/files/acordo_parental.pdf',
    fileSize: 1800000,
    version: 2,
    tags: ['família', 'acordo']
  },
  {
    id: '4',
    title: 'Procuração',
    clientId: '1',
    lawyerId: '1',
    status: 'pending',
    type: 'power_of_attorney',
    createdAt: '2023-02-05T16:20:00Z',
    updatedAt: '2023-02-05T16:20:00Z',
    fileUrl: 'https://example.com/files/procuracao.pdf',
    fileSize: 500000,
    version: 1,
    tags: ['procuração']
  }
];

export const getDocuments = async (): Promise<Document[]> => {
  // Simular uma chamada API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDocuments);
    }, 500);
  });
};

export const getDocumentById = async (id: string): Promise<Document | undefined> => {
  // Simular uma chamada API
  return new Promise((resolve) => {
    setTimeout(() => {
      const document = mockDocuments.find(d => d.id === id);
      resolve(document);
    }, 300);
  });
};

export const getDocumentsByProcessId = async (processId: string): Promise<Document[]> => {
  // Simular uma chamada API
  return new Promise((resolve) => {
    setTimeout(() => {
      const documents = mockDocuments.filter(d => d.processId === processId);
      resolve(documents);
    }, 400);
  });
};
