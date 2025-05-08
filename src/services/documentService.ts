
import { Document } from '@/types/document';

// Mock data para desenvolvimento
const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Contrato de Prestação de Serviços',
    type: 'document',
    url: '/documents/contrato.pdf',
    size: 1024000,
    description: 'Contrato padrão de prestação de serviços jurídicos',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'final',
    tags: ['contrato', 'serviços'],
    category: 'Contratos',
    owner: 'John Doe',
    process: '1',
    folder: 'Contratos'
  },
  {
    id: '2',
    name: 'Petição Inicial',
    type: 'document',
    url: '/documents/peticao.pdf',
    size: 512000,
    description: 'Petição inicial do processo 123/2023',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'final',
    tags: ['petição', 'inicial'],
    category: 'Peças Processuais',
    owner: 'Jane Smith',
    process: '1',
    folder: 'Processuais'
  }
];

export const documentService = {
  // Método para listar todos os documentos
  getDocuments: async (): Promise<Document[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockDocuments);
      }, 500);
    });
  },
  
  // Método para obter um documento por ID
  getDocumentById: async (id: string): Promise<Document | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const document = mockDocuments.find(d => d.id === id);
        resolve(document);
      }, 300);
    });
  }
};

// Exportações nomeadas
export const getDocuments = documentService.getDocuments;
export const getDocumentById = documentService.getDocumentById;
