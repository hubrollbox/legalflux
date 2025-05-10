
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

/**
 * Formats a date object or string into a localized string format
 * @param date The date to format
 * @param formatString Optional format string (defaults to dd/MM/yyyy)
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string, formatString: string = 'dd/MM/yyyy'): string => {
  if (!date) return '--';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, formatString, { locale: pt });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '--';
  }
};

/**
 * Checks if a date falls within an interval
 * @param date The date to check
 * @param interval The interval with start and end dates
 * @returns Boolean indicating if date is within interval
 */
export const isWithinInterval = (date: Date, interval: { start: Date, end: Date }): boolean => {
  const timestamp = date.getTime();
  return timestamp >= interval.start.getTime() && timestamp <= interval.end.getTime();
};
