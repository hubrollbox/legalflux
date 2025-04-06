import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DateRange } from "react-day-picker";

interface EventFormProps {
  onSubmit: (event: EventData) => void;
  initialData?: EventData;
}

interface EventData {
  title: string;
  description: string;
  dateRange: { from: Date; to?: Date };
  category: string;
  isRecurring: boolean;
  recurrenceType?: string;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = React.useState<EventData>(initialData || {
    title: '',
    description: '',
    dateRange: { from: new Date(), to: new Date() },
    category: 'meeting',
    isRecurring: false,
    recurrenceType: 'none'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título do Evento</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Digite o título do evento"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Digite a descrição do evento"
        />
      </div>

      <div className="space-y-2">
        <Label>Período</Label>
        <DatePickerWithRange
          value={formData.dateRange}
          onChange={(range) => setFormData({ ...formData, dateRange: range || { from: new Date(), to: new Date() } })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Categoria</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => setFormData({ ...formData, category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="meeting">Reunião</SelectItem>
            <SelectItem value="deadline">Prazo</SelectItem>
            <SelectItem value="task">Tarefa</SelectItem>
            <SelectItem value="other">Outro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="recurring"
          checked={formData.isRecurring}
          onCheckedChange={(checked) => setFormData({ ...formData, isRecurring: checked })}
        />
        <Label htmlFor="recurring">Evento Recorrente</Label>
      </div>

      {formData.isRecurring && (
        <div className="space-y-2">
          <Label htmlFor="recurrenceType">Tipo de Recorrência</Label>
          <Select
            value={formData.recurrenceType}
            onValueChange={(value) => setFormData({ ...formData, recurrenceType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo de recorrência" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Diário</SelectItem>
              <SelectItem value="weekly">Semanal</SelectItem>
              <SelectItem value="monthly">Mensal</SelectItem>
              <SelectItem value="yearly">Anual</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <Button type="submit" className="w-full">
        Salvar Evento
      </Button>
    </form>
  );
};

export default EventForm;