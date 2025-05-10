
import { format, isWithinInterval as dateIsWithinInterval } from "date-fns";
import { ptBR } from "date-fns/locale";

// Export isWithinInterval diretamente do date-fns
export const isWithinInterval = (date: Date, interval: { start: Date, end: Date }): boolean => {
  return dateIsWithinInterval(date, interval);
};

// Função formatDate corrigida para aceitar somente 1-2 argumentos
export const formatDate = (date: Date | string | undefined, formatStr = 'dd/MM/yyyy'): string => {
  if (!date) return "";
  const dateObj = typeof date === "string" ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) return "";
  
  // Formato com locale português
  return format(dateObj, formatStr, { locale: ptBR });
};
