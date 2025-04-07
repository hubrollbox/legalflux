import React, { useState, useEffect } from 'react';
import { Bell, Calendar, MessageSquare, FileText, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

export interface Notification {
  id: string;
  type: 'deadline' | 'message' | 'process';
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

interface NotificationPreferences {
  deadlines: boolean;
  messages: boolean;
  processes: boolean;
  sound: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'deadline',
    title: 'Prazo Processo 2023/789',
    description: 'Prazo para recurso expira em 2 dias',
    timestamp: new Date(Date.now() - 3600000),
    read: false,
    priority: 'high'
  },
  {
    id: '2',
    type: 'message',
    title: 'Nova mensagem de Ana Silva',
    description: 'Documentos recebidos, obrigado!',
    timestamp: new Date(Date.now() - 7200000),
    read: false,
    priority: 'medium'
  },
  {
    id: '3',
    type: 'process',
    title: 'Atualização de Processo',
    description: 'Novo documento anexado ao processo 2023/456',
    timestamp: new Date(Date.now() - 10800000),
    read: true,
    priority: 'low'
  },
];

const NotificationSystem: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    deadlines: true,
    messages: true,
    processes: true,
    sound: true,
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    // Em uma aplicação real, aqui você se inscreveria em eventos do servidor
    // para receber notificações em tempo real
    const checkForNewNotifications = () => {
      // Simular uma nova notificação a cada 30 segundos
      const interval = setInterval(() => {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: 'deadline',
          title: 'Novo Prazo Importante',
          description: 'Audiência marcada para próxima semana',
          timestamp: new Date(),
          read: false,
          priority: 'high'
        };

        if (preferences.deadlines) {
          setNotifications(prev => [newNotification, ...prev]);
          showNotificationToast(newNotification);
        }
      }, 30000);

      return () => clearInterval(interval);
    };

    checkForNewNotifications();
  }, [preferences]);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'deadline':
        return <Calendar className="h-4 w-4" />;
      case 'message':
        return <MessageSquare className="h-4 w-4" />;
      case 'process':
        return <FileText className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' }).format(
      -Math.round((Date.now() - date.getTime()) / 3600000),
      'hour'
    );
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const showNotificationToast = (notification: Notification) => {
    if (preferences.sound) {
      // Reproduzir som de notificação
      const audio = new Audio('/notification-sound.mp3');
      audio.play().catch(console.error);
    }

    toast({
      title: notification.title,
      description: notification.description,
      duration: 5000,
    });
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center rounded-full text-xs"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>

      {showNotifications && (
        <Card className="absolute right-0 mt-2 w-80 z-50">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-medium">Notificações</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="h-[400px]">
            <div className="p-4 space-y-4">
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`flex gap-3 p-3 rounded-lg transition-colors ${notification.read ? 'bg-muted/30' : 'bg-muted'}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-sm">{notification.title}</p>
                      <div className={`h-2 w-2 rounded-full ${getPriorityColor(notification.priority)}`} />
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatTime(notification.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <h4 className="font-medium mb-3">Preferências de Notificação</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm">Prazos</label>
                <Switch
                  checked={preferences.deadlines}
                  onCheckedChange={(checked) =>
                    setPreferences(prev => ({ ...prev, deadlines: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">Mensagens</label>
                <Switch
                  checked={preferences.messages}
                  onCheckedChange={(checked) =>
                    setPreferences(prev => ({ ...prev, messages: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">Processos</label>
                <Switch
                  checked={preferences.processes}
                  onCheckedChange={(checked) =>
                    setPreferences(prev => ({ ...prev, processes: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">Som</label>
                <Switch
                  checked={preferences.sound}
                  onCheckedChange={(checked) =>
                    setPreferences(prev => ({ ...prev, sound: checked }))
                  }
                />
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default NotificationSystem;