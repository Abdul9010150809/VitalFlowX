import React, { useState } from 'react';
import { QrCode, Download, RefreshCw, Share2, ShieldCheck, Zap } from 'lucide-react';

const QRGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [token, setToken] = useState('VTX-992A-SECURE-TOKEN');

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setToken(`VTX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800">Dynamic QR Generator</h2>
          <p className="text-slate-500 font-medium mt-1">Generate immutable shipment tokens for physical labeling.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
          <div className="w-64 h-64 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex items-center justify-center relative group overflow-hidden">
            {isGenerating ? (
              <RefreshCw className="w-12 h-12 text-indigo-600 animate-spin" />
            ) : (
              <>
                <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Download className="w-10 h-10 text-indigo-600" />
                </div>
                <QrCode className="w-48 h-48 text-slate-800" />
              </>
            )}
          </div>
          
          <div className="mt-8 space-y-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Token ID</p>
            <code className="bg-slate-100 px-4 py-2 rounded-xl text-indigo-600 font-bold text-sm block">{token}</code>
          </div>

          <div className="flex gap-3 mt-10 w-full">
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex-1 bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" /> Regerenerate
            </button>
            <button className="px-6 bg-slate-100 text-slate-600 font-black py-4 rounded-2xl hover:bg-slate-200 transition-all">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-[40px] p-8 text-white">
            <h3 className="text-xl font-black mb-6 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-indigo-400" /> Security Protocol</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Each generated QR code contains a cryptographically signed payload including the producer's ID, batch metadata, and a timestamp. 
              Once scanned at the first handoff, the token is permanently locked to that shipment instance on the blockchain.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <span className="text-xs font-bold">Standard: GS1 Digital Link</span>
                <span className="text-[10px] bg-indigo-500 px-2 py-0.5 rounded font-black">ACTIVE</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <span className="text-xs font-bold">Encryption: SHA-256</span>
                <span className="text-[10px] bg-indigo-500 px-2 py-0.5 rounded font-black">VERIFIED</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100">
             <h4 className="font-black text-slate-800 mb-4 flex items-center gap-2"><Share2 className="w-5 h-5 text-indigo-600" /> Distribution</h4>
             <p className="text-xs text-slate-500 mb-6">Automatically send the generated token to labeling partner or API endpoint.</p>
             <button className="w-full py-3 bg-slate-50 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-all">
               Link External Fleet API
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;