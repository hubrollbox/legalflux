
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const LandingNavbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/logo.png" 
            alt="Logo"
            className="h-8 w-auto"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://placehold.co/80x40?text=LegalFlux";
            }}
          />
          <span className="font-bold text-gray-900">LegalFlux</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/features" className="text-sm font-medium text-gray-700 hover:text-blue-600">Recursos</Link>
          <Link to="/pricing" className="text-sm font-medium text-gray-700 hover:text-blue-600">Preços</Link>
          <Link to="/central-de-ajuda/support" className="text-sm font-medium text-gray-700 hover:text-blue-600">Suporte</Link>
          <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-blue-600">Sobre</Link>
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="hidden md:inline text-sm font-medium text-gray-700">
                Olá, {user?.name}
              </span>
              <Link to={user?.role === 'client' ? '/client-portal' : '/dashboard'}>
                <Button variant="outline" size="sm">
                  {user?.role === 'client' ? 'Portal do Cliente' : 'Dashboard'}
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={() => logout()}>
                Sair
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Entrar</Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Começar</Button>
              </Link>
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
