
import { useEffect, useState } from "react";
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

// Import utility functions
import { getUserRoleName, getChartData, getFinancialData, getPerformanceData, getStatisticsData } from "@/utils/dashboardUtils";
import { getRecentCases, getRecentTasks } from "@/components/dashboard/mockData";

const Dashboard = () => {
  const { user } = useAuth();
  const [cases, setCases] = useState<Case[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [organization] = useState(user?.organizationId ? { name: "Escritório Demo" } : undefined);
  const [userOrganization] = useState(user?.organizationId ? "Escritório Demo" : "Independente");
  const isMobile = useIsMobile();
  
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
      <PageTransition>
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <DashboardHeader userName={userName} userRole={userRole} />
          
          {/* Statistics Section */}
          <div className="mb-8">
            <StatisticsSection stats={statsData} userOrganization={userOrganization} />
          </div>
          
          {/* Recent Activity Section */}
          <div className="mb-8">
            <RecentActivity 
              recentCases={recentCases}
              recentTasks={recentTasks}
              chartData={chartData}
              performanceData={performanceData}
            />
          </div>
          
          {/* Financial Section */}
          <div className="mb-8">
            <FinancialSection financialData={financialData} />
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default Dashboard;
