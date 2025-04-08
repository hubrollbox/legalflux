// Definição dos tipos para gestão de processos

import { Client } from "./client";

export interface Process {
  id: string;
  title: string;
  number: string;
  type: ProcessType;
  status: ProcessStatus;
  clientId: string;
  client?: Client;
  description?: string;
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
  userId: string; // ID do advogado responsável
  documents?: Document[];
}

export type ProcessType = "civil" | "criminal" | "administrative" | "labor" | "tax" | "other";

export type ProcessStatus = "new" | "in_progress" | "completed" | "archived";

// Interface para criação de novo processo
export interface CreateProcessDTO {
  title: string;
  number: string;
  type: ProcessType;
  clientId: string;
  description?: string;
  startDate: string;
  status?: ProcessStatus;
}

// Interface para atualização de processo
export interface UpdateProcessDTO {
  title?: string;
  number?: string;
  type?: ProcessType;
  clientId?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: ProcessStatus;
}