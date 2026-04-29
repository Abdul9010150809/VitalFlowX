import React from 'react';
import { Activity, AlertTriangle, Package, TrendingUp, Box, Zap, Link } from 'lucide-react';

const ProducerDashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-32 w-32 rounded-full bg-indigo-500/20 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">VitalFlowX <span className="text-blue-400">Producer Center</span></h1>
            <p className="text-blue-100/80 text-sm md:text-base max-w-xl">
              Blockchain-enabled cold chain logistics. Monitoring end-to-end telemetry and immutable verifications.
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-inner">
            <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span></span>
            <span className="text-sm font-medium tracking-wide">Blockchain Sync: Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[ { label: 'Active Shipments', val: 12, icon: Package, color: 'from-blue-500 to-cyan-400' },
           { label: 'Critical Alerts', val: 2, icon: AlertTriangle, color: 'from-orange-500 to-red-500' },
           { label: 'Blockchain TXs', val: '1,492', icon: Link, color: 'from-indigo-500 to-purple-500' },
           { label: 'Success Rate', val: '99.8%', icon: Activity, color: 'from-emerald-400 to-teal-500' }
        ].map((stat, i) => (
          <div key={i} className="group relative bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-full group-hover:scale-110 transition-transform duration-500`}></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider">{stat.label}</p>
                <p className="text-3xl font-black text-slate-800 mt-2 tracking-tight">{stat.val}</p>
              </div>
              <div className={`p-4 bg-gradient-to-br ${stat.color} text-white rounded-xl shadow-lg`}> <stat.icon className="w-6 h-6"/> </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProducerDashboard;