import { z } from 'zod';

export const documentSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  type: z.string().min(2, 'Selecione um tipo válido'),
  description: z.string().optional(),
  category: z.string().min(2, 'Categoria obrigatória'),
  status: z.enum(['draft', 'review', 'final', 'archived']),
  clientId: z.string().uuid('Selecione um cliente válido'),
  processId: z.string().uuid('Selecione um processo válido'),
  file: z.instanceof(File, { message: 'Anexo do documento obrigatório' })
});

export type DocumentFormValues = z.infer<typeof documentSchema>;