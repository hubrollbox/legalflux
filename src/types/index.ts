
export interface Document {
  id: string;
  name: string;
  type: "document" | "action" | "precedent" | "strategy";
  size: string;
  updatedAt: string;
  owner: string;
  folder: string;
  process: string;
  tags?: string[];
  status: string;
}

export interface Process {
  id: string;
  title: string;
  clientName: string;
  type: string;
  deadline: string;
  status: string;
  progress?: number;
  responsible?: string;
  priority?: string;
}

export * from "./calendar";
export * from "./category";
export * from "./task";
export * from "./priority-level";
export * from "./financial";
export * from "./auth";
export * from "./permissions";
export * from "./document";
export * from "./process";

// Export TransactionType and TransactionStatus explicitly
export { TransactionType, TransactionStatus } from "./financial";
