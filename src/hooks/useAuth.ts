
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return {
    ...context,
    // Adicionando os métodos que foram usados nos componentes ForgotPassword e ResetPassword
    forgotPassword: async (email: string) => {
      // Implementação real futura para integração com backend
      console.log('Enviando email de recuperação para:', email);
      // Simulando um delay para melhor UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      return Promise.resolve();
    },
    resetPassword: async (token: string, newPassword: string) => {
      // Implementação real futura para integração com backend
      console.log('Redefinindo senha com token:', token);
      // Simulando um delay para melhor UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      return Promise.resolve();
    }
  };
};
