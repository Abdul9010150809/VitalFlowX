import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, AlertTriangle, CalendarCheck, MapPin } from 'lucide-react';

const navCards = [
  { title:'Live Tracking', path:'/transporter/livetracking', icon:MapPin, desc:'Real‑time route visualization' },
  { title:'Pickup Event', path:'/transporter/pickupevent', icon:Truck, desc:'Record cargo pickup details' },
  { title:'Handoff Event', path:'/transporter/handoffevent', icon:AlertTriangle, desc:'Transfer custody to next party' },
  { title:'Delivery Confirmation', path:'/transporter/deliveryconfirm', icon:CalendarCheck, desc:'Confirm final receipt' },
];

const TransportDashboard = () => (
  <div className="space-y-8 animate-fade-in-up pb-12">
    <h2 className="text-3xl font-black text-slate-800">Transporter Dashboard</h2>
    <p className="text-slate-500">Manage all logistics events and monitor live routes.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {navCards.map((c,i)=>(
        <Link key={i} to={c.path} className="group relative bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center text-center">
          <c.icon className="w-8 h-8 text-indigo-600 mb-3"/>
          <h3 className="font-bold text-slate-800 mb-1">{c.title}</h3>
          <p className="text-xs text-slate-500">{c.desc}</p>
        </Link>
      ))}
    </div>
  </div>
);

export default TransportDashboard;