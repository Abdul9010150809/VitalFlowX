import React from 'react';
import { PackagePlus } from 'lucide-react';
const CreateShipment = () => (
  <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
    <div>
      <h2 className="text-3xl font-black text-slate-800 tracking-tight">Initialize Shipment</h2>
      <p className="text-slate-500 mt-2 text-lg">Deploy a new cold chain product envelope onto the blockchain.</p>
    </div>
    <div className="bg-white rounded-3xl shadow-2xl shadow-blue-900/5 border border-slate-100 overflow-hidden">
      <div className="flex border-b border-slate-100 bg-slate-50/50">
         {['Product Details', 'Routing Plan', 'Sensor Hardware', 'Block Verify'].map((step, i) => (
           <div key={i} className={`flex-1 text-center py-4 text-xs lg:text-sm font-black tracking-widest ${i === 0 ? 'text-blue-600 border-b-2 border-blue-600 bg-white' : 'text-slate-400'}`}>STEP 0{i+1}: {step}</div>
         ))}
      </div>
      <div className="p-8 md:p-12 space-y-8">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-3">
             <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Product Identifier</label>
             <input type="text" placeholder="e.g. mRNA-1273 Batch X" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-slate-50 text-slate-800 font-medium font-mono" />
           </div>
           <div className="space-y-3">
             <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Quantity (Units)</label>
             <input type="number" placeholder="5000" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-slate-50 text-slate-800 font-medium font-mono" />
           </div>
         </div>
         <div className="pt-8 border-t border-slate-100 flex justify-end gap-4 mt-12">
            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black tracking-wide hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1">Next: Routing Engine &rarr;</button>
         </div>
      </div>
    </div>
  </div>
);
export default CreateShipment;