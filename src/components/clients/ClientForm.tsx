import React, { useEffect } from "react";
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
import type { Client, ClientStatus, CreateClientDTO, UpdateClientDTO } from "@/types/client";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Schema de validação para o formulário de cliente
const clientFormSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  nif: z.string().min(9, { message: "O Tax ID deve ter 9 dígitos" }).max(9),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(9, { message: "Telefone inválido" }),
  address: z.string().min(5, { message: "Morada deve ter pelo menos 5 caracteres" }),
  notes: z.string().optional(),
  status: z.enum(["active", "inactive", "prospect"]).default("active"),
});

type ClientFormValues = z.infer<typeof clientFormSchema>;

interface ClientFormProps {
  initialData?: Client;
  onSubmit: (data: CreateClientDTO | UpdateClientDTO) => void;
  isSubmitting?: boolean;
}

const ClientForm: React.FC<ClientFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting = false,
}) => {
  const { toast } = useToast();
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: initialData || {
      name: "",
      nif: "",
      email: "",
      phone: "",
      address: "",
      notes: "",
      status: "active" as ClientStatus,
    },
  });
  
  // Verificar autenticação ao montar o componente
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        toast({
          variant: "destructive",
          title: "Não autenticado",
          description: "Você precisa estar logado para gerenciar clientes.",
        });
      }
    };
    
    checkAuth();
  }, [toast]);

  const handleSubmit = async (values: ClientFormValues) => {
    try {
      // Validação adicional do NIF (apenas números)
      if (!/^\d{9}$/.test(values.nif)) {
        form.setError("nif", { 
          type: "manual", 
          message: "O NIF deve conter exatamente 9 dígitos numéricos" 
        });
        return;
      }
      
      // Validação adicional do telefone (formato português)
      if (!/^(\+351)?[9][1236]\d{7}$/.test(values.phone.replace(/\s/g, ''))) {
        form.setError("phone", { 
          type: "manual", 
          message: "Formato de telefone inválido. Use o formato português (ex: +351 912345678)" 
        });
        return;
      }
      
      onSubmit(values);
    } catch (error: any) {
      console.error("Erro ao processar formulário:", error);
      toast({
        variant: "destructive",
        title: "Erro no formulário",
        description: error.message || "Ocorreu um erro ao processar o formulário.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Nome do cliente" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nif"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIF <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Número de Identificação Fiscal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email@exemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Telefone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Morada <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Morada completa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                  <SelectItem value="prospect">Potencial</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tax ID <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Tax ID" {...field} name="taxId" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => form.reset()}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {initialData ? "Atualizando..." : "Criando..."}
              </>
            ) : (
              <>{initialData ? "Atualizar" : "Criar"} Cliente</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ClientForm;