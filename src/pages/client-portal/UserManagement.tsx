
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, UserPlus, Filter, MoreVertical, ShieldCheck, Shield, UserCog } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@exemplo.pt",
    role: "Cliente",
    status: "Ativo",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    lastActive: "Hoje, 10:30",
    processes: 3
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria.santos@exemplo.pt",
    role: "Advogada",
    status: "Ativo",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
    lastActive: "Hoje, 09:15",
    processes: 12
  },
  {
    id: 3,
    name: "António Costa",
    email: "antonio.costa@exemplo.pt",
    role: "Advogado Sênior",
    status: "Ativo",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    lastActive: "Ontem, 16:45",
    processes: 24
  },
  {
    id: 4,
    name: "Clara Ferreira",
    email: "clara.ferreira@exemplo.pt",
    role: "Assistente",
    status: "Inativo",
    avatarUrl: "https://i.pravatar.cc/150?img=4",
    lastActive: "Há 3 dias",
    processes: 0
  },
  {
    id: 5,
    name: "Ricardo Martins",
    email: "ricardo.martins@exemplo.pt",
    role: "Administrador",
    status: "Ativo",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    lastActive: "Hoje, 11:20",
    processes: 0
  },
  {
    id: 6,
    name: "Sofia Almeida",
    email: "sofia.almeida@exemplo.pt",
    role: "Cliente",
    status: "Pendente",
    avatarUrl: "https://i.pravatar.cc/150?img=6",
    lastActive: "Nunca",
    processes: 1
  },
  {
    id: 7,
    name: "Miguel Oliveira",
    email: "miguel.oliveira@exemplo.pt",
    role: "Advogado",
    status: "Ativo",
    avatarUrl: "https://i.pravatar.cc/150?img=7",
    lastActive: "Hoje, 08:50",
    processes: 8
  }
];

// Mock data for permissions
const mockPermissions = [
  { id: 1, name: "Gestão de Processos", description: "Acesso total à gestão de processos" },
  { id: 2, name: "Gestão de Documentos", description: "Acesso total à gestão de documentos" },
  { id: 3, name: "Gestão de Utilizadores", description: "Acesso total à gestão de utilizadores" },
  { id: 4, name: "Gestão Financeira", description: "Acesso total à gestão financeira" },
  { id: 5, name: "Calendário e Prazos", description: "Acesso total ao calendário e prazos" },
  { id: 6, name: "Comunicação Interna", description: "Acesso total à comunicação interna" },
  { id: 7, name: "Relatórios", description: "Acesso total aos relatórios" },
  { id: 8, name: "Configurações do Sistema", description: "Acesso total às configurações do sistema" }
];

