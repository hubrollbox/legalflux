
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Clock, FileText, Users, TrendingUp, TrendingDown, DollarSign, AlertCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string;
  description?: string;
  icon: string;
  className?: string;
  trend?: {
    value: number;
    label?: string;
  };
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  description,
  icon,
  className = "",
  trend,
}) => {
  // Map of icon strings to their corresponding Lucide components
  const iconMap: Record<string, LucideIcon> = {
    Briefcase: Briefcase,
    Clock: Clock,
    FileText: FileText,
    Users: Users,
    TrendingUp: TrendingUp,
    TrendingDown: TrendingDown,
    DollarSign: DollarSign,
    AlertCircle: AlertCircle,
  };
  
  const IconComponent = iconMap[icon];

  // Determinar a cor do ícone com base no nome do ícone
  const getIconColor = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return 'text-blue-500';
      case 'Clock': return 'text-amber-500';
      case 'FileText': return 'text-purple-500';
      case 'Users': return 'text-green-500';
      case 'DollarSign': return 'text-emerald-500';
      case 'AlertCircle': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  // Determinar a cor do fundo do ícone com base no nome do ícone
  const getIconBgColor = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return 'bg-blue-100';
      case 'Clock': return 'bg-amber-100';
      case 'FileText': return 'bg-purple-100';
      case 'Users': return 'bg-green-100';
      case 'DollarSign': return 'bg-emerald-100';
      case 'AlertCircle': return 'bg-red-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <Card className={`overflow-hidden transition-all duration-200 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {IconComponent && (
          <div className={`p-2 rounded-full ${getIconBgColor(icon)}`}>
            <IconComponent className={`h-4 w-4 ${getIconColor(icon)}`} />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        
        {trend && (
          <div className="mt-3 flex items-center text-xs">
            {trend.value > 0 ? (
              <>
                <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-green-600">+{trend.value}% {trend.label || ''}</span>
              </>
            ) : (
              <>
                <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                <span className="text-red-600">{trend.value}% {trend.label || ''}</span>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
