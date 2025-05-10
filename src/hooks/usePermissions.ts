
import { useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/types/auth";
import { DEFAULT_PERMISSIONS } from "@/types/permissions";

// Define a minimal User interface for internal use that matches what we need
interface InternalUser {
  role?: string;
}

export const usePermissions = () => {
  const { user } = useAuth();
  
  // Add isLoading property that RoleBasedAccess component expects
  const isLoading = false;

  const hasPermission = useCallback((permission: string): boolean => {
    // Se não há usuário autenticado, não tem permissão
    if (!user) return false;
    
    // Se for admin, tem todas as permissões
    if (user.role === "admin") return true;
    
    // Se a permissão solicitada é complexa (com curingas)
    if (permission.includes("*")) {
      const permPrefix = permission.replace("*", "");
      const userPerms = getUserPermissions(user as InternalUser);
      return userPerms.some(p => p.startsWith(permPrefix));
    }
    
    // Verificação direta da permissão
    const userPerms = getUserPermissions(user as InternalUser);
    return userPerms.includes(permission);
  }, [user]);

  const getUserPermissions = (user: InternalUser): string[] => {
    if (!user.role) return [];
    
    // Recupera as permissões padrão com base na role
    const rolePermissions: Record<string, string[]> = {};
    
    Object.keys(DEFAULT_PERMISSIONS).forEach(role => {
      rolePermissions[role] = DEFAULT_PERMISSIONS[role as UserRole];
    });

    return user.role ? (rolePermissions[user.role as UserRole] || []) : [];
  };
  
  // Add hasRole function that RoleBasedAccess component expects
  const hasRole = useCallback((role: UserRole): boolean => {
    if (!user || !user.role) return false;
    return user.role === role;
  }, [user]);
  
  return { hasPermission, hasRole, isLoading };
};

export default usePermissions;
