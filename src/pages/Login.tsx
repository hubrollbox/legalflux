
import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import PageTransition from '@/components/PageTransition';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const { isAuthenticated, getRedirectPath } = useAuth();
  
  // Se o usuário já estiver autenticado, redireciona
  if (isAuthenticated) {
    return <Navigate to={getRedirectPath()} />;
  }
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-md px-8 py-12 bg-card shadow-lg rounded-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Iniciar Sessão</h1>
            <p className="text-muted-foreground mt-2">
              Aceda à sua conta LegalFlux
            </p>
          </div>
          
          <LoginForm />
          
          <div className="mt-6 text-center text-sm">
            <p>
              Não tem uma conta?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Registar
              </Link>
            </p>
            <p className="mt-2">
              <Link to="/forgot-password" className="text-primary hover:underline">
                Esqueceu a password?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Login;
