
export type CategoryKey = 'work' | 'personal' | 'meeting' | 'holiday' | 'reminder' | 'deadline' | 'legal' | 'court' | 'client' | 'other';

export interface Category {
  id: string;
  name: string;
  key: CategoryKey;
  color: string;
}
