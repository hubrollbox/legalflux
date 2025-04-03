
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-24 md:py-32 bg-white text-gray-800">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 md:pr-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary-900">
            Sistema de Gestão Jurídica Completo
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-600 max-w-2xl">
            Faça a gestão de utilizadores, permissões e assinaturas na sua plataforma jurídica 
            com eficiência, segurança e conformidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              size="lg"
              className="bg-highlight text-white hover:bg-highlight/90 shadow-md hover:shadow-lg transition-all"
              onClick={() => navigate("/register")}
            >
              Comece Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-900 text-primary-900 hover:bg-gray-100 transition-all"
              onClick={() => navigate("/login")}
            >
              Iniciar Sessão
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="relative bg-white rounded-lg p-6 shadow-lg border border-gray-200">
              <img 
                src="/lovable-uploads/713f9dc1-3f6e-43d4-8a1d-28c4c79c1ef5.png" 
                alt="LegalFlux Dashboard" 
                className="w-full rounded shadow-md" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
