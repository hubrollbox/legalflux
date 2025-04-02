
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 bg-primary-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Pronto para Transformar o seu Escritório?
        </h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto">
          Experimente o LegalFlux hoje e descubra como a nossa plataforma pode 
          aumentar a produtividade e organização do seu escritório jurídico.
        </p>
        <Button
          size="lg"
          className="bg-white text-primary-900 hover:bg-gray-100"
          onClick={() => navigate("/register")}
        >
          Comece a sua Avaliação Gratuita
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
