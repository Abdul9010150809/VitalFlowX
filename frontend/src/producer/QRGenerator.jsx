import React from 'react';
import { QrCode, Printer } from 'lucide-react';
const QRGenerator = () => (
  <div className="max-w-4xl mx-auto animate-fade-in-up flex flex-col items-center">
     <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-slate-800">Physical Labels</h2>
        <p className="text-slate-500">Attach tracking visual identifiers to the outward packaging.</p>
     </div>
     <div className="bg-white p-12 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center hover:shadow-2xl transition-all">
        <div className="w-64 h-64 bg-slate-50 border-4 border-slate-800 rounded-xl flex items-center justify-center relative">
           {/* Abstract fake QR Pattern */}
           <div className="absolute inset-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-900 [mask-image:repeating-linear-gradient(45deg,transparent,transparent_10px,black_10px,black_20px)] opacity-80"></div>
           <QrCode className="w-20 h-20 text-white z-10 drop-shadow-xl" />
        </div>
        <p className="font-mono text-slate-400 font-bold tracking-widest mt-6">ID: SHP-X889-1-V</p>
        <button className="mt-8 px-8 py-4 bg-slate-900 text-white font-bold rounded-xl flex items-center gap-3 hover:-translate-y-1 transition-all"><Printer /> Print ZPL Label</button>
     </div>
  </div>
);
export default QRGenerator;