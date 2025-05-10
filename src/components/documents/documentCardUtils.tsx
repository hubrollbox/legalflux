
import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { File, FileText, FileArchive, FileCode } from "lucide-react";
import { DocumentType } from "@/types/document";

export const getFileIcon = (type: DocumentType) => {
  switch (type) {
    case "document":
      return <FileText className="h-4 w-4 text-blue-500" />;
    case "action":
      return <File className="h-4 w-4 text-green-500" />;
    case "precedent":
      return <FileArchive className="h-4 w-4 text-amber-500" />;
    case "strategy":
      return <FileCode className="h-4 w-4 text-purple-500" />;
    default:
      return <File className="h-4 w-4 text-gray-500" />;
  }
};

export const formatDate = (date: string | Date) => {
  try {
    if (!date) return "";
    const dateObj = typeof date === "string" ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return "";
    
    return format(dateObj, "dd/MM/yyyy", { locale: ptBR });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};

export const getDocumentTypeLabel = (type: DocumentType) => {
  switch (type) {
    case "document":
      return "Documento";
    case "action":
      return "Ação";
    case "precedent":
      return "Precedente";
    case "strategy":
      return "Estratégia";
    default:
      return "Desconhecido";
  }
};
