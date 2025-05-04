
import React from 'react';
import { FileText, FileImage, FileArchive, FileCode } from 'lucide-react';
import { format, isValid } from 'date-fns';
import { ptPT } from 'date-fns/locale';

export const getFileIcon = (fileType: string) => {
  switch(fileType?.toLowerCase()) {
    case 'pdf':
      return <FileText className="text-red-500" />; // Use FileText for PDF with red color instead of FilePdf
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <FileImage />;
    case 'zip':
    case 'rar':
      return <FileArchive />;
    case 'js':
    case 'ts':
    case 'jsx':
    case 'tsx':
    case 'html':
    case 'css':
      return <FileCode />;
    default:
      return <FileText />;
  }
};

export const formatDate = (date: Date | string | undefined) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (!isValid(dateObj)) return '';
  
  return format(dateObj, 'dd MMM yyyy', { locale: ptPT });
};

export default {
  getFileIcon,
  formatDate
};
