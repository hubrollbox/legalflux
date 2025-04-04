
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface PlanCardProps {
  plan: {
    name: string;
    price: string;
    description: string;
    features: string[];
    highlight: boolean;
    priceId: string;
  };
  isCurrentPlan?: boolean;
  publicView?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, isCurrentPlan = false, publicView = false }) => {
  const navigate = useNavigate();

  const handleSelectPlan = () => {
    if (publicView) {
      navigate("/register", { state: { selectedPlan: plan.priceId } });
    } else {
      // Lógica para mudar de plano quando já está autenticado
      console.log("Solicitação para mudar para o plano:", plan.priceId);
    }
  };

  return (
    <Card
      className={cn(
        "flex flex-col h-full transition-all duration-200 hover:shadow-lg",
        plan.highlight && "border-highlight/50 shadow-md",
        isCurrentPlan && "border-2 border-primary"
      )}
    >
      <CardHeader className={cn(
        "pb-4",
        plan.highlight && "bg-highlight/10"
      )}>
        <div className="flex justify-between items-start">
          <CardTitle>{plan.name}</CardTitle>
          {plan.highlight && (
            <Badge className="bg-highlight text-white hover:bg-highlight/90">
              Popular
            </Badge>
          )}
          {isCurrentPlan && (
            <Badge variant="outline" className="border-primary text-primary">
              Atual
            </Badge>
          )}
        </div>
        <div className="mt-2">
          <span className="text-3xl font-bold">{plan.price}</span>
          {plan.name !== "Personalizado" && <span className="text-muted-foreground">/mês</span>}
        </div>
        <CardDescription className="mt-2">{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <ul className="space-y-2 mb-6 flex-grow">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          className={cn(
            "w-full mt-auto",
            plan.highlight ? "bg-highlight hover:bg-highlight/90" : "",
            plan.name === "Personalizado" ? "bg-primary hover:bg-primary/90" : ""
          )}
          variant={isCurrentPlan ? "outline" : "default"}
          disabled={isCurrentPlan}
          onClick={handleSelectPlan}
        >
          {isCurrentPlan
            ? "Plano Atual"
            : plan.name === "Personalizado"
              ? "Contacte-nos"
              : "Selecionar Plano"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlanCard;
