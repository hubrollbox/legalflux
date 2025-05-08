
// Define os possíveis papéis de usuário no sistema
export enum UserRole {
  ADMIN = 'admin',
  SENIOR_LAWYER = 'senior_lawyer',
  LAWYER = 'lawyer',
  ASSISTANT = 'assistant',
  CLIENT = 'client'
}

// Define as permissões que podem ser concedidas
export type Permission = {
  resource: string;
  action: string;
};

// Define o mapeamento de papéis para permissões
export interface RolePermissions {
  [key: string]: Permission[];
}
