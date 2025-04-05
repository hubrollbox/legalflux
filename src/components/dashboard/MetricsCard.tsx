
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Clock, FileText, Users, LucideIcon } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string;
  description?: string;
  icon: string;
  className?: string;
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  description,
  icon,
  className = "",
}) => {
  // Map of icon strings to their corresponding Lucide components
  const iconMap: Record<string, LucideIcon> = {
    Briefcase: Briefcase,
    Clock: Clock,
    FileText: FileText,
    Users: Users,
  };
  
  const IconComponent = iconMap[icon];

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {IconComponent && <IconComponent className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent className="">
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
