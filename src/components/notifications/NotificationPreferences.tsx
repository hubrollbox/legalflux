import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Calendar, MessageSquare, FileText, Volume2 } from 'lucide-react';

export interface NotificationPreference {
  deadlines: boolean;
  messages: boolean;
  processes: boolean;
  sound: boolean;
  priority: {
    high: boolean;
    medium: boolean;
    low: boolean;
  };
  deliveryMethod: 'all' | 'email' | 'push' | 'none';
}

interface NotificationPreferencesProps {
  preferences: NotificationPreference;
  onPreferencesChange: (preferences: NotificationPreference) => void;
}

const NotificationPreferences: React.FC<NotificationPreferencesProps> = ({
  preferences,
  onPreferencesChange,
}) => {
  const handleToggle = (key: keyof NotificationPreference) => {
    if (typeof preferences[key] === 'boolean') {
      onPreferencesChange({
        ...preferences,
        [key]: !preferences[key],
      });
    }
  };

  const handlePriorityToggle = (priority: keyof NotificationPreference['priority']) => {
    onPreferencesChange({
      ...preferences,
      priority: {
        ...preferences.priority,
        [priority]: !preferences.priority[priority],
      },
    });
  };

  const handleDeliveryMethodChange = (value: NotificationPreference['deliveryMethod']) => {
    onPreferencesChange({
      ...preferences,
      deliveryMethod: value,
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Preferências de Notificação</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Tipos de Notificação</h4>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <Label htmlFor="deadlines">Prazos e Audiências</Label>
              </div>
              <Switch
                id="deadlines"
                checked={preferences.deadlines}
                onCheckedChange={() => handleToggle('deadlines')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <Label htmlFor="messages">Mensagens</Label>
              </div>
              <Switch
                id="messages"
                checked={preferences.messages}
                onCheckedChange={() => handleToggle('messages')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <Label htmlFor="processes">Atualizações de Processos</Label>
              </div>
              <Switch
                id="processes"
                checked={preferences.processes}
                onCheckedChange={() => handleToggle('processes')}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Prioridades</h4>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <Label htmlFor="high-priority">Alta Prioridade</Label>
              </div>
              <Switch
                id="high-priority"
                checked={preferences.priority.high}
                onCheckedChange={() => handlePriorityToggle('high')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <Label htmlFor="medium-priority">Média Prioridade</Label>
              </div>
              <Switch
                id="medium-priority"
                checked={preferences.priority.medium}
                onCheckedChange={() => handlePriorityToggle('medium')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <Label htmlFor="low-priority">Baixa Prioridade</Label>
              </div>
              <Switch
                id="low-priority"
                checked={preferences.priority.low}
                onCheckedChange={() => handlePriorityToggle('low')}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Método de Entrega</h4>
          <Select
            value={preferences.deliveryMethod}
            onValueChange={handleDeliveryMethodChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o método de entrega" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os métodos</SelectItem>
              <SelectItem value="email">Apenas Email</SelectItem>
              <SelectItem value="push">Apenas Notificações Push</SelectItem>
              <SelectItem value="none">Nenhum</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Volume2 className="h-4 w-4" />
            <Label htmlFor="sound">Som de Notificação</Label>
          </div>
          <Switch
            id="sound"
            checked={preferences.sound}
            onCheckedChange={() => handleToggle('sound')}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationPreferences;