import { supabase } from '../lib/supabase';
import { CaloryEntry, CaloryFormData } from '../types/types';

export const caloryService = {
  // Mengambil semua entri kalori
  async getAllEntries(): Promise<CaloryEntry[]> {
    const { data, error } = await supabase
      .from('calories')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Menambah entri kalori baru
  async addEntry(entry: CaloryFormData): Promise<CaloryEntry> {
    const { data, error } = await supabase
      .from('calories')
      .insert([entry])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Menghapus entri kalori
  async deleteEntry(id: string): Promise<void> {
    const { error } = await supabase
      .from('calories')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Mengambil entri kalori berdasarkan rentang tanggal
  async getEntriesByDateRange(startDate: string, endDate: string): Promise<CaloryEntry[]> {
    const { data, error } = await supabase
      .from('calories')
      .select('*')
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: false });

    if (error) throw error;
    return data || [];
  }
}; 