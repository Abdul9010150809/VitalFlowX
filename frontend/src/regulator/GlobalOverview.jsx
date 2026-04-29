import { useState } from 'react';

const GlobalOverview = () => {
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
          <h2 className="text-2xl font-bold text-slate-800">Global Overview</h2>
          <p className="text-slate-500 text-sm mt-1">Regulator module — functionality enabled</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm text-center text-slate-500">
   <p className="mb-4">This section displays Global Overview data securely retrieved from the blockchain.</p>
   <button onClick={() => setSuccess(!success)} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200">
     {success ? 'Connected' : 'Click to Connect Node'}
   </button>
</div>
    </div>
  );
};

export default GlobalOverview;
