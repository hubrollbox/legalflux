
import { CalendarIcon, FileText, FileImage, FileArchive, FileCode } from 'lucide-react';
import { format, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

export const getFileIcon = (fileType: string) => {
  switch(fileType?.toLowerCase()) {
    case 'pdf':
      return FilePdf;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return FileImage;
    case 'zip':
    case 'rar':
      return FileArchive;
    case 'js':
    case 'ts':
    case 'jsx':
    case 'tsx':
    case 'html':
    case 'css':
      return FileCode;
    default:
      return FileText;
  }
};

export const formatDate = (date: Date | string | undefined) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (!isValid(dateObj)) return '';
  
  return format(dateObj, 'dd MMM yyyy', { locale: ptBR });
};

export default {
  getFileIcon,
  formatDate
};
