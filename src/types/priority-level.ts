
export enum PriorityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export interface PriorityOption {
  value: PriorityLevel;
  label: string;
  color: string;
}

export const priorityOptions: PriorityOption[] = [
  { value: PriorityLevel.LOW, label: 'Baixa', color: 'bg-green-100 text-green-800' },
  { value: PriorityLevel.MEDIUM, label: 'Média', color: 'bg-yellow-100 text-yellow-800' },
  { value: PriorityLevel.HIGH, label: 'Alta', color: 'bg-red-100 text-red-800' },
];
