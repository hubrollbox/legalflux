import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/dateUtils";

interface Client {
  id: string;
  name: string;
}

interface Process {
  id?: string;
  title: string;
  description?: string;
  clientId: string;
  status: string;
  type: string;
  deadline?: Date;
  priority?: string;
  responsible?: string;
  notes?: string;
}

interface ProcessFormProps {
  onSubmit: (data: Process) => void;
  initialData?: Partial<Process>;
  clients?: Client[];
}

const ProcessForm: React.FC<ProcessFormProps> = ({
  onSubmit,
  initialData,
  clients = [],
}) => {
  const [formData, setFormData] = useState<Partial<Process>>(
    initialData || {
      title: '',
      description: '',
      clientId: '',
      status: 'pending',
      type: 'litigation',
      priority: 'medium',
    }
  );

  const [deadlineDate, setDeadlineDate] = useState<Date | undefined>(
    initialData?.deadline ? new Date(initialData.deadline) : undefined
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      deadline: deadlineDate,
    } as Process);
  };

  const handleChange = (field: keyof Process, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (date: Date) => {
    // Example of fixing formatDate usage
    const formattedDate = formatDate(date); // Using correct argument count
    
    setDeadlineDate(date);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título do Processo <span className="text-red-500">*</span></Label>
        <Input
          id="title"
          value={formData.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Digite o título do processo"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Digite a descrição do processo"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="clientId">Cliente <span className="text-red-500">*</span></Label>
        <Select
          value={formData.clientId}
          onValueChange={(value) => handleChange('clientId', value)}
        >
          <SelectTrigger id="clientId">
            <SelectValue placeholder="Selecione o cliente" />
          </SelectTrigger>
          <SelectContent>
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Tipo de Processo <span className="text-red-500">*</span></Label>
          <Select
            value={formData.type}
            onValueChange={(value) => handleChange('type', value)}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="litigation">Contencioso</SelectItem>
              <SelectItem value="advisory">Consultivo</SelectItem>
              <SelectItem value="administrative">Administrativo</SelectItem>
              <SelectItem value="contract">Contratual</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status <span className="text-red-500">*</span></Label>
          <Select
            value={formData.status}
            onValueChange={(value) => handleChange('status', value)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="in_progress">Em Andamento</SelectItem>
              <SelectItem value="completed">Concluído</SelectItem>
              <SelectItem value="archived">Arquivado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="deadline">Prazo</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !deadlineDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {deadlineDate ? formatDate(deadlineDate) : "Selecione uma data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={deadlineDate}
                onSelect={handleDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Prioridade</Label>
          <Select
            value={formData.priority}
            onValueChange={(value) => handleChange('priority', value)}
          >
            <SelectTrigger id="priority">
              <SelectValue placeholder="Selecione a prioridade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Baixa</SelectItem>
              <SelectItem value="medium">Média</SelectItem>
              <SelectItem value="high">Alta</SelectItem>
              <SelectItem value="urgent">Urgente</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="responsible">Responsável</Label>
        <Input
          id="responsible"
          value={formData.responsible || ''}
          onChange={(e) => handleChange('responsible', e.target.value)}
          placeholder="Digite o nome do responsável"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notas Adicionais</Label>
        <Textarea
          id="notes"
          value={formData.notes || ''}
          onChange={(e) => handleChange('notes', e.target.value)}
          placeholder="Digite notas adicionais sobre o processo"
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full">
        {initialData?.id ? 'Atualizar' : 'Criar'} Processo
      </Button>
    </form>
  );
};

export default ProcessForm;
