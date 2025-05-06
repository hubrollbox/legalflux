
export enum UserType {
  CLIENT = 'client',
  LAWYER = 'lawyer',
  ASSISTANT = 'assistant',
  ADMIN = 'admin'
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  organizationId?: string;
}

export interface AuthContextType {
  user: User | null;
  signup: (email: string, password: string, userInfo: any) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
