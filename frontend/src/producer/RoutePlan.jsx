import React from 'react';
import { Map, MapPin } from 'lucide-react';
const RoutePlan = () => (
   <div className="max-w-5xl mx-auto animate-fade-in-up space-y-8">
      <h2 className="text-3xl font-black text-slate-800">Dynamic Routing Matrix</h2>
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 bg-slate-50 p-8 border-r border-slate-100">
           <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><Map /> Defined Nodes</h3>
           <div className="space-y-8">
             {['Producer Site (NYC)', 'Distribution Hub', 'Retail Pharmacy'].map((node, i) => (
               <div key={i} className="relative flex items-center gap-4">
                 {i !== 2 && <div className="absolute top-10 left-5 bottom-[-30px] w-0.5 bg-blue-200"></div>}
                 <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 border border-blue-200 flex items-center justify-center font-black z-10">{i+1}</div>
                 <span className="font-semibold text-slate-700">{node}</span>
               </div>
             ))}
           </div>
        </div>
        <div className="w-full md:w-2/3 p-8 flex items-center justify-center bg-slate-900 relative overflow-hidden">
           <div className="absolute inset-0 bg-blue-900/20 blur-2xl"></div>
           <div className="relative z-10 text-center">
             <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-4 animate-bounce" />
             <h3 className="text-white text-xl font-bold">Interactive Geo-Fence Engine</h3>
             <p className="text-slate-400 mt-2 max-w-sm mx-auto">Blockchain-approved geographical coordinates will trigger Smart Contract handoffs.</p>
             <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500">Configure Rules</button>
           </div>
        </div>
      </div>
   </div>
);
export default RoutePlan;