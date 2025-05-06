
import { cn } from "@/lib/utils";
import { PriorityLevel } from "@/types/priority-level"; // Removido PriorityLevelEnum que não existia
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

interface PriorityBadgeProps {
  priority: PriorityLevel;
}

const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  const getPriorityColor = () => {
    switch (priority) {
      case PriorityLevel.LOW:
        return "bg-green-100 text-green-800";
      case PriorityLevel.MEDIUM:
        return "bg-yellow-100 text-yellow-800";
      case PriorityLevel.HIGH:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityText = () => {
    switch (priority) {
      case PriorityLevel.LOW:
        return "Baixa";
      case PriorityLevel.MEDIUM:
        return "Média";
      case PriorityLevel.HIGH:
        return "Alta";
      default:
        return "Desconhecida";
    }
  };

  return (
    <Badge className={cn("gap-1", getPriorityColor())}>
      {priority === PriorityLevel.HIGH && <AlertTriangle className="h-3 w-3" />}
      {getPriorityText()}
    </Badge>
  );
};

export default PriorityBadge;
