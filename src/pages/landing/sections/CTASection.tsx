
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background com gradiente */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-800 to-primary-900 z-0"></div>
      
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-highlight/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm p-10 rounded-2xl border border-white/20 shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Pronto para Transformar o seu Escritório?
          </h2>
          <p className="text-xl mb-10 text-gray-200 max-w-2xl mx-auto">
            Experimente o LegalFlux hoje e descubra como a nossa plataforma pode 
            aumentar a produtividade e organização do seu escritório jurídico.
          </p>
          <Button
            size="lg"
            className="bg-white text-primary-900 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all px-8 py-6 text-lg"
            onClick={() => navigate("/register")}
          >
            Comece a sua Avaliação Gratuita
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
