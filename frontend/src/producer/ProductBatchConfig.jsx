import React from 'react';
import { Layers, Plus } from 'lucide-react';
const ProductBatchConfig = () => (
  <div className="max-w-6xl mx-auto animate-fade-in-up space-y-6">
    <div className="bg-gradient-to-r from-blue-900 to-indigo-800 rounded-3xl p-8 text-white shadow-xl flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-black">Batch Configuration</h2>
        <p className="text-blue-100 opacity-80 mt-1">Manage active product blueprints before shipment generation.</p>
      </div>
      <button className="bg-white text-indigo-900 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-50 transition-colors"><Plus /> New Batch</button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1,2,3].map(i => (
        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Layers /></div>
            <h3 className="font-bold text-slate-800">Batch Code #B-{i}89X</h3>
          </div>
          <div className="space-y-2 text-sm text-slate-600">
            <p><strong>Product:</strong> {i%2===0 ? 'Insulin Standard' : 'mRNA-1273'}</p>
            <p><strong>Volume:</strong> {i*500} Units</p>
            <p><strong>Standard:</strong> ISO-9001</p>
          </div>
          <button className="mt-6 w-full py-2 bg-slate-50 text-slate-600 rounded-lg font-semibold hover:bg-slate-100">Edit Config</button>
        </div>
      ))}
    </div>
  </div>
);
export default ProductBatchConfig;