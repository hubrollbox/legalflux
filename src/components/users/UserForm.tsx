import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Create and export the schema
export const userFormSchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Email inválido.",
  }),
  role: z.string().optional(),
});

export type UserFormValues = z.infer<typeof userFormSchema>;

// Basic User Form component
const UserForm = () => {
  return (
    <div>
      {/* Form implementation will go here */}
    </div>
  );
};

export default UserForm;
