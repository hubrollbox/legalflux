
import React from "react";
import { LogOut, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
  onLogout,
}) => {
  // Não renderizar se não estiver aberto (economiza recursos)
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay de fundo */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
        onClick={onClose}
      />

      {/* Sidebar móvel */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-background p-4 shadow-lg transition-transform md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <img
              src="/logo.svg"
              alt="Logo"
              className="h-8 w-8"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/favicon.ico";
              }}
            />
            <span className="font-bold text-lg">LegalFlux</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Informações do usuário */}
        <div className="border-y py-4 mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{user?.name || "Utilizador"}</p>
              <p className="text-sm text-muted-foreground">
                {user?.role || "Sem função"}
              </p>
            </div>
          </div>
        </div>

        {/* Navegação */}
        <nav className="space-y-1 mb-6">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.href}
                onClick={() => {
                  onNavigate(item.href);
                  onClose();
                }}
                className={cn(
                  "flex items-center w-full px-3 py-2.5 rounded-md text-sm transition-colors",
                  "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {Icon && typeof Icon === 'function' ? React.createElement(Icon, { className: "h-5 w-5 mr-3" }) : null}
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Botão de logout */}
        <Button
          variant="outline"
          className="w-full flex items-center justify-center"
          onClick={() => {
            onLogout();
            onClose();
          }}
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span>Sair</span>
        </Button>
      </div>
    </>
  );
};

export default MobileSidebar;
