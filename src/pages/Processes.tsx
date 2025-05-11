
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

// Process mock data interface
interface Process {
  id: string;
  number: string;
  title: string;
  client: string;
  lawyer: string;
  status: "open" | "closed" | "archived" | "pending";
  priority: "high" | "medium" | "low";
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mock data for processes
const mockProcesses: Process[] = [
  {
    id: "1",
    number: "2023/0001",
    title: "Processo de Reclamação Trabalhista",
    client: "João Silva",
    lawyer: "Maria Advogada",
    status: "open",
    priority: "high",
    type: "Trabalhista",
    createdAt: new Date(2023, 0, 15),
    updatedAt: new Date(2023, 2, 20),
  },
  {
    id: "2",
    number: "2023/0015",
    title: "Ação de Cobrança de Dívidas",
    client: "Empresa XYZ",
    lawyer: "Pedro Jurídico",
    status: "pending",
    priority: "medium",
    type: "Civil",
    createdAt: new Date(2023, 1, 10),
    updatedAt: new Date(2023, 2, 15),
  },
  {
    id: "3",
    number: "2022/0125",
    title: "Processo de Divórcio",
    client: "Ana Oliveira",
    lawyer: "Carlos Advocacia",
    status: "closed",
    priority: "low",
    type: "Família",
    createdAt: new Date(2022, 10, 5),
    updatedAt: new Date(2023, 1, 20),
  },
  {
    id: "4",
    number: "2023/0042",
    title: "Defesa Criminal",
    client: "Roberto Pessoa",
    lawyer: "Maria Advogada",
    status: "open",
    priority: "high",
    type: "Criminal",
    createdAt: new Date(2023, 2, 1),
    updatedAt: new Date(2023, 3, 10),
  },
  {
    id: "5",
    number: "2022/0098",
    title: "Registro de Propriedade Intelectual",
    client: "Startup ABC",
    lawyer: "Pedro Jurídico",
    status: "archived",
    priority: "medium",
    type: "Propriedade Intelectual",
    createdAt: new Date(2022, 8, 12),
    updatedAt: new Date(2022, 11, 5),
  },
];

// Get status badge variant based on status
const getStatusBadge = (status: Process["status"]) => {
  switch (status) {
    case "open":
      return "bg-green-100 text-green-800";
    case "closed":
      return "bg-gray-100 text-gray-800";
    case "archived":
      return "bg-blue-100 text-blue-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Get priority badge variant based on priority
const getPriorityBadge = (priority: Process["priority"]) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-amber-100 text-amber-800";
    case "low":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const Processes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const { toast } = useToast();

  // Filter processes based on search term and filters
  const filteredProcesses = mockProcesses.filter((process) => {
    const matchesSearch =
      process.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      process.client.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || process.status === statusFilter;

    const matchesType =
      typeFilter === "all" || process.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Get unique process types for filter
  const processTypes = Array.from(
    new Set(mockProcesses.map((process) => process.type))
  );

  const handleNewProcess = () => {
    // Fixed by providing the correct number of arguments
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "Esta funcionalidade será implementada em breve."
    });
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center">
        <SectionHeader
          title="Processos"
          description="Gerencie todos os seus processos jurídicos"
        />
        <Button onClick={handleNewProcess}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Processo
        </Button>
      </div>

      <div className="grid gap-6 mt-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Pesquisar por número, título ou cliente..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="open">Abertos</SelectItem>
              <SelectItem value="pending">Pendentes</SelectItem>
              <SelectItem value="closed">Concluídos</SelectItem>
              <SelectItem value="archived">Arquivados</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {processTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Process List */}
        <div className="grid gap-4">
          {filteredProcesses.length === 0 ? (
            <Card className="p-8 text-center text-gray-500">
              Nenhum processo encontrado com os critérios de filtro atuais.
            </Card>
          ) : (
            filteredProcesses.map((process) => (
              <Card
                key={process.id}
                className="p-5 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        Processo nº {process.number}
                      </span>
                      <Badge className={getStatusBadge(process.status)}>
                        {process.status === "open"
                          ? "Aberto"
                          : process.status === "closed"
                          ? "Concluído"
                          : process.status === "archived"
                          ? "Arquivado"
                          : "Pendente"}
                      </Badge>
                      <Badge className={getPriorityBadge(process.priority)}>
                        {process.priority === "high"
                          ? "Alta Prioridade"
                          : process.priority === "medium"
                          ? "Prioridade Média"
                          : "Baixa Prioridade"}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold">{process.title}</h3>
                    <p className="text-gray-600">
                      <span className="font-medium">Cliente:</span>{" "}
                      {process.client}
                    </p>
                  </div>
                  <div className="flex flex-col lg:items-end justify-between">
                    <div className="space-y-1">
                      <Badge variant="outline">{process.type}</Badge>
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Advogado:</span>{" "}
                        {process.lawyer}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      <div>
                        Criado em:{" "}
                        {format(process.createdAt, "dd/MM/yyyy", {
                          locale: ptBR,
                        })}
                      </div>
                      <div>
                        Última atualização:{" "}
                        {format(process.updatedAt, "dd/MM/yyyy", {
                          locale: ptBR,
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Processes;
