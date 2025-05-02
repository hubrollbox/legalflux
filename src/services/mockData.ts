
import { Case, Task } from "@/types";

/**
 * Get recent cases for the dashboard
 */
export const getRecentCases = (): Partial<Case>[] => {
  return [
    {
      id: "case-1",
      title: "Processo de Divórcio - Silva",
      status: "in_progress",
      priority: "high",
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "case-2",
      title: "Disputa Trabalhista - Ferreira vs. ABC Ltd",
      status: "waiting",
      priority: "medium",
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "case-3",
      title: "Recuperação de Dívida - Empresa XYZ",
      status: "open",
      priority: "medium",
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "case-4",
      title: "Regularização de Imóvel - Costa",
      status: "in_progress",
      priority: "low",
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "case-5",
      title: "Defesa Criminal - João Santos",
      status: "waiting",
      priority: "high",
      updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
};

/**
 * Get recent tasks for the dashboard
 */
export const getRecentTasks = (): Partial<Task>[] => {
  return [
    {
      id: "task-1",
      title: "Preparar contestação",
      status: "todo",
      priority: "high",
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "task-2",
      title: "Revisar contrato de locação",
      status: "in_progress",
      priority: "medium",
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "task-3",
      title: "Contatar testemunhas",
      status: "todo",
      priority: "medium",
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "task-4",
      title: "Finalizar petição inicial",
      status: "review",
      priority: "high",
      dueDate: new Date(Date.now() + 0.5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "task-5",
      title: "Agendar reunião com cliente",
      status: "todo",
      priority: "low",
      dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
};
