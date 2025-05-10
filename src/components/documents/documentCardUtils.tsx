
import { formatDate } from '@/utils/dateUtils';
import { File, FileText, Image, Brain } from 'lucide-react';

// Função que retorna um ícone com base no tipo do documento
export const getDocumentTypeIcon = (type: string) => {
  switch (type) {
    case 'document':
      return FileText;
    case 'action':
      return File;
    case 'precedent':
      return Image;
    case 'strategy':
      return Brain;
    default:
      return FileText;
  }
};

// Função que retorna uma cor com base no tipo do documento
export const getDocumentTypeColor = (type: string) => {
  switch (type) {
    case 'document':
      return 'text-blue-500';
    case 'action':
      return 'text-green-500';
    case 'precedent':
      return 'text-yellow-500';
    case 'strategy':
      return 'text-purple-500';
    default:
      return 'text-gray-500';
  }
};

// Função que formata o tamanho do documento
export const formatDocumentSize = (size: string | number) => {
  if (typeof size === 'number') {
    if (size < 1024) {
      return `${size} KB`;
    } else {
      const sizeInMB = (size / 1024).toFixed(2);
      return `${sizeInMB} MB`;
    }
  }
  return size;
};

// Função que formata a data de atualização
export { formatDate };

// Função auxiliar para retornar o ícone correto do arquivo
export const getFileIcon = (type: string) => {
  const IconComponent = getDocumentTypeIcon(type);
  return <IconComponent className={`${getDocumentTypeColor(type)}`} />;
};
