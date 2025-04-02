
import React from "react";
import { X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOGO } from "@/assets";
import UserProfile from "../UserProfile";
import { SidebarItem } from "./SidebarItems";

interface MobileSidebarProps {
  user: any;
  items: SidebarItem[];
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
  onLogout: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  user,
  items,
  isOpen,
  onClose,
  onNavigate,
  onLogout
}) => {
  const filteredItems = items.filter(
    (item) => !user?.role || item.roles.includes(user.role)
  );

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={onClose}
      />

      {/* Mobile Sidebar Content */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-sidebar text-sidebar-foreground z-50 transition-transform duration-300 ease-in-out md:hidden transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-sidebar-border">
          <div className="flex items-center">
            <img src={LOGO.SMALL} alt="LegalFlux Logo" className="h-6 mr-2" />
            <h1 className="text-xl font-bold">LegalFlux</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {filteredItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                onClick={() => onNavigate(item.href)}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.label}
              </Button>
            ))}
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mt-4"
              onClick={onLogout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Sair
            </Button>
          </nav>
        </div>
        <UserProfile user={user} />
      </div>
    </>
  );
};

export default MobileSidebar;
