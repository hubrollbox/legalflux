
import { Badge } from "@/components/ui/badge";
import SectionHeader from "@/components/layout/SectionHeader";
import MetricsCard from "@/components/dashboard/MetricsCard";
import type { StatCard } from "./types";
import { motion } from "framer-motion";

interface StatisticsSectionProps {
  stats: {
    activeProcesses: number;
    pendingDocuments: number;
    completedCases: number;
    averageResolutionTime: number;
  }; 
  userOrganization: string;
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({
  stats,
  userOrganization,
}) => {
  // Convert stats object to StatCard array
  const statsCards: StatCard[] = [
    {
      title: "Processos Activos",
      value: stats.activeProcesses,
      description: "Processos em andamento",
      icon: <span className="text-blue-500">📊</span>
    },
    {
      title: "Documentos Pendentes",
      value: stats.pendingDocuments,
      description: "Necessitam revisão",
      icon: <span className="text-green-500">📝</span>
    },
    {
      title: "Casos Finalizados",
      value: stats.completedCases, 
      description: "No último período",
      icon: <span className="text-purple-500">✅</span>
    },
    {
      title: "Tempo Médio",
      value: `${stats.averageResolutionTime} dias`,
      description: "Resolução de casos",
      icon: <span className="text-amber-500">⏱️</span>
    }
  ];

  // Cores para os cards de estatísticas
  const cardColors = [
    "bg-blue-50 border-blue-200 hover:bg-blue-100",
    "bg-green-50 border-green-200 hover:bg-green-100",
    "bg-purple-50 border-purple-200 hover:bg-purple-100",
    "bg-amber-50 border-amber-200 hover:bg-amber-100",
  ];

  return (
    <>
      <SectionHeader title="Estatísticas" description="Visão geral do seu negócio">
        <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">{userOrganization}</Badge>
      </SectionHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {statsCards.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <MetricsCard
              title={item.title}
              value={item.value.toString()}
              icon={item.icon}
              description={item.description}
              className={`transition-all duration-200 ${cardColors[index % cardColors.length]}`}
            />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default StatisticsSection;
