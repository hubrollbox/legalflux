
import { Badge } from "@/components/ui/badge";
import SectionHeader from "@/components/layout/SectionHeader";
import MetricsCard from "@/components/dashboard/MetricsCard";
import { Briefcase, Clock, FileText, Users } from "lucide-react";
import { StatCard } from "./types";

interface StatisticsSectionProps {
  stats: StatCard[];
  userOrganization: string;
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({
  stats,
  userOrganization,
}) => {
  // Map of icon strings to their corresponding Lucide components
  const iconMap: Record<string, React.ComponentType<any>> = {
    Briefcase: Briefcase,
    Clock: Clock,
    FileText: FileText,
    Users: Users,
  };

  return (
    <>
      <SectionHeader title="Estatísticas" description="Visão geral do seu negócio">
        <Badge>{userOrganization}</Badge>
      </SectionHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((item) => {
          const IconComponent = iconMap[item.icon];
          return (
            <MetricsCard
              key={item.title}
              title={item.title}
              value={item.value}
              icon={IconComponent}
              description={item.description}
            />
          );
        })}
      </div>
    </>
  );
};

export default StatisticsSection;
