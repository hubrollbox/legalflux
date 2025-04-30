
import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { LOGO } from "../../../assets";
import { Button } from "../../components/ui/button";
import { SidebarProvider } from "../../components/ui/sidebar";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useIsMobile } from "../../hooks/use-mobile";
import { Image } from "@/components/ui/image";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMouseEnter = useCallback(() => {
    if (!isMobile) {
      setIsHovering(true);
    }
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setIsHovering(false);
    }
  }, [isMobile]);

  useEffect(() => {
    // Verifica se o usuário está autenticado
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Image src={LOGO.DEFAULT} alt="LegalFlux Logo" className="h-24 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Acesso Negado</h1>
          <p className="mb-4">Precisa iniciar sessão para aceder a esta página.</p>
          <Button onClick={() => navigate("/login")}>Iniciar Sessão</Button>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={!isSidebarCollapsed}>
      <div className="dashboard-container flex h-screen bg-gray-100 w-full">
        <div 
          className="sidebar-container fixed left-0 top-0 h-screen z-20"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Sidebar 
            user={user}
            logout={logout}
            isMobileSidebarOpen={isMobileSidebarOpen}
            closeMobileSidebar={closeMobileSidebar}
            isCollapsed={isMobile ? false : (isSidebarCollapsed && !isHovering)}
          />
        </div>

        {/* Main Content */}
        <div className={`flex-1 flex flex-col ${isSidebarCollapsed && !isHovering ? 'md:ml-16' : 'md:ml-64'} transition-all duration-300`}>
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
