
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PlanCardProps {
  title: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  buttonText?: string;
  current?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  price,
  description,
  features,
  popular = false,
  disabled = false,
  onClick,
  buttonText = "Escolher Plano",
  current = false,
}) => {
  return (
    <Card className={cn(
      "flex flex-col", 
      popular && "border-primary-500 shadow-md relative",
      disabled && "opacity-70"
    )}>
      {popular && (
        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
          <span className="bg-accent-gold text-white text-xs px-2 py-1 rounded-md font-medium">
            Popular
          </span>
        </div>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="flex items-baseline mt-2">
          <span className="text-3xl font-bold">{price === 0 ? "Sob consulta" : `${price}€`}</span>
          {price > 0 && <span className="text-sm text-gray-500 ml-1">/mês</span>}
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-primary-600">
                <Check className="h-5 w-5" />
              </span>
              <span className="ml-2 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={onClick}
          disabled={disabled || current}
          variant={current ? "outline" : "default"}
        >
          {current ? "Plano Atual" : buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
