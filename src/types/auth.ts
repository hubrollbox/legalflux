
export type UserRole = 'client' | 'admin' | 'lawyer' | 'senior_lawyer' | 'assistant';

export const UserRoles = {
  CLIENT: 'client' as UserRole,
  ADMIN: 'admin' as UserRole,
  LAWYER: 'lawyer' as UserRole,
  SENIOR_LAWYER: 'senior_lawyer' as UserRole,
  ASSISTANT: 'assistant' as UserRole
};

export type UserType = 'particular' | 'professional' | 'company';

export const UserTypes = {
  PARTICULAR: 'particular' as UserType,
  PROFESSIONAL: 'professional' as UserType,
  COMPANY: 'company' as UserType,
  CLIENT: 'particular' as UserType // Adding CLIENT as an alias for PARTICULAR for backward compatibility
};

export interface User {
  id: string;
  name: string;
  email: string | undefined;
  role?: UserRole;
  avatar?: string;
  organizationId?: string;
  userType?: UserType;
  isActive?: boolean;
  hasTwoFactorEnabled?: boolean;
  createdAt?: string | Date;
  phone?: string;
}

export interface Auth {
  user: User | null;
  session: any | null;
  error: Error | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  register: (email: string, password: string, name?: string) => Promise<any>;
  checkEmailExists?: (email: string) => Promise<boolean>;
}
