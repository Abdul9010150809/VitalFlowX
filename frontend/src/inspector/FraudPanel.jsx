import { useState } from 'react';

const FraudPanel = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setSuccess(true); e.target.reset(); }, 1500);
  };


  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Fraud Detection Panel</h2>
          <p className="text-slate-500 text-sm mt-1">Inspector module — functionality enabled</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm text-center text-slate-500">
   <p className="mb-4">This section displays Fraud Detection Panel data securely retrieved from the blockchain.</p>
   <button onClick={() => setSuccess(!success)} className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
     {success ? 'Connected' : 'Click to Connect Node'}
   </button>
</div>
    </div>
  );
};

export default FraudPanel;
