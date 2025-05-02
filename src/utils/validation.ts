
/**
 * Validates an email address format
 * @param email Email to validate
 * @returns Boolean indicating if the email is valid
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a password format
 * - At least 8 characters
 * - At least one uppercase letter
 * - At least one digit
 * - At least one special character
 * @param password Password to validate
 * @returns Boolean indicating if the password is valid
 */
export const validatePassword = (password: string): boolean => {
  return password.length >= 8 && 
    /[A-Z]/.test(password) && 
    /[0-9]/.test(password) && 
    /[^A-Za-z0-9]/.test(password);
};

/**
 * Validates a Portuguese NIF (Número de Identificação Fiscal)
 * @param nif NIF to validate
 * @returns Boolean indicating if the NIF is valid
 */
export const validateNIF = (nif: string): boolean => {
  // Remove spaces and other non-digit characters
  const cleanNIF = nif.replace(/\D/g, '');
  
  // Check if it has exactly 9 digits and starts with valid digits (1, 2, 3, 5, 6, 8)
  const validStart = /^[123568]\d{8}$/.test(cleanNIF);
  
  if (!validStart) return false;
  
  // Calculate checksum for validation
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += parseInt(cleanNIF[i]) * (9 - i);
  }
  
  const controlDigit = 11 - (sum % 11);
  const checkDigit = controlDigit >= 10 ? 0 : controlDigit;
  
  return checkDigit === parseInt(cleanNIF[8]);
};

/**
 * Validates a Portuguese phone number
 * @param phone Phone number to validate
 * @returns Boolean indicating if the phone number is valid
 */
export const validatePortuguesePhone = (phone: string): boolean => {
  // Remove spaces, hyphens, etc.
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Portuguese mobile numbers start with 9 and have 9 digits
  // Portuguese landline numbers start with 2 and have 9 digits
  return /^(9[1236]\d{7}|2\d{8})$/.test(cleanPhone);
};

/**
 * Checks if two passwords match
 * @param password Original password
 * @param confirmPassword Password confirmation
 * @returns Boolean indicating if passwords match
 */
export const passwordsMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

/**
 * Checks if a string is empty (after trimming)
 * @param value String to check
 * @returns Boolean indicating if the string is empty
 */
export const isEmpty = (value: string): boolean => {
  return value.trim() === '';
};
