
import { Document as DocumentBase, DocumentType as DocType } from './document';

// For components that expect Document to have specific required properties
declare global {
  interface EnhancedDocument extends DocumentBase {
    name: string;
    type: string;
    size: string;
    updatedAt: string | Date;
    owner: string;
    folder: string;
    process: string;
  }
}

export type DocumentType = DocType;
export type { EnhancedDocument as Document };
