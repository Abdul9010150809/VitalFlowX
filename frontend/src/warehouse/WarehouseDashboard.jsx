
import { storageZones, inventoryItems, warehouseAlerts } from './dummyData';

const WarehouseDashboard = () => {

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Warehouse Dashboard</h2>
          <p className="text-slate-500 text-sm mt-1">Warehouse module — blockchain verified</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
          <div key={0} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Storage Zones</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">4</p>
          </div>
          <div key={1} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Active Sensors</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">6</p>
          </div>
          <div key={2} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Items in Stock</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">9,950</p>
          </div>
          <div key={3} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Open Alerts</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">1</p>
          </div>
      </div>
    </div>
  );
};

export default WarehouseDashboard;
