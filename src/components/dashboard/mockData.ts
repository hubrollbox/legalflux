
import { RecentCase, RecentTask } from "./types";
import { PriorityLevel } from "@/types";

// Recent cases data
export const getRecentCases = (): RecentCase[] => [
  {
    id: "1",
    title: "Processo de Divórcio Silva",
    clientName: "João Cardoso",
    clientAvatar: "",
    status: "active",
  },
  {
    id: "2",
    title: "Contrato de Arrendamento",
    clientName: "Pedro Santos",
    clientAvatar: "",
    status: "pending",
  },
  {
    id: "3",
    title: "Disputa Trabalhista",
    clientName: "Teresa Almeida",
    clientAvatar: "",
    status: "closed",
  },
];

// Recent tasks data
export const getRecentTasks = (): RecentTask[] => [
  {
    id: "1",
    title: "Preparar petição inicial",
    assignedToName: "Advogado Demo",
    assignedToAvatar: "",
    priority: "high" as PriorityLevel,
  },
  {
    id: "2",
    title: "Revisar contrato",
    assignedToName: "Assistente Demo",
    assignedToAvatar: "",
    priority: "medium" as PriorityLevel,
  },
  {
    id: "3",
    title: "Agendar audiência",
    assignedToName: "Carlos Santos",
    assignedToAvatar: "",
    priority: "low" as PriorityLevel,
  },
];
