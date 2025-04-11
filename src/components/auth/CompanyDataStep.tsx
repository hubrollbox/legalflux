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
import { UserType } from '@/types/auth';

const companySchema = z.object({
  nome: z.string().min(3, 'Nome da empresa obrigatório'),
  nif: z.string().length(9, 'NIF deve ter 9 dígitos'),
  cae: z.string().min(5, 'CAE obrigatório'),
  email: z.string().email('Email inválido'),
  telefone: z.string().min(9, 'Contacto obrigatório'),
  morada: z.string().min(5, 'Morada obrigatória')
});

type Props = {
  initialValues: any;
  onSubmit: (data: any) => void;
  onBack: () => void;
  isFromProfessional?: boolean;
};

export default function CompanyDataStep({ initialValues, onSubmit, onBack, isFromProfessional = false }: Props) {
  const form = useForm({
    resolver: zodResolver(companySchema),
    defaultValues: {
      nome: initialValues?.nome || '',
      nif: initialValues?.nif || '',
      cae: initialValues?.cae || '',
      email: initialValues?.email || '',
      telefone: initialValues?.telefone || '',
      morada: initialValues?.morada || ''
    }
  });

  const handleSubmit = (data: z.infer<typeof companySchema>) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="nome"
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
          name="nif"
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
          name="email"
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
          name="telefone"
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
          name="morada"
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
          <Button type="button" variant="outline" onClick={onBack}>
            Voltar
          </Button>
          <Button type="submit">
            {isFromProfessional ? 'Finalizar Registro' : 'Registrar Empresa'}
          </Button>
        </div>
      </form>
    </Form>
  );
}