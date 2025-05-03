
import { FileText, FileSpreadsheet, FileImage, FilePresentationIcon, FileCode, File } from "lucide-react";

export const getFileIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'document':
    case 'docx':
    case 'doc':
    case 'pdf':
      return FileText;
    case 'spreadsheet':
    case 'xlsx':
    case 'xls':
    case 'csv':
      return FileSpreadsheet;
    case 'image':
    case 'png':
    case 'jpg':
    case 'jpeg':
      return FileImage;
    case 'presentation':
    case 'pptx':
    case 'ppt':
      return FilePresentationIcon;
    case 'code':
    case 'js':
    case 'html':
    case 'css':
      return FileCode;
    default:
      return File;
  }
};

export const formatDate = (date: string | Date): string => {
  if (!date) return '';
  
  const d = new Date(date);
  return new Intl.DateTimeFormat('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(d);
};

export const formatSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
