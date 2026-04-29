import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Activity, ShieldCheck, AlertTriangle, Zap, Leaf, Anchor, Settings, Globe, Package, Navigation, Network, CheckSquare, Search, Download, Truck } from 'lucide-react';
import { useShipments } from '../context/ShipmentContext';

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
  { name: 'Batch Genealogy Tracking', icon: Network, desc: 'Trace ingredients to sub-suppliers', path: '/producer/productbatchconfig' },
  { name: 'Dynamic QR Generation', icon: Search, desc: 'Generate verifiable tokens', path: '/producer/qrgenerator' },
  { name: 'Smart Contract Automation', icon: Zap, desc: 'Auto-deploy SLA conditions', path: '/producer/onchainregister' },
  { name: 'IoT Sensor Provisioning', icon: Activity, desc: 'Pair MAC addresses to shipments', path: '/producer/sensorbinding' },
  { name: 'Cold-Chain Rule Engine', icon: Settings, desc: 'Customize safe temp ranges', path: '/producer/temprulesconfig' },
  { name: 'Digital Twin Dashboard', icon: Package, desc: 'Visual sensor placement', path: '/producer/documentpreview' },
  { name: 'Document Hasher', icon: Anchor, desc: 'Anchor invoices to ledger', path: '/producer/uploaddocs' },
  { name: 'Predictive Analytics', icon: Activity, desc: 'AI-based SLA breach prediction', path: '/producer/riskassessment' },
  { name: 'Producer Trust Score', icon: ShieldCheck, desc: 'Historical success metrics', path: '/producer/ledgerview' },
  { name: 'Multi-Signature Approvals', icon: CheckSquare, desc: 'QA sign-off requirement', path: '/producer/actorkeysetup' },
  { name: 'Recall Management System', icon: AlertTriangle, desc: 'Flag tokens globally', path: '/producer/exceptioncase' },
  { name: 'Carbon Footprint Estimator', icon: Leaf, desc: 'Calculate emissions by route', path: '/producer/routeplan' },
  { name: 'Real-Time Fleet API', icon: Navigation, desc: 'Live transporter telemetry', path: '/producer/alertsmonitor' },
  { name: 'Geofence Origin Setup', icon: Globe, desc: 'Define facility coordinates', path: '/producer/createshipment' },
  { name: 'Audit Export Module', icon: Download, desc: 'PDF generation for regulators', path: '/producer/producerdashboard' },
];

const ProducerDashboard = () => {
  const { fetchShipments, shipments, loading } = useShipments();

  useEffect(() => {
    fetchShipments();
  }, [fetchShipments]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'in_transit':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'delivered':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'received':
        return 'bg-green-50 border-green-200 text-green-700';
      default:
        return 'bg-slate-50 border-slate-200 text-slate-700';
    }
  };

  const activeShipments = shipments.filter(s => s.status === 'in_transit' || s.status === 'pending').length;
  const deliveredShipments = shipments.filter(s => s.status === 'delivered' || s.status === 'received').length;

  return (
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

      {/* Live Shipments Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Shipments</p>
              <p className="text-3xl font-black text-slate-800">{shipments.length}</p>
            </div>
            <Package className="w-8 h-8 text-indigo-600 opacity-30" />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">In Transit</p>
              <p className="text-3xl font-black text-blue-600">{activeShipments}</p>
            </div>
            <Truck className="w-8 h-8 text-blue-600 opacity-30" />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Delivered</p>
              <p className="text-3xl font-black text-green-600">{deliveredShipments}</p>
            </div>
            <CheckSquare className="w-8 h-8 text-green-600 opacity-30" />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Compliance Rate</p>
              <p className="text-3xl font-black text-emerald-600">98%</p>
            </div>
            <ShieldCheck className="w-8 h-8 text-emerald-600 opacity-30" />
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
        <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-500"/> Recent Shipments</h3>
        <div className="space-y-3 flex-1 overflow-y-auto max-h-[300px]">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : shipments.length === 0 ? (
            <p className="text-slate-500 text-sm">No shipments yet</p>
          ) : (
            shipments.slice(0, 5).map((ship, i) => (
              <div key={i} className={`p-3 rounded-xl border ${getStatusColor(ship.status)} flex flex-col gap-1`}>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs">SHP-{ship.id}</span>
                  <span className="text-[10px] font-bold capitalize">{ship.status?.replace('_', ' ')}</span>
                </div>
                <p className="text-xs text-slate-600 truncate">{ship.destination}</p>
              </div>
            ))
          )}
        </div>
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
          <Link key={i} to={feat.path} className="p-5 rounded-2xl border border-slate-100 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100 transition-all cursor-pointer bg-gradient-to-b from-white to-slate-50 group block">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <feat.icon className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">{feat.name}</h4>
            <p className="text-xs text-slate-500">{feat.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  </div>
);
};

export default ProducerDashboard;