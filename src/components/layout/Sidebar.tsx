
import React from "react";
import { useNavigate } from "react-router-dom";
// Remove or comment out this line if present:
import { LogOut } from "lucide-react";
import DesktopSidebar from "./sidebar/DesktopSidebar";
import MobileSidebar from "./sidebar/MobileSidebar";
import { sidebarItems } from "./sidebar/sidebarConfig";

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

  return (
    <>
      <DesktopSidebar 
        user={user}
        items={sidebarItems}
        isCollapsed={isCollapsed}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      
      <MobileSidebar 
        user={user}
        items={sidebarItems}
        isOpen={isMobileSidebarOpen}
        onClose={closeMobileSidebar}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Sidebar;
