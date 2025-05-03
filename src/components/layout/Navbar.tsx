
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import CustomImage from '@/components/ui/CustomImage';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <CustomImage 
            src="/logo.png" 
            alt="Logo"
            className="h-10 w-auto"
          />
          <span className="font-bold">LegalFlux</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/features" className="text-sm font-medium hover:text-primary">Recursos</Link>
          <Link to="/pricing" className="text-sm font-medium hover:text-primary">Preços</Link>
          <Link to="/support" className="text-sm font-medium hover:text-primary">Suporte</Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary">Sobre</Link>
          <Link to="/contact" className="text-sm font-medium hover:text-primary">Contato</Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/login">
            <Button variant="ghost" size="sm">Entrar</Button>
          </Link>
          <Link to="/register">
            <Button size="sm">Começar</Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
