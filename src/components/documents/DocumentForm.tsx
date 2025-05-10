import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Document, DocumentType, DocumentStatus } from "@/types/document";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { documentSchema, type DocumentFormValues } from '@/schemas/documentSchema';

interface Client {
  id: string;
  name: string;
}

interface Process {
  id: string;
  title: string;
  clientId: string;
  number: string;
}

interface DocumentFormProps {
  onSubmit: (data: Partial<Document>) => void;
  initialData?: Partial<Document>;
  clients?: Client[];
  processes?: Process[];
  selectedClient?: string;
  selectedProcess?: string;
}

const DocumentForm: React.FC<DocumentFormProps> = ({
  onSubmit,
  initialData,
  clients = [],
  processes = [],
  selectedClient,
  selectedProcess
}) => {
  const [formData, setFormData] = useState<Partial<Document>>(
    initialData || {
      name: '',
      description: '',
      type: 'document' as DocumentType,
      owner: '',
      process: selectedProcess || '',
      folder: '',
      status: 'draft' as DocumentStatus,
      tags: [],
      category: '',
      clientId: selectedClient || '',
      processId: selectedProcess || ''
    }
  );

  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      status: (initialData?.status || 'draft') as DocumentStatus,
      name: initialData?.name || '',
      type: (initialData?.type || 'document') as DocumentType,
      description: initialData?.description || '',
      category: initialData?.category || '',
      clientId: initialData?.clientId || selectedClient || '',
      processId: initialData?.processId || selectedProcess || ''
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // Determinar o tipo de documento com base no tipo de arquivo
    let docType: DocumentType = "document";
    const fileType = files[0]?.type || '';
    
    if (fileType.includes('pdf')) {
      docType = "document";
    } else if (fileType.includes('image')) {
      docType = "precedent";
    } else if (fileType.includes('text')) {
      docType = "action";
    }
    
    setFormData(prev => ({
      ...prev,
      type: docType
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica de upload do arquivo
    // e obteria a URL do arquivo após o upload
    onSubmit(formData);
  };

  const filteredProcesses = formData.clientId
    ? processes.filter(process => process.clientId === formData.clientId)
    : processes;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Título do Documento <span className="text-red-500">*</span></Label>
        <Input
          id="name"
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Digite o título do documento"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Digite a descrição do documento"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="file">Arquivo <span className="text-red-500">*</span></Label>
        <Input
          id="file"
          type="file"
          onChange={handleFileChange}
          required={!initialData?.url}
          className="cursor-pointer"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="clientId">Cliente</Label>
        <Select
          value={formData.clientId}
          onValueChange={(value: string) => setFormData({ ...formData, clientId: value, processId: undefined, process: '' })}
          disabled={!!selectedClient}
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

      <div className="space-y-2">
        <Label htmlFor="processId">Processo</Label>
        <Select
          value={formData.processId}
          onValueChange={(value: string) => setFormData({ ...formData, processId: value, process: value })}
          disabled={!!selectedProcess || !formData.clientId}
        >
          <SelectTrigger id="processId">
            <SelectValue placeholder="Selecione o processo" />
          </SelectTrigger>
          <SelectContent>
            {filteredProcesses.map(process => (
              <SelectItem key={process.id} value={process.id}>{process.number} - {process.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {initialData?.version && (
        <div className="space-y-2">
          <Label>Versão</Label>
          <p className="text-sm text-gray-500">Versão atual: {initialData.version}</p>
        </div>
      )}

      <Button type="submit" className="w-full bg-highlight hover:bg-highlight/90">
        {initialData?.id ? 'Atualizar' : 'Criar'} Documento
      </Button>
    </form>
  );
};

export default DocumentForm;
