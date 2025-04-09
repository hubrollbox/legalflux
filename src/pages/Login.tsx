
import React from 'react';
import Link from 'next/link'; // Update to use next/link
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
          <Link href="/register">
            <a className="text-primary hover:text-highlight font-medium">
              Registe-se
            </a>
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
