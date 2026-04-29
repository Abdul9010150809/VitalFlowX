import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, ClipboardCheck, User, MapPin, Package } from 'lucide-react';

const DeliveryConfirm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    shipment_id: '',
    receiver_name: '',
    delivery_notes: '',
    condition: 'Optimal'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate Blockchain Transaction
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-emerald-200">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-black text-slate-800">Delivery Confirmed</h2>
        <p className="text-slate-500 font-medium mt-2 max-w-md text-center">
          The shipment has been successfully handed over and the transaction is anchored on the blockchain.
        </p>
        <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100 font-mono text-xs text-slate-500">
          TX_HASH: 0x77d2...e8a1
        </div>
        <button 
          onClick={() => setSuccess(false)}
          className="mt-10 px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
        >
          Confirm Another Delivery
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up pb-12">
      <div>
        <h2 className="text-3xl font-black text-slate-800">Delivery Confirmation</h2>
        <p className="text-slate-500 font-medium mt-1">Final sign-off and blockchain custody transfer.</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Package className="w-3 h-3" /> Shipment ID
                </label>
                <input 
                  type="text" 
                  name="shipment_id" 
                  required 
                  value={formData.shipment_id}
                  onChange={handleChange}
                  placeholder="VTX-XXXX" 
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <User className="w-3 h-3" /> Receiver Name
                </label>
                <input 
                  type="text" 
                  name="receiver_name" 
                  required 
                  value={formData.receiver_name}
                  onChange={handleChange}
                  placeholder="Full Name" 
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-3 h-3" /> Delivery Condition
              </label>
              <div className="grid grid-cols-3 gap-4">
                {['Optimal', 'Alert', 'Damaged'].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setFormData({ ...formData, condition: status })}
                    className={`py-3 rounded-xl border font-bold text-sm transition-all ${
                      formData.condition === status 
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' 
                      : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-300'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <ClipboardCheck className="w-3 h-3" /> Delivery Notes
              </label>
              <textarea 
                name="delivery_notes" 
                rows="3"
                value={formData.delivery_notes}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all" 
                placeholder="Add any final delivery details..."
              ></textarea>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-4 rounded-2xl font-black text-white shadow-xl transition-all flex items-center justify-center gap-3 ${
                  isSubmitting 
                  ? 'bg-slate-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:scale-[1.02] shadow-indigo-200'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Anchoring on Blockchain...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-6 h-6" /> Complete Delivery
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeliveryConfirm;
