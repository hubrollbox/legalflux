
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
import { useToast } from "@/components/ui/use-toast";
import { User, Permission, RolePermission } from "@/types";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getUserRoleName } from "@/lib/utils";

// Permissões simuladas para cada módulo
const MOCK_PERMISSIONS: Permission[] = [
  // Casos
  { id: "cases-read", name: "Ver Processos", description: "Ver detalhes dos processos", module: "cases", action: "read" },
  { id: "cases-create", name: "Criar Processos", description: "Criar novos processos", module: "cases", action: "create" },
  { id: "cases-update", name: "Editar Processos", description: "Atualizar processos existentes", module: "cases", action: "update" },
  { id: "cases-delete", name: "Eliminar Processos", description: "Eliminar processos", module: "cases", action: "delete" },
  
  // Documentos
  { id: "documents-read", name: "Ver Documentos", description: "Ver documentos", module: "documents", action: "read" },
  { id: "documents-create", name: "Criar Documentos", description: "Carregar novos documentos", module: "documents", action: "create" },
  { id: "documents-update", name: "Editar Documentos", description: "Atualizar documentos", module: "documents", action: "update" },
  { id: "documents-delete", name: "Eliminar Documentos", description: "Eliminar documentos", module: "documents", action: "delete" },
  
  // Tarefas
  { id: "tasks-read", name: "Ver Tarefas", description: "Ver tarefas atribuídas", module: "tasks", action: "read" },
  { id: "tasks-create", name: "Criar Tarefas", description: "Criar novas tarefas", module: "tasks", action: "create" },
  { id: "tasks-update", name: "Editar Tarefas", description: "Atualizar tarefas", module: "tasks", action: "update" },
  { id: "tasks-delete", name: "Eliminar Tarefas", description: "Eliminar tarefas", module: "tasks", action: "delete" },
  
  // Financeiro
  { id: "finance-read", name: "Ver Finanças", description: "Ver dados financeiros", module: "finance", action: "read" },
  { id: "finance-create", name: "Criar Transações", description: "Criar novas transações", module: "finance", action: "create" },
  { id: "finance-update", name: "Editar Transações", description: "Atualizar transações existentes", module: "finance", action: "update" },
  { id: "finance-delete", name: "Eliminar Transações", description: "Eliminar transações", module: "finance", action: "delete" },
  
  // Utilizadores
  { id: "users-read", name: "Ver Utilizadores", description: "Ver utilizadores", module: "users", action: "read" },
  { id: "users-create", name: "Criar Utilizadores", description: "Criar novos utilizadores", module: "users", action: "create" },
  { id: "users-update", name: "Editar Utilizadores", description: "Atualizar utilizadores", module: "users", action: "update" },
  { id: "users-delete", name: "Eliminar Utilizadores", description: "Eliminar utilizadores", module: "users", action: "delete" },
  
  // Configurações
  { id: "settings-read", name: "Ver Configurações", description: "Ver configurações do sistema", module: "settings", action: "read" },
  { id: "settings-update", name: "Editar Configurações", description: "Atualizar configurações do sistema", module: "settings", action: "update" },
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
  admin: MOCK_PERMISSIONS.map(p => p.id)
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
    const defaultPermissions: Record<string, boolean> = {};
    
    // Inicializa todas as permissões como false
    MOCK_PERMISSIONS.forEach(permission => {
      defaultPermissions[permission.id] = false;
    });
    
    // Aplica as permissões padrão com base na função
    const defaultForRole = DEFAULT_ROLE_PERMISSIONS[user.role] || [];
    defaultForRole.forEach(permissionId => {
      defaultPermissions[permissionId] = true;
    });
    
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
  const permissionsByModule: Record<string, Permission[]> = {};
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
            Configurar permissões para {user.name} ({getUserRoleName(user.role)})
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
                          checked={rolePermissions[permission.id]}
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
