import React from 'react';
import { UploadCloud, FileText } from 'lucide-react';
const UploadDocs = () => (
  <div className="max-w-3xl mx-auto animate-fade-in-up flex flex-col items-center justify-center py-10">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-black text-slate-800">Upload Certifications</h2>
      <p className="text-slate-500">Documents will be hashed and verified via InterPlanetary File System (IPFS).</p>
    </div>
    <div className="w-full bg-slate-50 border-2 border-dashed border-slate-300 rounded-3xl p-16 flex flex-col items-center justify-center text-center hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-pointer">
       <UploadCloud className="w-16 h-16 text-blue-500 mb-4 animate-bounce" />
       <h3 className="text-xl font-bold text-slate-700">Drag & Drop Files Here</h3>
       <p className="text-slate-500 mt-2">Supports PDF, JSON, PNG up to 50MB</p>
       <button className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:-translate-y-1 transition-all">Browse Files</button>
    </div>
  </div>
);
export default UploadDocs;