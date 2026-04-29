import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, AlertTriangle, CalendarCheck, MapPin, Activity, Gauge, Leaf, Moon, Sun, Navigation } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const carbonData = [
  { day: 'Mon', emissions: 45 },
  { day: 'Tue', emissions: 52 },
  { day: 'Wed', emissions: 38 },
  { day: 'Thu', emissions: 65 },
  { day: 'Fri', emissions: 48 },
  { day: 'Sat', emissions: 20 },
  { day: 'Sun', emissions: 15 },
];

const navCards = [
  { title:'Live Tracking', path:'/transporter/livetracking', icon:Navigation, desc:'Real‑time route & geofencing', color: 'bg-blue-50 text-blue-600' },
  { title:'Pickup Event', path:'/transporter/pickupevent', icon:Truck, desc:'Record cargo pickup', color: 'bg-indigo-50 text-indigo-600' },
  { title:'Handoff Event', path:'/transporter/handoffevent', icon:Activity, desc:'Transfer custody', color: 'bg-purple-50 text-purple-600' },
  { title:'Delivery Confirmation', path:'/transporter/deliveryconfirm', icon:CalendarCheck, desc:'Final receipt & e-Sign', color: 'bg-emerald-50 text-emerald-600' },
];

const TransportDashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`space-y-8 animate-fade-in-up pb-12 transition-colors duration-500 ${isDarkMode ? 'bg-slate-900 text-white p-8 rounded-3xl -m-8' : ''}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Transporter Command Hub</h2>
          <p className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>Fleet telemetry, route optimization, and carbon analytics.</p>
        </div>
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
            isDarkMode ? 'bg-slate-800 text-amber-400 border border-slate-700' : 'bg-white border border-slate-200 text-slate-600 shadow-sm'
          }`}
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          {isDarkMode ? 'Day Mode' : 'Focus Mode'}
        </button>
      </div>

      {/* Main Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {navCards.map((c,i)=>(
          <Link key={i} to={c.path} className={`group p-6 rounded-3xl border transition-all hover:shadow-xl hover:-translate-y-1 ${
            isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'
          }`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${c.color}`}>
              <c.icon className="w-6 h-6"/>
            </div>
            <h3 className={`font-black mb-1 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{c.title}</h3>
            <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{c.desc}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Vehicle Digital Twin */}
        <div className={`lg:col-span-2 rounded-3xl p-8 border transition-all ${
          isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'
        }`}>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black flex items-center gap-2">
              <Gauge className="w-5 h-5 text-indigo-500" /> Vehicle Digital Twin (VTX-TRUCK-01)
            </h3>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest rounded-lg">Online</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Cooling Unit', value: '94%', sub: 'Efficiency', status: 'optimal' },
              { label: 'Engine Load', value: '42%', sub: '2,100 RPM', status: 'optimal' },
              { label: 'Tire Pressure', value: '110', sub: 'PSI', status: 'warning' },
              { label: 'Fuel Level', value: '68%', sub: '420km range', status: 'optimal' }
            ].map((stat, i) => (
              <div key={i} className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <p className={`text-2xl font-black mt-1 ${stat.status === 'warning' ? 'text-amber-500' : (isDarkMode ? 'text-white' : 'text-slate-800')}`}>{stat.value}</p>
                <p className="text-[10px] font-bold text-slate-400">{stat.sub}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-indigo-600 text-white flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                 <AlertTriangle className="w-6 h-6 text-white" />
               </div>
               <div>
                 <h4 className="font-black text-lg">Predictive Maintenance Alert</h4>
                 <p className="text-indigo-100 text-sm">Brake pad wear detected (82%). Schedule service within 500km.</p>
               </div>
             </div>
             <button className="px-6 py-2 bg-white text-indigo-600 font-black rounded-xl text-sm whitespace-nowrap">Schedule Now</button>
          </div>
        </div>

        {/* Carbon Footprint Analytics */}
        <div className={`rounded-3xl p-8 border transition-all ${
          isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'
        }`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-500" /> Carbon Footprint
            </h3>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={carbonData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#334155' : '#f1f5f9'} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', background: isDarkMode ? '#1e293b' : '#fff', color: isDarkMode ? '#fff' : '#000' }}
                />
                <Bar dataKey="emissions" radius={[4, 4, 0, 0]}>
                  {carbonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.emissions > 60 ? '#f43f5e' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-700/20">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Weekly Total</span>
              <span className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>280kg CO2</span>
            </div>
            <p className="text-[10px] text-emerald-500 font-bold mt-1">↓ 12% from last week (Eco-Route Active)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportDashboard;