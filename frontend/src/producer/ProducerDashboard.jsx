import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Activity, ShieldCheck, AlertTriangle, Zap, Leaf, Anchor, Settings, Globe, Package, Navigation, Network, CheckSquare, Search, Download } from 'lucide-react';

const analyticsData = [
  { name: 'Mon', compliance: 100, tempAnomalies: 0 },
  { name: 'Tue', compliance: 98, tempAnomalies: 2 },
  { name: 'Wed', compliance: 99, tempAnomalies: 1 },
  { name: 'Thu', compliance: 100, tempAnomalies: 0 },
  { name: 'Fri', compliance: 95, tempAnomalies: 5 },
  { name: 'Sat', compliance: 100, tempAnomalies: 0 },
  { name: 'Sun', compliance: 100, tempAnomalies: 0 },
];

const producerFeatures = [
  { name: 'Batch Genealogy Tracking', icon: Network, desc: 'Trace ingredients to sub-suppliers' },
  { name: 'Dynamic QR Generation', icon: Search, desc: 'Generate verifiable tokens' },
  { name: 'Smart Contract Automation', icon: Zap, desc: 'Auto-deploy SLA conditions' },
  { name: 'IoT Sensor Provisioning', icon: Activity, desc: 'Pair MAC addresses to shipments' },
  { name: 'Cold-Chain Rule Engine', icon: Settings, desc: 'Customize safe temp ranges' },
  { name: 'Digital Twin Dashboard', icon: Package, desc: 'Visual sensor placement' },
  { name: 'Document Hasher', icon: Anchor, desc: 'Anchor invoices to ledger' },
  { name: 'Predictive Analytics', icon: Activity, desc: 'AI-based SLA breach prediction' },
  { name: 'Producer Trust Score', icon: ShieldCheck, desc: 'Historical success metrics' },
  { name: 'Multi-Signature Approvals', icon: CheckSquare, desc: 'QA sign-off requirement' },
  { name: 'Recall Management System', icon: AlertTriangle, desc: 'Flag tokens globally' },
  { name: 'Carbon Footprint Estimator', icon: Leaf, desc: 'Calculate emissions by route' },
  { name: 'Real-Time Fleet API', icon: Navigation, desc: 'Live transporter telemetry' },
  { name: 'Geofence Origin Setup', icon: Globe, desc: 'Define facility coordinates' },
  { name: 'Audit Export Module', icon: Download, desc: 'PDF generation for regulators' },
];

const ProducerDashboard = () => (
  <div className="space-y-8 animate-fade-in-up pb-12">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h2 className="text-3xl font-black text-slate-800">Producer Command Center</h2>
        <p className="text-slate-500 font-medium mt-1">Origin point for cold-chain intelligence and blockchain integrity.</p>
      </div>
      <div className="flex items-center gap-3 bg-indigo-50 px-5 py-3 rounded-2xl border border-indigo-100 shadow-sm shadow-indigo-100">
         <div className="w-12 h-12 rounded-full relative">
           <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-indigo-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
              <path className="text-indigo-600 animate-[dash_2s_ease-out_forwards]" strokeDasharray="98, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
           </svg>
           <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-indigo-800">98%</div>
         </div>
         <div>
           <p className="text-xs font-black uppercase tracking-widest text-indigo-400">Network Trust Score</p>
           <p className="font-bold text-indigo-900">Highly Trusted Origin</p>
         </div>
      </div>
    </div>

    {/* Analytics & Exception Summary */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2"><Activity className="w-5 h-5 text-indigo-500"/> SLA Compliance & Exceptions</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analyticsData}>
              <defs>
                <linearGradient id="colorCompliance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend />
              <Area type="monotone" dataKey="compliance" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorCompliance)" />
              <Area type="monotone" dataKey="tempAnomalies" stroke="#ef4444" strokeWidth={3} fill="none" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col">
        <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-500"/> Active Exceptions</h3>
        <div className="space-y-4 flex-1">
          {[
            { severity: 'CRITICAL', msg: 'Temp breach (-5°C) on VTX-992A', status: 'UNRESOLVED' },
            { severity: 'WARNING', msg: 'Missing QA Document for VTX-110B', status: 'PENDING' },
            { severity: 'INFO', msg: 'Transporter delayed by 2 hours', status: 'ACKNOWLEDGED' }
          ].map((alert, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className={`text-[10px] font-black tracking-widest px-2 py-1 rounded-md ${alert.severity === 'CRITICAL' ? 'bg-red-100 text-red-700' : alert.severity === 'WARNING' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>{alert.severity}</span>
                <span className="text-[10px] font-bold text-slate-400">{alert.status}</span>
              </div>
              <p className="text-sm font-medium text-slate-700">{alert.msg}</p>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-3 bg-indigo-50 text-indigo-600 font-bold rounded-xl hover:bg-indigo-100 transition-colors">Resolve All</button>
      </div>
    </div>

    {/* 15 Features Grid */}
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
      <div className="mb-8">
        <h3 className="text-xl font-black text-slate-800">Advanced Producer Capabilities (15 Modules)</h3>
        <p className="text-slate-500">Comprehensive toolset for origin-point verification and logistics orchestration.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {producerFeatures.map((feat, i) => (
          <div key={i} className="p-5 rounded-2xl border border-slate-100 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100 transition-all cursor-pointer bg-gradient-to-b from-white to-slate-50 group">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <feat.icon className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">{feat.name}</h4>
            <p className="text-xs text-slate-500">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ProducerDashboard;