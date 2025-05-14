import { useState } from 'react';
import { CaloryFormData } from '../types/types';

interface CaloryFormProps {
  onSubmit: (data: CaloryFormData) => void;
}

export default function CaloryForm({ onSubmit }: CaloryFormProps) {
  const [formData, setFormData] = useState<CaloryFormData>({
    food_name: '',
    calories: 0,
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('en-US', { hour12: false }).slice(0, 5)
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      food_name: '',
      calories: 0,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour12: false }).slice(0, 5)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div>
        <label htmlFor="food_name" className="block text-sm font-medium text-gray-700">
          Nama Makanan
        </label>
        <input
          type="text"
          id="food_name"
          value={formData.food_name}
          onChange={(e) => setFormData({ ...formData, food_name: e.target.value })}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white focus:border-blue-500 focus:ring-blue-500"
          placeholder="Masukkan nama makanan"
        />
      </div>

      <div>
        <label htmlFor="calories" className="block text-sm font-medium text-gray-700">
          Jumlah Kalori
        </label>
        <input
          type="number"
          id="calories"
          value={formData.calories}
          onChange={(e) => setFormData({ ...formData, calories: Number(e.target.value) })}
          required
          min="0"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white focus:border-blue-500 focus:ring-blue-500"
          placeholder="0"
        />
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Tanggal
        </label>
        <input
          type="date"
          id="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="time" className="block text-sm font-medium text-gray-700">
          Waktu
        </label>
        <input
          type="time"
          id="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black bg-white focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Tambah Catatan
      </button>
    </form>
  );
} 