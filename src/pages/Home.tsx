
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import { useAuth } from '@/hooks/useAuth';

const Home = () => {
  const { isAuthenticated, getRedirectPath } = useAuth();
  
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">LegalFlux</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Sistema de Gestão de Utilizadores, Permissões e Assinaturas para Plataforma Jurídica
          </p>
          
          <div className="space-y-4">
            {isAuthenticated ? (
              <Link to={getRedirectPath()}>
                <Button size="lg">Ir para Dashboard</Button>
              </Link>
            ) : (
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/login">
                  <Button size="lg">Iniciar Sessão</Button>
                </Link>
                <Link to="/register">
                  <Button size="lg" variant="outline">Registar</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Home;
