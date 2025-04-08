import React, { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Process } from "@/types/process";
import { Client } from "@/types/client";
import { clientService } from "@/services/clientService";
import { processService } from "@/services/processService";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";

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

const DocumentTemplateForm: React.FC<DocumentTemplateFormProps> = ({
  onSubmit,
  isSubmitting = false,
  templates,
}) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [processes, setProcesses] = useState<Process[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [isLoadingClients, setIsLoadingClients] = useState(true);
  const [isLoadingProcesses, setIsLoadingProcesses] = useState(true);
  const [previewContent, setPreviewContent] = useState<string>("");



  // Carregar clientes e processos ao montar o componente
  useEffect(() => {
    const loadData = async () => {
      try {
        const clientsData = await clientService.getClients();
        setClients(clientsData);
        setIsLoadingClients(false);

        const processesData = await processService.getProcesses();
        setProcesses(processesData);
        setIsLoadingProcesses(false);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setIsLoadingClients(false);
        setIsLoadingProcesses(false);
      }
    };

    loadData();
  }, []);

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

  // Atualizar o template selecionado quando o usuário selecionar um template
  const handleTemplateChange = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    setSelectedTemplate(template);

    // Inicializar campos personalizados
    if (template) {
      const initialCustomFields: Record<string, string> = {};
      template.fields.forEach((field) => {
        initialCustomFields[field.key] = "";
      });
      form.setValue("customFields", initialCustomFields);
    }
  };

  // Gerar visualização do documento com os campos preenchidos
  const generatePreview = () => {
    if (!selectedTemplate) return "";

    // Aqui você teria o conteúdo do template com placeholders
    // Por exemplo: "Prezado(a) {{cliente.nome}}, referente ao processo {{processo.numero}}..."
    let content = `Prezado(a) ${form.watch("clientId") ? clients.find(c => c.id === form.watch("clientId"))?.name || "[Cliente]" : "[Cliente]"},

Referente ao processo ${form.watch("processId") ? processes.find(p => p.id === form.watch("processId"))?.number || "[Número do Processo]" : "[Número do Processo]"}

`;

    // Substituir placeholders pelos valores dos campos personalizados
    const customFields = form.watch("customFields");
    Object.entries(customFields).forEach(([key, value]) => {
      content = content.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), value || `[${key}]`);
    });

    return content;
  };

  // Atualizar a visualização quando os campos forem alterados
  useEffect(() => {
    const subscription = form.watch(() => {
      setPreviewContent(generatePreview());
    });
    return () => subscription.unsubscribe();
  }, [form.watch, selectedTemplate]);

  const handleSubmit = (values: DocumentTemplateFormValues) => {
    // Preparar dados para envio
    const formattedData = {
      ...values,
      content: previewContent, // Conteúdo do documento com os placeholders substituídos
    };

    onSubmit(formattedData);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="templateId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modelo <span className="text-red-500">*</span></FormLabel>
                  <Select
                    onValueChange={(value) => {
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
              render={({ field }) => (
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
                render={({ field }) => (
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
                render={({ field }) => (
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
                <h3 className="font-medium">Campos Personalizados</h3>
                {selectedTemplate.fields.map((field) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`customFields.${field.key}`}
                    render={({ field: formField }) => (
                      <FormItem>
                        <FormLabel>
                          {field.name}
                          {field.required && <span className="text-red-500">*</span>}
                        </FormLabel>
                        <FormControl>
                          {field.type === "text" ? (
                            <Input {...formField} />
                          ) : field.type === "textarea" ? (
                            <Textarea {...formField} />
                          ) : field.type === "select" && field.options ? (
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
                                {field.options.map((option) => (
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
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>Selecione um modelo para visualizar o documento.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentTemplateForm;

const handleExportPDF = async () => {
  try {
    const pdfContent = previewContent;
    // Aqui você pode usar uma biblioteca como jsPDF para gerar o PDF
    // Exemplo: const doc = new jsPDF(); doc.text(pdfContent, 10, 10); doc.save('documento.pdf');
    console.log('PDF gerado com sucesso:', pdfContent);
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
  }
};