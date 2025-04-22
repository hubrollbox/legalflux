import React, { useState } from 'react';
import { Bell, Calendar, MessageSquare, FileText, X, Settings2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useNotificationStore } from '@/services/notificationService';
import NotificationPreferences from './NotificationPreferences';
import type { NotificationPreference } from './NotificationPreferences';

interface Notification {
  id: string;
  title: string;
  content: string;  // Should be 'content' instead of 'message'
  type: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: Date;
  read: boolean;
  data?: any;
}

const NotificationSystem: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const {
    notifications,
    preferences,
    unreadCount,
    markAsRead,
    markAllAsRead,
    updatePreferences
  } = useNotificationStore();



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

  const handlePreferencesChange = (newPreferences: NotificationPreference) => {
    updatePreferences(newPreferences);
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
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings2 className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Configurações de Notificações</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <NotificationPreferences
                      preferences={preferences}
                      onPreferencesChange={handlePreferencesChange}
                    />
                  </div>
                </SheetContent>
              </Sheet>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNotifications(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <ScrollArea className="h-[400px]">
            <div className="p-4 space-y-4">
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`flex gap-3 p-3 rounded-lg transition-colors ${notification.read ? 'bg-muted/30' : 'bg-muted'}`}
                  onClick={() => markAsRead(notification.id)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === 'Enter' && markAsRead(notification.id)}
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
                      {notification.content}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatTime(new Date(notification.timestamp))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t flex justify-between items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              className="w-full"
            >
              Marcar todas como lidas
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default NotificationSystem;