
export enum PriorityLevel {
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low"
}

export interface PriorityItem {
  priority: PriorityLevel;
  label: string;
  color: string;
}

export const priorityOptions: PriorityItem[] = [
  { priority: PriorityLevel.HIGH, label: "Alta", color: "text-red-600" },
  { priority: PriorityLevel.MEDIUM, label: "Média", color: "text-amber-500" },
  { priority: PriorityLevel.LOW, label: "Baixa", color: "text-green-600" }
];
