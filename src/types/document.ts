
export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  processId?: string;
  clientId?: string;
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
  tags?: string[];
  status?: 'draft' | 'review' | 'final';
  versionNumber?: number;
  metadata?: {
    [key: string]: any;
  };
  // For document templates
  isTemplate?: boolean;
  templateData?: {
    fields: TemplateField[];
    content?: string;
  };
}

export interface TemplateField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'select';
  label: string;
  required?: boolean;
  options?: string[]; // For select type
  defaultValue?: any;
}
