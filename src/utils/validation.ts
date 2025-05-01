
export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const validateNIF = (nif: string): boolean => {
  return /^\d{9}$/.test(nif);
};

export const getErrorMessage = (errorCode: string): string => {
  const errorMessages: Record<string, string> = {
    invalidEmail: "Por favor, forneça um endereço de email válido.",
    invalidPassword: "A senha deve ter pelo menos 8 caracteres.",
    loginError: "Email ou senha incorretos. Tente novamente.",
    networkError: "Erro de conexão. Verifique sua internet e tente novamente.",
    serverError: "Erro no servidor. Tente novamente mais tarde.",
    accountExists: "Já existe uma conta com este email.",
    invalidCredentials: "Credenciais inválidas. Verifique seus dados e tente novamente."
  };
  
  return errorMessages[errorCode] || "Ocorreu um erro. Tente novamente.";
};
