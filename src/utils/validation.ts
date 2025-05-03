
export const validateEmail = (email: string): boolean => {
  return /^\S+@\S+\.\S+$/.test(email);
};

export const validatePassword = (password: string): boolean => {
  return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
};

export const validateNIF = (nif: string): boolean => {
  return /^\d{9}$/.test(nif);
};
