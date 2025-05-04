
import React from "react";
import { useNavigate } from "react-router-dom";
import DesktopSidebar from "./sidebar/DesktopSidebar";
import MobileSidebar from "./sidebar/MobileSidebar";
import { sidebarItems } from "./sidebar/sidebarConfig";
import { SidebarItem as SidebarItemType } from "./sidebar/SidebarItems";

interface SidebarProps {
  user: any;
  logout: () => void;
  isMobileSidebarOpen: boolean;
  closeMobileSidebar: () => void;
  isCollapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  user,
  logout,
  isMobileSidebarOpen,
  closeMobileSidebar,
  isCollapsed = false,
}) => {
  const navigate = useNavigate();

  const handleNavigate = (href: string) => {
    navigate(href);
    closeMobileSidebar();
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Converter os itens de sidebarConfig para o formato esperado por SidebarItems
  const adaptedItems: SidebarItemType[] = sidebarItems.map(item => ({
    ...item,
    label: item.name,
    roles: item.roles || []
  }));

  return (
    <>
      <DesktopSidebar 
        user={user}
        items={adaptedItems}
        isCollapsed={isCollapsed}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      
      <MobileSidebar 
        user={user}
        items={adaptedItems}
        isOpen={isMobileSidebarOpen}
        onClose={closeMobileSidebar}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Sidebar;
