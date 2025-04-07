import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  notes?: string;
  documents?: Document[];
  processes?: Process[];
}

export interface Process {
  id: string;
  number: string;
  title: string;
  description?: string;
  status: 'active' | 'archived' | 'completed';
  clientId: string;
  documents?: Document[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: "document" | "action" | "precedent" | "strategy";
  clientId?: string;
  processId?: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ClientProcessFormProps {
  onSubmit: (data: Partial<Client | Process>) => void;
  initialData?: Partial<Client | Process>;
  type: 'client' | 'process';
  clients?: Client[];
}

const ClientProcessForm: React.FC<ClientProcessFormProps> = ({
  onSubmit,
  initialData,
  type,
  clients = []
}) => {
  const [formData, setFormData] = React.useState<Partial<Client | Process>>(
    initialData || (type === 'client' ? {
      name: '',
      email: '',
      phone: '',
      address: '',
      notes: ''
    } : {
      number: '',
      title: '',
      description: '',
      status: 'active',
      clientId: ''
    })
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {type === 'client' ? (
        // Formulário de Cliente
        <>
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Cliente <span className="text-red-500">*</span></Label>
            <Input
              id="name"
              value={(formData as Partial<Client>).name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Digite o nome do cliente"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
            <Input
              id="email"
              type="email"
              value={(formData as Partial<Client>).email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Digite o email do cliente"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone <span className="text-red-500">*</span></Label>
            <Input
              id="phone"
              value={(formData as Partial<Client>).phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Digite o telefone do cliente"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              value={(formData as Partial<Client>).address || ''}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Digite o endereço do cliente"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              value={(formData as Partial<Client>).notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Digite observações sobre o cliente"
              rows={3}
            />
          </div>
        </>
      ) : (
        // Formulário de Processo
        <>
          <div className="space-y-2">
            <Label htmlFor="number">Número do Processo <span className="text-red-500">*</span></Label>
            <Input
              id="number"
              value={(formData as Partial<Process>).number || ''}
              onChange={(e) => setFormData({ ...formData, number: e.target.value })}
              placeholder="Digite o número do processo"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Título <span className="text-red-500">*</span></Label>
            <Input
              id="title"
              value={(formData as Partial<Process>).title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Digite o título do processo"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={(formData as Partial<Process>).description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Digite a descrição do processo"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status <span className="text-red-500">*</span></Label>
            <Select
              value={(formData as Partial<Process>).status}
              onValueChange={(value) => setFormData({ ...formData, status: value as 'active' | 'archived' | 'completed' })}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="archived">Arquivado</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientId">Cliente <span className="text-red-500">*</span></Label>
            <Select
              value={(formData as Partial<Process>).clientId}
              onValueChange={(value) => setFormData({ ...formData, clientId: value })}
            >
              <SelectTrigger id="clientId">
                <SelectValue placeholder="Selecione o cliente" />
              </SelectTrigger>
              <SelectContent>
                {clients.map(client => (
                  <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      <Button type="submit" className="w-full bg-highlight hover:bg-highlight/90">
        {initialData?.id ? 'Atualizar' : 'Criar'} {type === 'client' ? 'Cliente' : 'Processo'}
      </Button>
    </form>
  );
};

export default ClientProcessForm;