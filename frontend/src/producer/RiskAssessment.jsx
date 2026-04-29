import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, Activity, TrendingUp, TrendingDown, Info } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const riskData = [
  { subject: 'Temp Stability', A: 120, fullMark: 150 },
  { subject: 'Route Safety', A: 98, fullMark: 150 },
  { subject: 'SLA History', A: 86, fullMark: 150 },
  { subject: 'Actor Trust', A: 140, fullMark: 150 },
  { subject: 'Hardware Age', A: 110, fullMark: 150 },
];

const historyData = [
  { name: 'Jan', risk: 40 }, { name: 'Feb', risk: 30 }, { name: 'Mar', risk: 20 },
  { name: 'Apr', risk: 45 }, { name: 'May', risk: 35 }, { name: 'Jun', risk: 25 },
];

const RiskAssessment = () => {
  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800">Risk Assessment Engine</h2>
          <p className="text-slate-500 font-medium mt-1">AI-driven predictive analysis of logistical vulnerabilities.</p>
        </div>
        <div className="flex items-center gap-2 px-6 py-3 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100 shadow-sm">
           <CheckCircle className="w-5 h-5" />
           <span className="font-black text-sm uppercase tracking-widest">Network Safe</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Radar Chart Panel */}
        <div className="lg:col-span-2 bg-white rounded-[40px] p-10 shadow-sm border border-slate-100">
           <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-2"><Activity className="w-5 h-5 text-indigo-500" /> Vulnerability Profile</h3>
           <div className="h-[400px]">
             <ResponsiveContainer width="100%" height="100%">
               <RadarChart cx="50%" cy="50%" outerRadius="80%" data={riskData}>
                 <PolarGrid stroke="#f1f5f9" />
                 <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 'bold' }} />
                 <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                 <Radar
                   name="Shipment Risk"
                   dataKey="A"
                   stroke="#4f46e5"
                   strokeWidth={3}
                   fill="#4f46e5"
                   fillOpacity={0.15}
                 />
               </RadarChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Risk Metrics */}
        <div className="space-y-6">
           <div className="bg-slate-900 rounded-[40px] p-8 text-white">
              <h4 className="text-lg font-black mb-6">Critical Risk Factors</h4>
              <div className="space-y-6">
                 {[
                   { label: 'Network Latency', val: 'Low', color: 'text-emerald-400', icon: TrendingDown },
                   { label: 'External Weather', val: 'Severe', color: 'text-red-400', icon: TrendingUp },
                   { label: 'Device Malfunction', val: '1.2%', color: 'text-amber-400', icon: TrendingUp },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between">
                     <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
                        <span className={`text-xl font-black ${item.color}`}>{item.val}</span>
                     </div>
                     <item.icon className={`w-8 h-8 ${item.color} opacity-20`} />
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 flex-1">
              <h4 className="font-black text-slate-800 mb-4 flex items-center gap-2"><Info className="w-5 h-5 text-indigo-600" /> Historical Trend</h4>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historyData}>
                    <Tooltip cursor={false} contentStyle={{ display: 'none' }} />
                    <Line type="monotone" dataKey="risk" stroke="#4f46e5" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[10px] text-slate-400 font-bold mt-4 uppercase tracking-widest text-center">30-Day Risk Fluctuation</p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default RiskAssessment;