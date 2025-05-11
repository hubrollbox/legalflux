
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Plan } from '@/types/plan';
import { formatCurrency } from '@/utils/formatters';

interface PlanCardProps {
  plan: Plan;
  onSelectPlan: (plan: Plan) => void;
  isSelected?: boolean;
  showDetails?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({ 
  plan, 
  onSelectPlan, 
  isSelected = false,
  showDetails = true
}) => {
  const { name, price, description, features, highlight, recommended } = plan;

  // Function to render a feature item with its status (included or not)
  const renderFeature = (feature: { name: string; included: boolean }) => (
    <li key={feature.name} className="flex items-center py-2">
      {feature.included ? (
        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
      ) : (
        <X className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
      )}
      <span className="text-sm">
        {feature.name}
      </span>
    </li>
  );

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300",
      highlight ? "border-highlight shadow-lg" : "border-gray-200",
      isSelected && "ring-2 ring-highlight"
    )}>
      {recommended && (
        <div className="absolute top-0 right-0">
          <div className="bg-highlight text-white text-xs font-medium px-3 py-1 rounded-bl">
            Recomendado
          </div>
        </div>
      )}
      
      <CardHeader>
        <CardTitle className={highlight ? "text-highlight" : ""}>
          {name}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-2">
          <span className="text-3xl font-bold">
            {price === null ? "Personalizado" : formatCurrency(price)}
          </span>
          {price !== null && <span className="text-sm text-gray-500">/mês</span>}
        </div>
      </CardHeader>
      
      {showDetails && (
        <CardContent>
          <ul className="space-y-1 mt-4">
            {features.map((feature) => React.createElement('li', {
              key: feature.name,
              className: "flex items-center py-2"
            }, [
              feature.included ? 
                React.createElement(Check, { className: "h-4 w-4 text-green-500 mr-2 flex-shrink-0" }) : 
                React.createElement(X, { className: "h-4 w-4 text-red-500 mr-2 flex-shrink-0" }),
              React.createElement('span', { className: "text-sm" }, feature.name)
            ]))}
          </ul>
        </CardContent>
      )}
      
      <CardFooter>
        <Button 
          variant={highlight ? "default" : "outline"} 
          className={cn(
            "w-full", 
            highlight ? "bg-highlight hover:bg-highlight/90" : ""
          )}
          onClick={() => onSelectPlan(plan)}
        >
          {price === null ? "Solicitar orçamento" : "Selecionar plano"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
