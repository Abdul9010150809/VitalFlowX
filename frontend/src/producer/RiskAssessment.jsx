import React from 'react';
import { HeartPulse, CheckSquare } from 'lucide-react';
const RiskAssessment = () => (
  <div className="max-w-5xl mx-auto animate-fade-in-up space-y-6">
     <div className="text-center mb-10"><h2 className="text-3xl font-black text-slate-800">AI Risk Matrix</h2></div>
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[ { label: 'Route Vulnerability', risk: 'Low', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
           { label: 'Carrier History', risk: 'Medium', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
           { label: 'Spoilage Probability', risk: 'Low', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
        ].map((item, i) => (
          <div key={i} className={`p-6 rounded-2xl border ${item.color} flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden`}>
             <h3 className="font-bold text-lg mb-2">{item.label}</h3>
             <span className="text-sm font-black uppercase tracking-widest opacity-80 backdrop-blur-md px-3 py-1 rounded bg-white/50">{item.risk} RISK</span>
          </div>
        ))}
     </div>
     <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl mt-8 flex justify-between items-center">
       <div>
         <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2"><CheckSquare className="w-5 h-5 text-blue-500"/> Assessment Passed</h4>
         <p className="text-slate-500 text-sm mt-1">This shipment has a 98% probability of success according to ledger models.</p>
       </div>
       <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold">Acknowledge</button>
     </div>
  </div>
);
export default RiskAssessment;