import { User } from '@supabase/supabase-js';
import { useAuth } from '@/hooks/useAuth';

export const permissionService = {
  checkDocumentPermission: async (documentPath: string, user: User | null) => {
    if (!user) return false;
    
    // Obter role do usuário a partir de metadados
    const userRole = user?.user_metadata?.role || 'client';
    
    // Extrair ID do processo do caminho do documento
    const processId = documentPath.split('/')[0];
    
    // Verificar permissões baseadas na role
    switch(userRole) {
      case 'admin':
        return true;
      case 'lawyer':
        return await this.verifyLawyerAccess(processId, user.id);
      case 'client':
        return await this.verifyClientAccess(processId, user.id);
      default:
        return false;
    }
  },

  verifyLawyerAccess: async (processId: string, userId: string) => {
    // Consultar associação do advogado ao processo
    const { data } = await supabase
      .from('process_lawyers')
      .select()
      .eq('process_id', processId)
      .eq('lawyer_id', userId);

    return !!data?.length;
  },

  verifyClientAccess: async (processId: string, userId: string) => {
    // Verificar se o processo pertence ao cliente
    const { data } = await supabase
      .from('processes')
      .select('client_id')
      .eq('id', processId)
      .single();

    return data?.client_id === userId;
  },

  getUserRole: () => {
    const { user } = useAuth();
    return user?.user_metadata?.role || 'client';
  }
};