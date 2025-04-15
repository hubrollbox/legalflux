import { useContext, createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import type { Permission, RolePermission, UserPermission } from "@/types/permissions";
import { UserRole } from "@/types/permissions";

interface PermissionsContextType {
  hasPermission: (module: string, action: 'create' | 'read' | 'update' | 'delete') => boolean;
  isLoading: boolean;
  userPermissions: UserPermission[];
  rolePermissions: RolePermission[];
  permissions: Permission[];
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

// Mock data until connected to backend
const MOCK_PERMISSIONS: Permission[] = [
  { id: "processes", name: "Processos", description: "Gestão de processos jurídicos", module: "processes" },
  { id: "tasks", name: "Tarefas", description: "Gestão de tarefas", module: "tasks" },
  { id: "documents", name: "Documentos", description: "Gestão de documentos", module: "documents" },
  { id: "clients", name: "Clientes", description: "Gestão de clientes", module: "clients" },
  { id: "calendar", name: "Agenda", description: "Gestão de agenda", module: "calendar" },
  { id: "messages", name: "Mensagens", description: "Comunicação", module: "messages" },
  { id: "financial", name: "Financeiro", description: "Gestão financeira", module: "financial" },
  { id: "users", name: "Utilizadores", description: "Gestão de utilizadores", module: "users" },
  { id: "subscriptions", name: "Assinaturas", description: "Gestão de assinaturas", module: "subscriptions" },
  { id: "settings", name: "Configurações", description: "Configurações da plataforma", module: "settings" },
];

const MOCK_ROLE_PERMISSIONS: RolePermission[] = [
  // Admin has full access to everything
  ...MOCK_PERMISSIONS.map(p => ({
    roleId: UserRole.ADMIN,
    permissionId: p.id,
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: true
  })),
  
  // Senior Lawyer permissions
  ...MOCK_PERMISSIONS.map(p => ({
    roleId: UserRole.SENIOR_LAWYER,
    permissionId: p.id,
    canCreate: true,
    canRead: true,
    canUpdate: true,
    canDelete: p.id !== 'users' && p.id !== 'subscriptions'
  })),
  
  // Lawyer permissions
  ...MOCK_PERMISSIONS.map(p => ({
    roleId: UserRole.LAWYER,
    permissionId: p.id,
    canCreate: !['users', 'subscriptions'].includes(p.id),
    canRead: true,
    canUpdate: !['users', 'subscriptions'].includes(p.id),
    canDelete: !['users', 'subscriptions', 'clients'].includes(p.id)
  })),
  
  // Assistant permissions
  ...MOCK_PERMISSIONS.map(p => ({
    roleId: UserRole.ASSISTANT,
    permissionId: p.id,
    canCreate: ['tasks', 'documents', 'calendar', 'messages'].includes(p.id),
    canRead: !['financial', 'users', 'subscriptions'].includes(p.id),
    canUpdate: ['tasks', 'documents', 'calendar', 'messages'].includes(p.id),
    canDelete: false
  })),
  
  // Client permissions
  ...MOCK_PERMISSIONS.map(p => ({
    roleId: UserRole.CLIENT,
    permissionId: p.id,
    canCreate: ['messages'].includes(p.id),
    canRead: ['processes', 'documents', 'calendar', 'messages', 'financial'].includes(p.id),
    canUpdate: false,
    canDelete: false
  })),
];

export const PermissionsProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [rolePermissions, setRolePermissions] = useState<RolePermission[]>([]);
  const [userPermissions, setUserPermissions] = useState<UserPermission[]>([]);

  useEffect(() => {
    // In a real implementation, we would fetch these from an API
    setPermissions(MOCK_PERMISSIONS);
    setRolePermissions(MOCK_ROLE_PERMISSIONS);
    setUserPermissions([]); // Add user-specific permissions if needed
    setIsLoading(false);
  }, [user]);

  const hasPermission = (module: string, action: 'create' | 'read' | 'update' | 'delete') => {
    if (!user || isLoading) return false;

    // Check user-specific permissions first (overrides role permissions)
    const userPermission = userPermissions.find(
      p => p.userId === user.id && p.permissionId === module
    );

    if (userPermission) {
      switch (action) {
        case 'create': return userPermission.canCreate;
        case 'read': return userPermission.canRead;
        case 'update': return userPermission.canUpdate;
        case 'delete': return userPermission.canDelete;
      }
    }

    // Check role-based permissions
    const rolePermission = rolePermissions.find(
      p => p.roleId === user.role && p.permissionId === module
    );

    if (rolePermission) {
      switch (action) {
        case 'create': return rolePermission.canCreate;
        case 'read': return rolePermission.canRead;
        case 'update': return rolePermission.canUpdate;
        case 'delete': return rolePermission.canDelete;
      }
    }

    return false;
  };

  return (
    <PermissionsContext.Provider
      value={{
        hasPermission,
        isLoading,
        permissions,
        rolePermissions,
        userPermissions
      }}
    >
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = () => {
  const context = useContext(PermissionsContext);
  if (context === undefined) {
    throw new Error("usePermissions must be used within a PermissionsProvider");
  }
  return context;
};
