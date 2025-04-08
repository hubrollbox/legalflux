
import React from "react";
import { useLocation } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LOGO } from "@/assets";
import { cn } from "@/lib/utils";
import { SidebarItem } from "./SidebarItems";
import { LogOut } from "lucide-react";

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
  onLogout,
}) => {
  const location = useLocation();
  const pathname = location.pathname;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <aside
      className={cn(
        "bg-sidebar border-r border-sidebar-border h-screen fixed left-0 top-0 z-20 hidden md:flex flex-col transition-all duration-300 overflow-hidden",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center">
          <img src={LOGO.WHITE} alt="Logo" className="h-8 w-auto" />
          {!isCollapsed && (
            <span className="ml-3 text-sidebar-foreground font-bold text-lg">LegalFlux</span>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-4 scrollbar-none">
        <nav className="px-2 space-y-1">
          {items.map((item, index) => {
            const isActive = pathname === item.href;
            
            // Skip item if it's not allowed for the user's role
            if (item.roles && !item.roles.includes(user?.role)) {
              return null;
            }

            return (
              <button
                key={index}
                className={cn(
                  "w-full flex items-center p-2 rounded-md transition-colors text-sidebar-foreground text-left",
                  isActive
                    ? "bg-sidebar-accent text-white font-medium"
                    : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isCollapsed ? "justify-center" : ""
                )}
                onClick={() => onNavigate(item.href)}
              >
                <item.icon className={cn("flex-shrink-0 h-5 w-5", isActive ? "text-white" : "text-gray-600")} />
                {!isCollapsed && (
                  <span className="ml-3 truncate">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User profile */}
      <div className="p-4 border-t border-sidebar-border">
        <div className={cn("flex items-center", isCollapsed ? "justify-center" : "")}>
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-sidebar-accent text-white text-xs">
              {user?.name ? getInitials(user.name) : "U"}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="ml-3 truncate">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user?.name || "Utilizador"}
              </p>
              <p className="text-xs text-gray-600 truncate">
                {user?.email || "email@exemplo.com"}
              </p>
            </div>
          )}
        </div>
        <button
          className={cn(
            "mt-3 w-full flex items-center p-2 rounded-md transition-colors text-sidebar-foreground text-left hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            isCollapsed ? "justify-center" : ""
          )}
          onClick={onLogout}
        >
          <LogOut className="flex-shrink-0 h-5 w-5 text-gray-600" />
          {!isCollapsed && <span className="ml-3">Sair</span>}
        </button>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
