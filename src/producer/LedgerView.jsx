import React from 'react';
import { Database, Link2 } from 'lucide-react';
const LedgerView = () => (
  <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up">
    <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl border border-slate-800">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
      <div className="relative z-10 flex items-center gap-6">
        <div className="p-4 bg-indigo-500/20 backdrop-blur-xl rounded-2xl border border-indigo-500/30"><Database className="w-8 h-8 text-indigo-400" /></div>
        <div>
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight">Immutable Ledger</h2>
          <p className="text-slate-400 mt-2 text-lg">Real-time cryptographic proofs and block-chain verifications.</p>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto p-4 flex flex-col items-center justify-center text-slate-400 py-20 min-h-[400px]">
         <div className="animate-pulse w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
         <p className="font-mono text-sm uppercase tracking-widest font-bold text-indigo-900/50">Fetching Merkle Trees...</p>
      </div>
    </div>
  </div>
);
export default LedgerView;