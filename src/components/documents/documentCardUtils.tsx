
import React from 'react';
import { FileText, FileCode, FileImage, FilePieChart } from 'lucide-react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { DocumentType } from '@/types/document';

// Function to get the appropriate file icon based on document type
export const getFileIcon = (type: DocumentType | string) => {
  switch (type) {
    case 'document':
      return <FileText className="h-5 w-5 text-blue-600" />;
    case 'action':
      return <FileCode className="h-5 w-5 text-violet-600" />;
    case 'precedent':
      return <FileImage className="h-5 w-5 text-green-600" />;
    case 'strategy':
      return <FilePieChart className="h-5 w-5 text-orange-600" />;
    default:
      return <FileText className="h-5 w-5 text-gray-600" />;
  }
};

// Function to format date consistently
export const formatDate = (date: string | Date) => {
  if (!date) return '--';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    // Fix: Remove the third parameter and use options in the second parameter
    return format(dateObj, 'dd/MM/yyyy', { locale: pt });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '--';
  }
};
