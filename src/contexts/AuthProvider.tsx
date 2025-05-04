
import React from 'react';
import { AuthProvider as AuthProviderHook } from '@/hooks/useAuth.tsx';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AuthProviderHook>{children}</AuthProviderHook>;
};
