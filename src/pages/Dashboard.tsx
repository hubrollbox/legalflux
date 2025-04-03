import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SectionHeader from "@/components/layout/SectionHeader";
import { CasesData, TasksData } from "@/services/mockData"; 
import { Case, Task, UserRole } from "@/types";
import MetricsCard from "@/components/dashboard/MetricsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  User,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StatusBadge from "@/components/dashboard/StatusBadge";
import PriorityBadge from "@/components/dashboard/PriorityBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-picker-range";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import {
  getChartData,
  getFinancialData,
  getPerformanceData,
  getRecentCases,
  getRecentTasks,
  getStatisticsData,
} from "@/services/mockData";

// Helper function to get user role name
const getUserRoleName = (role: UserRole): string => {
  const roleNames: Record<UserRole, string> = {
    admin: "Administrador",
    lawyer: "Advogado",
    senior_lawyer: "Advogado Sênior",
    assistant: "Assistente",
    client: "Cliente",
  };
  return roleNames[role] || "Utilizador";
};

const Dashboard = () => {
  const { user } = useAuth();
  const [cases, setCases] = useState<Case[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [organization] = useState(user?.organizationId ? { name: "Escritório Demo" } : undefined);
  const [userOrganization] = useState(user?.organizationId ? "Escritório Demo" : "Independente");
  
  const userName = user?.name || "Utilizador";
  const userRole = user?.role ? getUserRoleName(user.role) : "Utilizador";

  // Get chart data
  const chartData = getChartData();
  const financialData = getFinancialData();
  const performanceData = getPerformanceData();
  const statsData = getStatisticsData();

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

  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Painel de Controlo</h1>
          <p className="text-gray-500">
            Bem-vindo(a), {userName} ({userRole})
          </p>
        </div>
        <div className="space-x-2">
          <Button variant="outline">Relatórios</Button>
          <DatePickerWithRange />
        </div>
      </div>

      <SectionHeader title="Estatísticas" description="Visão geral do seu negócio">
        <Badge>{userOrganization}</Badge>
      </SectionHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((item) => (
          <MetricsCard
            key={item.title}
            title={item.title}
            value={item.value}
            icon={item.icon}
            description={item.description}
          />
        ))}
      </div>

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

      <TabsContent value="overview" className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Cases */}
          <Card>
            <CardHeader>
              <CardTitle>Casos Recentes</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="space-y-4">
                {recentCases.map((item) => (
                  <li key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={item.clientAvatar} alt={item.clientName} />
                        <AvatarFallback>{item.clientName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.clientName}</p>
                      </div>
                    </div>
                    <StatusBadge status={item.status} />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Recent Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Tarefas Recentes</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="space-y-4">
                {recentTasks.map((item) => (
                  <li key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={item.assignedToAvatar} alt={item.assignedToName} />
                        <AvatarFallback>{item.assignedToName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-500">
                          Atribuído a {item.assignedToName}
                        </p>
                      </div>
                    </div>
                    <PriorityBadge priority={item.priority} />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="cases" className="space-y-8">
        {/* Cases Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Análise de Casos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cases" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="tasks" className="space-y-8">
        {/* Tasks Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Desempenho de Tarefas</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="completed" stroke="#82ca9d" />
                <Line type="monotone" dataKey="pending" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>

      <SectionHeader title="Finanças" description="Receitas e despesas">
        <Button variant="outline">Ver Detalhes</Button>
      </SectionHeader>

      {/* Financial Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Visão Geral Financeira</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#82ca9d" />
              <Bar dataKey="expenses" fill="#d88484" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Dashboard;
