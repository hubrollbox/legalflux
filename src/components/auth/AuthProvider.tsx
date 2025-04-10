import React, { ReactNode } from 'react';
import { AuthProvider as AuthContext } from '@/hooks/useAuth';
const AuthContextProvider = AuthContext;

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProviderComponent = ({ children }: AuthProviderProps) => {
  return (
    <AuthContextProvider>
      {children}
    </AuthContextProvider>
  );
};

export default AuthContextProviderComponent;