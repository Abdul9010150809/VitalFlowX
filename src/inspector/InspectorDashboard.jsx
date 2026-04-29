import React from 'react';
import { inspectionQueue, fraudAlerts, validatedSensors } from './dummyData';
import { ClipboardCheck, ShieldAlert, Cpu, Search } from 'lucide-react';

const InspectorDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Inspector Command Central</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[ { label: 'Pending Audits', val: inspectionQueue.length, icon: ClipboardCheck },
           { label: 'Fraud Alerts', val: fraudAlerts.length, icon: ShieldAlert },
           { label: 'Sensors Validated', val: validatedSensors.length, icon: Cpu },
           { label: 'Active Scanning', val: 'Online', icon: Search }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stat.val}</p>
            </div>
            <div className="p-3 bg-red-50 text-red-600 rounded-lg"><stat.icon className="w-6 h-6"/></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between">
            <h3 className="font-semibold text-gray-800">Daily Inspection Queue</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {inspectionQueue.map(q => (
              <div key={q.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                <div><p className="font-medium text-gray-800">{q.id}: {q.type}</p><p className="text-sm text-gray-500">Target: {q.target}</p></div>
                <div className="text-right">
                   <div className="text-xs font-bold text-gray-700">{q.facility}</div>
                   <span className={`mt-1 inline-block text-xs px-2 py-1 rounded ${q.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>{q.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100"><h3 className="font-semibold text-gray-800">Fraud & Security Triage</h3></div>
          <div className="divide-y divide-gray-100">
            {fraudAlerts.map(f => (
              <div key={f.alertId} className="p-4 hover:bg-gray-50">
                <p className="font-medium text-red-600 flex justify-between">{f.alertId} <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">{f.riskLevel} Risk</span></p>
                <p className="text-sm text-gray-800 mt-1">{f.suspicion}</p>
                <p className="text-xs text-gray-500 mt-1">Bound to {f.shipment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default InspectorDashboard;