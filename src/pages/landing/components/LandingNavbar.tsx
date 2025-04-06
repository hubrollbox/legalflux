
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
    { title: "Integrações", href: "/integrations" },
    { title: "Segurança", href: "/security" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={LOGO.DEFAULT}
            alt="LegalFlux"
            className="h-8 w-8"
          />
          <span className="font-bold">LegalFlux</span>
        </Link>

        {/* Navigation - Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm font-medium hover:text-primary"
            >
              {link.title}
            </Link>
          ))}
        </div>

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
              <Link to="/login">
                <Button variant="ghost" size="sm">Iniciar Sessão</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Registar</Button>
              </Link>
            </>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4 mt-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="text-sm font-medium hover:text-primary py-2"
                    >
                      {link.title}
                    </Link>
                  ))}
                  {!isAuthenticated && (
                    <Link to="/login" className="text-sm font-medium py-2">
                      Iniciar Sessão
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

export default LandingNavbar;
