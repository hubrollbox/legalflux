
import React, { ReactNode } from 'react';
import { usePermissions } from '../../hooks/usePermissions';
import { UserRole } from '../../types/permissions';

interface RoleBasedAccessProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  allowedPermissions?: string[];
  fallback?: ReactNode | null;
}

/**
 * Component to restrict access based on user role or permission
 */
const RoleBasedAccess: React.FC<RoleBasedAccessProps> = ({
  children,
  allowedRoles,
  allowedPermissions,
  fallback = null
}) => {
  const { hasRole, isLoading, hasPermission } = usePermissions();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  // Verificar se o utilizador tem um dos papéis permitidos
  if (allowedRoles && allowedRoles.length > 0) {
    const hasAllowedRole = allowedRoles.some(role => hasRole(role));
    if (!hasAllowedRole) {
      return <>{fallback}</>;
    }
  }

  // Verificar se o utilizador tem todas as permissões requeridas
  if (allowedPermissions && allowedPermissions.length > 0) {
    const hasAllPermissions = allowedPermissions.every(permission => {
      const [resource, action] = permission.split(':');
      return hasPermission(resource as any, action as any);
    });
    
    if (!hasAllPermissions) {
      return <>{fallback}</>;
    }
  }

  return <>{children}</>;
};

export default RoleBasedAccess;
