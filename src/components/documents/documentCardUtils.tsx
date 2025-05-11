
import { 
  FileText, 
  FilePlus, 
  FileEdit, 
  File, 
  Clock, 
  User, 
  Folder,
  BookMarked
} from "lucide-react";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { ptBR } from "date-fns/locale";
import { DocumentType } from "@/types/document";

// Get the appropriate icon based on document type
export const getDocumentIcon = (type: DocumentType | string) => {
  switch (type) {
    case 'precedent':
      return <BookMarked className="h-5 w-5 text-blue-500" />;
    case 'strategy':
      return <FileEdit className="h-5 w-5 text-purple-500" />;
    case 'action':
      return <FilePlus className="h-5 w-5 text-green-500" />;
    case 'document':
    default:
      return <FileText className="h-5 w-5 text-gray-500" />;
  }
};

// Additional export for getFileIcon (alias for backward compatibility)
export const getFileIcon = getDocumentIcon;

// Format relative time for document updates (e.g., "há 3 horas")
export const formatRelativeTime = (date: string | Date) => {
  // First parse the date if it's a string
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  try {
    return formatDistanceToNow(dateObj, { 
      addSuffix: true,
      locale: ptBR 
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Data desconhecida';
  }
};

// Export formatDate as an alias for formatRelativeTime for backward compatibility
export const formatDate = formatRelativeTime;

// Format file size for display
export const formatFileSize = (size: string | number) => {
  if (typeof size === 'number') {
    if (size < 1024) {
      return `${size} B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    } else if (size < 1024 * 1024 * 1024) {
      return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    } else {
      return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
    }
  }
  return size;
};
