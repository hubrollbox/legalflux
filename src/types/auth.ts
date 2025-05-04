
import { UserRole } from "./permissions";

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role?: UserRole;
  organizationId?: string;
  created_at?: string;
  updated_at?: string;
}

export enum UserType {
  CLIENT = 'client',
  LAWYER = 'lawyer',
  ASSISTANT = 'assistant',
  ADMIN = 'admin'
}

export interface AuthResponse {
  user: User | null;
  session: any | null;
  error: Error | null;
}
