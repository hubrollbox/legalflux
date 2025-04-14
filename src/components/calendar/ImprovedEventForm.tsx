import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { DateRange } from "react-day-picker";
import type { CalendarEvent, CategoryKey } from '@/types';
import { AlertTriangle, MapPin } from 'lucide-react';

interface EventFormProps {
  onSubmit: (event: Partial<CalendarEvent>) => void;
  initialData?: Partial<CalendarEvent>;
  clients?: string[];
  processes?: string[];
}

const ImprovedEventForm: React.FC<EventFormProps> = ({ 
  onSubmit, 
  initialData,
  clients = [],
  processes = []
}) => {
  const [formData, setFormData] = React.useState<Partial<CalendarEvent>>(initialData || {
    title: '',
    description: '',
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 1)),
    category: 'meeting' as CategoryKey,
    priority: 'medium',
    client: '',
    process: '',
    location: '',
    isRecurring: false,
    recurrenceType: 'daily'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (range?.from) {
      setFormData(prev => ({
        ...prev,
        start: range.from!,
        end: range.to! || range.from!
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título do Evento <span className="text-red-500">*</span></Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Digite o título do evento"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Categoria <span className="text-red-500">*</span></Label>
          <Select
            value={formData.category}
            onValueChange={(value: CategoryKey) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="meeting">Reunião</SelectItem>
              <SelectItem value="deadline">Prazo</SelectItem>
              <SelectItem value="task">Tarefa</SelectItem>
              <SelectItem value="hearing">Audiência</SelectItem>
              <SelectItem value="trial">Julgamento</SelectItem>
              <SelectItem value="client">Cliente</SelectItem>
              <SelectItem value="other">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Prioridade</Label>
          <Select
            value={formData.priority}
            onValueChange={(value: 'high' | 'medium' | 'low') => setFormData({ ...formData, priority: value })}
          >
            <SelectTrigger id="priority">
              <SelectValue placeholder="Selecione a prioridade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                  <span>Alta</span>
                </div>
              </SelectItem>
              <SelectItem value="medium">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                  <span>Média</span>
                </div>
              </SelectItem>
              <SelectItem value="low">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Baixa</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Período <span className="text-red-500">*</span></Label>
        <DatePickerWithRange
          value={{
            from: formData.start,
            to: formData.end
          }}
          onChange={handleDateRangeChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Digite a descrição do evento"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="client">Cliente</Label>
          {clients.length > 0 ? (
            <Select
              value={formData.client || ''}
              onValueChange={(value: string) => setFormData({ ...formData, client: value })}
            >
              <SelectTrigger id="client">
                <SelectValue placeholder="Selecione um cliente" />
              </SelectTrigger>
              <SelectContent>
                {clients.map(client => (
                  <SelectItem key={client} value={client}>{client}</SelectItem>
                ))}
                <SelectItem value="other">Outro</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <Input
              id="client"
              value={formData.client || ''}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              placeholder="Nome do cliente"
            />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="process">Processo</Label>
          {processes.length > 0 ? (
            <Select
              value={formData.process || ''}
              onValueChange={(value: string) => setFormData({ ...formData, process: value })}
            >
              <SelectTrigger id="process">
                <SelectValue placeholder="Selecione um processo" />
              </SelectTrigger>
              <SelectContent>
                {processes.map(process => (
                  <SelectItem key={process} value={process}>{process}</SelectItem>
                ))}
                <SelectItem value="other">Outro</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <Input
              id="process"
              value={formData.process || ''}
              onChange={(e) => setFormData({ ...formData, process: e.target.value })}
              placeholder="Número do processo"
            />
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Localização</Label>
        <div className="relative">
          <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="location"
            value={formData.location || ''}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Local do evento"
            className="pl-8"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <Switch
          id="recurring"
          checked={formData.isRecurring || false}
          onCheckedChange={(checked: boolean) => setFormData({ ...formData, isRecurring: checked })}
        />
        <Label htmlFor="recurring">Evento Recorrente</Label>
      </div>

      {formData.isRecurring && (
        <div className="space-y-2">
          <Label htmlFor="recurrenceType">Tipo de Recorrência</Label>
          <Select
            value={formData.recurrenceType || 'daily'}
            onValueChange={(value: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly') => setFormData({ ...formData, recurrenceType: value })}
          >
            <SelectTrigger id="recurrenceType">
              <SelectValue placeholder="Selecione o tipo de recorrência" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Diário</SelectItem>
              <SelectItem value="weekly">Semanal</SelectItem>
              <SelectItem value="biweekly">Quinzenal</SelectItem>
              <SelectItem value="monthly">Mensal</SelectItem>
              <SelectItem value="yearly">Anual</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <Button type="submit" className="w-full bg-highlight hover:bg-highlight/90">
        {initialData?.id ? 'Atualizar Evento' : 'Criar Evento'}
      </Button>
    </form>
  );
};

export default ImprovedEventForm;