
import { storageZones } from './dummyData';

const StorageAllocation = () => {

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Storage Allocation</h2>
          <p className="text-slate-500 text-sm mt-1">Warehouse module — blockchain verified</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {storageZones.map((zone, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-slate-800">{zone.name}</span>
              <span className={`text-xs px-2 py-1 rounded-full font-semibold ${zone.status === 'operational' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{zone.status}</span>
            </div>
            <p className="text-xs text-slate-500 mb-2">Range: {zone.tempRange}</p>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-blue-600">{zone.currentTemp}</span>
              <span className="text-xs text-slate-500">{zone.units} units</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-teal-500 h-2 rounded-full" style={{width: zone.capacity + '%'}}></div>
            </div>
            <p className="text-xs text-slate-400 mt-1">{zone.capacity}% capacity</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorageAllocation;
