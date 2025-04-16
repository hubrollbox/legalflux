
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-picker-range";
import { Bell, Sun, Moon, BarChart2 } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardHeaderProps {
  userName: string;
  userRole: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName, userRole }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [notifications, setNotifications] = useState<{id: string; text: string; isNew: boolean}[]>([
    { id: "1", text: "Nova mensagem recebida", isNew: true },
    { id: "2", text: "Prazo de tarefa a vencer", isNew: true },
    { id: "3", text: "Documento aprovado", isNew: false },
  ]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isNew: false } : notif
      )
    );
  };

  const newNotificationsCount = notifications.filter(n => n.isNew).length;

  return (
    <div className="dashboard-header flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Painel de Controlo</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Bem-vindo(a), {userName} <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full">{userRole}</span>
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <Button variant="outline" size="sm" onClick={toggleTheme} className="h-9 w-9 p-0">
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 w-9 p-0 relative">
              <Bell className="h-4 w-4" />
              {newNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 text-[10px] flex items-center justify-center bg-red-500 text-white rounded-full">
                  {newNotificationsCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-2 font-medium border-b">Notificações</div>
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">Nenhuma notificação</div>
            ) : (
              notifications.map(notification => (
                <DropdownMenuItem key={notification.id} className="p-3 cursor-pointer" onClick={() => markAsRead(notification.id)}>
                  <div className="flex items-start gap-2">
                    {notification.isNew && <Badge className="h-2 w-2 rounded-full p-0 bg-blue-500" />}
                    <span>{notification.text}</span>
                  </div>
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <BarChart2 className="h-4 w-4" />
          <span className="hidden sm:inline">Relatórios</span>
        </Button>
        
        <DatePickerWithRange />
      </div>
    </div>
  );
};

export default DashboardHeader;
