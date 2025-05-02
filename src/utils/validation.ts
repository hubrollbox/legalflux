
/**
 * Validates an email address format
 * @param email Email to validate
 * @returns Boolean indicating if the email is valid
 */
export const isValidEmail = (email: string): boolean => {
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
export const isValidPassword = (password: string): boolean => {
  return password.length >= 8 && 
    /[A-Z]/.test(password) && 
    /[0-9]/.test(password) && 
    /[^A-Za-z0-9]/.test(password);
};

/**
 * Checks if a string is empty (after trimming)
 * @param value Value to check
 * @returns Boolean indicating if the string is empty
 */
export const isEmpty = (value: string): boolean => {
  return value.trim() === '';
};

/**
 * Validates a Portuguese phone number
 * @param phone Phone number to validate
 * @returns Boolean indicating if the phone number is valid
 */
export const isValidPortuguesePhone = (phone: string): boolean => {
  const phoneRegex = /^(9[1236]\d{7}|2\d{8})$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
};

/**
 * Validates a Portuguese NIF (Número de Identificação Fiscal)
 * @param nif NIF to validate
 * @returns Boolean indicating if the NIF is valid
 */
export const isValidNIF = (nif: string): boolean => {
  const nifRegex = /^[123568]\d{8}$/;
  return nifRegex.test(nif);
};

/**
 * Validates a password confirmation matches the password
 * @param password Original password
 * @param confirmPassword Password confirmation to validate
 * @returns Boolean indicating if the passwords match
 */
export const passwordsMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};
