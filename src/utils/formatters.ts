
/**
 * Formats a number as currency (EUR)
 * @param value The number to format
 * @returns Formatted currency string (e.g., €1.000,00)
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
};

/**
 * Formats a date to a localized string
 * @param date The date to format
 * @param format Optional format specification
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string): string => {
  if (!date) return 'N/A';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('pt-PT', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

/**
 * Formats a percentage value
 * @param value The decimal value (e.g., 0.25 for 25%)
 * @returns Formatted percentage string (e.g., 25%)
 */
export const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(1)}%`;
};
