
import { format, isWithinInterval as dateIsWithinInterval } from "date-fns";
import { ptBR } from "date-fns/locale";

// Export isWithinInterval directly from date-fns
export const isWithinInterval = (date: Date, interval: { start: Date, end: Date }): boolean => {
  return dateIsWithinInterval(date, interval);
};

// Fixed formatDate function with correct arguments
export const formatDate = (date: Date | string, formatStr = 'dd/MM/yyyy'): string => {
  if (!date) return "";
  const dateObj = typeof date === "string" ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) return "";
  
  return format(dateObj, formatStr, { locale: ptBR });
};
