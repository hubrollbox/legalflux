
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LandingNavbar = () => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white/90 backdrop-blur-sm border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-primary-950">
            LegalFlux
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/#features"
            className="text-gray-600 hover:text-primary-600 transition-colors"
          >
            Funcionalidades
          </Link>
          <Link
            to="/#pricing"
            className="text-gray-600 hover:text-primary-600 transition-colors"
          >
            Planos
          </Link>
          <Link
            to="/screenshots"
            className="text-gray-600 hover:text-primary-600 transition-colors"
          >
            Screenshots
          </Link>
          <Link
            to="/login"
            className="text-gray-600 hover:text-primary-600 transition-colors"
          >
            Login
          </Link>
          <Button onClick={() => navigate("/register")}>Começar Grátis</Button>
        </nav>
        <div className="md:hidden flex items-center gap-2">
          <Link
            to="/screenshots"
            className="text-gray-600 hover:text-primary-600 transition-colors text-sm"
          >
            Screenshots
          </Link>
          <Button variant="ghost" onClick={() => navigate("/login")}>
            Login
          </Button>
        </div>
      </div>
    </header>
  );
};

export default LandingNavbar;
