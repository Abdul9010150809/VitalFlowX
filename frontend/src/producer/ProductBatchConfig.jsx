import React, { useState } from 'react';
import { Package, Settings, Database, ShieldCheck, Plus, Trash2, Info } from 'lucide-react';

const ProductBatchConfig = () => {
  const [batches, setBatches] = useState([
    { id: 'B-8812', name: 'Ultra-Cold Vaccine', targetTemp: '-72°C', shelfLife: '24 Months' },
    { id: 'B-8813', name: 'Plasma Supply', targetTemp: '4°C', shelfLife: '6 Months' },
  ]);

  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800">Product & Batch Configuration</h2>
          <p className="text-slate-500 font-medium mt-1">Define environmental thresholds and batch-level metadata.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
          <Plus className="w-5 h-5" /> Define New Batch
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 overflow-hidden">
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead>
                   <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                     <th className="pb-4 px-4">Batch ID</th>
                     <th className="pb-4 px-4">Product Name</th>
                     <th className="pb-4 px-4">SLA Temp</th>
                     <th className="pb-4 px-4 text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                   {batches.map((batch, i) => (
                     <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                       <td className="py-5 px-4 font-bold text-slate-800">{batch.id}</td>
                       <td className="py-5 px-4 font-bold text-slate-800">{batch.name}</td>
                       <td className="py-5 px-4">
                         <span className="px-3 py-1 bg-blue-100 text-blue-700 font-black text-[10px] rounded-lg">{batch.targetTemp}</span>
                       </td>
                       <td className="py-5 px-4 text-right">
                         <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 text-slate-400 hover:text-indigo-600"><Settings className="w-4 h-4" /></button>
                            <button className="p-2 text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                         </div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl flex items-start gap-4">
            <Info className="w-6 h-6 text-amber-600 shrink-0" />
            <p className="text-sm text-amber-800 font-medium leading-relaxed">
              <strong>Tip:</strong> Changing batch SLA parameters will trigger a smart contract update. All currently active shipments using this batch ID will be flagged for re-verification.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-[40px] p-8 text-white">
            <h3 className="text-xl font-black mb-6 flex items-center gap-2"><Database className="w-5 h-5 text-indigo-400" /> Batch Governance</h3>
            <p className="text-slate-400 text-sm mb-8">Establish immutable rules for product handling across the network.</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <span className="text-xs font-bold">Standard: ISO 22000</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <span className="text-xs font-bold">QA Signature Required</span>
                <span className="text-[10px] bg-indigo-500 px-2 py-0.5 rounded font-black">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBatchConfig;