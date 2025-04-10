import React, { ReactNode } from 'react';
import { AuthProvider } from '@/hooks/useAuth';
const AuthContextProvider = AuthProvider;

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  return (
    <AuthContextProvider>
      {children}
    </AuthContextProvider>
  );
};

export default AuthProvider;