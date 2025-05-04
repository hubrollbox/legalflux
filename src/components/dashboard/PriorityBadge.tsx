
import { cn, getColorByPriority } from "@/lib/utils";
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
