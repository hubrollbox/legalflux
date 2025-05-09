
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/permissions';

// Define tipos para recursos e ações
export type Resource = 'clients' | 'processes' | 'documents' | 'billing' | 'users' | 'settings';
export type Action = 'view' | 'create' | 'edit' | 'delete';

// Interface para o contexto de permissões
interface PermissionsContextType {
  hasPermission: (resource: Resource, action: Action) => boolean;
  hasRole: (role: UserRole) => boolean;
  isLoading: boolean;
}

// Criar um contexto nulo para permissões
const PermissionsContext = createContext<PermissionsContextType | null>(null);

// Hook para usar o contexto de permissões
export const usePermissions = (): PermissionsContextType => {
  const context = useContext(PermissionsContext);
  const { user } = useAuth();

  // Se o contexto não for fornecido, podemos usar uma implementação padrão
  if (!context) {
    return {
      hasPermission: (resource: Resource, action: Action) => {
        // Implementação básica baseada no papel do usuário
        if (!user) return false;

        // Admin tem todas as permissões
        if (user.role === 'admin') return true;

        // Advogados podem visualizar tudo, mas têm restrições para criar/editar/excluir
        if (user.role === 'lawyer' || user.role === 'senior_lawyer') {
          if (action === 'view') return true;
          if (resource === 'clients' || resource === 'processes' || resource === 'documents') {
            return action !== 'delete';
          }
          if (resource === 'billing') {
            return action === 'view';
          }
          return false;
        }

        // Assistentes têm acesso limitado
        if (user.role === 'assistant') {
          if (action === 'view' && resource !== 'billing' && resource !== 'users' && resource !== 'settings') {
            return true;
          }
          return false;
        }

        // Clientes só podem visualizar seus próprios recursos
        if (user.role === 'client') {
          return action === 'view' && (resource === 'processes' || resource === 'documents');
        }

        return false;
      },

      hasRole: (role: UserRole) => {
        return user?.role === role;
      },

      isLoading: false
    };
  }

  return context;
};
