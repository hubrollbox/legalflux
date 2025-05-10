
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Client } from "@/types/client";
import type { Process, ProcessStatus } from '@/types/process';

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
      notes: '',
      status: 'active'
    } as Partial<Client> : {
      number: '',
      title: '',
      description: '',
      status: 'new',
      clientId: ''
    } as Partial<Process>)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleStatusChange = (value: string) => {
    if (type === 'client') {
      // Ensure we only set valid client statuses
      const clientStatus = value as Client['status'];
      setFormData({ ...formData, status: clientStatus });
    } else {
      // Ensure we only set valid process statuses
      const processStatus = value as ProcessStatus;
      setFormData({ ...formData, status: processStatus });
    }
  };

  // Safely cast the status value for proper rendering
  const getStatusValue = () => {
    const status = (formData as any).status;
    return status ? status.toString() : '';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {type === 'client' ? (
        // Cliente form
        <>
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Cliente <span className="text-red-500">*</span></Label>
            <Input
              id="name"
              value={(formData as Partial<Client>).name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value } as Partial<Client | Process>)}
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
              onChange={(e) => setFormData({ ...formData, email: e.target.value } as Partial<Client | Process>)}
              placeholder="Digite o email do cliente"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone <span className="text-red-500">*</span></Label>
            <Input
              id="phone"
              value={(formData as Partial<Client>).phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value } as Partial<Client | Process>)}
              placeholder="Digite o telefone do cliente"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              value={(formData as Partial<Client>).address || ''}
              onChange={(e) => setFormData({ ...formData, address: e.target.value } as Partial<Client | Process>)}
              placeholder="Digite o endereço do cliente"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              value={(formData as Partial<Client>).notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value } as Partial<Client | Process>)}
              placeholder="Digite observações sobre o cliente"
              rows={3}
            />
          </div>
        </>
      ) : (
        // Processo form
        <>
          <div className="space-y-2">
            <Label htmlFor="number">Número do Processo <span className="text-red-500">*</span></Label>
            <Input
              id="number"
              value={(formData as Partial<Process>).number || ''}
              onChange={(e) => setFormData({ ...formData, number: e.target.value } as Partial<Client | Process>)}
              placeholder="Digite o número do processo"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Título <span className="text-red-500">*</span></Label>
            <Input
              id="title"
              value={(formData as Partial<Process>).title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value } as Partial<Client | Process>)}
              placeholder="Digite o título do processo"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={(formData as Partial<Process>).description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value } as Partial<Client | Process>)}
              placeholder="Digite a descrição do processo"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status <span className="text-red-500">*</span></Label>
            <Select
              value={getStatusValue()}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                {type === 'process' ? (
                  <>
                    <SelectItem value="new">Novo</SelectItem>
                    <SelectItem value="in_progress">Em Curso</SelectItem>
                    <SelectItem value="completed">Concluído</SelectItem>
                    <SelectItem value="archived">Arquivado</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                    <SelectItem value="prospect">Potencial</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientId">Cliente <span className="text-red-500">*</span></Label>
            <Select
              value={(formData as Partial<Process>).clientId || ''}
              onValueChange={(value: string) => setFormData({ ...formData, clientId: value } as Partial<Client | Process>)}
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
