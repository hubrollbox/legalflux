
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Correct import for v7.5.2
import { useAuth } from "../hooks/useAuth";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Process, Document } from "../types";
import { getProcesses } from "../services/processService";
import { getDocuments } from "../services/documentService";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { useIsMobile } from "../hooks/use-mobile";
import PageTransition from "../components/PageTransition";

// Import refactored components
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatisticsSection from "../components/dashboard/StatisticsSection";
import RecentActivity from "../components/dashboard/RecentActivity";
import FinancialSection from "../components/dashboard/FinancialSection";

// Import new widget components
import DashboardWidget from "../components/dashboard/DashboardWidget";
import RecentDocumentsWidget from "../components/dashboard/RecentDocumentsWidget";
import PendingTasksWidget from "../components/dashboard/PendingTasksWidget";
import FinancialStatsWidget from "../components/dashboard/FinancialStatsWidget";
import DashboardCustomizer from "../components/dashboard/DashboardCustomizer";

// Import utility functions
import { getUserRoleName, getChartData, getFinancialData, getPerformanceData, getStatisticsData } from "@/utils/dashboardUtils";
import { getRecentCases, getRecentTasks } from "@/services/mockData";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [processes, setProcesses] = useState<Process[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    status: '',
    docType: ''
  });
  const [organization] = useState(user?.organizationId ? { name: "Escritório Demo" } : undefined);
  const [userOrganization] = useState(user?.organizationId ? "Escritório Demo" : "Independente");
  const isMobile = useIsMobile();
  
  // Estado para controlar widgets ativos
  const [activeWidgets, setActiveWidgets] = useState<string[]>(() => {
    // Try to load from localStorage first
    const savedLayout = localStorage.getItem('dashboardLayout');
    return savedLayout 
      ? JSON.parse(savedLayout) 
      : ["stats", "recentActivity", "financial", "recentDocs", "pendingTasks"];
  });
  
  const userName = user?.name || "Utilizador";
  const userRole = user?.role ? getUserRoleName(user.role) : "Utilizador";

  // Get chart data
  const chartData = getChartData();
  const financialData = getFinancialData();
  const performanceData = getPerformanceData();
  const statsData = {
    activeProcesses: processes.filter(p => p.status === 'active').length,
    pendingDocuments: documents.filter(d => d.status === 'pending').length,
    completedCases: processes.filter(p => p.status === 'closed').length,
    averageResolutionTime: 45
  };
  
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
    setLoading(true);
    setError('');
    
    const fetchData = async () => {
      try {
        const [processesData, documentsData] = await Promise.all([
          getProcesses(),
          getDocuments()
        ]);
        
        setProcesses(processesData);
        setDocuments(documentsData);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Função para salvar o layout personalizado
  const handleSaveLayout = async (widgetIds: string[]) => {
    try {
      setActiveWidgets(widgetIds);
      
      // Save to localStorage for persistence
      localStorage.setItem('dashboardLayout', JSON.stringify(widgetIds));
      
      // In a real app, you would save to your backend API here
      // await saveUserPreferences({ dashboardLayout: widgetIds });
    } catch (err) {
      console.error('Failed to save layout:', err);
      // Optionally show error to user
    }
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
                <div className="mb-4 flex gap-2">
                  <Select onValueChange={(v) => handleFilterChange('docType', v)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Tipo de Documento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contract">Contrato</SelectItem>
                      <SelectItem value="petition">Petição</SelectItem>
                      <SelectItem value="power_of_attorney">Procuração</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="date"
                    onChange={(e) => handleFilterChange('startDate', e.target.value)}
                    className="max-w-[150px]"
                  />
                </div>
                <RecentDocumentsWidget 
                  documents={documents}
                  loading={loading}
                  error={error}
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
