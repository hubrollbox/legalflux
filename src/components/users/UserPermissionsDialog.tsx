
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/types/auth";
import { Permission } from "@/types/permissions";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getUserRoleName } from "@/lib/utils";

// Tipo complexo de permissão para o mock
interface ExtendedPermission {
  id: string;
  resource: string;
  action: string;
  name: string;
  description: string;
  module: string;
}

// Permissões simuladas para cada módulo
const MOCK_PERMISSIONS: ExtendedPermission[] = [
  // Casos
  { id: "cases-read", resource: "cases", action: "read", name: "Ver Processos", description: "Ver detalhes dos processos", module: "cases" },
  { id: "cases-create", resource: "cases", action: "create", name: "Criar Processos", description: "Criar novos processos", module: "cases" },
  { id: "cases-update", resource: "cases", action: "update", name: "Editar Processos", description: "Atualizar processos existentes", module: "cases" },
  { id: "cases-delete", resource: "cases", action: "delete", name: "Eliminar Processos", description: "Eliminar processos", module: "cases" },
  
  // Documentos
  { id: "documents-read", resource: "documents", action: "read", name: "Ver Documentos", description: "Ver documentos", module: "documents" },
  { id: "documents-create", resource: "documents", action: "create", name: "Criar Documentos", description: "Carregar novos documentos", module: "documents" },
  { id: "documents-update", resource: "documents", action: "update", name: "Editar Documentos", description: "Atualizar documentos", module: "documents" },
  { id: "documents-delete", resource: "documents", action: "delete", name: "Eliminar Documentos", description: "Eliminar documentos", module: "documents" },
  
  // Tarefas
  { id: "tasks-read", resource: "tasks", action: "read", name: "Ver Tarefas", description: "Ver tarefas atribuídas", module: "tasks" },
  { id: "tasks-create", resource: "tasks", action: "create", name: "Criar Tarefas", description: "Criar novas tarefas", module: "tasks" },
  { id: "tasks-update", resource: "tasks", action: "update", name: "Editar Tarefas", description: "Atualizar tarefas", module: "tasks" },
  { id: "tasks-delete", resource: "tasks", action: "delete", name: "Eliminar Tarefas", description: "Eliminar tarefas", module: "tasks" },
  
  // Financeiro
  { id: "finance-read", resource: "finance", action: "read", name: "Ver Finanças", description: "Ver dados financeiros", module: "finance" },
  { id: "finance-create", resource: "finance", action: "create", name: "Criar Transações", description: "Criar novas transações", module: "finance" },
  { id: "finance-update", resource: "finance", action: "update", name: "Editar Transações", description: "Atualizar transações existentes", module: "finance" },
  { id: "finance-delete", resource: "finance", action: "delete", name: "Eliminar Transações", description: "Eliminar transações", module: "finance" },
  
  // Utilizadores
  { id: "users-read", resource: "users", action: "read", name: "Ver Utilizadores", description: "Ver utilizadores", module: "users" },
  { id: "users-create", resource: "users", action: "create", name: "Criar Utilizadores", description: "Criar novos utilizadores", module: "users" },
  { id: "users-update", resource: "users", action: "update", name: "Editar Utilizadores", description: "Atualizar utilizadores", module: "users" },
  { id: "users-delete", resource: "users", action: "delete", name: "Eliminar Utilizadores", description: "Eliminar utilizadores", module: "users" },
  
  // Configurações
  { id: "settings-read", resource: "settings", action: "read", name: "Ver Configurações", description: "Ver configurações do sistema", module: "settings" },
  { id: "settings-update", resource: "settings", action: "update", name: "Editar Configurações", description: "Atualizar configurações do sistema", module: "settings" },
];

// Mapeamento de permissões padrão para cada função
const DEFAULT_ROLE_PERMISSIONS: Record<string, string[]> = {
  client: [
    "cases-read",
    "documents-read",
    "tasks-read",
    "finance-read"
  ],
  lawyer: [
    "cases-read", "cases-create", "cases-update",
    "documents-read", "documents-create", "documents-update",
    "tasks-read", "tasks-create", "tasks-update", "tasks-delete",
    "finance-read"
  ],
  senior_lawyer: [
    "cases-read", "cases-create", "cases-update", "cases-delete",
    "documents-read", "documents-create", "documents-update", "documents-delete",
    "tasks-read", "tasks-create", "tasks-update", "tasks-delete",
    "finance-read", "finance-create", "finance-update",
    "users-read", "users-create", "users-update"
  ],
  assistant: [
    "cases-read",
    "documents-read", "documents-create", "documents-update",
    "tasks-read", "tasks-create", "tasks-update"
  ],
  ADMIN: MOCK_PERMISSIONS.map(p => p.id)
};

interface UserPermissionsDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserPermissionsDialog: React.FC<UserPermissionsDialogProps> = ({
  user,
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();
  const [rolePermissions, setRolePermissions] = useState<Record<string, boolean>>({});
  
  // Inicializa permissões com base na função do utilizador
  useEffect(() => {
    if (!user || !user.role) return;

    const defaultPermissions: Record<string, boolean> = {};
    
    // Inicializa todas as permissões como false
    MOCK_PERMISSIONS.forEach(permission => {
      defaultPermissions[permission.id] = false;
    });
    
    // Aplica as permissões padrão com base na função
    if (user.role && DEFAULT_ROLE_PERMISSIONS[user.role]) {
      const defaultForRole = DEFAULT_ROLE_PERMISSIONS[user.role];
      if (defaultForRole) {
        defaultForRole.forEach(permissionId => {
          defaultPermissions[permissionId] = true;
        });
      }
    }
    
    setRolePermissions(defaultPermissions);
  }, [user]);
  
  const handleSavePermissions = () => {
    // Aqui seria enviado para a API
    toast({
      title: "Permissões atualizadas",
      description: `As permissões para ${user.name} foram atualizadas com sucesso.`
    });
    onOpenChange(false);
  };
  
  // Agrupar permissões por módulo
  const permissionsByModule: Record<string, ExtendedPermission[]> = {};
  MOCK_PERMISSIONS.forEach(permission => {
    if (!permissionsByModule[permission.module]) {
      permissionsByModule[permission.module] = [];
    }
    permissionsByModule[permission.module].push(permission);
  });
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Gerir Permissões</DialogTitle>
          <DialogDescription>
            Configurar permissões para {user.name} ({getUserRoleName(user.role || '')})
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-4 max-h-[60vh] overflow-y-auto pr-2">
          <Accordion type="multiple" className="w-full">
            {Object.entries(permissionsByModule).map(([module, permissions]) => (
              <AccordionItem key={module} value={module}>
                <AccordionTrigger className="capitalize">
                  {module === "cases" ? "Processos" : 
                   module === "documents" ? "Documentos" : 
                   module === "tasks" ? "Tarefas" : 
                   module === "finance" ? "Financeiro" :
                   module === "users" ? "Utilizadores" : 
                   module === "settings" ? "Configurações" : module}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    {permissions.map(permission => (
                      <div key={permission.id} className="flex items-start space-x-2">
                        <Checkbox
                          id={permission.id}
                          checked={rolePermissions[permission.id] || false}
                          onCheckedChange={(checked) => {
                            setRolePermissions({
                              ...rolePermissions,
                              [permission.id]: !!checked
                            });
                          }}
                        />
                        <div className="grid gap-1.5">
                          <Label htmlFor={permission.id}>{permission.name}</Label>
                          <p className="text-sm text-muted-foreground">
                            {permission.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSavePermissions}
          >
            Guardar Permissões
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserPermissionsDialog;
