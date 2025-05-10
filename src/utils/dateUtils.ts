
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

// Custom implementation of isWithinInterval since there are issues with the import
export const isWithinInterval = (date: Date, interval: { start: Date; end: Date }): boolean => {
  return date >= interval.start && date <= interval.end;
};

// Fixed formatDate function with correct arguments
export const formatDate = (date: Date | string, formatStr: string = 'dd/MM/yyyy'): string => {
  if (!date) return "";
  const dateObj = typeof date === "string" ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) return "";
  
  return format(dateObj, formatStr, { 
    locale: ptBR
  });
};
