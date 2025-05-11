
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Define the CalendarEvent interface
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  category: 'meeting' | 'deadline' | 'task' | 'other' | 'hearing' | 'trial' | 'client' | 'document';
  description?: string;
  isRecurring?: boolean;
  recurrenceType?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority?: 'high' | 'medium' | 'low';
  client?: string;
  process?: string;
  location?: string;
}

interface EventFormProps {
  onSubmit: (data: CalendarEvent) => void;
  initialData?: CalendarEvent | null;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<CalendarEvent>({
    id: initialData?.id || String(Date.now()),
    title: initialData?.title || '',
    start: initialData?.start || new Date(),
    end: initialData?.end || new Date(Date.now() + 3600000), // Default 1 hour later
    category: initialData?.category || 'meeting',
    description: initialData?.description || '',
    isRecurring: initialData?.isRecurring || false,
    recurrenceType: initialData?.recurrenceType,
    priority: initialData?.priority,
    client: initialData?.client,
    process: initialData?.process,
    location: initialData?.location
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleDateChange = (field: 'start' | 'end') => (date: Date | undefined) => {
    if (!date) return;

    if (field === 'start') {
      // If start time is changed, maintain the same event duration
      const currentDuration = formData.end.getTime() - formData.start.getTime();
      const newEnd = new Date(date.getTime() + currentDuration);
      
      setFormData({
        ...formData,
        start: date,
        end: newEnd
      });
    } else {
      setFormData({
        ...formData,
        [field]: date
      });
    }
  };

  const setTimeForDate = (date: Date, timeString: string): Date => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours, minutes);
    return newDate;
  };

  const handleTimeChange = (field: 'start' | 'end') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeString = e.target.value;
    if (!timeString) return;
    
    const updatedDate = setTimeForDate(
      field === 'start' ? formData.start : formData.end, 
      timeString
    );
    
    setFormData({
      ...formData,
      [field]: updatedDate
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Título</label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Título do evento"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Categoria</label>
        <Select
          value={formData.category}
          onValueChange={(value: 'meeting' | 'deadline' | 'task' | 'other' | 'hearing' | 'trial' | 'client' | 'document') => 
            setFormData({ ...formData, category: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecionar categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="meeting">Reunião</SelectItem>
            <SelectItem value="deadline">Prazo</SelectItem>
            <SelectItem value="task">Tarefa</SelectItem>
            <SelectItem value="other">Outro</SelectItem>
            <SelectItem value="hearing">Audiência</SelectItem>
            <SelectItem value="trial">Julgamento</SelectItem>
            <SelectItem value="client">Cliente</SelectItem>
            <SelectItem value="document">Documento</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Data de Início</label>
          <div className="flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal w-full",
                    !formData.start && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.start ? (
                    format(formData.start, "PPP")
                  ) : (
                    <span>Selecionar data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.start}
                  onSelect={handleDateChange('start')}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Hora de Início</label>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <Input
              type="time"
              value={format(formData.start, "HH:mm")}
              onChange={handleTimeChange('start')}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Data de Fim</label>
          <div className="flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal w-full",
                    !formData.end && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.end ? (
                    format(formData.end, "PPP")
                  ) : (
                    <span>Selecionar data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.end}
                  onSelect={handleDateChange('end')}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Hora de Fim</label>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <Input
              type="time"
              value={format(formData.end, "HH:mm")}
              onChange={handleTimeChange('end')}
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Descrição</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Descrição do evento"
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit" className="bg-highlight hover:bg-highlight/90">
          {initialData ? 'Atualizar Evento' : 'Criar Evento'}
        </Button>
      </div>
    </form>
  );
};

export default EventForm;
