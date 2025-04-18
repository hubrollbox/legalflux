
import React from "react";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { UseFormReturn } from "react-hook-form";
import * as z from "zod";

export const userFormSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  name: z.string().min(1, "Nome é obrigatório"),
  role: z.enum(["CLIENT", "LAWYER", "SENIOR_LAWYER", "ASSISTANT", "ADMIN"] as const),
  isActive: z.boolean().default(true),
  organizationId: z.string().optional(),
  phone: z.string().optional(),
  hasTwoFactorEnabled: z.boolean().default(false),
});

type UserFormValues = z.infer<typeof userFormSchema>;

interface UserFormProps {
  form: UseFormReturn<UserFormValues>;
  onSubmit: (data: UserFormValues) => void;
  onCancel: () => void;
  submitLabel: string;
}

const UserForm = ({ form, onSubmit, onCancel, submitLabel }: UserFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="email@exemplo.com" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Função</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma função" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="client">Cliente</SelectItem>
                  <SelectItem value="lawyer">Advogado</SelectItem>
                  <SelectItem value="senior_lawyer">Advogado Sênior</SelectItem>
                  <SelectItem value="assistant">Assistente</SelectItem>
                  <SelectItem value="ADMIN">Administrador</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                A função determina quais permissões o utilizador terá no sistema.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input placeholder="+351 123 456 789" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Ativo</FormLabel>
                  <FormDescription>
                    Utilizadores inativos não podem aceder ao sistema.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hasTwoFactorEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>2FA</FormLabel>
                  <FormDescription>
                    Autenticação de dois fatores.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end space-x-2 pt-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button type="submit">{submitLabel}</Button>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;
export type { UserFormValues };
