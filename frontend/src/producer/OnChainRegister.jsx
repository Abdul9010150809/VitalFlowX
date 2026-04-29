import React from 'react';
import { Terminal, Lock } from 'lucide-react';
const OnChainRegister = () => (
   <div className="max-w-3xl mx-auto animate-fade-in-up">
      <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 text-green-400 font-mono text-sm leading-relaxed relative">
        <div className="bg-slate-800 p-4 border-b border-slate-700 flex gap-2 items-center text-slate-400 font-sans">
           <Terminal className="w-5 h-5"/> <span>Smart Contract Executor</span>
        </div>
        <div className="p-8 space-y-4">
           <p className="opacity-80">&gt; Initializing consensus protocol...</p>
           <p className="opacity-80">&gt; Compiling shipment variables constraints...</p>
           <p className="opacity-80">&gt; Pinging nodes 1... 4... 12... [OK]</p>
           <p className="text-yellow-400">&gt; Requesting Signature payload required for TX allocation.</p>
           
           <div className="mt-8 p-6 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-md relative z-10 flex flex-col items-center justify-center text-center">
              <Lock className="w-10 h-10 text-yellow-500 mb-4 animate-pulse" />
              <p className="text-white font-sans font-bold text-lg mb-4">Sign Contract To Execute</p>
              <button className="px-8 py-3 bg-green-500 text-slate-900 font-black rounded hover:bg-green-400 transition-colors">APPROVE TRANSACTION</button>
           </div>
        </div>
      </div>
   </div>
);
export default OnChainRegister;