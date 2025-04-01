
import React from "react";
import { User } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import UserForm, { userFormSchema, UserFormValues } from "./UserForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UserPermissionsDialog from "./UserPermissionsDialog";

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddUser: (data: UserFormValues) => void;
}

export const AddUserDialog = ({ open, onOpenChange, onAddUser }: AddUserDialogProps) => {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: "",
      name: "",
      role: "client",
      isActive: true,
      hasTwoFactorEnabled: false,
    },
  });
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Utilizador</DialogTitle>
          <DialogDescription>
            Preencha os detalhes para adicionar um novo utilizador ao sistema.
          </DialogDescription>
        </DialogHeader>
        <UserForm 
          form={form} 
          onSubmit={onAddUser} 
          onCancel={() => onOpenChange(false)} 
          submitLabel="Adicionar"
        />
      </DialogContent>
    </Dialog>
  );
};

interface EditUserDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditUser: (data: UserFormValues) => void;
}

export const EditUserDialog = ({ 
  user, 
  open, 
  onOpenChange, 
  onEditUser 
}: EditUserDialogProps) => {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: user?.email || "",
      name: user?.name || "",
      role: user?.role || "client",
      isActive: user?.isActive !== undefined ? user.isActive : true,
      hasTwoFactorEnabled: user?.hasTwoFactorEnabled || false,
      organizationId: user?.organizationId,
      phone: user?.phone,
    },
  });

  React.useEffect(() => {
    if (user) {
      form.reset({
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.isActive,
        hasTwoFactorEnabled: user.hasTwoFactorEnabled,
        organizationId: user.organizationId,
        phone: user.phone,
      });
    }
  }, [user, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Utilizador</DialogTitle>
          <DialogDescription>
            Atualize os detalhes do utilizador.
          </DialogDescription>
        </DialogHeader>
        <UserForm 
          form={form} 
          onSubmit={onEditUser} 
          onCancel={() => onOpenChange(false)} 
          submitLabel="Atualizar"
        />
      </DialogContent>
    </Dialog>
  );
};

interface DeleteUserDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleteUser: () => void;
}

export const DeleteUserDialog = ({ 
  user, 
  open, 
  onOpenChange, 
  onDeleteUser 
}: DeleteUserDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmar Eliminação</DialogTitle>
          <DialogDescription>
            Tem a certeza que deseja eliminar o utilizador{" "}
            <span className="font-medium">{user?.name}</span>? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button 
            variant="destructive" 
            onClick={onDeleteUser}
          >
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface UserPermissionsDialogWrapperProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UserPermissionsDialogWrapper = ({ 
  user, 
  open, 
  onOpenChange 
}: UserPermissionsDialogWrapperProps) => {
  if (!user) return null;
  
  return (
    <UserPermissionsDialog
      user={user}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
};
