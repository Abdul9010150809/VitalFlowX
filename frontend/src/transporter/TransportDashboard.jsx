import React from 'react';
import { activeRoutes, incidentLogs } from './dummyData';
import { Truck, Navigation, AlertTriangle, BatteryCharging } from 'lucide-react';

const TransportDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Transporter Fleet Center</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[ { label: 'Active Routes', val: activeRoutes.length, icon: Truck },
           { label: 'Live GPS Signals', val: 34, icon: Navigation },
           { label: 'Open Incidents', val: incidentLogs.length, icon: AlertTriangle },
           { label: 'Sensor Battery Avg', val: '88%', icon: BatteryCharging }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stat.val}</p>
            </div>
            <div className="p-3 bg-orange-50 text-orange-600 rounded-lg"><stat.icon className="w-6 h-6"/></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100"><h3 className="font-semibold text-gray-800">Fleet Operations</h3></div>
          <div className="divide-y divide-gray-100">
            {activeRoutes.map(r => (
              <div key={r.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                <div><p className="font-medium text-gray-800">{r.id} ({r.vehicle})</p><p className="text-sm text-gray-500">Driver: {r.driver}</p></div>
                <div className="text-right">
                   <div className="text-sm font-bold text-gray-700">{r.progress}</div>
                   <span className={`text-xs px-2 py-1 rounded ${r.status === 'On Route' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{r.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100"><h3 className="font-semibold text-gray-800">Incident Matrix</h3></div>
          <div className="divide-y divide-gray-100">
            {incidentLogs.map(inc => (
              <div key={inc.reportId} className="p-4 hover:bg-gray-50 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{inc.reportId}</p>
                  <p className="text-sm text-gray-600 mt-1">{inc.type}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${inc.resolving ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {inc.resolving ? 'Resolving' : 'Pending Action'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TransportDashboard;