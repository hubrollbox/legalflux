
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { getPlanDetails } from "@/lib/utils";

const PricingSection = () => {
  const navigate = useNavigate();
  
  // Get subscription plans
  const basicPlan = getPlanDetails("basic");
  const soloPlan = getPlanDetails("solo");
  const enterprisePlan = getPlanDetails("enterprise");

  return (
    <section className="py-24 bg-white" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-900">
            Planos de Assinatura Flexíveis
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Escolha o plano que melhor se adapta às necessidades do seu escritório.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-2 text-primary-900">{basicPlan.name}</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-primary-800">{basicPlan.price}€</span>
                <span className="text-gray-500 ml-1">/mês</span>
              </div>
              <p className="text-gray-600 mb-6">{basicPlan.description}</p>
              <Button
                className="w-full mb-6 bg-primary-600 hover:bg-primary-700"
                onClick={() => navigate("/register")}
              >
                Começar Agora
              </Button>
              <ul className="space-y-3">
                {basicPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Solo Plan */}
          <div className="bg-white rounded-xl shadow-xl border border-primary-300 overflow-hidden transform scale-105 relative z-10">
            <div className="absolute top-0 right-0 bg-highlight text-white text-xs font-bold px-4 py-2 uppercase rounded-bl-lg">
              Popular
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-2 text-primary-900">{soloPlan.name}</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-primary-800">{soloPlan.price}€</span>
                <span className="text-gray-500 ml-1">/mês</span>
              </div>
              <p className="text-gray-600 mb-6">{soloPlan.description}</p>
              <Button
                className="w-full mb-6 bg-highlight hover:bg-highlight/90 shadow-md hover:shadow-lg transition-all"
                onClick={() => navigate("/register")}
              >
                Escolher Plano Solo
              </Button>
              <ul className="space-y-3">
                {soloPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-2 text-primary-900">{enterprisePlan.name}</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-primary-800">{enterprisePlan.price}€</span>
                <span className="text-gray-500 ml-1">/mês</span>
              </div>
              <p className="text-gray-600 mb-6">{enterprisePlan.description}</p>
              <Button
                className="w-full mb-6 bg-primary-600 hover:bg-primary-700"
                onClick={() => navigate("/register")}
              >
                Começar Agora
              </Button>
              <ul className="space-y-3">
                {enterprisePlan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Precisa de um plano personalizado?{" "}
            <Button
              variant="link"
              className="text-primary-600 p-0 h-auto"
              onClick={() => navigate("/register")}
            >
              Entre em contacto connosco
            </Button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
