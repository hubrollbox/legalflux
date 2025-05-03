
import {
  FileText,
  FilePdf,
  FileImage,
  FileArchive,
  FileCode,
  File,
  FileSpreadsheet,
  FilePresentation,
  Clock,
} from "lucide-react";

export function getFileIcon(fileType: string) {
  switch (fileType.toLowerCase()) {
    case 'pdf':
      return FilePdf;
    case 'doc':
    case 'docx':
    case 'txt':
      return FileText;
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
    case 'json':
      return FileCode;
    case 'xls':
    case 'xlsx':
    case 'csv':
      return FileSpreadsheet;
    case 'ppt':
    case 'pptx':
      return FilePresentation;
    default:
      return File;
  }
}

export function formatDate(date: Date | string): string {
  if (!date) return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  
  // Se a data for inválida, retorna string vazia
  if (isNaN(d.getTime())) return '';
  
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  
  return `${day}/${month}/${year}`;
}

export function formatFileSize(sizeInBytes: number): string {
  if (sizeInBytes < 1024) {
    return sizeInBytes + ' B';
  } else if (sizeInBytes < 1024 * 1024) {
    return (sizeInBytes / 1024).toFixed(1) + ' KB';
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    return (sizeInBytes / (1024 * 1024)).toFixed(1) + ' MB';
  } else {
    return (sizeInBytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  }
}

export function getTimeAgo(date: Date | string): string {
  const now = new Date();
  const past = typeof date === 'string' ? new Date(date) : date;
  
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval === 1 ? 'há 1 ano' : `há ${interval} anos`;
  }
  
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval === 1 ? 'há 1 mês' : `há ${interval} meses`;
  }
  
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval === 1 ? 'há 1 dia' : `há ${interval} dias`;
  }
  
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval === 1 ? 'há 1 hora' : `há ${interval} horas`;
  }
  
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval === 1 ? 'há 1 minuto' : `há ${interval} minutos`;
  }
  
  return seconds < 10 ? 'agora mesmo' : `há ${Math.floor(seconds)} segundos`;
}
