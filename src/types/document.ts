
// Definição do tipo Document para uso em toda a aplicação
export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  size?: number;
  description: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  status: 'draft' | 'review' | 'final' | 'archived' | 'signed';
  tags: string[];
  category: string;
  owner: string;
  process: string;
  folder: string;
  clientId?: string;
  processId?: string;
  version?: number;
  metadata?: Record<string, any>;
}

// Tipos para filtros de documentos
export interface DocumentFilter {
  type: string;
  date?: Date;
  tags: string[];
}

// Tipo para modelos de documentos
export interface DocumentTemplate {
  id: string;
  name: string;
  type: string;
  size: string;
  description: string;
  updatedAt: string | Date;
  category: string;
  tags?: string[];
}
