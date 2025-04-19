import { useState, useEffect } from 'react';
import type { ControllerRenderProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import * as z from "zod";
// Input component is used in the form fields
// Button component is used in the form for actions like submit, cancel, etc.
// Button component is used in the form for actions like submit, cancel, etc.
// The Button component is used in the form for actions like submit, cancel, etc.
import { Button } from "@/components/ui/button";
// Input component is used in the form fields for text input
import { Input } from "@/components/ui/input";
// Removing unused import since Textarea is used in the component
// Remove unused import since Textarea is not being used in the component
// Remove unused imports since they are not being used in the component
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer';
import { Download } from 'lucide-react';
import type { Process } from "@/types/process";
import type { Client } from "@/types/client";
import type { FC } from "react";
import { clientService } from "@/services/clientService";
import { processService } from "@/services/processService";
// Remove unused imports since Card and CardContent are not being used
// Remove unused imports since they are not being used in the component
// Remove unused import since FileUpload component is not being used
// Remove unused import since we're not using react-pdf/renderer components
// Removed unused import ControllerFieldState
// Removed unused import UseFormStateReturn

// Schema de validação para o formulário de documento
const documentTemplateFormSchema = z.object({
  templateId: z.string({
    required_error: "Selecione um modelo",
  }),
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  processId: z.string({
    required_error: "Selecione um processo",
  }),
  clientId: z.string({
    required_error: "Selecione um cliente",
  }),
  customFields: z.record(z.string()),
});

type DocumentTemplateFormValues = z.infer<typeof documentTemplateFormSchema>;

// Add missing imports at top
import { FileText } from 'lucide-react';
import { FileUpload } from '@/components/ui/upload';

// Add type for isSubmitting prop
interface DocumentTemplateFormProps {
  onSubmit: (data: any) => void;
  isSubmitting?: boolean;
  templates: Array<{
    id: string;
    name: string;
    description: string;
    fields: Array<{
      id: string;
      name: string;
      key: string;
      type: "text" | "date" | "number" | "select";
      options?: string[];
      required: boolean;
    }>;
  }>;
}

const DocumentTemplateForm: FC<DocumentTemplateFormProps> = ({ onSubmit, templates, isSubmitting }) => {
  const form = useForm<DocumentTemplateFormValues>({
    resolver: zodResolver(documentTemplateFormSchema),
    defaultValues: {
      templateId: "",
      name: "",
      processId: "",
      clientId: "",
      customFields: {},
    },
  });

  const [templateContent, setTemplateContent] = useState('');
  const [previewContent, setPreviewContent] = useState<string>('');
  const [activePlaceholders, setActivePlaceholders] = useState<string[]>([]);

  const generatePreview = async (): Promise<string> => {
    if (!templateContent || !selectedTemplate) return '';
    let content = templateContent;
    const clientData = clientService.getCurrentClient();
    const processData = await processService.getCurrentProcess();

    let processNumber = parseInt(processData?.number?.toString() || '0', 10);
    if (Number.isNaN(processNumber)) processNumber = 0;
    
    activePlaceholders.forEach((placeholder) => {
      const value = {
        nome_cliente: clientData?.name || '[Nome do Cliente]',
        nif: clientData?.nif || '[NIF]',
        numero_processo: processNumber.toString() || '[Número do Processo]',
        data_actual: new Date().toLocaleDateString('pt-PT'),
        morada: clientData?.address || '[Morada]',
      }[placeholder];
    
      content = content.replace(
        new RegExp(`{{${placeholder}}}`, 'g'),
        () => `<span class="font-medium text-blue-600">${value}</span>`
      );
    });

    const clientId = form.watch('clientId');
    const processId = form.watch('processId');
    const currentClient = clients.find(c => c.id === clientId);
    const currentProcess = processes.find(p => p.id === processId);

    content = content
      .replace(/\{\{cliente.nome\}\}/g, currentClient?.name || '[Cliente]')
      .replace(/\{\{processo.numero\}\}/g, currentProcess?.number?.toString() || '[Número]');

    const customFields = form.watch('customFields');
    Object.entries(customFields).forEach(([key, value]) => {
      content = content.replace(new RegExp(`\{\{${key}\}\}`, 'g'), value || `[${key}]`);
    });

    return content;
  };

  const handleExportPDF = (): void => {
    const pdfContent = previewContent.replace(/<[^>]+>/g, '');
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'documento_gerado.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* existing JSX content */}
    </div>
  );

  const predefinedPlaceholders = [
    'nome_cliente',
    'nif',
    'numero_processo',
    'data_actual',
    'morada'
  ];

  const handleInsertPlaceholder = (placeholder: string): void => {
    const newContent = `${templateContent}{{${placeholder}}}`;
    setTemplateContent(newContent);
    if (!activePlaceholders.includes(placeholder)) {
      setActivePlaceholders([...activePlaceholders, placeholder]);
    }
  };

  const [clients, setClients] = useState<Client[]>([]);
  const [processes, setProcesses] = useState<Process[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [isLoadingClients, setIsLoadingClients] = useState(true);
  const [isLoadingProcesses, setIsLoadingProcesses] = useState(true);

  // Carregar clientes e processos ao montar o componente
  useEffect(() => {
    const loadData = async () => {
      try {
        const clientsData = await clientService.listClients();
        setClients(clientsData);
        setIsLoadingClients(false);

        const processesData = await processService.listProcesses();
        setProcesses(processesData);
        setIsLoadingProcesses(false);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setIsLoadingClients(false);
        setIsLoadingProcesses(false);
      }
    };

    loadData();

    return () => {
      // Cleanup function if needed
    };
  }, []);

  // Atualizar o template selecionado quando o usuário selecionar um template
  const handleTemplateChange = (templateId: string): void => {
    const template = templates?.find((t: { id: string }) => t.id === templateId);
    setSelectedTemplate(template);

    // Inicializar campos personalizados
    if (template) {
      const initialCustomFields: Record<string, string> = {};
      template.fields.forEach((field: { key: string }) => {
        initialCustomFields[field.key] = "";
      });
      form.setValue("customFields", initialCustomFields);
    }
  };

  // Gerar visualização do documento com os campos preenchidos


  // Atualizar a visualização quando os campos forem alterados
  useEffect(() => {
    const subscription = form.watch(() => {
      const preview = generatePreview();
      if (typeof preview === 'string') {
        setPreviewContent(preview);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch, selectedTemplate]);

  const onFormSubmit = (values: DocumentTemplateFormValues) => {
    // Preparar dados para envio
    const formattedData = {
      ...values,
      content: previewContent, // Conteúdo do documento com os placeholders substituídos
    };

    onSubmit(formattedData);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
          {/* Placeholder for additional content */}
              <Label>Conteúdo do Documento</Label>
              <Textarea
                value={templateContent}
                onChange={(e) => setTemplateContent(e.target.value)}
                className="min-h-[300px] font-mono"
                placeholder="Insira seu texto aqui..."
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {predefinedPlaceholders.map(placeholder => (
                <Button
                  key={placeholder}
                  variant="outline"
                  size="sm"
                  onClick={() => handleInsertPlaceholder(placeholder)}
                >
                  {`{{${placeholder}}}`}
                </Button>
              ))}
            </div>
            <Button onClick={generatePreview} className="mt-4">
              Atualizar Pré-visualização
            </Button>
          </div>
          <div className="space-y-4">
            <Label>Pré-visualização</Label>
            <Card>
              <CardContent className="p-4 prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: previewContent }} />
              </CardContent>
            </Card>
            <PDFDownloadLink
              document={(
                <Document>
                  <Page style={{ padding: 20 }}>
                    <Text>{previewContent.replace(/<[^>]+>/g, '')}</Text>
                  </Page>
                </Document>
              )}
              fileName="documento_gerado.pdf"
            >
              {({ loading }) => (
                <Button className="w-full" disabled={loading}>
                  <Download className="mr-2 h-4 w-4" />
                  {loading ? 'Gerando PDF...' : 'Exportar Documento'}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {/* Placeholder for additional content */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="templateId"
                render={({ field }: { field: ControllerRenderProps<{ templateId: string; name: string; processId: string; clientId: string; customFields: Record<string, string>; }, "templateId"> & { onChange: (value: string) => void; onBlur: () => void; value: string; name: string; ref: React.Ref<any>; } }) => (
                  <FormItem>
                    <FormLabel>Modelo <span className="text-red-500">*</span></FormLabel>
                    <Select
                      onValueChange={(value: string) => {
                        field.onChange(value);
                        handleTemplateChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um modelo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
render={({ field }: { field: ControllerRenderProps<{ templateId: string; name: string; processId: string; clientId: string; customFields: Record<string, string>; }, "name"> & { onChange: (value: string) => void; onBlur: () => void; value: string; name: string; ref: React.Ref<any>; } }) => (
  <FormItem>
    <FormLabel>Nome do Documento <span className="text-red-500">*</span></FormLabel>
    <FormControl>
      <Input placeholder="Nome do documento" {...field} />
    </FormControl>
    <FormMessage />
  </FormItem>
)}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="processId"
                  render={({ field }: { field: ControllerRenderProps<{ templateId: string; name: string; processId: string; clientId: string; customFields: Record<string, string>; }, "processId"> & { onChange: (value: string) => void; onBlur: () => void; value: string; name: string; ref: React.Ref<any>; } }) => (
                    <FormItem>
                      <FormLabel>Processo <span className="text-red-500">*</span></FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoadingProcesses}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um processo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {isLoadingProcesses ? (
                            <SelectItem value="loading" disabled>
                              Carregando processos...
                            </SelectItem>
                          ) : processes.length === 0 ? (
                            <SelectItem value="empty" disabled>
                              Nenhum processo encontrado
                            </SelectItem>
                          ) : (
                            processes.map((process) => (
                              <SelectItem key={process.id} value={process.id}>
                                {process.title}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="clientId"
                  render={({ field }: { field: ControllerRenderProps<{ templateId: string; name: string; processId: string; clientId: string; customFields: Record<string, string>; }, "clientId"> & { onChange: (value: string) => void; onBlur: () => void; value: string; name: string; ref: React.Ref<any>; } }) => (
                    <FormItem>
                      <FormLabel>Cliente <span className="text-red-500">*</span></FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoadingClients}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um cliente" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {isLoadingClients ? (
                            <SelectItem value="loading" disabled>
                              Carregando clientes...
                            </SelectItem>
                          ) : clients.length === 0 ? (
                            <SelectItem value="empty" disabled>
                              Nenhum cliente encontrado
                            </SelectItem>
                          ) : (
                            clients.map((client) => (
                              <SelectItem key={client.id} value={client.id}>
                                {client.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {selectedTemplate && selectedTemplate.fields.length > 0 && (
                <div className="space-y-4">
                  <FileUpload onUploadSuccess={(files: File[]) => console.log('Arquivos enviados:', files)} />
                  <h3 className="font-medium">Campos Personalizados</h3>
                  {selectedTemplate.fields.map((field: { id: string; name: string; key: string; type: "text" | "textarea" | "select"; options?: string[]; required: boolean }) => (
                    <FormField
                      key={field.id}
                      control={form.control}
                      name={`customFields.${field.key}`}
                      render={({ field: formField }: { field: ControllerRenderProps<{ name: string; templateId: string; processId: string; clientId: string; customFields: Record<string, string>; }, `customFields.${any}`> }) => (
                        <FormItem>
                          <FormLabel>
                            {field.name}
                            {field.required && <span className="text-red-500">*</span>}
                          </FormLabel>
                          <FormControl>
                            {field?.type === "text" ? (
                              <Input {...formField} />
                            ) : field?.type === "textarea" ? (
                              <Textarea {...formField} />
                            ) : field?.type === "select" && field?.options ? (
                              <Select
                                onValueChange={formField.onChange}
                                defaultValue={formField.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder={`Selecione ${field.name}`} />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {field.options.map((option: string) => (
                                    <SelectItem key={option} value={option}>
                                      {option}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input {...formField} />
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              )}
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  Gerar Documento
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div>
          {/* Placeholder for additional content */}
          <h3 className="font-medium mb-4">Pré-visualização</h3>
          <Card className="h-full">
            <CardContent className="p-6">
              {selectedTemplate ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-blue-600" />
                      <h3 className="font-medium">{form.watch("name") || "Novo Documento"}</h3>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleExportPDF}>
                      <Download className="h-4 w-4 mr-2" />
                      Exportar PDF
                    </Button>
                  </div>
                  <div className="border-t pt-4">
                    <pre className="whitespace-pre-wrap font-sans text-sm">
                      {previewContent || "Preencha os campos para visualizar o documento."}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" aria-hidden="true" />
                  <p>Selecione um modelo para visualizar o documento.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default DocumentTemplateForm;

