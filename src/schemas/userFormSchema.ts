import { z } from "zod";

export const userFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  role: z.enum(["client", "lawyer", "senior_lawyer", "assistant", "ADMIN"]),
  phone: z.string().min(1, { message: "Phone number is required" }),
  isActive: z.boolean().default(true),
  hasTwoFactorEnabled: z.boolean().default(false)
});

export type UserFormValues = z.infer<typeof userFormSchema>;