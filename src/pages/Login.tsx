
import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import AuthLayout from '@/components/auth/AuthLayout';

const Login = () => {
  return (
    <AuthLayout 
      title="Login LegalFlux" 
      subtitle="Inicie sessão para aceder à plataforma"
    >
      <LoginForm />
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Não tem uma conta?{" "}
          <Link to="/register" className="text-primary hover:text-highlight font-medium">
            Registe-se
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
