
import { z } from "zod";

export const userFormSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("Email inválido"),
  role: z.enum(["client", "lawyer", "senior_lawyer", "assistant", "ADMIN"]),
  isActive: z.boolean().default(true),
  hasTwoFactorEnabled: z.boolean().default(false),
  phone: z.string().optional(),
  organizationId: z.string().optional(),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
