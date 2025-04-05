
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { LOGO } from "@/assets";
import { useAuth } from "@/hooks/useAuth";

const LandingNavbar: React.FC = () => {
  const { isAuthenticated, user, getRedirectPath } = useAuth();
  const redirectPath = getRedirectPath();
  
  const navLinks = [
    { title: "Recursos", href: "/features" },
    { title: "Preços", href: "/subscriptions" },
    { title: "Sobre", href: "/about" },
    { title: "Segurança", href: "/security" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={LOGO.DEFAULT}
              alt="LegalFlux"
              className="h-8 w-auto"
            />
            <span className="ml-2 text-xl font-bold text-gray-900">
              LegalFlux
            </span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons or User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Link to={redirectPath}>
                <Button>
                  {user?.role === "client" ? "Portal do Cliente" : "Dashboard"}
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login" className="hidden md:block">
                  <Button variant="ghost">Iniciar Sessão</Button>
                </Link>
                <Link to="/register">
                  <Button>Registar</Button>
                </Link>
              </>
            )}

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <nav className="flex flex-col space-y-4 mt-6">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className="text-gray-600 hover:text-primary transition-colors py-2"
                      >
                        {link.title}
                      </Link>
                    ))}
                    {!isAuthenticated && (
                      <Link to="/login" className="py-2">
                        Iniciar Sessão
                      </Link>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingNavbar;
