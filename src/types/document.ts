
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
  status: 'draft' | 'review' | 'final' | 'archived';
  tags: string[];
  category: string;
  owner: string;
  process: string;
  folder: string;
  clientId?: string;  // Adicionado para compatibilidade com DocumentForm
  processId?: string; // Adicionado para compatibilidade com DocumentForm
  version?: number;
  metadata?: Record<string, any>;
}

// Tipos para filtros de documentos
export interface DocumentFilter {
  type: string;
  date?: Date; // Tornando opcional para compatibilidade
  tags: string[];
}

// Tipo para modelos de documentos
export interface DocumentTemplate {
  id: string;
  name: string;
  type: "document" | "action" | "precedent" | "strategy";
  size: string;
  description: string;
  updatedAt: string;
  category: string;
  tags?: string[];
}
