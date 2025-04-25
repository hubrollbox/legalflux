import { FileText, FileImage, File, FileCode } from "lucide-react";



import React from "react";

export function getFileIcon(type: string): React.ReactNode {
  switch (type.toLowerCase()) {
    case 'pdf':
      return <File className="h-10 w-10 text-red-500" />;
    case 'docx':
      return <FileText className="h-10 w-10 text-blue-500" />;
    case 'xlsx':
      return <FileCode className="h-10 w-10 text-green-500" />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <FileImage className="h-10 w-10 text-purple-500" />;
    case 'txt':
    case 'json':
      return <FileCode className="h-10 w-10 text-purple-500" />;
    default:
      return <FileText className="h-10 w-10 text-gray-500" />;
  }
}

export function formatDate(dateInput: string | Date): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  // Ensure the date is valid before formatting
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }
  return new Intl.DateTimeFormat('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}