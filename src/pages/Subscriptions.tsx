import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PlanCard from "@/components/subscription/PlanCard";
import { getPlanDetails } from "@/lib/utils";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getOrganizationById, getSubscriptionByOrgId } from "@/services/mockData";
import LandingNavbar from "./landing/components/LandingNavbar";
import LandingFooter from "./landing/components/LandingFooter";

const SubscriptionsPage = () => {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [organization] = useState(user?.organizationId ? getOrganizationById(user.organizationId) : undefined);
  const [subscription] = useState(organization ? getSubscriptionByOrgId(organization.id) : undefined);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const basicPlan = getPlanDetails("basic");
  const soloPlan = getPlanDetails("solo");
  const enterprisePlan = getPlanDetails("enterprise");
  const customPlan = getPlanDetails("custom");

  const handleSelectPlan = (plan: string) => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    setSelectedPlan(plan);
    setIsDialogOpen(true);
  };

  const handleConfirmPurchase = async () => {
    setIsLoading(true);
    
    // Simulate API call to purchase subscription
    setTimeout(() => {
      setIsLoading(false);
      setIsDialogOpen(false);
      
      toast({
        title: "Assinatura ativada",
        description: `Sua assinatura do plano ${selectedPlan?.charAt(0).toUpperCase() + selectedPlan?.slice(1)} foi ativada com sucesso.`,
      });
    }, 2000);
  };

  if (user) {
    return (
      <DashboardLayout>
        <div className="dashboard-header">
          <div>
            <h1 className="page-title">Planos de Assinatura</h1>
            <p className="text-gray-500">
              Escolha o plano que melhor se adapta às necessidades do seu escritório.
            </p>
          </div>
        </div>

        {/* Current Plan Info */}
        {subscription && (
          <div className="bg-primary-50 border border-primary-100 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold mb-2">Seu Plano Atual</h2>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <p className="text-primary-900 font-medium">
                  {getPlanDetails(subscription.plan).name} - {subscription.price}€/mês
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Renovação em {new Date(subscription.currentPeriodEnd).toLocaleDateString("pt-PT")}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button 
                  variant="outline" 
                  className="mr-2"
                  onClick={() => {
                    toast({
                      title: "Fatura disponível",
                      description: "Sua última fatura foi enviada para o seu email.",
                    });
                  }}
                >
                  Ver Fatura
                </Button>
                <Button 
                  variant="default"
                  onClick={() => {
                    toast({
                      title: "Gerenciar assinatura",
                      description: "Para gerenciar sua assinatura, entre em contato com o suporte.",
                    });
                  }}
                >
                  Gerenciar Assinatura
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <PlanCard
            title={basicPlan.name}
            price={basicPlan.price}
            description={basicPlan.description}
            features={basicPlan.features}
            onClick={() => handleSelectPlan("basic")}
            current={subscription?.plan === "basic"}
          />
          
          <PlanCard
            title={soloPlan.name}
            price={soloPlan.price}
            description={soloPlan.description}
            features={soloPlan.features}
            popular={true}
            onClick={() => handleSelectPlan("solo")}
            current={subscription?.plan === "solo"}
          />
          
          <PlanCard
            title={enterprisePlan.name}
            price={enterprisePlan.price}
            description={enterprisePlan.description}
            features={enterprisePlan.features}
            onClick={() => handleSelectPlan("enterprise")}
            current={subscription?.plan === "enterprise"}
          />
          
          <PlanCard
            title={customPlan.name}
            price={customPlan.price}
            description={customPlan.description}
            features={customPlan.features}
            buttonText="Contate-nos"
            onClick={() => {
              toast({
                title: "Plano Personalizado",
                description: "Entre em contato com nossa equipe de vendas para criar um plano personalizado para seu escritório.",
              });
            }}
            current={subscription?.plan === "custom"}
          />
        </div>

        {/* Additional Info */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Perguntas Frequentes</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">Como funciona a cobrança?</h3>
              <p className="text-gray-600 text-sm">
                A cobrança é realizada mensalmente. Você pode cancelar a qualquer momento antes do próximo ciclo de faturamento.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Posso mudar de plano?</h3>
              <p className="text-gray-600 text-sm">
                Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As alterações entram em vigor imediatamente e o valor é ajustado proporcionalmente.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">O que acontece se eu exceder o limite de usuários?</h3>
              <p className="text-gray-600 text-sm">
                Se você precisar de mais usuários do que seu plano permite, será necessário fazer upgrade para um plano superior ou contatar nossa equipe para um plano personalizado.
              </p>
            </div>
          </div>
        </div>

        {/* Purchase Confirmation Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Assinatura</DialogTitle>
              <DialogDescription>
                Você está prestes a assinar o plano {selectedPlan?.charAt(0).toUpperCase() + selectedPlan?.slice(1)}.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="font-medium">Detalhes do Plano:</p>
              <ul className="mt-2 space-y-1 text-sm">
                {selectedPlan === "basic" && (
                  <>
                    <li>• Preço: {basicPlan.price}€/mês</li>
                    <li>• Usuários: {basicPlan.usersLimit}</li>
                    <li>• Faturamento: Mensal</li>
                  </>
                )}
                {selectedPlan === "solo" && (
                  <>
                    <li>• Preço: {soloPlan.price}€/mês</li>
                    <li>• Usuários: {soloPlan.usersLimit}</li>
                    <li>• Faturamento: Mensal</li>
                  </>
                )}
                {selectedPlan === "enterprise" && (
                  <>
                    <li>• Preço: {enterprisePlan.price}€/mês</li>
                    <li>• Usuários: {enterprisePlan.usersLimit}</li>
                    <li>• Faturamento: Mensal</li>
                  </>
                )}
              </ul>
              <p className="mt-4 text-sm text-gray-500">
                Ao confirmar, você concorda com os termos de serviço e política de privacidade.
              </p>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleConfirmPurchase}
                disabled={isLoading}
              >
                {isLoading ? "Processando..." : "Confirmar Compra"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <LandingNavbar />
      
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Planos de Assinatura</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Escolha o plano que melhor se adapta às necessidades do seu escritório jurídico. Todos os planos incluem suporte técnico e atualizações.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <PlanCard
            title={basicPlan.name}
            price={basicPlan.price}
            description={basicPlan.description}
            features={basicPlan.features}
            onClick={() => handleSelectPlan("basic")}
          />
          
          <PlanCard
            title={soloPlan.name}
            price={soloPlan.price}
            description={soloPlan.description}
            features={soloPlan.features}
            popular={true}
            onClick={() => handleSelectPlan("solo")}
          />
          
          <PlanCard
            title={enterprisePlan.name}
            price={enterprisePlan.price}
            description={enterprisePlan.description}
            features={enterprisePlan.features}
            onClick={() => handleSelectPlan("enterprise")}
          />
          
          <PlanCard
            title={customPlan.name}
            price={customPlan.price}
            description={customPlan.description}
            features={customPlan.features}
            buttonText="Contate-nos"
            onClick={() => {
              toast({
                title: "Plano Personalizado",
                description: "Entre em contato com nossa equipe de vendas para criar um plano personalizado para seu escritório.",
              });
            }}
          />
        </div>
        
        {/* FAQ Section */}
        <div className="bg-gray-50 rounded-lg p-6 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-6">Perguntas Frequentes</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Como funciona a cobrança?</h3>
              <p className="text-gray-600">
                A cobrança é realizada mensalmente. Você pode cancelar a qualquer momento antes do próximo ciclo de faturamento.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Posso mudar de plano?</h3>
              <p className="text-gray-600">
                Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As alterações entram em vigor imediatamente e o valor é ajustado proporcionalmente.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">O que acontece se eu exceder o limite de usuários?</h3>
              <p className="text-gray-600">
                Se você precisar de mais usuários do que seu plano permite, será necessário fazer upgrade para um plano superior ou contatar nossa equipe para um plano personalizado.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default SubscriptionsPage;
