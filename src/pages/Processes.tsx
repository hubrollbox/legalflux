import React, { useState } from "react";
import { Plus, Search, Filter, ArrowUpDown } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
// Remove unused chart imports
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { usePermissions } from "@/hooks/usePermissions";
import { toast } from "@/hooks/use-toast";

// Mock data for processes
const processesMockData = [
  {
    id: "2023/1234",
    title: "Silva vs. Estado Português",
    client: "António Silva",
    type: "Administrativo",
    status: "Em Curso",
    lastUpdate: "2023-12-01",
    priority: "Alta"
  },
  {
    id: "2023/1235",
    title: "Ferreira Imobiliária, Lda. vs. Construções ABC",
    client: "Ferreira Imobiliária, Lda.",
    type: "Civil",
    status: "Em Espera",
    lastUpdate: "2023-11-28",
    priority: "Média"
  },
  {
    id: "2023/1236",
    title: "Herança de Maria Oliveira",
    client: "José Oliveira",
    type: "Sucessões",
    status: "Concluído",
    lastUpdate: "2023-11-15",
    priority: "Baixa"
  },
  {
    id: "2023/1237",
    title: "Cobrança de Dívida - Martins & Filhos",
    client: "Tech Solutions, S.A.",
    type: "Comercial",
    status: "Em Curso",
    lastUpdate: "2023-12-05",
    priority: "Alta"
  },
  {
    id: "2023/1238",
    title: "Processo de Insolvência - Café Central",
    client: "Banco Investimento",
    type: "Insolvência",
    status: "Em Curso",
    lastUpdate: "2023-12-03",
    priority: "Alta"
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Alta":
      return "bg-red-100 text-red-800";
    case "Média":
      return "bg-orange-100 text-orange-800";
    case "Baixa":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Add these helper functions before the component
const getStatusColor = (status: string) => {
  switch (status) {
    case "Em Curso":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "Em Espera":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "Concluído":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  }
};

const Processes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null);
  const { hasPermission } = usePermissions();
  const canCreateProcess = hasPermission("processes", "create");

  // Move handleProcessSelect inside the component
  const handleProcessSelect = (processId: string) => {
    setSelectedProcess(selectedProcess === processId ? null : processId);
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    // Update process status logic
    toast({
      title: "Status atualizado",
      description: `O processo foi atualizado para ${newStatus}`
    });
  };

  const filteredProcesses = processesMockData.filter(process => {
    const matchesSearch = 
      process.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      process.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "all" || process.status === activeFilter;
    return matchesSearch && matchesFilter;
  });
  
  // Remove this unused variable
  // const chartData = [
  //   { name: "Em Curso", value: processesMockData.filter(p => p.status === "Em Curso").length },
  //   { name: "Em Espera", value: processesMockData.filter(p => p.status === "Em Espera").length },
  //   { name: "Concluído", value: processesMockData.filter(p => p.status === "Concluído").length },
  // ];

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Processos</h1>
              <p className="text-muted-foreground">
                Gerencie os seus processos jurídicos
              </p>
            </div>
            {canCreateProcess && (
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Novo Processo
              </Button>
            )}
          </div>

          <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Filtros de Pesquisa</CardTitle>
            <CardDescription>
              Refine a sua pesquisa utilizando diferentes critérios
            </CardDescription>
          </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar processos..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtrar
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setActiveFilter("all")}>
                      Todos
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveFilter("Em Curso")}>
                      Em Curso
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveFilter("Em Espera")}>
                      Em Espera
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveFilter("Concluído")}>
                      Concluído
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Processos Ativos</CardTitle>
              <CardDescription>Processos em andamento</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {processesMockData.filter(p => p.status === "Em Curso").length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Processos em Espera</CardTitle>
              <CardDescription>Processos aguardando ação</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {processesMockData.filter(p => p.status === "Em Espera").length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Processos Concluídos</CardTitle>
              <CardDescription>Processos finalizados</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {processesMockData.filter(p => p.status === "Concluído").length}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Filtros de Pesquisa</CardTitle>
            <CardDescription>
              Refine a sua pesquisa utilizando diferentes critérios
            </CardDescription>
          </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Pesquisar processos..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="w-full justify-between">
                        <span>Estado</span>
                        <Filter className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Filtrar por estado</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Em Curso</DropdownMenuItem>
                      <DropdownMenuItem>Em Espera</DropdownMenuItem>
                      <DropdownMenuItem>Concluído</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="w-full justify-between">
                        <span>Tipo</span>
                        <Filter className="h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Filtrar por tipo</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Civil</DropdownMenuItem>
                      <DropdownMenuItem>Comercial</DropdownMenuItem>
                      <DropdownMenuItem>Administrativo</DropdownMenuItem>
                      <DropdownMenuItem>Insolvência</DropdownMenuItem>
                      <DropdownMenuItem>Sucessões</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
            </Card>
            

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3">
              <CardTitle>Lista de Processos</CardTitle>
              <CardDescription>
                {filteredProcesses.length} processos encontrados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">
                        <div className="flex items-center">
                          Ref.
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Título
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Atualização
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Prioridade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProcesses.map((process) => (
                      <TableRow 
                        key={process.id} 
                        className={`cursor-pointer hover:bg-muted/50 ${selectedProcess === process.id ? 'bg-muted' : ''}`}
                        onClick={() => handleProcessSelect(process.id)}
                      >
                        <TableCell className="font-medium">{process.id}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">{process.title}</span>
                            <span className="text-sm text-muted-foreground">{process.client}</span>
                          </div>
                        </TableCell>
                        <TableCell>{process.client}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-normal">
                            {process.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(process.status)} inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`}>
                            <span className={`flex w-2 h-2 rounded-full mr-1 ${process.status === 'Em Curso' ? 'bg-blue-500' : process.status === 'Em Espera' ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
                            {process.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{new Date(process.lastUpdate).toLocaleDateString('pt-PT')}</span>
                            <span className="text-xs text-muted-foreground">{new Date(process.lastUpdate).toLocaleTimeString('pt-PT')}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getPriorityColor(process.priority)} inline-flex items-center gap-1`}>
                            <span className="w-2 h-2 rounded-full ${process.priority === 'Alta' ? 'bg-red-500' : process.priority === 'Média' ? 'bg-orange-500' : 'bg-green-500'}"></span>
                            {process.priority}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredProcesses.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                          Nenhum processo encontrado com os critérios de pesquisa atuais.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button className="bg-transparent border border-input hover:bg-accent hover:text-accent-foreground">Exportar</Button>
              <div className="flex space-x-2">
                <Button className="bg-transparent border border-input hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2" disabled>
                  Anterior
                </Button>
                <Button className="bg-transparent border border-input hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                  Próximo
                </Button>
              </div>
            </CardFooter>
            </Card>

            {selectedProcess && (
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Detalhes do Processo</CardTitle>
                  <CardDescription>
                    Informações detalhadas e timeline do processo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Informações básicas */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Processo</h4>
                        <p className="text-lg font-semibold">{processesMockData.find(p => p.id === selectedProcess)?.title}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Cliente</h4>
                        <p className="text-lg font-semibold">{processesMockData.find(p => p.id === selectedProcess)?.client}</p>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="relative space-y-4">
                      <h4 className="text-sm font-medium text-muted-foreground mb-4">Timeline do Processo</h4>
                      <div className="border-l-2 border-muted pl-4 space-y-6">
                        <div className="relative">
                          <div className="bg-muted/50 rounded-lg p-3">
                            <p className="text-sm font-medium">Última Atualização</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(processesMockData.find(p => p.id === selectedProcess)?.lastUpdate || '').toLocaleDateString('pt-PT')}
                            </p>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="absolute -left-[21px] w-4 h-4 rounded-full bg-muted"></div>
                          <div className="bg-muted/50 rounded-lg p-3">
                            <p className="text-sm font-medium">Criação do Processo</p>
                            <p className="text-sm text-muted-foreground">01/01/2023</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Ações */}
                    <div className="flex gap-2">
                      <Button className="bg-transparent border border-input hover:bg-accent hover:text-accent-foreground w-full">
                        Ver Documentos
                      </Button>
                      <Button className="bg-transparent border border-input hover:bg-accent hover:text-accent-foreground w-full">
                        Adicionar Nota
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Processes;
