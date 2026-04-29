import React, { useState } from 'react';
import { WifiOff, RotateCw, Database, CheckCircle, Smartphone, HardDriveDownload } from 'lucide-react';

const OfflineQueue = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [queuedItems, setQueuedItems] = useState([
    { id: 'TX-901', type: 'Pickup', time: '14:20', data: 'Shipment VTX-99A @ Origin', status: 'pending' },
    { id: 'TX-902', type: 'Handoff', time: '16:45', data: 'Custody -> WH-01', status: 'pending' },
    { id: 'TX-903', type: 'Sensor Sync', time: '18:10', data: 'Batch of 50 temp logs', status: 'pending' },
  ]);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setQueuedItems([]);
    }, 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800">Offline Transaction Queue</h2>
          <p className="text-slate-500 font-medium mt-1">Local edge storage for transactions recorded without network access.</p>
        </div>
        <button 
          onClick={handleSync}
          disabled={isSyncing || queuedItems.length === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black transition-all ${
            isSyncing || queuedItems.length === 0 
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
            : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-200'
          }`}
        >
          <RotateCw className={`w-5 h-5 ${isSyncing ? 'animate-spin' : ''}`} />
          {isSyncing ? 'Syncing with Ledger...' : 'Sync All Pending'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {queuedItems.length > 0 ? (
            queuedItems.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 text-slate-500 rounded-2xl flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{item.type}</span>
                      <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase">Local Hash Only</span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{item.data}</p>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest">{item.time} • ID: {item.id}</p>
                  </div>
                </div>
                <div className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Smartphone className="w-5 h-5" />
                </div>
              </div>
            ))
          ) : (
            <div className="bg-emerald-50 border border-emerald-100 p-12 rounded-3xl text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black text-emerald-800">Queue is Clear</h3>
              <p className="text-emerald-600 font-medium mt-2 max-w-sm">All local transactions have been successfully broadcast and anchored on the blockchain.</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h4 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2"><WifiOff className="w-5 h-5 text-amber-500" /> Offline Mode Info</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              VitalFlowX edge modules allow transporters to log events in dead-zones (low signal). 
              Each transaction is timestamped and cryptographically hashed locally on the device's secure enclave.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <HardDriveDownload className="w-5 h-5 text-indigo-500" />
                <div className="flex-1">
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[12%] rounded-full"></div>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Storage: 1.2MB / 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineQueue;
