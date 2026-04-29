import React from 'react';
import { FileSearch, ShieldCheck } from 'lucide-react';
const DocumentPreview = () => (
  <div className="max-w-6xl mx-auto animate-fade-in-up grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div className="col-span-2 bg-slate-100 rounded-3xl border border-slate-200 overflow-hidden flex flex-col min-h-[600px] relative">
       <div className="bg-slate-800 text-slate-300 p-4 font-mono text-sm flex justify-between absolute top-0 w-full z-10 shadow-md">
          <span>file_preview_renderer.pdf</span>
          <span>Zoom: 100%</span>
       </div>
       <div className="flex-1 flex items-center justify-center text-slate-400 mt-12 bg-white m-8 shadow-2xl">
          <FileSearch className="w-12 h-12 opacity-50" />
       </div>
    </div>
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 space-y-6">
      <h3 className="text-xl font-black text-slate-800 border-b border-slate-100 pb-4">Verification Metadata</h3>
      <div className="space-y-4">
         <div><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Document Status</p><p className="font-bold text-emerald-600 flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> Verified Valid</p></div>
         <div><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">IPFS Hash (CID)</p><p className="font-mono text-xs text-blue-600 bg-blue-50 p-2 rounded">QmYwAPJzv5CZsnA625s3Xf2n...</p></div>
         <div><p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Timestamp Signed</p><p className="font-bold text-slate-700">2026-04-29 14:02 UTC</p></div>
      </div>
      <button className="w-full mt-4 py-3 bg-slate-900 text-white rounded-xl font-bold">Attach to Ledger &rarr;</button>
    </div>
  </div>
);
export default DocumentPreview;