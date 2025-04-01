
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { UserRole, User } from "@/types";
import { UserPlus, Pencil, Trash2, Search, UserCog } from "lucide-react";
import { getUserRoleName } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import UserPermissionsDialog from "@/components/users/UserPermissionsDialog";
import { MOCK_USERS } from "@/services/mockData";

const formSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  name: z.string().min(1, "Nome é obrigatório"),
  role: z.enum(["client", "lawyer", "senior_lawyer", "assistant", "admin"]),
  isActive: z.boolean().default(true),
  organizationId: z.string().optional(),
  phone: z.string().optional(),
  hasTwoFactorEnabled: z.boolean().default(false),
});

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      role: "client",
      isActive: true,
      hasTwoFactorEnabled: false,
    },
  });

  // Filtrar utilizadores com base no termo de pesquisa
  const filteredUsers = users.filter((u) => {
    return (
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getUserRoleName(u.role).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleAddUser = (data: z.infer<typeof formSchema>) => {
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
      lastLogin: new Date().toISOString(), // Adicionando lastLogin
      hasTwoFactorEnabled: data.hasTwoFactorEnabled,
      organizationId: data.organizationId,
      phone: data.phone,
    };

    setUsers([...users, newUser]);
    setIsAddUserDialogOpen(false);
    form.reset();
    toast({
      title: "Utilizador adicionado",
      description: `${newUser.name} foi adicionado com sucesso.`,
    });
  };

  const handleEditUser = (data: z.infer<typeof formSchema>) => {
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

  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    form.reset({
      email: user.email,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
      hasTwoFactorEnabled: user.hasTwoFactorEnabled,
      organizationId: user.organizationId,
      phone: user.phone,
    });
    setIsEditUserDialogOpen(true);
  };

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const openPermissionsDialog = (user: User) => {
    setSelectedUser(user);
    setIsPermissionsDialogOpen(true);
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
          <Button onClick={() => {
            form.reset();
            setIsAddUserDialogOpen(true);
          }}>
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

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Data de Criação</TableHead>
                <TableHead>2FA</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getUserRoleName(user.role)}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.isActive ? "Ativo" : "Inativo"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString("pt-PT")}
                    </TableCell>
                    <TableCell>
                      {user.hasTwoFactorEnabled ? "Ativado" : "Desativado"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openPermissionsDialog(user)}
                        >
                          <UserCog className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(user)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDeleteDialog(user)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Nenhum utilizador encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal para adicionar utilizador */}
      <Dialog
        open={isAddUserDialogOpen}
        onOpenChange={setIsAddUserDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar Utilizador</DialogTitle>
            <DialogDescription>
              Preencha os detalhes para adicionar um novo utilizador ao sistema.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddUser)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="email@exemplo.com" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Função</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma função" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="client">Cliente</SelectItem>
                        <SelectItem value="lawyer">Advogado</SelectItem>
                        <SelectItem value="senior_lawyer">Advogado Sênior</SelectItem>
                        <SelectItem value="assistant">Assistente</SelectItem>
                        <SelectItem value="admin">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      A função determina quais permissões o utilizador terá no sistema.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="+351 123 456 789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex space-x-4">
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Ativo</FormLabel>
                        <FormDescription>
                          Utilizadores inativos não podem aceder ao sistema.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hasTwoFactorEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>2FA</FormLabel>
                        <FormDescription>
                          Autenticação de dois fatores.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddUserDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">Adicionar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Modal para editar utilizador */}
      <Dialog
        open={isEditUserDialogOpen}
        onOpenChange={setIsEditUserDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Utilizador</DialogTitle>
            <DialogDescription>
              Atualize os detalhes do utilizador.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEditUser)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="email@exemplo.com" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Função</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma função" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="client">Cliente</SelectItem>
                        <SelectItem value="lawyer">Advogado</SelectItem>
                        <SelectItem value="senior_lawyer">Advogado Sênior</SelectItem>
                        <SelectItem value="assistant">Assistente</SelectItem>
                        <SelectItem value="admin">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="+351 123 456 789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex space-x-4">
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Ativo</FormLabel>
                        <FormDescription>
                          Utilizadores inativos não podem aceder ao sistema.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hasTwoFactorEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>2FA</FormLabel>
                        <FormDescription>
                          Autenticação de dois fatores.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditUserDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">Atualizar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Modal para confirmar eliminação */}
      <Dialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Eliminação</DialogTitle>
            <DialogDescription>
              Tem a certeza que deseja eliminar o utilizador{" "}
              <span className="font-medium">{selectedUser?.name}</span>? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteUser}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para gerir permissões */}
      {selectedUser && (
        <UserPermissionsDialog
          user={selectedUser}
          open={isPermissionsDialogOpen}
          onOpenChange={setIsPermissionsDialogOpen}
        />
      )}
    </DashboardLayout>
  );
};

export default Users;
