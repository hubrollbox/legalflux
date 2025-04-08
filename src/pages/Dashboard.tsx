
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Process, Client } from "@/types";
import { processService } from "@/services/processService";
import { clientService } from "@/services/clientService";

const Dashboard = () => {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const loadProcesses = async () => {
    const data = await processService.getProcesses();
    setProcesses(data);
  };

  const loadClients = async () => {
    const data = await clientService.getClients();
    setClients(data);
  };

  const filteredProcesses = processes.filter(process => {
    const matchesSearch = process.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === "all" || process.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="filters">
        <Input
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="Em Curso">Em Curso</SelectItem>
            <SelectItem value="Concluído">Concluído</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Processos</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredProcesses.map(process => (
            <div key={process.id}>{process.title}</div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredClients.map(client => (
            <div key={client.id}>{client.name}</div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
