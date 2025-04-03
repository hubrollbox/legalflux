
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-24 md:py-32 text-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 md:pr-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Sistema de Gestão Jurídica Completo
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-100 max-w-2xl">
            Faça a gestão de utilizadores, permissões e assinaturas na sua plataforma jurídica 
            com eficiência, segurança e conformidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              size="lg"
              className="bg-highlight text-white hover:bg-highlight/90 shadow-lg hover:shadow-xl transition-all"
              onClick={() => navigate("/register")}
            >
              Comece Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white/20 transition-all"
              onClick={() => navigate("/login")}
            >
              Iniciar Sessão
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 to-highlight rounded-lg blur-lg opacity-75 animate-pulse"></div>
            <div className="relative bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-2xl border border-white/20">
              <img 
                src="/lovable-uploads/713f9dc1-3f6e-43d4-8a1d-28c4c79c1ef5.png" 
                alt="LegalFlux Dashboard" 
                className="w-full rounded shadow-lg" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
