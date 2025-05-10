
import { useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { User, UserRole } from "@/types/auth";
import { DEFAULT_PERMISSIONS } from "@/types/permissions";

export const usePermissions = () => {
  const { user } = useAuth();

  const hasPermission = useCallback((permission: string): boolean => {
    // Se não há usuário autenticado, não tem permissão
    if (!user) return false;
    
    // Se for admin, tem todas as permissões
    if (user.role === "admin") return true;
    
    // Se a permissão solicitada é complexa (com curingas)
    if (permission.includes("*")) {
      const permPrefix = permission.replace("*", "");
      const userPerms = getUserPermissions(user);
      return userPerms.some(p => p.startsWith(permPrefix));
    }
    
    // Verificação direta da permissão
    const userPerms = getUserPermissions(user);
    return userPerms.includes(permission);
  }, [user]);

  const getUserPermissions = (user: User): string[] => {
    if (!user.role) return [];
    
    // Recupera as permissões padrão com base na role
    const rolePermissions: Record<string, string[]> = {};
    
    Object.keys(DEFAULT_PERMISSIONS).forEach(role => {
      rolePermissions[role] = DEFAULT_PERMISSIONS[role as UserRole];
    });

    return user.role ? (rolePermissions[user.role] || []) : [];
  };
  
  return { hasPermission };
};

export default usePermissions;
