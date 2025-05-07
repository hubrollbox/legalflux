
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

const Home = () => {
  const { isAuthenticated, getRedirectPath } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">LegalFlux</h1>
          <nav>
            {isAuthenticated ? (
              <Button asChild>
                <Link to={getRedirectPath()}>Aceder à Plataforma</Link>
              </Button>
            ) : (
              <div className="flex space-x-4">
                <Button asChild variant="outline">
                  <Link to="/login">Entrar</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Registar</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Sistema de Gestão de Utilizadores, Permissões e Assinaturas para Plataforma Jurídica</h2>
            <p className="text-xl mb-8 text-gray-600">
              Uma plataforma robusta e segura para gestão de utilizadores, permissões e subscrições numa plataforma jurídica.
            </p>
            <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row justify-center">
              <Button size="lg" asChild>
                <Link to={isAuthenticated ? getRedirectPath() : "/login"}>
                  Comece Agora
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/central-de-ajuda">
                  Saiba Mais
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600">© 2025 LegalFlux. Todos os direitos reservados.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 hover:text-primary">Termos</a>
              <a href="#" className="text-gray-600 hover:text-primary">Privacidade</a>
              <a href="#" className="text-gray-600 hover:text-primary">Contacto</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
