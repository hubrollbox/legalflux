
import React, { useState } from "react";
import { Plus, Search, Filter, ArrowUpDown, Download, MoreHorizontal } from "lucide-react";
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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
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

const getStatusColor = (status: string) => {
  switch (status) {
    case "Em Curso":
      return "bg-blue-100 text-blue-800";
    case "Em Espera":
      return "bg-yellow-100 text-yellow-800";
    case "Concluído":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

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

const Processes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const { hasPermission } = usePermissions();
  const canCreateProcess = hasPermission("processes", "create");
  
  const filteredProcesses = processesMockData.filter(process => {
    const matchesSearch = 
      process.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      process.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "all" || process.status === activeFilter;
    return matchesSearch && matchesFilter;
  });
  
  const chartData = [
    { name: "Em Curso", value: processesMockData.filter(p => p.status === "Em Curso").length },
    { name: "Em Espera", value: processesMockData.filter(p => p.status === "Em Espera").length },
    { name: "Concluído", value: processesMockData.filter(p => p.status === "Concluído").length },
  ];

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
                      <Button variant="outline" className="w-full justify-between">
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
                      <Button variant="outline" className="w-full justify-between">
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
            
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <BarChart width={300} height={300} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                      <TableRow key={process.id}>
                        <TableCell className="font-medium">{process.id}</TableCell>
                        <TableCell>{process.title}</TableCell>
                        <TableCell>{process.client}</TableCell>
                        <TableCell>{process.type}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(process.status)}>
                            {process.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(process.lastUpdate).toLocaleDateString('pt-PT')}</TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(process.priority)}>
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
              <Button variant="outline">Exportar</Button>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm">
                  Próximo
                </Button>
              </div>
            </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <BarChart width={300} height={300} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </div>
              </CardContent>
            </Card>
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Processes;