// Mock data for roles and their permissions
const mockRoles = [
  { 
    id: 1, 
    name: "Administrador", 
    description: "Acesso total ao sistema", 
    permissions: [1, 2, 3, 4, 5, 6, 7, 8],
    users: 1,
    color: "bg-red-100 text-red-800"
  },
  { 
    id: 2, 
    name: "Advogado Sênior", 
    description: "Gestão de casos e equipa", 
    permissions: [1, 2, 5, 6, 7],
    users: 3,
    color: "bg-blue-100 text-blue-800"
  },
  { 
    id: 3, 
    name: "Advogado", 
    description: "Gestão de casos individuais", 
    permissions: [1, 2, 5, 6],
    users: 10,
    color: "bg-green-100 text-green-800"
  },
  { 
    id: 4, 
    name: "Assistente", 
    description: "Suporte a advogados", 
    permissions: [2, 5, 6],
    users: 5,
    color: "bg-yellow-100 text-yellow-800"
  },
  { 
    id: 5, 
    name: "Cliente", 
    description: "Acesso exclusivo aos seus processos", 
    permissions: [1],
    users: 32,
    color: "bg-purple-100 text-purple-800"
  }
];

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("utilizadores");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Definição explícita do tipo User
  interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    avatarUrl: string;
    lastActive: string;
    processes: number;
  }
  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIsUserDialogOpen(true);
  };

  const handleRoleClick = (role: string) => {
    setSelectedRole(role);
    setIsRoleDialogOpen(true);
  };

  const handleOpenPermissions = (role: string) => {
    setSelectedRole(role);
    setIsPermissionsDialogOpen(true);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo':
        return 'bg-green-100 text-green-800';
      case 'Inativo':
        return 'bg-gray-100 text-gray-800';
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gestão de Utilizadores e Permissões</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="utilizadores">Utilizadores</TabsTrigger>
          <TabsTrigger value="funcoes">Funções e Permissões</TabsTrigger>
          <TabsTrigger value="subscricoes">Subscrições</TabsTrigger>
        </TabsList>
        
        {/* Utilizadores Tab */}
        <TabsContent value="utilizadores" className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0 mb-4">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Procurar utilizadores..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" /> Filtrar
              </Button>
              <Button size="sm">
                <UserPlus className="h-4 w-4 mr-1" /> Adicionar Utilizador
              </Button>
            </div>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Utilizadores</CardTitle>
              <CardDescription>
                Gerir todos os utilizadores do sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Função</TableHead>
                      <TableHead className="hidden md:table-cell">Estado</TableHead>
                      <TableHead className="hidden lg:table-cell">Última Atividade</TableHead>
                      <TableHead className="hidden lg:table-cell">Processos</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleUserClick(user)}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={user.avatarUrl} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div>{user.name}</div>
                              <div className="text-xs text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={user.role === "Administrador" ? "bg-red-100 text-red-800" : ""}>{user.role}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">{user.lastActive}</TableCell>
                        <TableCell className="hidden lg:table-cell">{user.processes}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                              <DropdownMenuItem>Editar Utilizador</DropdownMenuItem>
                              <DropdownMenuItem>Gerir Permissões</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Desativar Conta</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Funções e Permissões Tab */}
        <TabsContent value="funcoes" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Funções</CardTitle>
                <CardDescription>
                  Gerir funções de utilizadores e suas permissões.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-4">
                    {mockRoles.map((role) => (
                      <Card key={role.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleRoleClick(role)}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold flex items-center">
                                <Badge className={role.color + " mr-2"}>{role.name}</Badge>
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">
                                {role.users} utilizadores
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenPermissions(role);
                                }}
                                className="mt-1"
                              >
                                <ShieldCheck className="h-4 w-4 mr-1" /> Permissões
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
                <div className="mt-4">
                  <Button className="w-full">
                    <Shield className="h-4 w-4 mr-1" /> Adicionar Nova Função
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Permissões do Sistema</CardTitle>
                <CardDescription>
                  Visão geral de todas as permissões disponíveis.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Descrição</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockPermissions.map((permission) => (
                        <TableRow key={permission.id}>
                          <TableCell className="font-medium">{permission.name}</TableCell>
                          <TableCell>{permission.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Subscrições Tab */}
        <TabsContent value="subscricoes" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Basic Plan */}
            <Card className="relative overflow-hidden border-blue-200">
              <CardHeader className="pb-2">
                <CardTitle>Basic</CardTitle>
                <CardDescription>Para advogados individuais</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">49€<span className="text-sm font-normal text-muted-foreground">/mês</span></div>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>1 Utilizador</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Gestão de processos básica</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>5GB Armazenamento</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Portal do Cliente</span>
                  </div>
                </div>
                <Button className="w-full">Escolher Plano</Button>
              </CardContent>
            </Card>
            
            {/* Solo Plan */}
            <Card className="relative overflow-hidden border-blue-300">
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-xs font-medium">Popular</div>
              <CardHeader className="pb-2">
                <CardTitle>Solo</CardTitle>
                <CardDescription>Para advogados independentes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">99€<span className="text-sm font-normal text-muted-foreground">/mês</span></div>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Até 3 Utilizadores</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Gestão de processos avançada</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>20GB Armazenamento</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Portal do Cliente</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Modelos de documentos</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Escolher Plano</Button>
              </CardContent>
            </Card>
            
            {/* Enterprise Plan */}
            <Card className="relative overflow-hidden border-blue-400">
              <CardHeader className="pb-2">
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>Para escritórios com equipas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">199€<span className="text-sm font-normal text-muted-foreground">/mês</span></div>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Até 10 Utilizadores</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Gestão de equipas</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>100GB Armazenamento</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Relatórios avançados</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>API e integrações</span>
                  </div>
                </div>
                <Button className="w-full">Escolher Plano</Button>
              </CardContent>
            </Card>
            
            {/* Personalizado Plan */}
            <Card className="relative overflow-hidden border-blue-500">
              <CardHeader className="pb-2">
                <CardTitle>Personalizado</CardTitle>
                <CardDescription>Para grandes escritórios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">Sob orçamento</div>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Utilizadores ilimitados</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Customizações específicas</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Armazenamento personalizado</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Suporte prioritário</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Integração completa</span>
                  </div>
                </div>
                <Button className="w-full">Contactar Vendas</Button>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-8">
            <CardHeader className="pb-2">
              <CardTitle>Métodos de Pagamento</CardTitle>
              <CardDescription>
                Configurar e gerir métodos de pagamento para subscrições.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                        <line x1="1" y1="10" x2="23" y2="10"></line>
                      </svg>
                      Cartão de Crédito
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Processamento seguro através da Stripe.</p>
                    <Button className="w-full">Configurar</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                        <path d="M7 15h0M2 9h20"></path>
                      </svg>
                      Débito Direto
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Pagamento automático através de débito em conta.</p>
                    <Button className="w-full">Configurar</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.8 13.2l-2.2 2.2M14.2 13.2l2.2 2.2M8 10h.01M16 10h.01M9 6.8l2 2.7M15 6.8l-2 2.7"></path>
                      </svg>
                      Bitcoin
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Pagamento com criptomoedas.</p>
                    <Button className="w-full">Configurar</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* User Details Dialog */}
      {selectedUser && (
        <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalhes do Utilizador</DialogTitle>
              <DialogDescription>
                Gerir informações e permissões do utilizador.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3 flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={selectedUser.avatarUrl} />
                  <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold text-center">{selectedUser.name}</h3>
                <p className="text-sm text-muted-foreground text-center mb-2">{selectedUser.email}</p>
                <Badge className={getStatusColor(selectedUser.status) + " mb-4"}>{selectedUser.status}</Badge>
                <div className="w-full space-y-2 mt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Editar Perfil
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    Alterar Senha
                  </Button>
                  {selectedUser.status === 'Ativo' ? (
                    <Button variant="outline" size="sm" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
                      Desativar
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="w-full text-green-600 hover:text-green-700 hover:bg-green-50">
                      Ativar
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="md:w-2/3">
                <Tabs defaultValue="info">
                  <TabsList className="w-full">
                    <TabsTrigger value="info">Informação</TabsTrigger>
                    <TabsTrigger value="permissions">Permissões</TabsTrigger>
                    <TabsTrigger value="activity">Atividade</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="info" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">ID</p>
                        <p>{selectedUser.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Função</p>
                        <p>{selectedUser.role}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Estado</p>
                        <p>{selectedUser.status}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Última Atividade</p>
                        <p>{selectedUser.lastActive}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Processos Ativos</p>
                        <p>{selectedUser.processes}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Data de Registo</p>
                        <p>01/05/2023</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="permissions" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Função Atual</h4>
                          <p className="text-sm text-muted-foreground">
                            {selectedUser.role === 'Advogado' 
                              ? 'Gestão de casos individuais e designação de tarefas'
                              : selectedUser.role === 'Cliente' 
                                ? 'Acesso exclusivo aos seus processos e dados'
                                : 'Definição de permissões personalizada'}
                          </p>
                        </div>
                        <Select defaultValue={selectedUser.role.toLowerCase()}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="administrador">Administrador</SelectItem>
                            <SelectItem value="advogado sênior">Advogado Sênior</SelectItem>
                            <SelectItem value="advogado">Advogado</SelectItem>
                            <SelectItem value="assistente">Assistente</SelectItem>
                            <SelectItem value="cliente">Cliente</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        {mockPermissions.map((permission) => (
                          <div key={permission.id} className="flex items-center justify-between border-b pb-2">
                            <div>
                              <h5 className="text-sm font-medium">{permission.name}</h5>
                              <p className="text-xs text-muted-foreground">{permission.description}</p>
                            </div>
                            <Select defaultValue={
                              selectedUser.role === 'Administrador'
                                ? 'total'
                                : selectedUser.role === 'Advogado Sênior' && ['Gestão de Processos', 'Gestão de Documentos'].includes(permission.name)
                                  ? 'total'
                                  : selectedUser.role === 'Advogado' && ['Gestão de Processos'].includes(permission.name)
                                    ? 'parcial'
                                    : 'nenhum'
                            }>
                              <SelectTrigger className="w-[120px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="total">Acesso Total</SelectItem>
                                <SelectItem value="parcial">Acesso Parcial</SelectItem>
                                <SelectItem value="leitura">Apenas Leitura</SelectItem>
                                <SelectItem value="nenhum">Sem Acesso</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="activity" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <div className="border-l-2 border-blue-500 pl-4 py-2">
                        <p className="text-sm text-muted-foreground">Hoje, 10:30</p>
                        <p>Login no sistema</p>
                      </div>
                      <div className="border-l-2 border-blue-500 pl-4 py-2">
                        <p className="text-sm text-muted-foreground">Hoje, 10:45</p>
                        <p>Visualizou o processo #12345</p>
                      </div>
                      <div className="border-l-2 border-green-500 pl-4 py-2">
                        <p className="text-sm text-muted-foreground">Hoje, 11:20</p>
                        <p>Adicionou um documento ao processo #12345</p>
                      </div>
                      <div className="border-l-2 border-blue-500 pl-4 py-2">
                        <p className="text-sm text-muted-foreground">Ontem, 15:45</p>
                        <p>Enviou uma mensagem para cliente Santos</p>
                      </div>
                      <div className="border-l-2 border-orange-500 pl-4 py-2">
                        <p className="text-sm text-muted-foreground">12/05/2023</p>
                        <p>Alterou prazo do processo #54321</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUserDialogOpen(false)}>
                Fechar
              </Button>
              <Button>Guardar Alterações</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Role Details Dialog */}
      {selectedRole && (
        <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detalhes da Função</DialogTitle>
              <DialogDescription>
                Gerir detalhes e permissões da função.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nome</label>
                <Input defaultValue={selectedRole.name} />
              </div>
              <div>
                <label className="text-sm font-medium">Descrição</label>
                <Input defaultValue={selectedRole.description} />
              </div>
              <div>
                <label className="text-sm font-medium">Cor</label>
                <Select defaultValue={selectedRole.color.split(' ')[0]}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bg-red-100">Vermelho</SelectItem>
                    <SelectItem value="bg-blue-100">Azul</SelectItem>
                    <SelectItem value="bg-green-100">Verde</SelectItem>
                    <SelectItem value="bg-yellow-100">Amarelo</SelectItem>
                    <SelectItem value="bg-purple-100">Roxo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Utilizadores com esta função</label>
                <p className="text-sm">{selectedRole.users} utilizadores</p>
                <Button variant="link" className="p-0 h-auto text-sm">Ver utilizadores</Button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>
                Cancelar
              </Button>
              <Button>Guardar Alterações</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Permissions Dialog */}
      {selectedRole && (
        <Dialog open={isPermissionsDialogOpen} onOpenChange={setIsPermissionsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Permissões: {selectedRole.name}</DialogTitle>
              <DialogDescription>
                Configurar permissões para esta função.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {mockPermissions.map((permission) => (
                <div key={permission.id} className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h4 className="font-medium">{permission.name}</h4>
                    <p className="text-sm text-muted-foreground">{permission.description}</p>
                  </div>
                  <Select defaultValue={
                    selectedRole.permissions.includes(permission.id) 
                      ? selectedRole.name === 'Administrador' 
                        ? 'total' 
                        : 'parcial'
                      : 'nenhum'
                  }>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="total">Acesso Total</SelectItem>
                      <SelectItem value="parcial">Acesso Parcial</SelectItem>
                      <SelectItem value="leitura">Apenas Leitura</SelectItem>
                      <SelectItem value="nenhum">Sem Acesso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPermissionsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button>Guardar Alterações</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default UserManagement;
