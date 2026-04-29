import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, XCircle } from 'lucide-react';

const AlertResponse = () => {
  const [alerts, setAlerts] = useState([
    { id: 'ALT-001', type: 'Temp Breach', severity: 'Critical', status: 'Pending', time: '10 mins ago', message: 'Sensor SN-991A reporting -62°C (Threshold -68°C)' },
    { id: 'ALT-002', type: 'Route Deviation', severity: 'Warning', status: 'In Progress', time: '45 mins ago', message: 'Vehicle diverted from planned route 66' },
    { id: 'ALT-003', type: 'Sensor Failure', severity: 'High', status: 'Resolved', time: '2 hours ago', message: 'Battery low on Sensor SN-993C' },
  ]);

  const handleResolve = (id) => {
    setAlerts(alerts.map(alert => alert.id === id ? { ...alert, status: 'Resolved' } : alert));
  };

  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      <div>
        <h2 className="text-3xl font-black text-slate-800">Alert Response Queue</h2>
        <p className="text-slate-500 font-medium mt-1">Real-time incident management and mitigation.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {alerts.map((alert) => (
          <div key={alert.id} className={`bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:shadow-md`}>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                alert.severity === 'Critical' ? 'bg-red-50 text-red-600' : 
                alert.severity === 'High' ? 'bg-orange-50 text-orange-600' : 'bg-amber-50 text-amber-600'
              }`}>
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">{alert.type}</span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                    alert.status === 'Pending' ? 'bg-red-100 text-red-700' : 
                    alert.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>{alert.status}</span>
                </div>
                <p className="text-sm text-slate-600 mt-1">{alert.message}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {alert.time}</span>
                  <span className="text-xs text-slate-400">ID: {alert.id}</span>
                </div>
              </div>
            </div>
            
            {alert.status !== 'Resolved' && (
              <div className="flex gap-2 w-full md:w-auto">
                <button 
                  onClick={() => handleResolve(alert.id)}
                  className="flex-1 md:flex-none px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" /> Resolve
                </button>
                <button className="flex-1 md:flex-none px-4 py-2 bg-slate-100 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                  <XCircle className="w-4 h-4" /> Dismiss
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertResponse;
