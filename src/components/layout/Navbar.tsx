
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/logo.png" 
              alt="Logo"
              className="h-10 w-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://placehold.co/100x50?text=LegalFlux";
              }}
            />
            <span className="font-bold text-xl text-blue-900">LegalFlux</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/features">Recursos</NavLink>
            
            <div className="relative group">
              <button className="flex items-center text-sm font-medium text-gray-600 hover:text-blue-700">
                Soluções <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link to="/solucoes/advocacia" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                  Para Advogados
                </Link>
                <Link to="/solucoes/escritorios" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                  Para Escritórios
                </Link>
                <Link to="/solucoes/departamentos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                  Departamentos Jurídicos
                </Link>
              </div>
            </div>
            
            <NavLink href="/pricing">Preços</NavLink>
            <NavLink href="/central-de-ajuda/support">Suporte</NavLink>
            <NavLink href="/about">Sobre</NavLink>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Link to={user?.role === 'client' ? '/client-portal' : '/dashboard'}>
                <Button variant="default" className="bg-blue-700 hover:bg-blue-800">
                  Minha Área
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login" className="hidden md:inline-block">
                  <Button variant="ghost">Entrar</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-blue-700 hover:bg-blue-800">Começar</Button>
                </Link>
              </>
            )}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4 absolute w-full shadow-md">
          <div className="space-y-2">
            <MobileNavLink href="/features" onClick={toggleMobileMenu}>Recursos</MobileNavLink>
            <MobileNavLink href="/pricing" onClick={toggleMobileMenu}>Preços</MobileNavLink>
            <MobileNavLink href="/central-de-ajuda/support" onClick={toggleMobileMenu}>Suporte</MobileNavLink>
            <MobileNavLink href="/about" onClick={toggleMobileMenu}>Sobre</MobileNavLink>
            {!isAuthenticated && (
              <MobileNavLink href="/login" onClick={toggleMobileMenu}>Entrar</MobileNavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link to={href} className="text-sm font-medium text-gray-600 hover:text-blue-700 transition-colors">
    {children}
  </Link>
);

const MobileNavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode, onClick: () => void }) => (
  <Link 
    to={href} 
    className="block py-2 text-base font-medium text-gray-600 hover:text-blue-700 transition-colors"
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;
