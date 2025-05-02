
import { cn, getColorByPriority } from "@/lib/utils";
import { PriorityLevel } from "@/types"; // Import PriorityLevel from the correct path

interface PriorityBadgeProps {
  priority: PriorityLevel;
  className?: string;
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, className }) => {
  const priorityText = {
    [PriorityLevel.LOW]: 'Baixa',
    [PriorityLevel.MEDIUM]: 'Média',
    [PriorityLevel.HIGH]: 'Alta',
    [PriorityLevel.URGENT]: 'Urgente'
  };
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        getColorByPriority(priorityText[priority]),
        className
      )}
    >
      {priorityText[priority]}
    </span>
  );
};

export default PriorityBadge;
