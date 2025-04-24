import type { User } from '@supabase/supabase-js';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase-client'; // Updated import path

interface ExtendedUser extends User {
  user_metadata?: {
    role?: string;
  };
}

export const permissionService = {
  checkDocumentPermission: async (documentPath: string, user: ExtendedUser | null) => {
    if (!user) return false;
    
    const userRole = user.user_metadata?.role || 'client';
    
    // Extract process ID safely
    const processId = documentPath?.split('/')[0] || '';
    
    // Verify permissions based on role
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
    return (user as ExtendedUser)?.user_metadata?.role || 'client';
  }
};