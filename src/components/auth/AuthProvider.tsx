import React, { ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default AuthProvider;