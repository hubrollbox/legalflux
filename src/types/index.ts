
export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  updatedAt: Date;
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
  deadline: Date;
  status: string;
  progress?: number;
  responsible?: string;
  priority?: string;
}

export type { CalendarEvent } from "./calendar";
export type { CategoryKey } from "./category";
export type { Task } from "./task";
export { PriorityLevel } from "./priority-level";
