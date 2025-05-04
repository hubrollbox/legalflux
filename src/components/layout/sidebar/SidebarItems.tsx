
import React from "react";
import { LogOut } from "lucide-react";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { UserRole } from "@/types/permissions";

export interface SidebarItem {
  name: string;
  label?: string; // Para compatibilidade
  icon: React.ElementType;
  href: string;
  roles: UserRole[];
}

interface SidebarItemsProps {
  items: SidebarItem[];
  user: any;
  onNavigate: (href: string) => void;
  onLogout: () => void;
}

const SidebarItems: React.FC<SidebarItemsProps> = ({
  items,
  user,
  onNavigate,
  onLogout
}) => {
  const filteredItems = items.filter(
    (item) => !user?.role || item.roles.includes(user.role)
  );

  return (
    <>
      {filteredItems.map((item) => (
        <SidebarMenuItem key={item.name || item.label}>
          <SidebarMenuButton
            onClick={() => onNavigate(item.href)}
            tooltip={item.name || item.label}
          >
            {typeof item.icon === 'function' ? React.createElement(item.icon, { className: "mr-2 h-5 w-5" }) : null}
            <span>{item.name || item.label}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
      
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={onLogout}
          tooltip="Sair"
        >
          <LogOut className="mr-2 h-5 w-5" />
          <span>Sair</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </>
  );
};

export default SidebarItems;
