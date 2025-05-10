
import { format, isWithinInterval as originalIsWithinInterval } from "date-fns";
import { ptBR } from "date-fns/locale";

// Export isWithinInterval directly from date-fns
export { originalIsWithinInterval as isWithinInterval };

// Fixed formatDate function with correct arguments
export const formatDate = (date: Date | string, formatStr: string = 'dd/MM/yyyy'): string => {
  if (!date) return "";
  const dateObj = typeof date === "string" ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) return "";
  
  return format(dateObj, formatStr, { 
    locale: ptBR
  });
};
