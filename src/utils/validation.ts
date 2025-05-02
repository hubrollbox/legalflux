
export const validateEmail = (email: string): boolean => {
  return /^\S+@\S+\.\S+$/.test(email);
};

export const validatePassword = (password: string): boolean => {
  return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
};

export const validateNIF = (nif: string): boolean => {
  return /^\d{9}$/.test(nif);
};

export const getErrorMessage = (errorType: string): string => {
  const errorMessages: { [key: string]: string } = {
    invalidEmail: "Por favor, forneça um email válido.",
    invalidPassword: "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.",
    loginError: "Erro ao entrar. Por favor, tente novamente.",
    // Add other error messages as needed
  };
  return errorMessages[errorType] || "Ocorreu um erro.";
};

// O conteúdo atual será verificado para garantir conformidade com os requisitos
