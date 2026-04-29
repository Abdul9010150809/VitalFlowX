import React from 'react';
import { Cpu, WifiHigh } from 'lucide-react';
const SensorBinding = () => (
   <div className="max-w-5xl mx-auto animate-fade-in-up space-y-8">
      <div className="text-center">
         <h2 className="text-3xl font-black text-slate-800">Hardware Sensor Binding</h2>
         <p className="text-slate-500 mt-2">Pair registered local IoT sensors to your active shipments via Bluetooth/RFID.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/10 rounded-full animate-ping"></div>
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-blue-500/30 rounded-full animate-ping delay-150"></div>
           <div className="flex flex-col items-center justify-center h-64 relative z-10">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-600/50">
                 <WifiHigh className="w-10 h-10" />
               </div>
               <p className="text-blue-200 mt-6 font-mono tracking-widest font-semibold">SCANNING FOR HARDWARE...</p>
           </div>
        </div>
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
           <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><Cpu className="text-indigo-600"/> Available Devices</h3>
           <div className="space-y-4">
             {[1,2].map(i => (
               <div key={i} className="p-4 border border-slate-100 rounded-xl hover:bg-slate-50 flex justify-between items-center transition-colors cursor-pointer">
                 <div>
                   <p className="font-bold text-slate-800">Sensor Node X-{i}A</p>
                   <p className="text-xs font-mono text-emerald-500 mt-1">BATTERY: 9{i}% | SIGNAL: STRONG</p>
                 </div>
                 <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold shadow-md">Bind To Batch</button>
               </div>
             ))}
           </div>
        </div>
      </div>
   </div>
);
export default SensorBinding;