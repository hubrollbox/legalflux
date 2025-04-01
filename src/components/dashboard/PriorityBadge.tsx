
import { cn, getColorByPriority } from "@/lib/utils";

interface PriorityBadgeProps {
  priority: 'low' | 'medium' | 'high';
  className?: string;
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, className }) => {
  const priorityText = {
    low: 'Baixa',
    medium: 'Média',
    high: 'Alta'
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
