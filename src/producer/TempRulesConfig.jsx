import React from 'react';
import { ThermometerSnowflake, Settings2 } from 'lucide-react';
const TempRulesConfig = () => (
  <div className="max-w-4xl mx-auto animate-fade-in-up space-y-6">
    <div className="flex items-center gap-4 mb-8">
      <div className="p-4 bg-cyan-100 text-cyan-700 rounded-2xl"><ThermometerSnowflake className="w-8 h-8" /></div>
      <div>
        <h2 className="text-3xl font-black text-slate-800">Temperature Rules Engine</h2>
        <p className="text-slate-500">Establish strict SLA boundaries written into the smart contract.</p>
      </div>
    </div>
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-cyan-900/5">
      <div className="space-y-8">
        {[ { title: 'Cryogenic Range', min: '-80°C', max: '-60°C', color: 'bg-indigo-500' },
           { title: 'Standard Cold', min: '-20°C', max: '0°C', color: 'bg-cyan-500' } ].map((rule, i) => (
          <div key={i} className="flex border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
             <div className={`w-2 ${rule.color}`}></div>
             <div className="flex-1 p-6 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{rule.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">Smart contract SLA trigger bounds.</p>
                </div>
                <div className="flex gap-4">
                  <div className="text-center"><span className="block text-xs uppercase text-slate-400 font-bold">MIN</span><span className="text-xl font-black text-slate-700">{rule.min}</span></div>
                  <div className="text-center"><span className="block text-xs uppercase text-slate-400 font-bold">MAX</span><span className="text-xl font-black text-slate-700">{rule.max}</span></div>
                </div>
             </div>
          </div>
        ))}
      </div>
      <button className="mt-8 w-full py-4 border-2 border-dashed border-cyan-300 text-cyan-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-cyan-50/50"><Settings2 /> Create Custom Rule</button>
    </div>
  </div>
);
export default TempRulesConfig;