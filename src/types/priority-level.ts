
export enum PriorityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export const priorityColorMap: Record<PriorityLevel, string> = {
  [PriorityLevel.LOW]: 'bg-green-100 text-green-800',
  [PriorityLevel.MEDIUM]: 'bg-yellow-100 text-yellow-800',
  [PriorityLevel.HIGH]: 'bg-red-100 text-red-800'
};
