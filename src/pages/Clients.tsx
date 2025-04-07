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
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'card'
  
  // Mock data for demonstration
  const clients = [
    { 
      id: 1, 
      name: "Cliente A", 
      status: "active", 
      value: 5000,
      email: "clientea@exemplo.com",
      phone: "(11) 99999-9999",
      documents: 5,
      lastContact: "2023-10-15"
    },
    { 
      id: 2, 
      name: "Cliente B", 
      status: "inactive", 
      value: 3000,
      email: "clienteb@exemplo.com",
      phone: "(11) 88888-8888",
      documents: 2,
      lastContact: "2023-09-20"
    },
    { 
      id: 3, 
      name: "Cliente C", 
      status: "active", 
      value: 7500,
      email: "clientec@exemplo.com",
      phone: "(11) 77777-7777",
      documents: 8,
      lastContact: "2023-10-10"
    },
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
            <div className="flex gap-2">
              <Button 
                variant={viewMode === 'list' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('list')}
              >
                Lista
              </Button>
              <Button 
                variant={viewMode === 'card' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('card')}
              >
                Cards
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="mr-2 h-4 w-4" /> Exportar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {filteredClients.length === 0 ? (
              <EmptyState message="Nenhum cliente encontrado com os filtros atuais." />
            ) : viewMode === 'list' ? (
              <div className="space-y-4">
                {filteredClients.map(client => (
                  <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div>
                      <h3 className="font-medium">{client.name}</h3>
                      <p className="text-sm text-gray-500">Status: {client.status === "active" ? "Ativo" : "Inativo"}</p>
                      <p className="text-sm text-gray-500">Documentos: {client.documents}</p>
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
                        <DropdownMenuItem>Ver histórico</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredClients.map(client => (
                  <Card key={client.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{client.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {client.status === "active" ? "Ativo" : "Inativo"}
                        </span>
                        <span className="text-xs text-gray-500">{client.documents} documentos</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center text-sm">
                        <span className="text-gray-500 w-24">Email:</span>
                        <span>{client.email}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="text-gray-500 w-24">Telefone:</span>
                        <span>{client.phone}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="text-gray-500 w-24">Último contato:</span>
                        <span>{client.lastContact}</span>
                      </div>
                      <div className="pt-2 flex justify-between">
                        <Button variant="outline" size="sm">Ver documentos</Button>
                        <Button variant="outline" size="sm">Histórico</Button>
                      </div>
                    </CardContent>
                  </Card>
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
