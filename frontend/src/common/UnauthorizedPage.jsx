import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="max-w-xl w-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-10 shadow-2xl">
        <div className="flex items-center gap-3 mb-6 text-rose-300">
          <ShieldAlert className="w-7 h-7" />
          <span className="text-xs font-black uppercase tracking-[0.3em]">Access Restricted</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">You are not authorized for this workspace</h1>
        <p className="text-slate-300 leading-relaxed mb-8">
          The current role does not have permission to view this dashboard. Return to the role selector and sign in with an allowed role.
        </p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-950 font-bold hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;