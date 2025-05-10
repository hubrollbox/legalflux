
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalendarEvent {
  id?: string;
  title: string;
  start: Date;
  end: Date;
  category: 'meeting' | 'deadline' | 'task' | 'other';
  description?: string;
  isRecurring?: boolean;
  recurrenceType?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

interface EventFormProps {
  onSubmit: (data: CalendarEvent) => void;
  initialData?: CalendarEvent | null;
}

const EventForm: React.FC<EventFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<Partial<CalendarEvent>>(
    initialData || {
      title: '',
      category: 'meeting',
      start: new Date(),
      end: new Date(new Date().getTime() + 60 * 60 * 1000), // 1 hour later
      isRecurring: false
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.start || !formData.end || !formData.category) {
      // Handle validation
      return;
    }
    onSubmit(formData as CalendarEvent);
  };

  const setDate = (date: Date | undefined) => {
    if (!date) return;
    
    const startHour = formData.start ? formData.start.getHours() : new Date().getHours();
    const startMinute = formData.start ? formData.start.getMinutes() : new Date().getMinutes();
    const endHour = formData.end ? formData.end.getHours() : new Date().getHours() + 1;
    const endMinute = formData.end ? formData.end.getMinutes() : new Date().getMinutes();

    const newStart = new Date(date);
    newStart.setHours(startHour, startMinute, 0);
    
    const newEnd = new Date(date);
    newEnd.setHours(endHour, endMinute, 0);

    setFormData({
      ...formData,
      start: newStart,
      end: newEnd
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título <span className="text-red-500">*</span></Label>
        <Input
          id="title"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Digite o título do evento"
          required
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

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Categoria <span className="text-red-500">*</span></Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ 
              ...formData, 
              category: value as 'meeting' | 'deadline' | 'task' | 'other' 
            })}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="meeting">Reunião</SelectItem>
              <SelectItem value="deadline">Prazo</SelectItem>
              <SelectItem value="task">Tarefa</SelectItem>
              <SelectItem value="other">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Data</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !formData.start && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.start
                ? format(formData.start, "PPP")
                : "Selecione uma data"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={formData.start}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startTime">Hora de Início</Label>
          <Input
            id="startTime"
            type="time"
            value={formData.start 
              ? `${String(formData.start.getHours()).padStart(2, '0')}:${String(formData.start.getMinutes()).padStart(2, '0')}`
              : ''}
            onChange={(e) => {
              if (!e.target.value) return;
              const [hours, minutes] = e.target.value.split(':').map(Number);
              const newDate = new Date(formData.start || new Date());
              newDate.setHours(hours, minutes);
              setFormData({ ...formData, start: newDate });
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endTime">Hora de Fim</Label>
          <Input
            id="endTime"
            type="time"
            value={formData.end
              ? `${String(formData.end.getHours()).padStart(2, '0')}:${String(formData.end.getMinutes()).padStart(2, '0')}`
              : ''}
            onChange={(e) => {
              if (!e.target.value) return;
              const [hours, minutes] = e.target.value.split(':').map(Number);
              const newDate = new Date(formData.end || new Date());
              newDate.setHours(hours, minutes);
              setFormData({ ...formData, end: newDate });
            }}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit">
          {initialData?.id ? 'Atualizar' : 'Criar'} Evento
        </Button>
      </div>
    </form>
  );
};

export default EventForm;
