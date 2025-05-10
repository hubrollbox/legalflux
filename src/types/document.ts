
// Define os tipos para documentos
export type DocumentType = "document" | "action" | "precedent" | "strategy";
export type DocumentStatus = "draft" | "review" | "final" | "archived" | "signed";

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  size: string;
  updatedAt: string | Date;
  owner: string;
  folder: string;
  process: string;
  tags?: string[];
  status: DocumentStatus;
  description?: string;
  category?: string;
  // Add missing properties referenced in DocumentForm
  clientId?: string;
  processId?: string;
  url?: string;
  version?: number;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  type: DocumentType;
  description?: string;
  updatedAt: string | Date;
  category: string;
  tags?: string[];
  size: string;
}

export interface DocumentFilter {
  type?: DocumentType | "all";
  date?: Date;
  tags?: string[];
}
