import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { TokenGenerator } from '../utils/tokenGenerator';
import { ledger } from '../utils/blockchain';

const CreateShipment = () => {
  const [product, setProduct] = useState('');
  const [qty, setQty] = useState('');
  const [step, setStep] = useState(1);
  const [qrPayload, setQrPayload] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGenerate = async () => {
    if (!product || !qty) return;
    setIsSubmitting(true);
    const token = TokenGenerator.generateTrackingToken(product, 'OriginHub');
    const payload = TokenGenerator.generateQRPayload(token, { product, qty });
    setQrPayload(payload);
    
    // Commit to backend blockchain
    await ledger.addTransaction({
      action: 'SHIPMENT_CREATED',
      token,
      product,
      qty,
      producer: 'Producer Admin'
    });
    
    setIsSubmitting(false);
    setStep(2);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      <div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Initialize Shipment</h2>
        <p className="text-slate-500 mt-2 text-lg">Deploy a new cold chain product envelope onto the blockchain.</p>
      </div>
      <div className="bg-white rounded-3xl shadow-2xl shadow-indigo-900/5 border border-slate-100 overflow-hidden">
        <div className="flex border-b border-slate-100 bg-slate-50/50">
           {['Product Details', 'Generate Token & QR'].map((s, i) => (
             <div key={i} className={`flex-1 text-center py-4 text-xs lg:text-sm font-black tracking-widest ${i + 1 === step ? 'text-indigo-600 border-b-2 border-indigo-600 bg-white' : 'text-slate-400'}`}>STEP 0{i+1}: {s}</div>
           ))}
        </div>
        <div className="p-8 md:p-12 space-y-8">
           {step === 1 ? (
             <>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                   <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Product Identifier</label>
                   <input type="text" value={product} onChange={e => setProduct(e.target.value)} placeholder="e.g. mRNA-1273 Batch X" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all outline-none bg-slate-50 text-slate-800 font-medium font-mono" />
                 </div>
                 <div className="space-y-3">
                   <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Quantity (Units)</label>
                   <input type="number" value={qty} onChange={e => setQty(e.target.value)} placeholder="5000" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all outline-none bg-slate-50 text-slate-800 font-medium font-mono" />
                 </div>
               </div>
               <div className="pt-8 border-t border-slate-100 flex justify-end gap-4 mt-12">
                  <button onClick={handleGenerate} disabled={isSubmitting} className={`px-8 py-4 rounded-xl text-white font-black tracking-wide transition-all duration-300 ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-indigo-800 hover:shadow-xl hover:shadow-indigo-600/30 hover:-translate-y-1'}`}>
                    {isSubmitting ? 'Submitting to Blockchain...' : 'Generate Token & Blockchain TX \u2192'}
                  </button>
               </div>
             </>
           ) : (
             <div className="flex flex-col items-center justify-center space-y-6">
               <div className="p-6 bg-white border-2 border-dashed border-indigo-200 rounded-2xl shadow-sm">
                 <QRCodeSVG value={qrPayload} size={256} level="H" includeMargin={true} />
               </div>
               <div className="text-center space-y-2">
                 <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest">✓ Committed to Ledger</p>
                 <p className="font-mono text-xs text-slate-500 bg-slate-100 px-4 py-2 rounded-lg">{JSON.parse(qrPayload).token}</p>
               </div>
               <button onClick={() => {setStep(1); setProduct(''); setQty('');}} className="px-6 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg font-bold text-sm transition-colors">Create Another</button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
export default CreateShipment;