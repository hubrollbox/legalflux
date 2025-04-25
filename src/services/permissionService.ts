// Fix import to use local User type if that's what you want
import type { User } from '@/types/auth';
import { useAuth } from '@/hooks/useAuth';
// Removed unused createClient import
import { supabase } from '@/lib/supabase';

// Remove ExtendedUser if not needed, or fix its definition
// If you want to extend Supabase's User, do not override required properties
// If you want to use your own User, just use it directly

export const permissionService = {
  checkDocumentPermission: async (documentPath: string, user: User | null) => {
    if (!user) return false;

    // Use optional chaining and default values to avoid 'possibly undefined'
    const userRole = user.role || 'client';

    // Extract process ID safely
    const processId = documentPath?.split('/')[0] || '';

    // Verify permissions based on role
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
  },

  getUserRole: () => {
    const { user } = useAuth();
    return user?.role || 'client';
  }
};