
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import LandingNavbar from "./components/LandingNavbar";
import LandingFooter from "./components/LandingFooter";

const LandingPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  
  const getRedirectPath = () => {
    if (user?.role === "client") {
      return "/client-portal";
    }
    return "/dashboard";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LandingNavbar />
      <main>
        {/* Banner de boas-vindas para utilizadores autenticados */}
        {isAuthenticated && user && (
          <section className="w-full bg-primary py-4 text-white">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Bem-vindo, {user.name}!</h3>
                  <p>
                    {user.role === "client" 
                      ? "Aceda ao seu Portal de Cliente para gerir os seus processos jurídicos."
                      : "Aceda ao seu Dashboard para continuar o seu trabalho."}
                  </p>
                </div>
                <Link to={getRedirectPath()}>
                  <Button 
                    className="mt-3 md:mt-0 bg-white text-primary hover:bg-gray-100"
                  >
                    {user.role === "client" ? "Portal do Cliente" : "Dashboard"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}
        
        <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-4 leading-tight text-gray-900">
                Gestão jurídica simplificada para o seu escritório
              </h1>
              <p className="text-xl mb-8 text-gray-600 max-w-lg">
                Impulsione a eficiência do seu escritório com uma solução completa de gestão de processos, documentos e clientes.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
                    Comece agora <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/features">
                  <Button size="lg" variant="outline">
                    Conheça as funcionalidades
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="rounded-xl border p-4 bg-white shadow-lg">
                <h3 className="text-xl font-semibold mb-2">LegalFlux - Plataforma Jurídica Completa</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Gestão de processos jurídicos
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Controlo granular de permissões
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Portal personalizado para clientes
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Gestão de subscrições e pagamentos
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Segurança e conformidade GDPR/LGPD
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
