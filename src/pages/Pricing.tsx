import React from "react";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SectionHeader from "@/components/layout/SectionHeader";
import PlanCard from "@/components/subscription/PlanCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CreditCard } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import LandingNavbar from "@/pages/landing/components/LandingNavbar";
import LandingFooter from "@/pages/landing/components/LandingFooter";

const plans = [
  {
    name: "Basic",
    price: "49€",
    description: "Para advogados individuais com funcionalidades básicas.",
    features: [
      "Gestão de casos",
      "Calendário de prazos",
      "Gestão de documentos",
      "1 utilizador",
      "Suporte por email"
    ],
    highlight: false,
    priceId: "price_basic"
  },
  {
    name: "Solo",
    price: "99€",
    description: "Para advogados independentes com funcionalidades adicionais.",
    features: [
      "Tudo do plano Basic",
      "Comunicação com clientes",
      "Modelos de documentos",
      "Até 3 utilizadores",
      "Suporte prioritário"
    ],
    highlight: true,
    priceId: "price_solo"
  },
  {
    name: "Enterprise",
    price: "199€",
    description: "Para escritórios com equipas e funcionalidades avançadas.",
    features: [
      "Tudo do plano Solo",
      "Painel de análise financeira",
      "Integração contábil",
      "Até 10 utilizadores",
      "Suporte dedicado"
    ],
    highlight: false,
    priceId: "price_enterprise"
  },
  {
    name: "Personalizado",
    price: "Sob orçamento",
    description: "Para grandes escritórios com necessidades específicas.",
    features: [
      "Tudo do plano Enterprise",
      "Integrações personalizadas",
      "Suporte VIP 24/7",
      "Utilizadores ilimitados",
      "Formação e implementação"
    ],
    highlight: false,
    priceId: "price_custom"
  }
];

const Subscriptions = () => {
  const { isAuthenticated, user } = useAuth();

  // Componente para exibir quando o usuário estiver autenticado
  const AuthenticatedView = () => (
    <DashboardLayout>
      <PageTransition>
        <div className="dashboard-header">
          <SectionHeader
            title="Planos de Subscrição"
            description="Escolha o plano ideal para o seu escritório"
          />
          <Button className="bg-highlight hover:bg-highlight/90">
            <CreditCard className="mr-2 h-4 w-4" /> Gerir Pagamentos
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <PlanCard
              key={index}
              plan={plan}
              isCurrentPlan={plan.name === "Solo"} // Exemplo
            />
          ))}
        </div>

        <div className="mt-10 bg-muted p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Plano Atual: Solo</h3>
          <p className="text-muted-foreground mb-4">
            A sua subscrição será renovada automaticamente em 15/05/2025.
          </p>
          <div className="flex gap-4">
            <Button variant="outline">Cancelar Subscrição</Button>
            <Button className="bg-highlight hover:bg-highlight/90">
              Atualizar Plano
            </Button>
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );

  // Componente para exibir quando o usuário não estiver autenticado
  const UnauthenticatedView = () => (
    <PageTransition>
      <LandingNavbar />
      <div className="pt-24 bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold mb-4">Planos de Subscrição</h1>
            <p className="text-lg text-gray-600">
              Escolha o plano perfeito para o seu escritório de advocacia. Todos os planos incluem acesso completo às funcionalidades principais do LegalFlux.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <PlanCard
                key={index}
                plan={plan}
                isCurrentPlan={false}
                publicView={true}
              />
            ))}
          </div>

          <div className="text-center mt-16 py-10 px-6 bg-primary text-white rounded-xl max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">
              Necessita de uma solução personalizada?
            </h2>
            <p className="mb-6">
              Entre em contacto connosco para discutirmos as necessidades específicas do seu escritório e desenvolvermos uma proposta à medida.
            </p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
              onClick={() => window.location.href = "/register"}
            >
              Contacte-nos <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <LandingFooter />
    </PageTransition>
  );

  // Renderiza o componente apropriado com base no estado de autenticação
  return isAuthenticated ? <AuthenticatedView /> : <UnauthenticatedView />;
};

export default Subscriptions;