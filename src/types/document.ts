
export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  size?: number;
  createdAt: Date | string;
  updatedAt?: Date | string;
  status: 'draft' | 'review' | 'final' | 'archived';
  processId?: string;
  createdById?: string;
  title?: string;
  description?: string;
  fileUrl?: string;
  fileType?: string;
  clientId?: string;
  version?: number;
  tags?: string[];
  owner?: string; // Adicionado
  folder?: string; // Adicionado
  process?: string; // Adicionado
}

// Interface para Template que é usada em DocumentTabs
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
