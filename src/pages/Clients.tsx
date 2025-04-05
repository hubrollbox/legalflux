import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { UserPlus, Search, Filter, Download, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmptyState from "@/components/ui/EmptyState";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  
  // Mock data for demonstration
  const clients = [
    { id: 1, name: "Cliente A", status: "active", value: 5000 },
    { id: 2, name: "Cliente B", status: "inactive", value: 3000 },
    { id: 3, name: "Cliente C", status: "active", value: 7500 },
  ];
  
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "all" || client.status === activeFilter;
    return matchesSearch && matchesFilter;
  });
  
  const chartData = [
    { name: "Ativos", value: clients.filter(c => c.status === "active").length },
    { name: "Inativos", value: clients.filter(c => c.status === "inactive").length },
  ];

  return (
    <DashboardLayout>
      <div className="dashboard-header flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <SectionHeader
          title="Clientes"
          description="Gerencie a sua carteira de clientes"
        />
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar clientes..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setActiveFilter("all")}>
                Todos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveFilter("active")}>
                Ativos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveFilter("inactive")}>
                Inativos
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button className="bg-highlight hover:bg-highlight/90">
            <UserPlus className="mr-2 h-4 w-4" /> Novo Cliente
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Lista de Clientes</CardTitle>
            <Button variant="ghost" size="sm">
              <Download className="mr-2 h-4 w-4" /> Exportar
            </Button>
          </CardHeader>
          <CardContent>
            {filteredClients.length === 0 ? (
              <EmptyState message="Nenhum cliente encontrado com os filtros atuais." />
            ) : (
              <div className="space-y-4">
                {filteredClients.map(client => (
                  <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div>
                      <h3 className="font-medium">{client.name}</h3>
                      <p className="text-sm text-gray-500">Status: {client.status === "active" ? "Ativo" : "Inativo"}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Enviar mensagem</DropdownMenuItem>
                        <DropdownMenuItem>Ver documentos</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            )}
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
    </DashboardLayout>
  );
};

export default Clients;
