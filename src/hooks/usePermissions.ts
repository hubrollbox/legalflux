
import { useAuth } from './useAuth';

type Resource = 'documents' | 'processes' | 'clients' | 'financial' | 'settings' | 'users';
type Action = 'view' | 'create' | 'update' | 'delete' | 'approve';

export function usePermissions() {
  const { user } = useAuth();

  // Função para verificar se um usuário tem permissão para uma ação em um recurso
  const hasPermission = (resource: Resource, action: Action): boolean => {
    // Se não houver usuário logado, não tem permissão
    if (!user || !user.role) return false;

    // Regras de permissão baseadas no papel do usuário
    switch (user.role) {
      case 'admin':
        // Administrador tem todas as permissões
        return true;
      
      case 'senior_lawyer':
        // Advogado sênior tem todas as permissões exceto algumas configurações administrativas
        if (resource === 'settings' && action === 'approve') return false;
        if (resource === 'users' && action === 'delete') return false;
        return true;
      
      case 'lawyer':
        // Advogado tem permissões para documentos, processos, clientes
        if (resource === 'financial' && (action === 'create' || action === 'update')) return false;
        if (resource === 'settings' || resource === 'users') return action === 'view';
        return true;
      
      case 'assistant':
        // Assistente tem permissões limitadas
        if (resource === 'financial') return false;
        if (resource === 'settings' || resource === 'users') return false;
        if (action === 'delete') return false;
        if (resource === 'clients' && action === 'create') return false;
        return true;
      
      case 'client':
        // Cliente só pode ver seus próprios dados
        if (action !== 'view') return false;
        if (resource !== 'documents' && resource !== 'processes') return false;
        return true;
      
      default:
        return false;
    }
  };

  return { hasPermission };
}
