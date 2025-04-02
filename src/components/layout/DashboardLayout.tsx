
import React, { ReactNode, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { LOGO } from "@/assets";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <img src={LOGO.DEFAULT} alt="LegalFlux Logo" className="h-24 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Acesso Negado</h1>
          <p className="mb-4">Precisa fazer login para aceder a esta página.</p>
          <Button onClick={() => navigate("/login")}>Fazer Login</Button>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={!isSidebarCollapsed}>
      <div className="dashboard-container flex h-screen bg-gray-100 w-full">
        <Sidebar 
          user={user}
          logout={logout}
          isMobileSidebarOpen={isMobileSidebarOpen}
          closeMobileSidebar={closeMobileSidebar}
          isCollapsed={isSidebarCollapsed}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Header 
            user={user}
            toggleMobileSidebar={toggleMobileSidebar}
            toggleSidebar={toggleSidebar}
            isSidebarCollapsed={isSidebarCollapsed}
            logout={logout}
          />

          <main className="main-content">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
