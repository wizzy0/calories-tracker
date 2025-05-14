import { CaloryEntry } from '../types/types';

interface CaloryListProps {
  entries: CaloryEntry[];
  onDelete?: (id: string) => void;
}

export default function CaloryList({ entries, onDelete }: CaloryListProps) {
  // Menghitung total kalori
  const totalCalories = entries.reduce((sum, entry) => sum + entry.calories, 0);

  // Mengelompokkan entri berdasarkan tanggal
  const entriesByDate = entries.reduce((acc, entry) => {
    const date = entry.date;
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += entry.calories;
    return acc;
  }, {} as { [key: string]: number });

  return (
    <div className="space-y-6">
      {/* Ringkasan Statistik */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Ringkasan Kalori</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Kalori Keseluruhan</p>
            <p className="text-2xl font-bold text-blue-600">{totalCalories} kcal</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Rata-rata Kalori per Hari</p>
            <p className="text-2xl font-bold text-green-600">
              {entries.length ? Math.round(totalCalories / Object.keys(entriesByDate).length) : 0} kcal
            </p>
          </div>
        </div>
      </div>

      {/* Tabel Riwayat */}
      <div className="bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 p-4 border-b">Riwayat Kalori</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Makanan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kalori</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu</th>
                {onDelete && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {entries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.food_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.calories} kcal</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.time}</td>
                  {onDelete && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button
                        onClick={() => onDelete(entry.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Hapus
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{totalCalories} kcal</td>
                <td colSpan={3}></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Ringkasan per Hari */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Ringkasan per Hari</h2>
        <div className="space-y-2">
          {Object.entries(entriesByDate)
            .sort((a, b) => b[0].localeCompare(a[0])) // Urutkan berdasarkan tanggal terbaru
            .map(([date, calories]) => (
              <div key={date} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                <span className="text-gray-600">{date}</span>
                <span className="font-medium text-blue-600">{calories} kcal</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
} 