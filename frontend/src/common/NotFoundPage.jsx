import { Link } from 'react-router-dom';
import { Activity, Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-[20%] left-[30%] w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-[20%] right-[20%] w-[300px] h-[300px] bg-indigo-600/5 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>

      <div className="relative z-10 text-center animate-fade-in-up">
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">VitalFlow<span className="text-blue-400">X</span></span>
        </div>

        <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
        <p className="text-slate-500 max-w-md mx-auto mb-10">
          The blockchain node you're looking for doesn't exist in this network. It may have been moved or decommissioned.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-semibold hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/25 transition-all duration-300">
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <Link to="/login" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300">
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
