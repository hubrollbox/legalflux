import type { User } from "../types/auth";
import { supabase } from "../lib/supabase-client";
import { useAuth } from "../contexts/AuthContext";

// useAuth é importado diretamente do AuthContext

export const permissionService = {
  checkDocumentPermission: async (documentPath: string, user: User | null) => {
    if (!user) return false;

    const userRole = user.role || 'client';
    const processId = documentPath?.split('/')[0] || '';

    switch (userRole) {
      case 'admin':
        return true;
      case 'lawyer':
        return await permissionService.verifyLawyerAccess(processId, user.id);
      case 'client':
        return await permissionService.verifyClientAccess(processId, user.id);
      default:
        return false;
    }
  },

  verifyLawyerAccess: async (processId: string | undefined, userId: string | undefined) => {
    if (!processId || !userId) return false;

    const { data, error } = await supabase
      .from('process_lawyers')
      .select()
      .eq('process_id', processId)
      .eq('lawyer_id', userId);

    return !error && !!data?.length;
  },

  verifyClientAccess: async (processId: string | undefined, userId: string | undefined) => {
    if (!processId || !userId) return false;

    const { data, error } = await supabase
      .from('processes')
      .select('client_id')
      .eq('id', processId)
      .single();

    return !error && data?.client_id === userId;
  }
};

export const useUserRole = () => {
  const { user } = useAuth();
  return user?.role || 'client';
};