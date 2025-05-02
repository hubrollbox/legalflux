
/**
 * Valida se um email está em formato válido
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida se uma password atende aos requisitos mínimos
 * - Pelo menos 8 caracteres
 * - Pelo menos uma letra maiúscula
 * - Pelo menos um número
 * - Pelo menos um caractere especial
 */
export const validatePassword = (password: string): boolean => {
  return password.length >= 8 && 
    /[A-Z]/.test(password) && 
    /[0-9]/.test(password) && 
    /[^A-Za-z0-9]/.test(password);
};

/**
 * Valida se um número de telefone está em formato válido
 */
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(\+\d{1,3}\s?)?\(?\d{2,3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  return phoneRegex.test(phone);
};

/**
 * Valida se um NIF (Número de Identificação Fiscal) português é válido
 */
export const validateNIF = (nif: string): boolean => {
  // Deve ter 9 dígitos
  if (!/^\d{9}$/.test(nif)) return false;
  
  const firstDigit = parseInt(nif.charAt(0), 10);
  // Primeiro dígito deve ser 1, 2, 5, 6, 8 ou 9
  if (![1, 2, 5, 6, 8, 9].includes(firstDigit)) return false;
  
  // Cálculo do dígito de controle
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += parseInt(nif.charAt(i), 10) * (9 - i);
  }
  
  let checkDigit = 11 - (sum % 11);
  if (checkDigit >= 10) checkDigit = 0;
  
  return checkDigit === parseInt(nif.charAt(8), 10);
};
