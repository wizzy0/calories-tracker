'use client';

import { useState, useEffect } from 'react';
import { CaloryEntry, CaloryFormData } from './types/types';
import CaloryForm from './components/CaloryForm';
import CaloryList from './components/CaloryList';
import { caloryService } from './services/caloryService';

export default function Home() {
  const [entries, setEntries] = useState<CaloryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const data = await caloryService.getAllEntries();
      setEntries(data);
    } catch (err) {
      setError('Gagal memuat data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEntry = async (formData: CaloryFormData) => {
    try {
      const newEntry = await caloryService.addEntry(formData);
      setEntries([newEntry, ...entries]);
    } catch (err) {
      setError('Gagal menambah data');
      console.error(err);
    }
  };

  const handleDeleteEntry = async (id: string) => {
    try {
      await caloryService.deleteEntry(id);
      setEntries(entries.filter(entry => entry.id !== id));
    } catch (err) {
      setError('Gagal menghapus data');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Memuat data...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Pencatat Kalori Harian
        </h1>
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        <div className="grid gap-8 md:grid-cols-[2fr,3fr]">
          <div>
            <CaloryForm onSubmit={handleAddEntry} />
          </div>
          <div>
            <CaloryList entries={entries} onDelete={handleDeleteEntry} />
          </div>
        </div>
      </div>
    </main>
  );
}
