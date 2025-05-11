
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarEvent } from '@/types/calendar';

interface ImprovedEventFormProps {
  onSubmit: (data: CalendarEvent) => void;
  initialData?: CalendarEvent;
}

const ImprovedEventForm: React.FC<ImprovedEventFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<CalendarEvent>({
    id: initialData?.id || String(Date.now()),
    title: initialData?.title || '',
    start: initialData?.start || new Date(),
    end: initialData?.end || new Date(new Date().getTime() + 3600000),
    category: initialData?.category || 'meeting',
    description: initialData?.description || '',
    priority: initialData?.priority || 'medium',
    client: initialData?.client || '',
    process: initialData?.process || '',
    location: initialData?.location || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
          onValueChange={(value: any) => setFormData({ ...formData, category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecionar categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="meeting">Reunião</SelectItem>
            <SelectItem value="deadline">Prazo</SelectItem>
            <SelectItem value="task">Tarefa</SelectItem>
            <SelectItem value="hearing">Audiência</SelectItem>
            <SelectItem value="trial">Julgamento</SelectItem>
            <SelectItem value="client">Cliente</SelectItem>
            <SelectItem value="document">Documento</SelectItem>
            <SelectItem value="other">Outro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Descrição</label>
        <Textarea
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Descrição do evento"
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit">
          {initialData?.id ? 'Atualizar Evento' : 'Criar Evento'}
        </Button>
      </div>
    </form>
  );
};

export default ImprovedEventForm;
