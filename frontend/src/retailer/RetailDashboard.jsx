import React from 'react';
import { inboundShipments, recentDeliveries, localInventory } from './dummyData';
import { PackageSearch, Store, AlertCircle, Calendar } from 'lucide-react';

const RetailDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Retailer Command Center</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[ { label: 'Inbound En Route', val: inboundShipments.length, icon: PackageSearch },
           { label: 'Local Stock Lots', val: localInventory.length, icon: Store },
           { label: 'Flagged Items', val: 1, icon: AlertCircle },
           { label: 'Avg Shelving Time', val: '4 Days', icon: Calendar }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stat.val}</p>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg"><stat.icon className="w-6 h-6"/></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100"><h3 className="font-semibold text-gray-800">Incoming Shipments</h3></div>
          <div className="divide-y divide-gray-100">
            {inboundShipments.map(s => (
              <div key={s.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                <div><p className="font-medium text-gray-800">{s.product}</p><p className="text-sm text-gray-500">{s.id} • ETA: {s.eta}</p></div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${s.status === 'En Route' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{s.status}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100"><h3 className="font-semibold text-gray-800">Recent Deliveries Log</h3></div>
          <div className="divide-y divide-gray-100">
            {recentDeliveries.map(d => (
              <div key={d.id} className="p-4 hover:bg-gray-50">
                <p className="font-medium text-gray-800 flex justify-between">{d.shipment} <span className="text-sm text-gray-400">{d.received}</span></p>
                <div className="flex gap-2 mt-2">
                   <span className={`text-xs px-2 py-1 rounded ${d.QAStatus === 'Passed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>QA: {d.QAStatus}</span>
                   <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">Temp: {d.tempStability}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default RetailDashboard;