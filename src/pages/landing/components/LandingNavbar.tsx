
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LOGO } from "@/assets";

const LandingNavbar = () => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={LOGO.DEFAULT} alt="LegalFlux" className="h-8 mr-2" />
            <span className="text-xl font-bold text-primary">LegalFlux</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center justify-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
          <Link
            to="/#features"
            className="text-gray-600 hover:text-highlight transition-colors"
          >
            Funcionalidades
          </Link>
          <Link
            to="/#pricing"
            className="text-gray-600 hover:text-highlight transition-colors"
          >
            Planos
          </Link>
          <Link
            to="/screenshots"
            className="text-gray-600 hover:text-highlight transition-colors"
          >
            Capturas de Ecrã
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-gray-600 hover:text-highlight transition-colors hidden md:inline-block"
          >
            Iniciar Sessão
          </Link>
          <Button onClick={() => navigate("/register")} className="bg-highlight hover:bg-highlight/90">
            Registar
          </Button>
        </div>
      </div>
    </header>
  );
};

export default LandingNavbar;
