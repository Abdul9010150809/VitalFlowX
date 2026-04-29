import React from 'react';
import { FileWarning, HelpCircle } from 'lucide-react';
const ExceptionCase = () => (
  <div className="max-w-4xl mx-auto animate-fade-in-up space-y-6">
     <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-slate-800">Initiate Arbitration</h2>
        <p className="text-slate-500 mt-2">Submit documented disputes relating to rejected endpoints or damaged consignments.</p>
     </div>
     <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 text-slate-200"><HelpCircle className="w-32 h-32 opacity-20" /></div>
        <div className="relative z-10 space-y-6">
           <div className="space-y-2">
             <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Dispute Subject</label>
             <input type="text" placeholder="e.g. Broken SLA on Shipment X" className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 outline-none" />
           </div>
           <div className="space-y-2">
             <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Detailed Context</label>
             <textarea rows="4" placeholder="Describe the physical condition of the packaging upon arrival..." className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 outline-none"></textarea>
           </div>
           <button className="px-8 py-4 bg-red-600 text-white font-bold rounded-xl flex items-center gap-3 shadow-lg hover:bg-red-700 transition-colors"><FileWarning /> File Claim On-Chain</button>
        </div>
     </div>
  </div>
);
export default ExceptionCase;