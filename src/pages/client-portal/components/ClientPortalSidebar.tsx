
import { NavLink } from 'react-router-dom';
import { FileText, MessageSquare, FileArchive, CreditCard, User, FileSymlink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

const NavItem = ({ to, icon, children }: NavItemProps) => (
  <NavLink to={to}>
    {({ isActive }) => (
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start gap-2",
          isActive ? "bg-secondary font-medium" : "font-normal"
        )}
      >
        {icon}
        {children}
      </Button>
    )}
  </NavLink>
);

import { useAuth } from '@/hooks/useAuth';
import { LogOut } from 'lucide-react';

const ClientPortalSidebar = () => {
  const { logout } = useAuth();

  return (
    <aside className="w-64 h-screen bg-card border-r">
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center mb-2">
          <h2 className="text-xl font-semibold text-primary">Portal do Cliente</h2>
        </div>
        <Separator className="my-2" />
        <nav className="space-y-1 flex-1">
          <NavItem to="/client-portal/processes" icon={<FileText className="h-4 w-4" />}>
            Meus Processos
          </NavItem>
          <NavItem to="/client-portal/communications" icon={<MessageSquare className="h-4 w-4" />}>
            Comunicação
          </NavItem>
          <NavItem to="/client-portal/documents" icon={<FileArchive className="h-4 w-4" />}>
            Documentos
          </NavItem>
          <NavItem to="/client-portal/document-types" icon={<FileSymlink className="h-4 w-4" />}>
            Modelos
          </NavItem>
          <NavItem to="/client-portal/billing" icon={<CreditCard className="h-4 w-4" />}>
            Gestão Financeira
          </NavItem>
          <NavItem to="/client-portal/profile" icon={<User className="h-4 w-4" />}>
            Meu Perfil
          </NavItem>
        </nav>
        <div className="mt-auto">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2 text-destructive hover:text-destructive"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            Terminar Sessão
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default ClientPortalSidebar;
