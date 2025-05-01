
import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="container flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link to="/" className="inline-block mb-6">
              <img 
                src="/logo.png" 
                alt="LegalFlux" 
                className="h-12 w-auto mx-auto"
              />
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            {subtitle && (
              <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
          
          <div className="mt-8 bg-card shadow-md rounded-lg p-6 sm:p-8 border border-border">
            {children}
          </div>
          
          <div className="text-center mt-6 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} LegalFlux. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
