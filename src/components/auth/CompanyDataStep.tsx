import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const companySchema = z.object({
  companyName: z.string().min(3, 'Nome da empresa obrigatório'),
  companyNIF: z.string().length(9, 'NIF deve ter 9 dígitos'),
  cae: z.string().min(5, 'CAE obrigatório'),
  companyEmail: z.string().email('Email inválido'),
  companyPhone: z.string().min(9, 'Contacto obrigatório'),
  companyAddress: z.string().min(5, 'Morada obrigatória')
});

type Props = {
  initialValues: any;
  onSubmit: (data: any) => void;
};

export default function CompanyDataStep({ initialValues, onSubmit }: Props) {
  const form = useForm({
    resolver: zodResolver(companySchema),
    defaultValues: initialValues
  });

  const handleSubmit = (data: z.infer<typeof companySchema>) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Empresa *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyNIF"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NIF da Empresa *</FormLabel>
              <FormControl>
                <Input {...field} maxLength={9} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cae"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CAE *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Corporativo *</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone/Telemóvel *</FormLabel>
              <FormControl>
                <Input type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Morada da Empresa *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button type="button" variant="ghost">
            Voltar
          </Button>
          <Button type="submit">Finalizar Registro</Button>
        </div>
      </form>
    </Form>
  );
}