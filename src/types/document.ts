
// Definição do tipo Document para uso em toda a aplicação
export interface Document {
  id: string;
  name: string;
  type: "document" | "action" | "precedent" | "strategy";
  url: string;
  size: string; // Alterado para string para compatibilidade
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
  // Campos adicionais para compatibilidade
  fileUrl?: string;
  preview?: string;
  title?: string;
}

// Tipos para filtros de documentos
export interface DocumentFilter {
  type: string;
  date: Date | undefined; // Mudado para ser não opcional
  tags: string[];
}

// Tipo para modelos de documentos
export interface DocumentTemplate {
  id: string;
  name: string;
  type: "document" | "action" | "precedent" | "strategy";
  size: string;
  description: string;
  updatedAt: string | Date;
  category: string;
  tags?: string[];
}
