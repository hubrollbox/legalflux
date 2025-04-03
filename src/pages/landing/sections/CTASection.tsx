
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl border border-gray-200 shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-900">
            Pronto para Transformar o seu Escritório?
          </h2>
          <p className="text-xl mb-10 text-gray-600 max-w-2xl mx-auto">
            Experimente o LegalFlux hoje e descubra como a nossa plataforma pode 
            aumentar a produtividade e organização do seu escritório jurídico.
          </p>
          <Button
            size="lg"
            className="bg-highlight text-white hover:bg-highlight/90 shadow-lg hover:shadow-xl transition-all px-8 py-6 text-lg"
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
