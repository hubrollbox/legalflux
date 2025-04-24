import * as z from "zod";

export const documentTemplateFormSchema = z.object({
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

export type DocumentTemplateFormValues = z.infer<typeof documentTemplateFormSchema>;

export interface DocumentTemplateFormProps {
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