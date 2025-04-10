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
import { Checkbox } from '@/components/ui/checkbox';

type Props = {
  initialValues: any;
  onNext: (data: any) => void;
  onCompanyLink: () => void;
};

const professionalSchema = z.object({
  licenseNumber: z.string().min(5, 'Número da cédula inválido'),
  professionalEmail: z.string().email('Email profissional inválido')
    .refine(email => email === z.object({}).parse({}).email, {
      message: 'Email profissional deve ser igual ao email principal'
    }),
  workAddress: z.string().min(5, 'Morada profissional obrigatória'),
  orderId: z.string().min(3, 'Identificação da ordem obrigatória'),
  hasCompany: z.boolean().default(false)
});

export default function ProfessionalDataStep({ initialValues, onNext, onCompanyLink }: Props) {
  const form = useForm({
    resolver: zodResolver(professionalSchema),
    defaultValues: {
      ...initialValues,
      hasCompany: false
    }
  });

  const onSubmit = (data: z.infer<typeof professionalSchema>) => {
    if (data.hasCompany) {
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
          name="licenseNumber"
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
          name="workAddress"
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
          name="professionalEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Profissional *</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="orderId"
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
          name="hasCompany"
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
          <Button type="button" variant="ghost" onClick={() => onNext({})}>
            Voltar
          </Button>
          <Button type="submit">
            {form.watch('hasCompany') ? 'Próximo' : 'Finalizar Registro'}
          </Button>
        </div>
      </form>
    </Form>
  );
}