
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Plan } from "@/types/plan";

interface PlanCardProps {
  plan: Plan;
  isCurrentPlan?: boolean;
  publicView?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, isCurrentPlan = false, publicView = false }) => {
  const navigate = useNavigate();

  const handleSelectPlan = () => {
    if (publicView) {
      navigate("/register", { state: { selectedPlan: plan.id } });
    } else {
      // Lógica para mudar de plano quando já está autenticado
      console.log("Solicitação para mudar para o plano:", plan.id);
    }
  };

  return (
    <Card
      className={cn(
        "flex flex-col h-full transition-all duration-200 hover:shadow-lg",
        isCurrentPlan && "border-2 border-primary"
      )}
    >
      <CardHeader className={cn(
        "pb-4"
      )}>
        <div className="flex justify-between items-start">
          <CardTitle>{plan.name}</CardTitle>
          {plan.recommended && (
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
          <span className="text-3xl font-bold">{plan.price !== null ? `${plan.price}€` : "Sob orçamento"}</span>
          {plan.name !== "Personalizado" && plan.price !== null && <span className="text-muted-foreground">/mês</span>}
        </div>
        <CardDescription className="mt-2">{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <ul className="space-y-2 mb-6 flex-grow">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          className={cn(
            "w-full mt-auto",
            plan.recommended ? "bg-highlight hover:bg-highlight/90" : "",
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
