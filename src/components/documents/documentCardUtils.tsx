
import React from 'react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { 
  FileText, 
  FileCode, 
  FilePlus, 
  FileCheck, 
  File
} from 'lucide-react';
import { DocumentType } from '@/types/document';

// Format date for display
export function formatDate(date: string | Date | undefined): string {
  if (!date) return 'Data desconhecida';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  try {
    return format(dateObj, 'PPP');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Data inválida';
  }
}

// Get appropriate icon based on file type
export function getFileIcon(type: DocumentType): React.ReactNode {
  switch (type) {
    case 'contract':
      return <FileCheck className="h-6 w-6 text-blue-500" />;
    case 'petition':
      return <FilePlus className="h-6 w-6 text-amber-500" />;
    case 'template':
      return <FileCode className="h-6 w-6 text-green-500" />;
    case 'document':
      return <FileText className="h-6 w-6 text-gray-500" />;
    default:
      return <File className="h-6 w-6 text-gray-400" />;
  }
}

// Get CSS class based on document status
export function getStatusClass(status: string): string {
  switch(status) {
    case 'draft':
      return 'bg-gray-100 text-gray-800';
    case 'review':
      return 'bg-yellow-100 text-yellow-800';
    case 'final':
      return 'bg-green-100 text-green-800';
    case 'archived':
      return 'bg-blue-100 text-blue-800';
    case 'signed':
      return 'bg-emerald-100 text-emerald-800';
    case 'unsigned':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

// Get human-readable document type
export function getDocumentTypeLabel(type: DocumentType): string {
  switch(type) {
    case 'contract':
      return 'Contrato';
    case 'petition':
      return 'Petição';
    case 'template':
      return 'Template';
    case 'action':
      return 'Acção';
    case 'precedent':
      return 'Precedente';
    case 'strategy':
      return 'Estratégia';
    case 'document':
    default:
      return 'Documento';
  }
}
