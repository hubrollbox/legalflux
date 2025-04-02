
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Sistema de Gestão Jurídica Completo
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-100">
          Faça a gestão de utilizadores, permissões e assinaturas na sua plataforma jurídica 
          com eficiência, segurança e conformidade.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            size="lg"
            className="bg-white text-primary-900 hover:bg-gray-100"
            onClick={() => navigate("/register")}
          >
            Comece Agora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent text-white border-white hover:bg-white/10"
            onClick={() => navigate("/login")}
          >
            Fazer Login
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
