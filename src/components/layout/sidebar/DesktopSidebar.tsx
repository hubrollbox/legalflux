
import React from "react";
import { LogOut } from "lucide-react";
import { SidebarItem } from "./SidebarItems";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DesktopSidebarProps {
  user: any;
  items: SidebarItem[];
  isCollapsed?: boolean;
  onNavigate: (href: string) => void;
  onLogout: () => void;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  user,
  items,
  isCollapsed = false,
  onNavigate,
  onLogout,
}) => {
  return (
    <aside
      className={cn(
        "hidden md:flex flex-col border-r bg-background h-screen sticky top-0 transition-all",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b flex items-center justify-center">
        <div
          className={cn(
            "flex items-center gap-2 h-8",
            isCollapsed && "justify-center"
          )}
        >
          <img
            src="/logo.svg"
            alt="Logo"
            className="h-8 w-8"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/favicon.ico";
            }}
          />
          {!isCollapsed && (
            <span className="font-bold text-lg">LegalFlux</span>
          )}
        </div>
      </div>

      {/* User Info */}
      <div
        className={cn(
          "p-4 border-b flex items-center",
          isCollapsed ? "justify-center" : "justify-start"
        )}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-3 cursor-pointer">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <div className="grid gap-0.5">
                    <p className="text-sm font-medium">
                      {user?.name || "Utilizador"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user?.role || "Sem função"}
                    </p>
                  </div>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className={cn(!isCollapsed && "hidden")}>
              <p className="font-medium">{user?.name || "Utilizador"}</p>
              <p className="text-xs text-muted-foreground">
                {user?.role || "Sem função"}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => onNavigate(item.href)}
                        className={cn(
                          "flex items-center w-full px-3 py-2 rounded-md text-sm transition-colors",
                          "hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        {Icon && React.createElement(Icon, { className: "h-5 w-5 mr-2" })}
                        {!isCollapsed && <span>{item.name}</span>}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className={cn(!isCollapsed && "hidden")}>
                      {item.name}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onLogout}
                className={cn(
                  "flex items-center w-full px-3 py-2 rounded-md text-sm transition-colors",
                  "hover:bg-destructive/10 hover:text-destructive"
                )}
              >
                <LogOut className="h-5 w-5 mr-2" />
                {!isCollapsed && <span>Sair</span>}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className={cn(!isCollapsed && "hidden")}>
              Sair
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
