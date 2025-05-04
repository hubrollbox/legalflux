
import { cn } from "@/lib/utils";
import { PriorityLevel, PriorityLevelEnum } from "@/types/priority-level";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

interface PriorityBadgeProps {
  priority: PriorityLevel | string;
  showIcon?: boolean;
  className?: string;
}

const labelMap: Record<PriorityLevel, string> = {
  'high': "Alta",
  'medium': "Média",
  'low': "Baixa",
  'none': "Normal"
};

// Função auxiliar para obter a cor do badge com base na prioridade
const getColorByPriority = (priority: string | PriorityLevel) => {
  switch (priority) {
    case PriorityLevelEnum.HIGH:
      return "border-red-300 bg-red-50 text-red-800";
    case PriorityLevelEnum.MEDIUM:
      return "border-amber-300 bg-amber-50 text-amber-800";
    case PriorityLevelEnum.LOW:
      return "border-green-300 bg-green-50 text-green-800";
    default:
      return "border-gray-300 bg-gray-50 text-gray-800";
  }
};

const PriorityBadge = ({ priority, showIcon = true, className }: PriorityBadgeProps) => {
  const priorityKey = priority as PriorityLevel;
  const label = labelMap[priorityKey] || "Normal";

  return (
    <Badge 
      variant="outline" 
      className={cn(
        getColorByPriority(priority),
        className
      )}
    >
      {showIcon && priorityKey !== PriorityLevelEnum.LOW && (
        <AlertTriangle className="h-3 w-3 mr-1" />
      )}
      {label}
    </Badge>
  );
};

export default PriorityBadge;
