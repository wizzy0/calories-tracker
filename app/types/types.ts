export interface CaloryEntry {
  id: string;
  food_name: string;
  calories: number;
  date: string;
  time: string;
  created_at?: string;
}

export type CaloryFormData = Omit<CaloryEntry, 'id' | 'created_at'>; 