
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const LandingNavbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold">LegalFlux</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/features" className="text-sm font-medium hover:text-blue-600">Recursos</Link>
          <Link to="/pricing" className="text-sm font-medium hover:text-blue-600">Preços</Link>
          <Link to="/central-de-ajuda/support" className="text-sm font-medium hover:text-blue-600">Suporte</Link>
          <Link to="/about" className="text-sm font-medium hover:text-blue-600">Sobre</Link>
          <Link to="/contact" className="text-sm font-medium hover:text-blue-600">Contato</Link>
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <Button variant="ghost" size="sm" onClick={() => navigate(user?.role === 'client' ? '/client-portal' : '/dashboard')}>
              Área Pessoal
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                Entrar
              </Button>
              <Button size="sm" onClick={() => navigate('/register')}>
                Começar
              </Button>
            </>
          )}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
