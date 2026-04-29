import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { ThermometerSnowflake, Activity, Download, Calendar } from 'lucide-react';

const mockTempData = [
  { time: '08:00', temp: -71.2 },
  { time: '09:00', temp: -70.5 },
  { time: '10:00', temp: -72.1 },
  { time: '11:00', temp: -69.8 },
  { time: '12:00', temp: -68.4 },
  { time: '13:00', temp: -67.9 }, // Close to threshold
  { time: '14:00', temp: -69.2 },
  { time: '15:00', temp: -70.5 },
  { time: '16:00', temp: -71.8 },
];

const TemperatureGraph = () => {
  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800">In-Transit Telemetry</h2>
          <p className="text-slate-500 font-medium mt-1">High-fidelity temperature monitoring with threshold enforcement.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all">
            <Calendar className="w-4 h-4" /> Today
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            <Download className="w-4 h-4" /> Export Logs
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <ThermometerSnowflake className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-slate-800">Ultra-Cold Stream</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Sensor: SN-991A</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold text-slate-400">Current Reading</span>
            <p className="text-2xl font-black text-emerald-500">-71.8°C</p>
          </div>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockTempData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTempStream" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <YAxis domain={[-75, -60]} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
              />
              <ReferenceLine y={-68} label={{ position: 'right', value: 'SLA MAX', fill: '#ef4444', fontSize: 10, fontWeight: 'bold' }} stroke="#ef4444" strokeDasharray="5 5" />
              <Area 
                type="monotone" 
                dataKey="temp" 
                stroke="#3b82f6" 
                strokeWidth={4} 
                fillOpacity={1} 
                fill="url(#colorTempStream)" 
                activeDot={{ r: 8, strokeWidth: 0, fill: '#3b82f6' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SLA Compliance</p>
              <p className="font-bold text-slate-800">100% In-Range</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
              <ThermometerSnowflake className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Average Temp</p>
              <p className="font-bold text-slate-800">-70.3°C</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data Points</p>
              <p className="font-bold text-slate-800">1,440 Logs / 24h</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemperatureGraph;
