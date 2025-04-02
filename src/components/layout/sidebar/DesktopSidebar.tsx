
import React from "react";
import { LOGO } from "@/assets";
import UserProfile from "../UserProfile";
import SidebarItems from "./SidebarItems";
import { SidebarItem } from "./SidebarItems";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
} from "@/components/ui/sidebar";

interface DesktopSidebarProps {
  user: any;
  items: SidebarItem[];
  isCollapsed: boolean;
  onNavigate: (href: string) => void;
  onLogout: () => void;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  user,
  items,
  isCollapsed,
  onNavigate,
  onLogout
}) => {
  return (
    <ShadcnSidebar
      collapsible={isCollapsed ? "icon" : "none"}
      className="hidden md:flex"
    >
      <SidebarHeader className="flex flex-col items-center justify-center p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-center">
          <img src={LOGO.SMALL} alt="LegalFlux Logo" className="h-8 mr-2" />
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold text-sidebar-foreground">LegalFlux</h1>
              <p className="text-xs text-muted-foreground">Gestão Jurídica</p>
            </div>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          <SidebarItems 
            items={items}
            user={user}
            onNavigate={onNavigate}
            onLogout={onLogout}
          />
        </SidebarMenu>
      </SidebarContent>
      
      {!isCollapsed && (
        <SidebarFooter>
          <UserProfile user={user} />
        </SidebarFooter>
      )}
    </ShadcnSidebar>
  );
};

export default DesktopSidebar;
