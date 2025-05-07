
export enum UserType {
  CLIENT = 'client',
  LAWYER = 'lawyer',
  ASSISTANT = 'assistant',
  ADMIN = 'admin',
  SENIOR_LAWYER = 'senior_lawyer'
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
  session: any | null;
  error: Error | null | string;
  isLoading: boolean;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (code: string, password: string) => Promise<void>;
  checkEmailExists: (email: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signup: (email: string, password: string, userInfo: any) => Promise<void>;
  signUp: (userData: any) => Promise<void>;
  getRedirectPath: () => string;
}
