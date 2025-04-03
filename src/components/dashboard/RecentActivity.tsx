
import { useState } from "react";
import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs";
import SectionHeader from "@/components/layout/SectionHeader";
import RecentCasesCard from "./RecentCasesCard";
import RecentTasksCard from "./RecentTasksCard";
import CasesAnalyticsChart from "./CasesAnalyticsChart";
import TasksPerformanceChart from "./TasksPerformanceChart";
import { RecentCase, RecentTask } from "./types";

interface RecentActivityProps {
  recentCases: RecentCase[];
  recentTasks: RecentTask[];
  chartData: { name: string; cases: number }[];
  performanceData: { name: string; completed: number; pending: number }[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({
  recentCases,
  recentTasks,
  chartData,
  performanceData,
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <SectionHeader title="Atividades Recentes" description="Últimas atualizações">
        <TabsList>
          <TabsTrigger
            value="overview"
            onClick={() => setActiveTab("overview")}
          >
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="cases" onClick={() => setActiveTab("cases")}>
            Casos
          </TabsTrigger>
          <TabsTrigger value="tasks" onClick={() => setActiveTab("tasks")}>
            Tarefas
          </TabsTrigger>
        </TabsList>
      </SectionHeader>

      <Tabs value={activeTab} className="space-y-8">
        <TabsContent value="overview" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentCasesCard cases={recentCases} />
            <RecentTasksCard tasks={recentTasks} />
          </div>
        </TabsContent>

        <TabsContent value="cases" className="space-y-8">
          <CasesAnalyticsChart data={chartData} />
        </TabsContent>

        <TabsContent value="tasks" className="space-y-8">
          <TasksPerformanceChart data={performanceData} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default RecentActivity;
