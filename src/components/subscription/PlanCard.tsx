
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PlanFeature {
  name: string;
  included: boolean;
}

export interface Plan {
  id: string;
  name: string;
  price: number | null;
  description: string;
  features: PlanFeature[];
  highlight: boolean;
  priceId: string;
}

export interface PlanCardProps {
  plan: Plan;
  isCurrentPlan?: boolean;
  publicView?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({ 
  plan, 
  isCurrentPlan = false,
  publicView = false 
}) => {
  return (
    <Card className={cn(
      "flex flex-col border", 
      plan.highlight ? "border-primary shadow-lg" : "border-gray-300",
      isCurrentPlan ? "ring-2 ring-primary" : ""
    )}>
      <CardHeader className={cn(
        "pb-8",
        plan.highlight ? "bg-primary text-primary-foreground" : ""
      )}>
        <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
        <CardDescription className={cn(
          plan.highlight ? "text-primary-foreground/90" : "text-muted-foreground"
        )}>
          {plan.description}
        </CardDescription>
        <div className="mt-2 flex items-baseline">
          {plan.price !== null ? (
            <>
              <span className="text-3xl font-bold">{plan.price}€</span>
              <span className="ml-1 text-sm text-muted-foreground">/mês</span>
            </>
          ) : (
            <span className="text-lg font-medium">Contacte-nos</span>
          )}
        </div>
        {isCurrentPlan && (
          <div className="mt-2">
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              Plano Atual
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-1 pt-6">
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="mr-3 mt-1">
                <Check 
                  className={cn(
                    "h-4 w-4", 
                    feature.included ? "text-green-500" : "text-gray-300"
                  )} 
                />
              </div>
              <span className={feature.included ? "" : "text-gray-400 line-through"}>
                {feature.name}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-4 pb-6">
        <Button 
          className={cn(
            "w-full", 
            plan.highlight 
              ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90" 
              : ""
          )}
          variant={plan.highlight ? "default" : "outline"}
        >
          {isCurrentPlan ? "Gerir Plano" : "Selecionar Plano"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
