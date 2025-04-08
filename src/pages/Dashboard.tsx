
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { MOCK_CASES as CasesData, MOCK_TASKS as TasksData } from "@/services/mockData"; 
import { Case, Task } from "@/types";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import PageTransition from "@/components/PageTransition";

// Import refactored components
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatisticsSection from "@/components/dashboard/StatisticsSection";
import RecentActivity from "@/components/dashboard/RecentActivity";
import FinancialSection from "@/components/dashboard/FinancialSection";

// Import new widget components
import DashboardWidget from "@/components/dashboard/DashboardWidget";
import RecentDocumentsWidget from "@/components/dashboard/RecentDocumentsWidget";
import PendingTasksWidget from "@/components/dashboard/PendingTasksWidget";
import FinancialStatsWidget from "@/components/dashboard/FinancialStatsWidget";
import DashboardCustomizer from "@/components/dashboard/DashboardCustomizer";

// Import utility functions
import { getUserRoleName, getChartData, getFinancialData, getPerformanceData, getStatisticsData } from "@/utils/dashboardUtils";
import { getRecentCases, getRecentTasks } from "@/services/mockData";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cases, setCases] = useState<Case[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [organization] = useState(user?.organizationId ? { name: "Escritório Demo" } : undefined);
  const [userOrganization] = useState(user?.organizationId ? "Escritório Demo" : "Independente");
  const isMobile = useIsMobile();
  
  // Estado para controlar widgets ativos
  const [activeWidgets, setActiveWidgets] = useState<string[]>(["stats", "recentActivity", "financial", "recentDocs", "pendingTasks"]);
  
  const userName = user?.name || "Utilizador";
  const userRole = user?.role ? getUserRoleName(user.role) : "Utilizador";

  // Get chart data
  const chartData = getChartData();
  const financialData = getFinancialData();
  const performanceData = getPerformanceData();
  const statsData = getStatisticsData();
  
  // Mock data para os novos widgets
  const [recentDocuments, setRecentDocuments] = useState([
    { id: "1", name: "Contrato de Prestação de Serviços", type: "contract", updatedAt: "Hoje, 14:30", status: "draft" as const },
    { id: "2", name: "Procuração", type: "power_of_attorney", updatedAt: "Ontem, 10:15", status: "final" as const },
    { id: "3", name: "Petição Inicial", type: "petition", updatedAt: "22/05/2023", status: "review" as const },
    { id: "4", name: "Acordo Extrajudicial", type: "agreement", updatedAt: "20/05/2023", status: "final" as const },
  ]);
  
  // Mock data para estatísticas financeiras
  const financialStats = {
    totalRevenue: 125000,
    monthlyRevenue: 18500,
    revenueChange: 12,
    pendingPayments: 32000,
    averageInvoice: 2800,
  };
  
  // Opções de widgets disponíveis para personalização
  const availableWidgets = [
    { id: "stats", name: "Estatísticas", description: "Métricas principais do seu negócio", defaultEnabled: true },
    { id: "recentActivity", name: "Atividades Recentes", description: "Casos e tarefas recentes", defaultEnabled: true },
    { id: "financial", name: "Finanças", description: "Gráfico de receitas e despesas", defaultEnabled: true },
    { id: "recentDocs", name: "Documentos Recentes", description: "Últimos documentos atualizados", defaultEnabled: true },
    { id: "pendingTasks", name: "Tarefas Pendentes", description: "Tarefas que precisam de atenção", defaultEnabled: true },
    { id: "financialStats", name: "Resumo Financeiro", description: "Visão geral das suas finanças", defaultEnabled: false },
  ];

  // Get recent cases and tasks
  const recentCases = getRecentCases();
  const recentTasks = getRecentTasks();

  useEffect(() => {
    // Simulate API call to fetch cases and tasks
    const loadData = async () => {
      try {
        // Fetch cases and tasks (using mock data for now)
        setCases(CasesData);
        setTasks(TasksData);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    };

    loadData();
  }, []);

  // Função para salvar o layout personalizado
  const handleSaveLayout = (widgetIds: string[]) => {
    setActiveWidgets(widgetIds);
    // Aqui poderia salvar a preferência do usuário em um banco de dados
  };

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dashboard Header com Customizador */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <DashboardHeader userName={userName} userRole={userRole} />
            <div className="mt-4 sm:mt-0">
              <DashboardCustomizer
                availableWidgets={availableWidgets}
                activeWidgets={activeWidgets}
                onSaveLayout={handleSaveLayout}
              />
            </div>
          </div>
          
          {/* Grid de Widgets Responsivo */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Estatísticas - Ocupa toda a largura em telas grandes */}
            {activeWidgets.includes("stats") && (
              <div className="lg:col-span-3">
                <StatisticsSection stats={statsData} userOrganization={userOrganization} />
              </div>
            )}
            
            {/* Widgets de coluna única */}
            {activeWidgets.includes("recentDocs") && (
              <div className="md:col-span-1">
                <RecentDocumentsWidget 
                  documents={recentDocuments}
                  onViewAll={() => navigate("/documents")}
                />
              </div>
            )}
            
            {activeWidgets.includes("pendingTasks") && (
              <div className="md:col-span-1">
                <PendingTasksWidget 
                  tasks={tasks}
                  onViewAll={() => navigate("/tasks")}
                  onTaskComplete={(id) => console.log(`Tarefa ${id} concluída`)}
                />
              </div>
            )}
            
            {activeWidgets.includes("financialStats") && (
              <div className="md:col-span-1">
                <FinancialStatsWidget stats={financialStats} />
              </div>
            )}
            
            {/* Atividades Recentes - Ocupa 2 colunas */}
            {activeWidgets.includes("recentActivity") && (
              <div className="md:col-span-2">
                <RecentActivity 
                  recentCases={recentCases}
                  recentTasks={recentTasks}
                  chartData={chartData}
                  performanceData={performanceData}
                />
              </div>
            )}
            
            {/* Seção Financeira - Ocupa toda a largura */}
            {activeWidgets.includes("financial") && (
              <div className="lg:col-span-3">
                <FinancialSection financialData={financialData} />
              </div>
            )}
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default Dashboard;
