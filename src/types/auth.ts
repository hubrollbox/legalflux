
export interface User {
  id: string;
  email?: string;
  name?: string;
  role: string;
}

export type UserType = "client" | "lawyer" | "senior_lawyer" | "assistant" | "admin";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
