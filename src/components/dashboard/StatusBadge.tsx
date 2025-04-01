
import { cn, getStatusColor } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const statusText = typeof status === 'string' 
    ? status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ') 
    : 'Desconhecido';
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        getStatusColor(status),
        className
      )}
    >
      {statusText}
    </span>
  );
};

export default StatusBadge;
