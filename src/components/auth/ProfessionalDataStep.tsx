import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Checkbox } from '@/components/ui/checkbox';
import type { UserType } from '@/types/auth';

type Props = {
  initialValues: any;
  personalData: any;
  onNext: (data: any) => void;
  onCompanyLink: () => void;
  onBack: () => void;
};

const professionalSchema = z.object({
  numero_cedula: z.string().min(5, 'Número da cédula inválido'),
  email_profissional: z.string().email('Email profissional inválido'),
  morada_profissional: z.string().min(5, 'Morada profissional obrigatória'),
  ordem_id: z.string().min(3, 'Identificação da ordem obrigatória'),
  vinculado_empresa: z.boolean().default(false)
});

export default function ProfessionalDataStep({ initialValues, personalData, onNext, onCompanyLink, onBack }: Props) {
  const form = useForm({
    resolver: zodResolver(professionalSchema),
    defaultValues: {
      numero_cedula: initialValues?.numero_cedula || '',
      email_profissional: personalData?.email || '',
      morada_profissional: initialValues?.morada_profissional || '',
      ordem_id: initialValues?.ordem_id || '',
      vinculado_empresa: initialValues?.vinculado_empresa || false
    },
    context: { email: personalData?.email }
  });

  const onSubmit = (data: z.infer<typeof professionalSchema>) => {
    // Validar que o email profissional é igual ao email pessoal
    if (data.email_profissional !== personalData?.email) {
      form.setError('email_profissional', {
        type: 'manual',
        message: 'Email profissional deve ser igual ao email fornecido anteriormente'
      });
      return;
    }
    
    if (data.vinculado_empresa) {
      onCompanyLink();
    } else {
      onNext(data);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="numero_cedula"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número da Cédula Profissional *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="morada_profissional"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Morada Profissional *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email_profissional"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Profissional *</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormDescription>
                Deve ser igual ao email fornecido anteriormente
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ordem_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Identificação da Ordem *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vinculado_empresa"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Vinculado a uma empresa?</FormLabel>
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Voltar
          </Button>
          <Button type="submit">
            {form.watch('vinculado_empresa') ? 'Próximo' : 'Finalizar Registro'}
          </Button>
        </div>
      </form>
    </Form>
  );
}