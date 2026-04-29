import React, { useState } from 'react';
import { CheckCircle2, Circle, AlertCircle, ThermometerSnowflake, Battery, Signal, Zap } from 'lucide-react';

const SensorCheck = () => {
  const [checklist, setChecklist] = useState([
    { id: 1, task: 'Cryogenic sensor initialized', status: 'optimal', value: '-72°C' },
    { id: 2, task: 'Battery levels (>90%)', status: 'optimal', value: '98%' },
    { id: 3, task: 'GSM/Satellite signal lock', status: 'optimal', value: 'Strong' },
    { id: 4, task: 'Tamper-evident seals checked', status: 'pending', value: '-' },
    { id: 5, task: 'Secondary backup calibrated', status: 'warning', value: 'Calibrating' },
  ]);

  const toggleStatus = (id) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, status: item.status === 'optimal' ? 'pending' : 'optimal' } : item
    ));
  };

  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      <div>
        <h2 className="text-3xl font-black text-slate-800">Pre-Trip Sensor Check</h2>
        <p className="text-slate-500 font-medium mt-1">Ensure all hardware is functional before initiating cold-chain logistics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">Hardware Readiness Checklist</h3>
          <div className="space-y-4">
            {checklist.map((item) => (
              <div 
                key={item.id} 
                onClick={() => toggleStatus(item.id)}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer hover:bg-slate-100 transition-all"
              >
                <div className="flex items-center gap-4">
                  {item.status === 'optimal' ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  ) : item.status === 'warning' ? (
                    <AlertCircle className="w-6 h-6 text-amber-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-300" />
                  )}
                  <span className={`font-bold text-sm ${item.status === 'optimal' ? 'text-slate-800' : 'text-slate-500'}`}>{item.task}</span>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-black px-2 py-1 rounded uppercase tracking-wider ${
                    item.status === 'optimal' ? 'bg-emerald-100 text-emerald-700' : 
                    item.status === 'warning' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-indigo-200">
            Sign-Off & Initialize Route
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-3xl p-8 text-white">
            <h4 className="text-xl font-black mb-6">Device Pulse</h4>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><ThermometerSnowflake className="w-5 h-5 text-blue-400"/></div>
                  <span className="text-sm font-bold">Probe A</span>
                </div>
                <span className="font-mono text-emerald-400 font-bold">-72.4°C</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><Battery className="w-5 h-5 text-emerald-400"/></div>
                  <span className="text-sm font-bold">Battery</span>
                </div>
                <span className="font-mono text-emerald-400 font-bold">98%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><Signal className="w-5 h-5 text-cyan-400"/></div>
                  <span className="text-sm font-bold">GSM</span>
                </div>
                <span className="font-mono text-emerald-400 font-bold">Stable</span>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="text-xs font-bold text-indigo-200">System Ready</span>
              </div>
              <span className="text-[10px] uppercase font-black tracking-widest text-indigo-400">Locked</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorCheck;
