
import React from "react";
import { 
  FileText, 
  FileSpreadsheet, 
  FileImage, 
  File,
  FileCog
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Function to get appropriate file icon based on document type
export const getFileIcon = (fileType: string) => {
  switch (fileType.toLowerCase()) {
    case "document":
      return <FileText className="h-8 w-8 text-blue-500" />;
    case "spreadsheet":
      return <FileSpreadsheet className="h-8 w-8 text-green-500" />;
    case "image":
      return <FileImage className="h-8 w-8 text-purple-500" />;
    case "action":
      return <FileText className="h-8 w-8 text-amber-500" />;
    case "precedent":
      return <FileText className="h-8 w-8 text-red-500" />;
    case "strategy":
      return <FileCog className="h-8 w-8 text-indigo-500" />;
    default:
      return <File className="h-8 w-8 text-gray-500" />;
  }
};

// Function to format date
export const formatDate = (date: string | Date) => {
  if (!date) return "--";
  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return format(dateObj, "dd/MM/yyyy", { locale: ptBR });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "--";
  }
};
