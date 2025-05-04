
/**
 * Valida se um email está em formato válido
 */
export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Valida se uma senha atende aos requisitos mínimos
 * - Pelo menos 8 caracteres
 * - Pelo menos uma letra maiúscula
 * - Pelo menos um número
 * - Pelo menos um caractere especial
 */
export const validatePassword = (password: string): boolean => {
  // Mínimo de 8 caracteres
  if (password.length < 8) return false;
  
  // Pelo menos uma letra maiúscula
  if (!/[A-Z]/.test(password)) return false;
  
  // Pelo menos um número
  if (!/[0-9]/.test(password)) return false;
  
  // Pelo menos um caractere especial
  if (!/[^A-Za-z0-9]/.test(password)) return false;
  
  return true;
};

/**
 * Valida se um NIF português é válido (9 dígitos)
 */
export const validateNIF = (nif: string): boolean => {
  return /^\d{9}$/.test(nif);
};

/**
 * Valida se um código postal português é válido (xxxx-xxx)
 */
export const validatePostalCode = (postalCode: string): boolean => {
  return /^\d{4}-\d{3}$/.test(postalCode);
};

/**
 * Valida se um número de telefone português é válido
 */
export const validatePhoneNumber = (phone: string): boolean => {
  // Aceita formato com ou sem prefixo internacional (+351) e com ou sem espaços
  return /^(\+351\s?)?9[1236]\d{7}$|^(\+351\s?)?2\d{8}$/.test(
    phone.replace(/\s/g, '')
  );
};
