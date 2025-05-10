
export type DocumentType = "document" | "action" | "precedent" | "strategy";
export type DocumentStatus = "draft" | "review" | "final" | "archived" | "signed";

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  size: string;
  updatedAt: string;
  owner: string;
  folder: string;
  process: string;
  tags?: string[];
  status: DocumentStatus;
  url?: string;
  description?: string;
  createdAt?: string | Date;
  version?: number;
  category?: string;
  clientId?: string;
  processId?: string;
  title?: string;
}
