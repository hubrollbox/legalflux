
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { ArrowRight, CheckCircle, Shield, Users } from 'lucide-react';

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  
  const getRedirectPath = () => {
    if (user?.role === "client") {
      return "/client-portal";
    }
    return "/dashboard";
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Gestão Jurídica Inteligente para o seu Escritório
              </h1>
              <p className="text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
                Uma plataforma completa para gerir processos, clientes, documentos e finanças do seu escritório de advocacia.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                {isAuthenticated ? (
                  <Link to={getRedirectPath()}>
                    <Button size="lg" className="bg-blue-700 hover:bg-blue-800">
                      Aceder ao Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/register">
                      <Button size="lg" className="bg-blue-700 hover:bg-blue-800">
                        Começar Agora <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button size="lg" variant="outline">
                        Entrar
                      </Button>
                    </Link>
                  </>
                )}
              </div>
              
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-sm text-gray-500">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Experimente grátis por 14 dias, sem compromisso</span>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="rounded-lg overflow-hidden shadow-xl border border-gray-100">
                  <img 
                    src="/smartphone-legalflux.png" 
                    alt="LegalFlux Platform" 
                    className="w-full h-auto"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=LegalFlux";
                    }}
                  />
                </div>
                <div className="absolute -top-4 -right-4 bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium">
                  Novo
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Principais Funcionalidades</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Tudo o que precisa para gerir o seu escritório jurídico num só lugar
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield className="h-8 w-8 text-blue-700" />}
              title="Controlo de Permissões"
              description="Gestão granular de acessos por perfil de utilizador e módulos específicos"
            />
            <FeatureCard 
              icon={<Users className="h-8 w-8 text-blue-700" />}
              title="Gestão de Utilizadores"
              description="Diferentes perfis com acesso personalizado para advogados, assistentes e clientes"
            />
            <FeatureCard 
              icon={<CheckCircle className="h-8 w-8 text-blue-700" />}
              title="Portal do Cliente"
              description="Área dedicada para os seus clientes acompanharem processos e comunicarem"
            />
          </div>
          
          <div className="text-center mt-12">
            <Link to="/features">
              <Button variant="outline" size="lg">
                Ver todas as funcionalidades
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Pricing CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Planos de Subscrição Flexíveis
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Escolha o plano ideal para o seu escritório, desde advogados independentes até grandes sociedades.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/pricing">
              <Button size="lg">Ver Planos e Preços</Button>
            </Link>
            <Link to="/central-de-ajuda/support">
              <Button variant="outline" size="lg">Fale com um Consultor</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Componente para os cartões de funcionalidades
const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Home;
