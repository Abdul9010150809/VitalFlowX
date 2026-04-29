import { useState } from 'react';

const SensorValidation = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setSuccess(true); e.target.reset(); }, 1500);
  };
  const mockData = Array(5).fill(0).map((_,i) => ({sensorId: 'Sample ' + i, shipment: 'Sample ' + i, battery: 'Sample ' + i, calibStatus: 'Sample ' + i, lastSync: 'Sample ' + i}));
  const filteredData = mockData.filter(row => Object.values(row).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase())));

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Sensor Validation</h2>
          <p className="text-slate-500 text-sm mt-1">Inspector module — functionality enabled</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full">
  <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
    <input type="text" placeholder="Search records..." className="px-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
    <span className="text-sm text-slate-500">{filteredData.length} records found</span>
  </div>
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-slate-100">
      <thead className="bg-slate-50"><tr>
<th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Sensor ID</th>\n<th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Shipment</th>\n<th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Battery</th>\n<th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Calibration</th>\n<th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Sync</th>
</tr></thead>
      <tbody className="divide-y divide-slate-50">
        {filteredData.map((row, i) => (
          <tr key={i} className="hover:bg-slate-50/50 transition-colors">
<td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{row.sensorId || 'N/A'}</td>\n<td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{row.shipment || 'N/A'}</td>\n<td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{row.battery || 'N/A'}</td>\n<td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{row.calibStatus || 'N/A'}</td>\n<td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{row.lastSync || 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </table>
    {filteredData.length === 0 && <div className="p-8 text-center text-slate-500">No matching records found.</div>}
  </div>
</div>
    </div>
  );
};

export default SensorValidation;
