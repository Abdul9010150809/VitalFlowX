import React from 'react';
import { Shield } from 'lucide-react';
const ActorKeySetup = () => (
  <div className="max-w-4xl mx-auto animate-fade-in-up space-y-6">
    <div className="flex gap-4 items-center mb-8 border-b border-slate-100 pb-4">
      <div className="p-3 bg-red-50 text-red-600 rounded-xl"><Shield className="w-8 h-8"/></div>
      <div>
        <h2 className="text-2xl font-black text-slate-800">Security Credentials</h2>
        <p className="text-slate-500">Manage your private encryption keys used to sign transactions.</p>
      </div>
    </div>
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 space-y-6 border border-slate-100">
       <div className="space-y-2">
         <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Public Wallet Address (Identity)</label>
         <div className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-600 flex justify-between items-center text-sm">
            0x71C...49A2 
            <button className="text-blue-600 font-bold hover:underline font-sans text-xs">Copy</button>
         </div>
       </div>
       <div className="space-y-2">
         <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Master Private Signature Key</label>
         <div className="w-full px-5 py-4 bg-red-50 border border-red-200 rounded-xl font-mono text-red-600 flex justify-between items-center text-sm">
            ************************************************
            <button className="text-red-700 font-bold hover:underline font-sans text-xs">Reveal</button>
         </div>
         <p className="text-xs text-slate-400 font-semibold mt-2">DANGER: Never share this key with anyone. It gives full control.</p>
       </div>
    </div>
  </div>
);
export default ActorKeySetup;