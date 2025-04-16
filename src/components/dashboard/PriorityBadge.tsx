
import { cn, getColorByPriority } from "@/lib/utils";
import { PriorityLevel } from "@/types"; // Import PriorityLevel

interface PriorityBadgeProps {
  priority: PriorityLevel; // Change type to PriorityLevel
  className?: string;
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, className }) => {
  const priorityText = {
    [PriorityLevel.LOW]: 'Baixa',
    [PriorityLevel.MEDIUM]: 'Média',
    [PriorityLevel.HIGH]: 'Alta',
    [PriorityLevel.URGENT]: 'Urgente' // Add Urgent case
  };
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        getColorByPriority(priority),
        className
      )}
    >
      {priorityText[priority]}
    </span>
  );
};

export default PriorityBadge;
