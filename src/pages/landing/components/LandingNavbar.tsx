
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LOGO } from "@/assets";

const LandingNavbar = () => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white sticky top-0 z-20 border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/5f9e9260-2a46-4bc3-a26b-93a0e41be3d6.png" 
              alt="LegalFlux Logo" 
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <nav className="hidden md:flex items-center justify-center space-x-8 flex-1">
          <Link
            to="/#features"
            className="text-gray-600 hover:text-primary-900 transition-colors"
          >
            Funcionalidades
          </Link>
          <Link
            to="/subscriptions"
            className="text-gray-600 hover:text-primary-900 transition-colors"
          >
            Planos
          </Link>
          <Link
            to="/screenshots"
            className="text-gray-600 hover:text-primary-900 transition-colors"
          >
            Screenshots
          </Link>
          <Link
            to="/about"
            className="text-gray-600 hover:text-primary-900 transition-colors"
          >
            Sobre
          </Link>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/login"
            className="text-gray-600 hover:text-primary-900 transition-colors"
          >
            Login
          </Link>
          <Button 
            onClick={() => navigate("/register")} 
            className="bg-highlight text-white hover:bg-highlight/90"
          >
            Registo
          </Button>
        </div>
        <div className="md:hidden flex items-center gap-3">
          <div className="relative group">
            <Button 
              variant="ghost" 
              className="p-2"
              aria-label="Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12"/>
                <line x1="4" x2="20" y1="6" y2="6"/>
                <line x1="4" x2="20" y1="18" y2="18"/>
              </svg>
            </Button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
              <Link
                to="/#features"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Funcionalidades
              </Link>
              <Link
                to="/subscriptions"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Planos
              </Link>
              <Link
                to="/screenshots"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Screenshots
              </Link>
              <Link
                to="/about"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Sobre
              </Link>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate("/login")} 
            className="border-gray-300 text-primary-900 hover:bg-gray-100"
          >
            Login
          </Button>
        </div>
      </div>
    </header>
  );
};

export default LandingNavbar;
