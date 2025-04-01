
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/types";
import { UserPlus, Search } from "lucide-react";
import { MOCK_USERS } from "@/services/mockData";
import UsersTable from "@/components/users/UsersTable";
import { 
  AddUserDialog, 
  EditUserDialog, 
  DeleteUserDialog, 
  UserPermissionsDialogWrapper 
} from "@/components/users/UserDialogs";
import { UserFormValues } from "@/components/users/UserForm";

const Users = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Verificar permissões do utilizador atual
  if (user?.role !== "admin" && user?.role !== "senior_lawyer") {
    navigate("/dashboard");
    toast({
      title: "Acesso Negado",
      description: "Não tem permissões para aceder a esta página.",
      variant: "destructive",
    });
    return null;
  }

  // Filtrar utilizadores com base no termo de pesquisa
  const filteredUsers = users.filter((u) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      u.name.toLowerCase().includes(searchLower) ||
      u.email.toLowerCase().includes(searchLower)
    );
  });

  const handleAddUser = (data: UserFormValues) => {
    // Verificar se o email já existe
    if (users.some((u) => u.email === data.email)) {
      toast({
        title: "Erro",
        description: "Já existe um utilizador com este email.",
        variant: "destructive",
      });
      return;
    }

    const newUser: User = {
      id: String(Math.floor(Math.random() * 10000)),
      email: data.email,
      name: data.name,
      role: data.role,
      isActive: data.isActive,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      hasTwoFactorEnabled: data.hasTwoFactorEnabled,
      organizationId: data.organizationId,
      phone: data.phone,
    };

    setUsers([...users, newUser]);
    setIsAddUserDialogOpen(false);
    toast({
      title: "Utilizador adicionado",
      description: `${newUser.name} foi adicionado com sucesso.`,
    });
  };

  const handleEditUser = (data: UserFormValues) => {
    if (!selectedUser) return;

    // Verificar se o email já existe e não é do utilizador selecionado
    if (users.some((u) => u.email === data.email && u.id !== selectedUser.id)) {
      toast({
        title: "Erro",
        description: "Já existe um utilizador com este email.",
        variant: "destructive",
      });
      return;
    }

    const updatedUsers = users.map((u) =>
      u.id === selectedUser.id
        ? {
            ...u,
            email: data.email,
            name: data.name,
            role: data.role,
            isActive: data.isActive,
            hasTwoFactorEnabled: data.hasTwoFactorEnabled,
            organizationId: data.organizationId,
            phone: data.phone,
          }
        : u
    );

    setUsers(updatedUsers);
    setIsEditUserDialogOpen(false);
    setSelectedUser(null);
    toast({
      title: "Utilizador atualizado",
      description: `${data.name} foi atualizado com sucesso.`,
    });
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;

    // Impedir a eliminação da própria conta
    if (selectedUser.id === user?.id) {
      toast({
        title: "Erro",
        description: "Não pode eliminar a sua própria conta.",
        variant: "destructive",
      });
      setIsDeleteDialogOpen(false);
      return;
    }

    const updatedUsers = users.filter((u) => u.id !== selectedUser.id);
    setUsers(updatedUsers);
    setIsDeleteDialogOpen(false);
    setSelectedUser(null);
    toast({
      title: "Utilizador eliminado",
      description: `${selectedUser.name} foi eliminado com sucesso.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Gestão de Utilizadores</h1>
            <p className="text-sm text-gray-500">
              Gerir utilizadores, funções e permissões
            </p>
          </div>
          <Button onClick={() => setIsAddUserDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Adicionar Utilizador
          </Button>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Pesquisar utilizadores..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <UsersTable 
          users={filteredUsers}
          onEditUser={(user) => {
            setSelectedUser(user);
            setIsEditUserDialogOpen(true);
          }}
          onDeleteUser={(user) => {
            setSelectedUser(user);
            setIsDeleteDialogOpen(true);
          }}
          onManagePermissions={(user) => {
            setSelectedUser(user);
            setIsPermissionsDialogOpen(true);
          }}
        />
      </div>

      {/* Dialogs */}
      <AddUserDialog 
        open={isAddUserDialogOpen}
        onOpenChange={setIsAddUserDialogOpen}
        onAddUser={handleAddUser}
      />

      <EditUserDialog 
        user={selectedUser}
        open={isEditUserDialogOpen}
        onOpenChange={setIsEditUserDialogOpen}
        onEditUser={handleEditUser}
      />

      <DeleteUserDialog 
        user={selectedUser}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDeleteUser={handleDeleteUser}
      />

      <UserPermissionsDialogWrapper
        user={selectedUser}
        open={isPermissionsDialogOpen}
        onOpenChange={setIsPermissionsDialogOpen}
      />
    </DashboardLayout>
  );
};

export default Users;
