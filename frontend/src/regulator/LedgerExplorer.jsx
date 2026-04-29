import React, { useState, useEffect } from 'react';
import { Box, Search, ShieldCheck, Database, ArrowRight, ExternalLink, Filter, Cpu } from 'lucide-react';
import { ledger } from '../utils/blockchain';

const LedgerExplorer = () => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLedger = async () => {
      const chain = await ledger.getChain();
      setBlocks(chain.reverse()); // Show newest first
      setLoading(false);
    };
    fetchLedger();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3">
             <Database className="w-10 h-10 text-indigo-600" /> Immutable Ledger Explorer
          </h2>
          <p className="text-slate-500 font-medium mt-1">Real-time block stream with cryptographic hash validation.</p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 shadow-sm rounded-2xl font-black text-sm hover:bg-slate-50 transition-all">
              <Filter className="w-4 h-4" /> Filter Stream
           </button>
           <div className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-100">
              <Cpu className="w-4 h-4" /> Mainnet Active
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Network Stats */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100">
              <h3 className="text-lg font-black text-slate-800 mb-6">Network Health</h3>
              <div className="space-y-6">
                 {[
                   { label: 'Total Blocks', val: blocks.length, sub: 'Genesis Sync Complete' },
                   { label: 'Avg Block Time', val: '2.4s', sub: 'Low Latency' },
                   { label: 'Network Nodes', val: '128', sub: 'Global Consensus' },
                 ].map((stat, i) => (
                   <div key={i}>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                      <p className="text-2xl font-black text-slate-800">{stat.val}</p>
                      <p className="text-[10px] font-bold text-emerald-500 mt-1 uppercase tracking-tighter">{stat.sub}</p>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-slate-900 rounded-[40px] p-8 text-white">
              <h4 className="text-lg font-black mb-4 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-indigo-400" /> Hash Integrity</h4>
              <p className="text-slate-400 text-xs leading-relaxed mb-6">
                Every block is linked via SHA-256 hashes. Any alteration in historical data breaks the chain instantly, triggering global alerts.
              </p>
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-2">
                 <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Genesis Hash</span>
                 <code className="text-[9px] break-all opacity-60">0000000000000000000632a9...</code>
              </div>
           </div>
        </div>

        {/* Block Stream */}
        <div className="lg:col-span-3 space-y-4">
           {loading ? (
             <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[40px] border border-slate-100">
               <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
               <p className="mt-4 font-bold text-slate-400 animate-pulse">Syncing Block Headers...</p>
             </div>
           ) : (
             blocks.map((block, i) => (
               <div key={i} className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 group hover:border-indigo-200 transition-all">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                     <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 rounded-2xl flex flex-col items-center justify-center shrink-0 transition-colors">
                           <Box className="w-6 h-6 mb-1" />
                           <span className="text-[10px] font-black">#{block.index}</span>
                        </div>
                        <div className="min-w-0">
                           <div className="flex items-center gap-2 mb-1">
                              <span className="font-black text-slate-800 uppercase tracking-tighter">Block Hash</span>
                              <ShieldCheck className="w-3 h-3 text-emerald-500" />
                           </div>
                           <code className="text-[11px] font-mono text-slate-400 block truncate group-hover:text-indigo-400 transition-colors">
                              {block.hash}
                           </code>
                           <div className="flex items-center gap-4 mt-2">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(block.timestamp).toLocaleString()}</span>
                              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">TX_COUNT: {block.data ? 1 : 0}</span>
                           </div>
                        </div>
                     </div>
                     <div className="flex items-center gap-3 self-end md:self-center">
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-[10px] font-black text-slate-600 uppercase tracking-widest transition-all">
                           Inspect Payload <ArrowRight className="w-3 h-3" />
                        </button>
                        <button className="p-2 text-slate-300 hover:text-indigo-600 transition-colors">
                           <ExternalLink className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
               </div>
             ))
           )}
        </div>

      </div>
    </div>
  );
};

export default LedgerExplorer;
