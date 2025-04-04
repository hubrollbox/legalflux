
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOGO } from "@/assets";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

const LandingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Verificar se a rota atual é a página inicial
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Início", href: "/" },
    { label: "Funcionalidades", href: isHomePage ? "/#features" : "/features" },
    { label: "Planos", href: "/subscriptions" },
    { label: "Integrações", href: "/integrations" },
    { label: "Segurança", href: "/security" },
    { label: "Sobre", href: "/about" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img
            src={LOGO.DEFAULT}
            alt="LegalFlux Logo"
            className="h-8 md:h-10"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors ${
                isScrolled ? "text-gray-700" : "text-gray-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <Button
              onClick={() => navigate("/dashboard")}
              className="bg-highlight hover:bg-highlight/90"
            >
              Painel de Controlo
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => navigate("/login")}
                className="text-gray-700"
              >
                Iniciar Sessão
              </Button>
              <Button
                onClick={() => navigate("/register")}
                className="bg-highlight hover:bg-highlight/90"
              >
                Registar
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t mt-2">
          <div className="container mx-auto px-4 py-2">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 space-y-2">
              {isAuthenticated ? (
                <Button
                  onClick={() => {
                    navigate("/dashboard");
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-highlight hover:bg-highlight/90"
                >
                  Painel de Controlo
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate("/login");
                      setIsMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Iniciar Sessão
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/register");
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-highlight hover:bg-highlight/90"
                  >
                    Registar
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default LandingNavbar;
