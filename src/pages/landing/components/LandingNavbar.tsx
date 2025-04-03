
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LOGO } from "@/assets";

const LandingNavbar = () => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white/10 backdrop-blur-md sticky top-0 z-20 border-b border-white/10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-white flex items-center gap-2">
            <img 
              src="/lovable-uploads/5f9e9260-2a46-4bc3-a26b-93a0e41be3d6.png" 
              alt="LegalFlux Logo" 
              className="h-8 w-auto"
            />
            LegalFlux
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/#features"
            className="text-white/80 hover:text-white transition-colors"
          >
            Funcionalidades
          </Link>
          <Link
            to="/#pricing"
            className="text-white/80 hover:text-white transition-colors"
          >
            Planos
          </Link>
          <Link
            to="/screenshots"
            className="text-white/80 hover:text-white transition-colors"
          >
            Screenshots
          </Link>
          <Link
            to="/login"
            className="text-white/80 hover:text-white transition-colors"
          >
            Login
          </Link>
          <Button 
            onClick={() => navigate("/register")} 
            className="bg-white text-primary-900 hover:bg-white/90 ml-2"
          >
            Começar Grátis
          </Button>
        </nav>
        <div className="md:hidden flex items-center gap-3">
          <Link
            to="/screenshots"
            className="text-white/80 hover:text-white transition-colors text-sm"
          >
            Screenshots
          </Link>
          <Button 
            variant="outline" 
            onClick={() => navigate("/login")} 
            className="border-white/20 text-white hover:bg-white/10"
          >
            Login
          </Button>
        </div>
      </div>
    </header>
  );
};

export default LandingNavbar;
