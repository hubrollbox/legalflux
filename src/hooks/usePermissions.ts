
import { create } from 'zustand';
import { UserRole, UserRoles } from '@/types/permissions';

interface PermissionsState {
  userRole: UserRole | null;
  userPermissions: string[];
  isLoading: boolean;
  hasRole: (role: UserRole) => boolean;
  hasPermission: (resource: string, action: string) => boolean;
}

export const usePermissions = create<PermissionsState>((set, get) => ({
  userRole: null,
  userPermissions: [],
  isLoading: true,

  hasRole: (role: UserRole) => {
    const state = get();
    return state.userRole === role;
  },

  hasPermission: (resource: string, action: string) => {
    const state = get();
    
    // Se for administrador, tem todas as permissões
    if (state.userRole === UserRoles.ADMIN) {
      return true;
    }

    // Verificar permissão específica
    const permissionKey = `${resource}:${action}`;
    return state.userPermissions.includes(permissionKey);
  },
}));

// Exemplo de função para inicializar permissões com base no papel do utilizador
export const initializePermissions = (role: UserRole) => {
  const permissionsMap: Record<UserRole, string[]> = {
    [UserRoles.ADMIN]: ['*:*'], // Todas as permissões
    [UserRoles.LAWYER]: [
      'cases:view', 'cases:create', 'cases:edit',
      'documents:view', 'documents:create', 'documents:edit',
      'clients:view'
    ],
    [UserRoles.SENIOR_LAWYER]: [
      'cases:view', 'cases:create', 'cases:edit', 'cases:delete',
      'documents:view', 'documents:create', 'documents:edit', 'documents:delete',
      'clients:view', 'clients:create', 'clients:edit',
      'lawyers:view'
    ],
    [UserRoles.ASSISTANT]: [
      'cases:view',
      'documents:view', 'documents:create',
      'clients:view'
    ],
    [UserRoles.CLIENT]: [
      'cases:view',
      'documents:view'
    ]
  };

  // Atualizar o estado do hook
  usePermissions.setState({
    userRole: role,
    userPermissions: permissionsMap[role] || [],
    isLoading: false
  });
};
